from __future__ import annotations

import os
from typing import Any

from django.db import transaction
from rest_framework import status, viewsets
from rest_framework.decorators import action, api_view
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Category, Member, Mentor, Team
from .serializers import (
    CategorySerializer,
    MemberSerializer,
    MentorSerializer,
    TeamSerializer,
)


class TeamViewSet(viewsets.ModelViewSet):
    """
    REST API for competition teams.

    Endpoints:
      GET    /api/teams/          — list all teams (used by Participants page)
      POST   /api/teams/          — register a new team
      GET    /api/teams/{id}/     — retrieve team details
      PUT    /api/teams/{id}/     — update team
      PATCH  /api/teams/{id}/     — partial update
      DELETE /api/teams/{id}/     — remove team
      POST   /api/teams/sync/     — bulk upsert (frontend compatibility)
    """

    queryset = Team.objects.prefetch_related("members", "mentor", "category").all()
    serializer_class = TeamSerializer
    lookup_field = "id"

    def get_serializer_context(self) -> dict[str, Any]:
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    @action(detail=False, methods=["post"], url_path="sync")
    @transaction.atomic
    def sync(self, request: Request) -> Response:
        """
        Bulk upsert teams from the frontend localStorage payload.

        Accepts either:
          - A JSON array of team objects  (legacy contract)
          - A JSON object: { "teams": [...] }
        """
        payload = request.data
        if isinstance(payload, list):
            teams_data = payload
        elif isinstance(payload, dict) and isinstance(payload.get("teams"), list):
            teams_data = payload["teams"]
        else:
            return Response(
                {"detail": "Expected a JSON array of teams or { \"teams\": [...] }."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        saved: list[Team] = []
        errors: list[dict[str, Any]] = []

        for index, team_payload in enumerate(teams_data):
            serializer = TeamSerializer(data=team_payload)
            if serializer.is_valid():
                saved.append(serializer.save())
            else:
                errors.append({"index": index, "id": team_payload.get("id"), "errors": serializer.errors})

        if errors and not saved:
            return Response({"detail": "Sync failed.", "errors": errors}, status=status.HTTP_400_BAD_REQUEST)

        response_data = TeamSerializer(saved, many=True).data
        result: dict[str, Any] = {
            "synced": len(saved),
            "teams": response_data,
        }
        if errors:
            result["partial_errors"] = errors

        return Response(result, status=status.HTTP_200_OK)


class MemberViewSet(viewsets.ModelViewSet):
    """REST API for individual participants."""

    queryset = Member.objects.select_related("mentor").all()
    serializer_class = MemberSerializer
    lookup_field = "id"

    def get_queryset(self):
        queryset = super().get_queryset()
        mentor_id = self.request.query_params.get("mentorId")
        if mentor_id:
            queryset = queryset.filter(mentor_id=mentor_id)
        return queryset

    @action(detail=False, methods=["post"], url_path="sync")
    def sync(self, request: Request) -> Response:
        payload = request.data
        if isinstance(payload, list):
            members_data = payload
        elif isinstance(payload, dict) and isinstance(payload.get("members"), list):
            members_data = payload["members"]
        else:
            return Response(
                {"detail": "Expected a JSON array of members or { \"members\": [...] }."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        saved: list[Member] = []
        errors: list[dict[str, Any]] = []

        for index, member_payload in enumerate(members_data):
            serializer = MemberSerializer(data=member_payload)
            if serializer.is_valid():
                with transaction.atomic():
                    saved.append(serializer.save())
            else:
                errors.append(
                    {"index": index, "id": member_payload.get("id"), "errors": serializer.errors},
                )

        result: dict[str, Any] = {
            "synced": len(saved),
            "members": MemberSerializer(saved, many=True).data,
        }
        if errors:
            result["partial_errors"] = errors

        return Response(result, status=status.HTTP_200_OK)


class MentorViewSet(viewsets.ModelViewSet):
    """REST API for mentor accounts."""

    queryset = Mentor.objects.all()
    serializer_class = MentorSerializer
    lookup_field = "id"
    http_method_names = ["get", "post", "put", "patch", "head", "options"]

    @action(detail=False, methods=["post"], url_path="sync")
    def sync(self, request: Request) -> Response:
        payload = request.data
        if isinstance(payload, list):
            mentors_data = payload
        elif isinstance(payload, dict) and isinstance(payload.get("mentors"), list):
            mentors_data = payload["mentors"]
        else:
            return Response(
                {"detail": "Expected a JSON array of mentors or { \"mentors\": [...] }."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        saved: list[Mentor] = []
        errors: list[dict[str, Any]] = []

        for index, mentor_payload in enumerate(mentors_data):
            serializer = MentorSerializer(data=mentor_payload)
            if serializer.is_valid():
                with transaction.atomic():
                    saved.append(serializer.save())
            else:
                errors.append(
                    {"index": index, "id": mentor_payload.get("id"), "errors": serializer.errors},
                )

        result: dict[str, Any] = {
            "synced": len(saved),
            "mentors": MentorSerializer(saved, many=True).data,
        }
        if errors:
            result["partial_errors"] = errors

        return Response(result, status=status.HTTP_200_OK)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """Read-only list of competition categories."""

    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = "id"


@api_view(["GET"])
def health_check(_request: Request) -> Response:
    """Simple health endpoint for deployment checks."""
    team_count = Team.objects.count()
    member_count = Member.objects.count()
    return Response(
        {
            "status": "ok",
            "service": "NextGen Robotics API",
            "teams": team_count,
            "members": member_count,
        }
    )


class LegacyTeamsListView(APIView):
    """
    Backwards-compatible endpoint: GET /api/teams returns a flat JSON array.

    The frontend fetchRemoteTeams() expects Team[] directly, not paginated results.
    """

    def get(self, _request: Request) -> Response:
        teams = Team.objects.prefetch_related("members").all()
        return Response(TeamSerializer(teams, many=True).data)


@api_view(["POST"])
@transaction.atomic
def reset_all(request: Request) -> Response:
    """
    Wipe all teams, members, and mentors from the shared backend.

    Requires header X-Admin-Token matching the ADMIN_RESET_TOKEN env var
    (if that env var is set). If ADMIN_RESET_TOKEN is unset, this endpoint
    is disabled entirely.
    """
    expected_token = os.getenv("ADMIN_RESET_TOKEN", "")
    if not expected_token:
        return Response(
            {"detail": "Reset endpoint is disabled (ADMIN_RESET_TOKEN not configured)."},
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )

    provided_token = request.headers.get("X-Admin-Token", "")
    if provided_token != expected_token:
        return Response({"detail": "Invalid admin token."}, status=status.HTTP_403_FORBIDDEN)

    team_count = Team.objects.count()
    member_count = Member.objects.count()
    mentor_count = Mentor.objects.count()

    Member.objects.all().delete()
    Team.objects.all().delete()
    Mentor.objects.all().delete()

    return Response(
        {
            "detail": "All teams, members, and mentors deleted.",
            "deleted": {
                "teams": team_count,
                "members": member_count,
                "mentors": mentor_count,
            },
        },
        status=status.HTTP_200_OK,
    )
