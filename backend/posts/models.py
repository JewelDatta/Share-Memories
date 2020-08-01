from django.db import models
import uuid
from django.contrib.auth import get_user_model


class Post(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    post_image = models.ImageField(
        null=True, blank=True, upload_to='images/%Y/%m/%d/')
    caption = models.TextField(max_length=255)
    creator = models.ForeignKey(
        get_user_model(), null=True, related_name='posts', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Like(models.Model):
    liked_by = models.ForeignKey(
        get_user_model(), null=True, on_delete=models.CASCADE)
    post = models.ForeignKey(
        Post, null=True, related_name='likes', on_delete=models.CASCADE)
