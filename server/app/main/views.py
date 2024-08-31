import json

from django.http import JsonResponse, HttpResponse
from django.middleware.csrf import get_token

from main.models import Snippet

def get_csrf(request):
  return JsonResponse({'token': get_token(request)})

def get(request, language):
  query = request.GET.get('query', '')
  snippets = Snippet.objects.filter(language=language)
  if query:
    snippets = snippets.filter(description__contains=query)
  snippets = list(snippets.values().order_by('-updated_at'))
  return JsonResponse(snippets, safe=False)

def add(request):
  if request.method == 'POST':
    data = json.loads(request.body)
    new_snippet = Snippet(language=data['language'], code=data['code'], description=data['description'])
    new_snippet.save()
    return HttpResponse(status=200)

def delete(request):
  if request.method == 'POST':
    data = json.loads(request.body)
    Snippet.objects.filter(id=data['id']).delete()
    return HttpResponse(status=200)
  
def get_languages(request):
  languages = list(Snippet.objects.values_list('language', flat=True).distinct().order_by('language'))
  return JsonResponse({'languages': languages})