from django.urls import path
from rest_framework.routers import SimpleRouter
from .views import CoachViewSet

router = SimpleRouter()
router.register('', CoachViewSet, basename='coaches')

urlpatterns = router.urls
