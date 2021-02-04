from django.test import TestCase
from .models import Coach


class CoachTests(TestCase):

  @classmethod
  def setUp(self):
    # Create coach
    self.coach = Coach.objects.create(
        firstName='testFirstName',
        lastName='testLastName',
        description='test description',
        hourlyRate='69',
        areas='frontend,backend')
    self.coach.save()

  def test_coach_content(self):
    self.assertEqual(f'{self.coach.firstName}', 'testFirstName')
    self.assertEqual(f'{self.coach.lastName}', 'testLastName')
    self.assertEqual(f'{self.coach.description}', 'test description')
    self.assertEqual(f'{self.coach.hourlyRate}', '69')
    self.assertEqual(f'{self.coach.areas}', 'frontend,backend')
