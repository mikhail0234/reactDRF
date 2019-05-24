from rest_framework import routers
from .api import ProfileViewSet



router = routers.DefaultRouter()
router.register('api/profiles', ProfileViewSet, 'profiles')


urlpatterns = router.urls