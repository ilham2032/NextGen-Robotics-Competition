from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    CategoryViewSet,
    LegacyTeamsListView,
    MemberViewSet,
    MentorViewSet,
    TeamViewSet,
    health_check,
    reset_all,
)

router = DefaultRouter()
router.register(r"teams", TeamViewSet, basename="team")
router.register(r"members", MemberViewSet, basename="member")
router.register(r"mentors", MentorViewSet, basename="mentor")
router.register(r"categories", CategoryViewSet, basename="category")

urlpatterns = [
    path("health/", health_check, name="health-check"),
    path("reset/", reset_all, name="reset-all"),
    # Legacy flat array response for Participants page polling
    path("teams", LegacyTeamsListView.as_view(), name="teams-legacy-list"),
    path("", include(router.urls)),
]
