from rest_framework import serializers
from posts.models import Post


class PostSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='creator.username', read_only=True)
    class Meta:
        model = Post
        fields = ['id', 'caption', 'post_image','created_at', 'author']

    
    # def to_representation(self, instance):
    #     response = super().to_representation(instance)
    #     response['author'] = instance.creator.username
    #     return response

        
