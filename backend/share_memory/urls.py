from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),
    path('api/post/', include('posts.urls')),
    path('api/user/', include('users.urls'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
