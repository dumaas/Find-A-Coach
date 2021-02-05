from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from .models import Coach, Message
from .serializers import CoachSerializer, MessageSerializer


class CoachViewSet(viewsets.ModelViewSet):
  queryset = Coach.objects.all()
  serializer_class = CoachSerializer

  def get_permissions(self):
    if self.request.method == 'GET':
      self.permission_classes = [AllowAny, ]
    elif self.request.method == 'POST':
      self.permission_classes = [IsAuthenticated, ]
    else:
      self.permission_classes = [IsAdminUser, ]
    return super(self.__class__, self).get_permissions()


class MessageViewSet(viewsets.ModelViewSet):
  queryset = Message.objects.all()
  serializer_class = MessageSerializer
  permission_classes = (AllowAny,)

  def get_permissions(self):
    if self.request.method == 'POST':
      self.permission_classes = [AllowAny, ]
    elif self.request.method == 'GET':
      self.permission_classes = [IsAuthenticated, ]
    else:
      self.permission_classes = [IsAdminUser, ]
    return super(self.__class__, self).get_permissions()
