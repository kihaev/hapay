from django.apps import AppConfig


class AuthenticationAppConfig(AppConfig):
    name = "authentication"

    def ready(self):
        import hapay_backend.apps.authentication.signals
