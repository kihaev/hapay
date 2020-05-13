from django.urls import path

from .views import ProfileRetrieveAPIView

from .apps import ProfilesConfig

app_name = ProfilesConfig.name


urlpatterns = [
    path("profiles/<str:username>", ProfileRetrieveAPIView.as_view()),
]
