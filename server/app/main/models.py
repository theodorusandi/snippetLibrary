from django.db import models

class Snippet(models.Model):
  language = models.CharField(max_length=200)
  code = models.TextField()
  description = models.TextField()
  updated_at = models.DateTimeField(auto_now=True)
  created_at = models.DateTimeField(auto_now_add=True)