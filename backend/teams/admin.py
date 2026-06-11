from django.contrib import admin

from .models import Category, Member, Mentor, Team


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "age_min", "age_max", "max_members")
    search_fields = ("name",)


@admin.register(Mentor)
class MentorAdmin(admin.ModelAdmin):
    list_display = ("full_name", "email", "country", "registered_at")
    search_fields = ("name", "surname", "email", "fin")
    readonly_fields = ("created_at", "updated_at")


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ("full_name", "mentor", "age", "email")
    search_fields = ("name", "surname", "email", "fin")
    list_filter = ("mentor",)


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ("name", "category_name", "school", "mentor_name", "member_count", "created_at")
    search_fields = ("name", "school", "mentor_name", "category_name")
    list_filter = ("category_name", "payment_status")
    filter_horizontal = ("members",)
