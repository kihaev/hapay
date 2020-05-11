from django.conf.urls import include, url

from rest_framework.routers import DefaultRouter

from .views import FileViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r"files/", FileViewSet)

urlpatterns = [
    url(r"^", include(router.urls)),
]
