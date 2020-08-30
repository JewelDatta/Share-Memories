from .views import UserViewSet
from django.urls import path

urlpatterns = [
    path("", UserViewSet.as_view({"get": "get_current_user"})),
    path("search/<str:username>",
         UserViewSet.as_view({"get": "search_users_by_username"}))
]
