from hapay_backend.apps.core.renderers import HapayJSONRenderer


class ProfileJSONRenderer(HapayJSONRenderer):
    object_label = "profile"
    pagination_object_label = "profiles"
    pagination_count_label = "profilesCount"
