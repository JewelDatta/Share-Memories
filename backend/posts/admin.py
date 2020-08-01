from django.contrib import admin
from .models import Post, Like


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['caption', 'creator']


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ['liked_by', 'post']
