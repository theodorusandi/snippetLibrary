from django.urls import path
from . import views

urlpatterns = [
  path("csrf/get", views.get_csrf, name="get_csrf"),
  path("snippets/<str:language>/get", views.get, name="get"),
  path("snippets/add", views.add, name="add"),
  path("snippets/delete", views.delete, name="delete"),
  path("languages/get", views.get_languages, name="get_languages")
]