from rest_framework import viewsets
from .models import Coach, Message
from .serializers import CoachSerializer, MessageSerializer


class CoachViewSet(viewsets.ModelViewSet):
  queryset = Coach.objects.all()
  serializer_class = CoachSerializer


class MessageViewSet(viewsets.ModelViewSet):
  queryset = Message.objects.all()
  serializer_class = MessageSerializer
