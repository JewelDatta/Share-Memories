from django.contrib import admin
from .models import User, Friend


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['email', 'profile_image', 'cover_image', 'is_staff', ]


@admin.register(Friend)
class FriendAdmin(admin.ModelAdmin):
    list_display = ['user_from', 'user_to', 'created', ]
