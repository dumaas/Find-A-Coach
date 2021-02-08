from rest_framework import serializers
from .models import Coach, Message


class MessageSerializer(serializers.HyperlinkedModelSerializer):
  url = serializers.HyperlinkedIdentityField(
      view_name='messages-detail',
  )

  class Meta:
    model = Message
    fields = (
        'url',
        'id',
        'coach',
        'userEmail',
        'message',)
    extra_kwargs = {
        'coach': {'view_name': 'coaches-detail'},
    }


class CoachSerializer(serializers.HyperlinkedModelSerializer):
  url = serializers.HyperlinkedIdentityField(
      view_name='coaches-detail',
  )
  messages = serializers.PrimaryKeyRelatedField(
      many=True,
      read_only=True,
  )

  class Meta:
    model = Coach
    fields = (
        'url',
        'id',
        'email',
        'firstName',
        'lastName',
        'description',
        'hourlyRate',
        'areas',
        'messages')
