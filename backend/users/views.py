from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import User, Friend
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

    # def isFollowing(self, request, username):
    #     requester = request.user
    #     receiver = get_object_or_404(User, username=username)

    #     isFriend = Friend.objects.filter(user_from=requester,
    #                                      user_to=receiver).exists()
    #     return isFriend

    def search_users_by_username(self, request, username, *args, **kwargs):
        queryset_result = User.objects.filter(username__contains=username)
        serializer = UserSerializer(queryset_result, many=True)
        return Response(serializer.data)

    def get_user_by_username(self, request, username):
        user = get_object_or_404(User, username=username)
        serializer = UserSerializer(user, context={'request': request})

        isFriend = Friend.objects.filter(user_from=request.user,
                                         user_to=user).exists()
        result = {"isFollowing": isFriend}
        result.update(serializer.data)

        return Response(result)

    def follow_user(self, request, username):
        requester = request.user
        receiver = get_object_or_404(User, username=username)

        alreadyFriend = Friend.objects.filter(user_from=requester,
                                              user_to=receiver).exists()

        if receiver and not alreadyFriend:
            Friend.objects.create(user_from=requester, user_to=receiver)
            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    def unfollow_user(self, request, username):
        requester = request.user
        receiver = get_object_or_404(User, username=username)

        alreadyFriend = Friend.objects.filter(user_from=requester,
                                              user_to=receiver).exists()

        if receiver and alreadyFriend:
            Friend.objects.filter(user_from=requester,
                                  user_to=receiver).delete()
            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)
