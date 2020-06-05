from rest_framework import generics, mixins, status, viewsets, parsers
from rest_framework.exceptions import NotFound
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import File
from .renderers import FileJSONRenderer
from .serializers import FileSerializer


class FileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.select_related("owner", "owner__user")
    permission_classes = (IsAuthenticatedOrReadOnly,)
    renderer_classes = (FileJSONRenderer,)
    serializer_class = FileSerializer

    def get_queryset(self):
        queryset = self.queryset

        owner = self.request.query_params.get("owner", None)
        if owner is not None:
            queryset = queryset.filter(owner__user__username=owner)

        return queryset

    def create(self, request):
        serializer_context = {"owner": request.user.profile, "request": request}
        serializer_data = request.data.get("file", {})
        print(request.data)
        print(request.file)
        serializer = self.serializer_class(
            data=serializer_data, context=serializer_context
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request):
        serializer_context = {"request": request}
        page = self.paginate_queryset(self.get_queryset())

        serializer = self.serializer_class(page, context=serializer_context, many=True)

        return self.get_paginated_response(serializer.data)

    def retrieve(self, request, pk):
        serializer_context = {"request": request}

        try:
            serializer_instance = self.queryset.get(pk=pk)
        except File.DoesNotExist:
            raise NotFound("An file with this id does not exist.")

        serializer = self.serializer_class(
            serializer_instance, context=serializer_context
        )

        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk):
        serializer_context = {"request": request}

        try:
            serializer_instance = self.queryset.get(pk=pk)
        except File.DoesNotExist:
            raise NotFound("An file with this id does not exist.")

        serializer_data = request.data.get("file", {})

        serializer = self.serializer_class(
            serializer_instance,
            context=serializer_context,
            data=serializer_data,
            partial=True,
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)
