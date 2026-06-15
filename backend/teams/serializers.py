from __future__ import annotations

from datetime import datetime
from typing import Any

from django.db import transaction
from django.utils import timezone
from django.utils.dateparse import parse_datetime
from rest_framework import serializers

from .models import Category, Member, Mentor, Team


def _parse_paid_at(value: str | None) -> datetime | None:
    if not value:
        return None
    parsed = parse_datetime(value)
    if parsed is None:
        try:
            return datetime.fromisoformat(value.replace("Z", "+00:00"))
        except ValueError:
            return None
    if timezone.is_naive(parsed):
        return timezone.make_aware(parsed, timezone.get_current_timezone())
    return parsed


class CategorySerializer(serializers.ModelSerializer):
    pdfName = serializers.CharField(source="pdf_name", required=False, allow_blank=True)
    pdfDataUrl = serializers.CharField(source="pdf_data_url", required=False, allow_blank=True)
    ageMin = serializers.IntegerField(source="age_min", required=False, allow_null=True)
    ageMax = serializers.IntegerField(source="age_max", required=False, allow_null=True)
    maxMembers = serializers.IntegerField(source="max_members", required=False, allow_null=True)

    class Meta:
        model = Category
        fields = [
            "id",
            "name",
            "description",
            "pdfName",
            "pdfDataUrl",
            "ageMin",
            "ageMax",
            "maxMembers",
        ]


class MentorSerializer(serializers.ModelSerializer):
    mentorId = serializers.CharField(source="id", read_only=True)
    dateOfBirth = serializers.CharField(source="date_of_birth")
    registeredAt = serializers.DateTimeField(source="registered_at")
    passwordHash = serializers.CharField(
        source="password_hash",
        required=False,
        allow_blank=True,
        write_only=True,
    )
    passwordSalt = serializers.CharField(
        source="password_salt",
        required=False,
        allow_blank=True,
        write_only=True,
    )

    class Meta:
        model = Mentor
        fields = [
            "id",
            "mentorId",
            "name",
            "surname",
            "fin",
            "email",
            "dateOfBirth",
            "country",
            "phone",
            "registeredAt",
            "passwordHash",
            "passwordSalt",
        ]
        read_only_fields = ["registeredAt"]

    def create(self, validated_data: dict[str, Any]) -> Mentor:
        mentor_id = self.initial_data.get("id")
        if not mentor_id:
            raise serializers.ValidationError({"id": "Mentor id is required."})

        registered_at = validated_data.get("registered_at")
        if registered_at is None:
            validated_data["registered_at"] = timezone.now()

        mentor, _created = Mentor.objects.update_or_create(
            id=mentor_id,
            defaults=validated_data,
        )
        return mentor


class MemberSerializer(serializers.ModelSerializer):
    mentorId = serializers.CharField(source="mentor_id", required=False, allow_blank=True, default="")

    class Meta:
        model = Member
        fields = [
            "id",
            "mentorId",
            "name",
            "surname",
            "age",
            "fin",
            "email",
            "phone",
        ]

    def validate_mentorId(self, value: str) -> str:
        # mentorId stored as-is; mentor FK is nullable so sync works
        # regardless of whether the mentor was synced first.
        return value

    def to_representation(self, instance: Member) -> dict[str, Any]:
        data = super().to_representation(instance)
        if data.get("mentorId") is None:
            data["mentorId"] = ""
        return data

    def create(self, validated_data: dict[str, Any]) -> Member:
        member_id = self.initial_data.get("id")
        if not member_id:
            raise serializers.ValidationError({"id": "Member id is required."})

        mentor_id = validated_data.pop("mentor_id", "") or ""
        mentor = Mentor.objects.filter(id=mentor_id).first() if mentor_id else None

        member, _created = Member.objects.update_or_create(
            id=member_id,
            defaults={**validated_data, "mentor": mentor},
        )
        return member


