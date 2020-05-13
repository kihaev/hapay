from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import FileViewSet

from .apps import FilesConfig


app_name = FilesConfig.name

router = DefaultRouter(trailing_slash=False)
router.register("files", FileViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
