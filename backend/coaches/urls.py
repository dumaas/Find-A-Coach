from django.urls import path
from .views import CoachList, CoachDetail

urlpatterns = [
    path('<uuid:pk>/', CoachDetail.as_view()),
    path('', CoachList.as_view()),
]
