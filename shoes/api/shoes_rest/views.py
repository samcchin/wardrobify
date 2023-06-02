from django.shortcuts import render
from common.json import ModelEncoder
from .models import Shoe, BinVO
from django.views.decorators.http import require_http_methods
import json
from django.http import JsonResponse
# Create your views here.

class BinVODetailEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "closet_name",
        "bin_number",
        "bin_size",
        ]

class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "model_name",
        "manufacturer",
        ]

class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "manufacturer",
        "model_name",
        "color",
        "url",
        "bin",
    ]

    encoders = {
        "bin": BinVODetailEncoder(),
    }

@require_http_methods(["POST", "GET"])
def api_list_shoes(request, bin_vo_id=None):
    if request.method == "GET":
        shoes = Shoe.objects.filter(bin=bin_vo_id)
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeListEncoder,
        )

    else:
        content = json.loads(request.body)

        try:
            bin_href = f'/api/bins/{bin_vo_id}/'
            bin = BinVO.objects.get(import_href=bin_href)
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status=400,
                )
        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False
        )

@require_http_methods(["PUT", "GET", "DELETE"])
def api_show_shoe(request, pk):
    if request.method == "GET":
        shoe = Shoe.objects.get(id=pk)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )

    elif request.method == "DELETE":
        count, _ = Shoe.objects.filter(id=pk).delete()
        return JsonResponse({"delete": count > 0})

    else:
        content = json.loads(request.body)

        try:
            shoe = Shoe.objects.get(id=pk)
            content["shoe"] = shoe
        except Shoe.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status=400,
                )
        shoe = Shoe.objects.filter(id=pk).update(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )
