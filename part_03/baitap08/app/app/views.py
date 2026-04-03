from django.http import JsonResponse
from .tasks import add

def test_task(request):
    result = add.delay(1, 2)
    return JsonResponse({"task_id": result.id})