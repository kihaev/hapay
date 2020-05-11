from django.db import models

from hapay_backend.apps.core.models import TimestampedModel


class File(TimestampedModel):
    title = models.CharField(db_index=True, max_length=255)
    link = models.URLField()
    description = models.TextField()
    owner = models.ForeignKey(
        "profiles.Profile", on_delete=models.CASCADE, related_name="files"
    )

    def __str__(self):
        return self.title
