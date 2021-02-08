from django.db import models
from django.urls import reverse


class Coach(models.Model):
  firstName = models.CharField(max_length=50)
  lastName = models.CharField(max_length=50)
  description = models.CharField(max_length=200)
  hourlyRate = models.PositiveIntegerField()
  areas = models.CharField(max_length=200)
  email = models.EmailField(max_length=254, default="test@email.com")

  def __str__(self):
    return f"{self.firstName} {self.lastName}"

  def get_absolute_url(self):
    return reverse('coach_detail', args=[str(self.id)])

  class Meta:
    verbose_name_plural = "Coaches"


class Message(models.Model):
  coach = models.ForeignKey(Coach, related_name='messages', on_delete=models.CASCADE)
  userEmail = models.EmailField(max_length=254)
  message = models.TextField()

  def __str__(self):
    return f"Created by {self.userEmail}"

  def get_absolute_url(self):
    return reverse('message_detail', args=[str(self.id)])

  class Meta:
    verbose_name_plural = "Messages"
