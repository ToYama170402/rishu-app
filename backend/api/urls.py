from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("registration-term", views.registration_term, name="registration_term"),
    path("adjustment-term", views.adjustment_term, name="adjustment_term"),
]
