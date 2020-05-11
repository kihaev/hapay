from hapay_backend.apps.core.renderers import HapayJSONRenderer


class FileJSONRenderer(HapayJSONRenderer):
    object_label = "file"
    pagination_object_label = "files"
    pagination_count_label = "filesCount"
