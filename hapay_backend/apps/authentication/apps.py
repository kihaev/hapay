from django.apps import AppConfig


class AuthenticationAppConfig(AppConfig):
    name = "hapay_backend.apps.authentication"

    def ready(self):
        import hapay_backend.apps.authentication.signals
