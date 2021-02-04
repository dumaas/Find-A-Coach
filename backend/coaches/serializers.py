from rest_framework import serializers
from .models import Coach


class CoachSerializer(serializers.ModelSerializer):
  coach_url = serializers.SerializerMethodField()

  class Meta:
    fields = (
        'id',
        'firstName',
        'lastName',
        'description',
        'hourlyRate',
        'areas',
        'coach_url')
    model = Coach

  def get_coach_url(self, coach):
    return f"http://localhost:8000/{coach.id}/"