class TeamSerializer(serializers.ModelSerializer):
    """Serializer matching the frontend Team TypeScript interface."""

    school = serializers.CharField()
    members = serializers.IntegerField(source="member_count")
    categoryName = serializers.CharField(
        source="category_name",
        required=False,
        allow_blank=True,
    )
    memberIds = serializers.SerializerMethodField()
    memberNames = serializers.SerializerMethodField()
    mentorId = serializers.CharField(
        source="mentor_id",
        required=False,
        allow_null=True,
        allow_blank=True,
    )
    mentorName = serializers.CharField(
        source="mentor_name",
        required=False,
        allow_blank=True,
    )
    paymentStatus = serializers.CharField(
        source="payment_status",
        required=False,
        allow_blank=True,
    )
    paymentAmount = serializers.DecimalField(
        source="payment_amount",
        max_digits=10,
        decimal_places=2,
        required=False,
        allow_null=True,
    )
    paymentMethod = serializers.CharField(
        source="payment_method",
        required=False,
        allow_blank=True,
    )
    paidAt = serializers.SerializerMethodField()
    group = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = Team
        fields = [
            "id",
            "name",
            "school",
            "members",
            "description",
            "categoryName",
            "memberIds",
            "memberNames",
            "mentorId",
            "mentorName",
            "paymentStatus",
            "paymentAmount",
            "paymentMethod",
            "paidAt",
            "group",
        ]

    def get_memberIds(self, obj: Team) -> list[str]:
        return list(obj.members.values_list("id", flat=True))

    def get_memberNames(self, obj: Team) -> list[str]:
        return [member.full_name for member in obj.members.all()]

    def get_paidAt(self, obj: Team) -> str | None:
        if obj.paid_at is None:
            return None
        return obj.paid_at.isoformat()

    def _resolve_members(self, member_ids: list[str] | None) -> list[Member]:
        if not member_ids:
            return []
        found = list(Member.objects.filter(id__in=member_ids))
        if len(found) != len(set(member_ids)):
            missing = set(member_ids) - {member.id for member in found}
            raise serializers.ValidationError(
                {"memberIds": f"Unknown member ids: {', '.join(sorted(missing))}"},
            )
        return found

    def _resolve_category(self, category_name: str) -> Category | None:
        if not category_name:
            return None
        return Category.objects.filter(name=category_name).first()

    @transaction.atomic
    def create(self, validated_data: dict[str, Any]) -> Team:
        team_id = self.initial_data.get("id")
        if not team_id:
            raise serializers.ValidationError({"id": "Team id is required."})

        member_ids = self.initial_data.get("memberIds") or []
        member_names = self.initial_data.get("memberNames") or []
        category_name = validated_data.get("category_name", "")
        mentor_id = validated_data.pop("mentor_id", None)
        payment_status = validated_data.pop("payment_status", "")
        payment_method = validated_data.pop("payment_method", "")
        paid_at_raw = self.initial_data.get("paidAt")

        mentor = Mentor.objects.filter(id=mentor_id).first() if mentor_id else None
        category = self._resolve_category(category_name)

        team, _created = Team.objects.update_or_create(
            id=team_id,
            defaults={
                **validated_data,
                "mentor": mentor,
                "category": category,
                "payment_status": payment_status or "",
                "payment_method": payment_method or "",
                "paid_at": _parse_paid_at(paid_at_raw),
            },
        )

        resolved_members = self._resolve_members(member_ids)
        if resolved_members:
            team.members.set(resolved_members)
        elif member_names and mentor:
            # Legacy payloads may only include memberNames without stored members.
            team.member_count = len(member_names)
            team.save(update_fields=["member_count", "updated_at"])
        else:
            team.refresh_member_count()

        return team

    @transaction.atomic
    def update(self, instance: Team, validated_data: dict[str, Any]) -> Team:
        member_ids = self.initial_data.get("memberIds")
        category_name = validated_data.get("category_name")
        mentor_id = validated_data.pop("mentor_id", serializers.empty)

        if mentor_id is not serializers.empty:
            instance.mentor = (
                Mentor.objects.filter(id=mentor_id).first() if mentor_id else None
            )

        if category_name is not None:
            instance.category = self._resolve_category(category_name)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        paid_at_raw = self.initial_data.get("paidAt")
        if paid_at_raw is not None:
            instance.paid_at = _parse_paid_at(paid_at_raw)

        instance.save()

        if member_ids is not None:
            instance.members.set(self._resolve_members(member_ids))
            instance.refresh_member_count()

        return instance


class TeamSyncSerializer(serializers.Serializer):
    """Bulk upsert payload used by the frontend storage layer."""

    teams = TeamSerializer(many=True)

    def save(self, **kwargs: Any) -> list[Team]:
        teams_data = self.validated_data["teams"]
        saved: list[Team] = []
        for team_payload in teams_data:
            serializer = TeamSerializer(data=team_payload)
            serializer.is_valid(raise_exception=True)
            saved.append(serializer.save())
        return saved
