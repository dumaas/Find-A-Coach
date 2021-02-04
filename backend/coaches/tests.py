from django.test import TestCase
from .models import Coach, Message


class CoachTests(TestCase):

  @classmethod
  def setUp(self):
    # Create coach
    self.coach = Coach.objects.create(
        id='1',
        firstName='testFirstName',
        lastName='testLastName',
        description='test description',
        hourlyRate='69',
        areas='frontend,backend')
    self.coach.save()
    # Create message
    self.message = Message.objects.create(
        id='2',
        coachId=self.coach.id,
        userEmail='test@email.com',
        message='test message')
    self.message.save()

  def test_coach_content(self):
    self.assertEqual(f'{self.coach.id}', '1')
    self.assertEqual(f'{self.coach.firstName}', 'testFirstName')
    self.assertEqual(f'{self.coach.lastName}', 'testLastName')
    self.assertEqual(f'{self.coach.description}', 'test description')
    self.assertEqual(f'{self.coach.hourlyRate}', '69')
    self.assertEqual(f'{self.coach.areas}', 'frontend,backend')

  def test_message_content(self):
    self.assertEqual(f'{self.message.id}', '2')
    self.assertEqual(f'{self.message.coachId}', '1')
    self.assertEqual(f'{self.message.userEmail}', 'test@email.com')
    self.assertEqual(f'{self.message.message}', 'test message')
