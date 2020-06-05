import os
from dotenv import load_dotenv, find_dotenv

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

load_dotenv(find_dotenv())
# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "2ylbi&g10c@_z$8eze6k1(^^p!echa^z+)dvd$&3ervtapnzjk"

# SECURITY WARNING: don't run with debug turned on in production!

ALLOWED_HOSTS = ["0.0.0.0", "localhost", "127.0.0.1", "hapay.shop"]

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "drf_yasg",
    "corsheaders",
    "storages",
    "django_extensions",
    "hapay_backend.apps.profiles",
    "hapay_backend.apps.authentication",
    "hapay_backend.apps.core",
    "hapay_backend.apps.files",
    "social_django",
]
ACCOUNT_DEFAULT_HTTP_PROTOCOL = "https"

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "hapay_backend.urls"

AUTHENTICATION_BACKENDS = [
    "social_core.backends.google.GoogleOAuth2",
    "social_core.backends.facebook.FacebookOAuth2",
    "django.contrib.auth.backends.ModelBackend",
]
SOCIAL_AUTH_RAISE_EXCEPTIONS = False
SOCIAL_AUTH_URL_NAMESPACE = "social"
SOCIAL_AUTH_FACEBOOK_KEY = os.environ.get("SOCIAL_AUTH_FACEBOOK_KEY")
SOCIAL_AUTH_FACEBOOK_SECRET = os.environ.get(
    "SOCIAL_AUTH_FACEBOOK_SECRET"
)
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = os.environ.get("SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET")
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = os.environ.get("SOCIAL_AUTH_GOOGLE_OAUTH2_KEY")

DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
AWS_STORAGE_BUCKET_NAME = 'hapay-bucket'
AWS_S3_REGION_NAME = 'eu-central-1'
AWS_ACCESS_KEY_ID = os.environ.get("AWS_ACCESS_KEY")
#print(AWS_ACCESS_KEY_ID)
AWS_SECRET_ACCESS_KEY = os.environ.get("AWS_SECRET_KEY")
#print(AWS_SECRET_ACCESS_KEY)
AWS_S3_ENDPOINT_URL = 'https://s3.amazonaws.com'


TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "hapay_backend.wsgi.application"

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": os.path.join(BASE_DIR, "db.sqlite3"),
    }
}

LOGIN_URL = "login"
LOGIN_REDIRECT_URL = "home"
LOGOUT_URL = "logout"
LOGOUT_REDIRECT_URL = "login"

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",},
]

# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = "/static/"

CORS_ORIGIN_WHITELIST = (
    "http://0.0.0.0:4000",
    "http://localhost:4000",
)

AUTH_USER_MODEL = "authentication.User"

REST_FRAMEWORK = {
    "EXCEPTION_HANDLER": "hapay_backend.apps.core.exceptions.core_exception_handler",
    "NON_FIELD_ERRORS_KEY": "error",
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "hapay_backend.apps.authentication.backends.JWTAuthentication",
    ),
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.LimitOffsetPagination",
    "PAGE_SIZE": 20,
}
