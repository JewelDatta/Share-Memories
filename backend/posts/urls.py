from django.urls import path
from .views import PostViewSet


urlpatterns = [
    path("", PostViewSet.as_view({
        "get": "list",
        "post": "create",
    }))
]
