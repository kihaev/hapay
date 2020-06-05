from rest_framework import serializers

from hapay_backend.apps.profiles.serializers import ProfileSerializer

from .models import File


class FileSerializer(serializers.ModelSerializer):
    owner = ProfileSerializer(read_only=True)
    description = serializers.CharField(required=False)
    link = serializers.URLField()
    createdAt = serializers.SerializerMethodField(method_name="get_created_at")
    updatedAt = serializers.SerializerMethodField(method_name="get_updated_at")
    expire_at = serializers.SerializerMethodField(method_name="get_expire_at")

    class Meta:
        model = File
        fields = (
            "id",
            "owner",
            "link",
            "description",
            "createdAt",
            "title",
            "updatedAt",
            "expire_at"
        )

    def create(self, validated_data):
        owner = self.context.get("owner", None)

        file = File.objects.create(owner=owner, **validated_data)

        return file

    def get_created_at(self, instance):
        return instance.created_at.isoformat()

    def get_updated_at(self, instance):
        return instance.updated_at.isoformat()

    def get_expire_at(self, instance):
        return instance.updated_at.isoformat()
