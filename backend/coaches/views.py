from rest_framework import generics
from .models import Coach
from .serializers import CoachSerializer


class CoachList(generics.ListCreateAPIView):
  queryset = Coach.objects.all()
  context_object_name = 'coach_list'
  serializer_class = CoachSerializer


class CoachDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Coach.objects.all()
  context_object_name = 'coach'
  serializer_class = CoachSerializer
