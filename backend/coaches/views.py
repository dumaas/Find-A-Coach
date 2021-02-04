from rest_framework import viewsets
from .models import Coach
from .serializers import CoachSerializer


class CoachViewSet(viewsets.ModelViewSet):
  queryset = Coach.objects.all()
  serializer_class = CoachSerializer
