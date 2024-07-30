from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Gallery
from django.conf import settings

class GalleryListSerializer(ModelSerializer):
    background_image = SerializerMethodField()
    image = SerializerMethodField()
    profile_image = SerializerMethodField()

    class Meta:
        model = Gallery
        fields = ("image", "background_image","title", "upload_date", "profile_image")


    def get_image(self, gallery):
        return settings.BASE_URL + settings.MEDIA_URL + str(gallery.image)

    def get_background_image(self, gallery):
        if gallery.is_personal_background:
            image_url = str(gallery.personal_background)
        else:
            image_url = str(gallery.common_background.image)
        return settings.BASE_URL + settings.MEDIA_URL + image_url
    
    def get_profile_image(self, gallery):
        if gallery.user.profile_image:
            return settings.BASE_URL + settings.MEDIA_URL + str(gallery.user.profile_image)
        else:
            return None
        
class GallerySerializer(ModelSerializer):
    
    class Meta:
        model = Gallery
        fields = ("image", "title", "personal_background", "private")

class GalleryPutSerializer(ModelSerializer):

    class Meta:
        model = Gallery
        fields = ("title", "personal_background", "private")

class GalleryRankingSerializer(ModelSerializer):

    class Meta:
        model = Gallery
        fields = ("image", "title", "profile_image")