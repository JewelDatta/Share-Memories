from django.urls import path
from .views import PostViewSet

urlpatterns = [
    path("", PostViewSet.as_view({
        "post": "create",
    })),
    path("feed", PostViewSet.as_view({"get": "get_feed_posts"})),
    path("<str:username>",
         PostViewSet.as_view({
             "get": "get_posts_by_username",
         })),
]
