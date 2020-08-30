from rest_framework import viewsets, permissions
from rest_framework.response import Response
from posts.models import Post
from .serializers import PostSerializer


class PostViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = PostSerializer

    def get_queryset(self):
        return self.request.user.posts.all()

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
