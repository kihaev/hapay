from django.urls import path

from .views import LoginAPIView, RegistrationAPIView, UserRetrieveUpdateAPIView

from .apps import AuthenticationAppConfig


app_name = AuthenticationAppConfig.name

urlpatterns = [
    path("user", UserRetrieveUpdateAPIView.as_view()),
    path("users/register", RegistrationAPIView.as_view()),
    path("users/login", LoginAPIView.as_view()),
]
