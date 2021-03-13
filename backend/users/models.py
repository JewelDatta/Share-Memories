from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.conf import settings
from django.urls import reverse

UserModel = settings.AUTH_USER_MODEL


class Friend(models.Model):
    user_from = models.ForeignKey(UserModel,
                                  related_name='friend_from',
                                  on_delete=models.CASCADE)
    user_to = models.ForeignKey(UserModel,
                                related_name='friend_to',
                                on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ('-created', )

    def __str__(self):
        return f'{self.user_from} follows {self.user_to}'


class User(AbstractUser):
    GENDER_CHOICES = (('male', 'Male'), ('female', 'Female'),
                      ('not-specified', 'Not specified'))
    profile_image = models.ImageField(null=True,
                                      blank=True,
                                      upload_to='images/%Y/%m/%d/')
    cover_image = models.ImageField(null=True,
                                    blank=True,
                                    upload_to='images/%Y/%m/%d/')
    gender = models.CharField(choices=GENDER_CHOICES,
                              max_length=50,
                              null=True,
                              blank=True)
    bio = models.TextField(blank=True, max_length=255)
    following = models.ManyToManyField('self',
                                       through=Friend,
                                       related_name='followers',
                                       symmetrical=False)

    def get_profile_image(self):
        if self.profile_image:
            return settings.APP_HOST + self.profile_image.url

        return self.profile_image