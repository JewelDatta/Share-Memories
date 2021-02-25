from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from posts.models import Post
from users.models import User, Friend

from .serializers import PostSerializer
from users.serializers import UserSerializer

from django.shortcuts import get_object_or_404

from rest_framework.pagination import PageNumberPagination


class PostPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 1


class PostViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = PostSerializer
    pagination_class = PostPagination

    def get_queryset(self):
        return self.request.user.posts.all().order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

    def get_posts_by_username(self, request, username):
        """ all the posts of {username} """

        # if author is requesting for own posts
        if (request.user.username == username):
            queryset = self.get_queryset()
            page = self.paginate_queryset(queryset)
            serializer = PostSerializer(page,
                                        many=True,
                                        context={'request': request})

            return self.get_paginated_response(serializer.data)

        user = get_object_or_404(User, username=username)

        # check if logged in user is following {username}
        isFriend = Friend.objects.filter(user_from=request.user,
                                         user_to=user).exists()

        if (not isFriend):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        queryset = Post.objects.filter(creator=user)
        page = self.paginate_queryset(queryset)

        serializer = PostSerializer(page,
                                    many=True,
                                    context={'request': request})

        return self.get_paginated_response(serializer.data)
