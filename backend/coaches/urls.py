from rest_framework.routers import DefaultRouter
from .views import CoachViewSet, MessageViewSet

router = DefaultRouter()
router.register('messages', MessageViewSet, basename='messages')
router.register('coaches', CoachViewSet, basename='coaches')

urlpatterns = router.urls
