from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from django.shortcuts import get_object_or_404


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    # queryset = User.objects.all()

    # serializer_class = UserSerializer

    def get_current_user(self, request, *args, **kwargs):
        serializer = UserSerializer(request.user, context={'request': request})
        return Response(serializer.data)

    def search_users_by_username(self, request, username, *args, **kwargs):
        queryset_result = User.objects.filter(username__contains=username)
        serializer = UserSerializer(queryset_result, many=True)
        return Response(serializer.data)

    def get_user_by_username(self, request, username):
        user = get_object_or_404(User, username=username)
        serializer = UserSerializer(user, context={'request': request})
        return Response(serializer.data)
