from rest_framework import serializers
from .models import Coach


class CoachSerializer(serializers.ModelSerializer):
  class Meta:
    fields = (
        'id',
        'firstName',
        'lastName',
        'description',
        'hourlyRate',
        'areas')
    model = Coach
