from rest_framework import viewsets, permissions
from rest_framework.response import Response
from posts.models import Post
from users.models import User
from .serializers import PostSerializer
from users.serializers import UserSerializer
from django.shortcuts import get_object_or_404


class PostViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = PostSerializer

    def get_queryset(self):
        return self.request.user.posts.all()

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

    def get_posts_by_username(self, request, username):
        user = get_object_or_404(User, username=username)

        posts = Post.objects.filter(creator=user)
        result = PostSerializer(posts, many=True, context={'request': request})

        return Response(result.data)
