from django.shortcuts import render
from django.http import JsonResponse
from .models import Hats
# Create your views here.

"""
Lists the hats
"""
def api_list_hats(request):
    if request.method == "GET":
        if
