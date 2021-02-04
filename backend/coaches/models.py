import uuid
from django.db import models
from django.urls import reverse


class Coach(models.Model):
  id = models.UUIDField(
      primary_key=True,
      default=uuid.uuid4,
      editable=False)
  firstName = models.CharField(max_length=50)
  lastName = models.CharField(max_length=50)
  description = models.CharField(max_length=200)
  hourlyRate = models.PositiveIntegerField()
  areas = models.CharField(max_length=200)

  def __str__(self):
    return f"{self.firstName} {self.lastName}"

  def get_absolute_url(self):
    return reverse('coach_detail', args=[str(self.id)])

  class Meta:
    verbose_name_plural = "Coaches"
