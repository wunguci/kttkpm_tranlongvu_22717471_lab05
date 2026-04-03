from django.urls import path
from .views import test_task   # import function

urlpatterns = [
    path('', test_task),
]