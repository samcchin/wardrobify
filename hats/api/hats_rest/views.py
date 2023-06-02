from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import Hat, LocationVO


class LocationVOEncoder(ModelEncoder):
    model = LocationVO
    properties = [
        "import_href",
        "closet_name"
    ]


class HatListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "id",
        "style_name",
        "fabric",
        "color",
        "picture_url",
        "location",
    ]
    encoders = {
        "location": LocationVOEncoder(),
    }


class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "style_name",
        "fabric",
        "color",
        "picture_url",
        "location",
    ]
    encoders = {
        "location": LocationVOEncoder(),
    }

    def get_extra_data(self, o):
        return {"location": o.location.closet_name}


@require_http_methods(["GET", "POST"])
def api_list_locations(request):
    if request.method == "GET":
        locations = LocationVO.objects.all()
        return JsonResponse(
            {'locations': locations},
            encoder=LocationVOEncoder,
        )
    else:
        content = json.loads(request.body)
        location = LocationVO.objects.create(**content)
        return JsonResponse(
            location,
            encoder=LocationVOEncoder,
            safe=False,
        )


# @require_http_methods(["DELETE", "GET", "PUT"])
# def api_location_details(request, location_id):
#     if request.method == "GET":
#         try:
#             location=LocationVO.objects.get(id=location_id)
#             return JsonResponse(
#                 location,
#                 encoder=LocationVOEncoder,
#                 safe=False
#             )
#         except LocationVO.DoesNotExist:
#             response = JsonResponse({"message":"Does not exist"})
#             response.status_code = 404
#             return response
#     elif request.method =="DELETE":
#         try:
#             location = LocationVO.objects.get(id=location_id)
#             location.delete()
#             return JsonResponse(
#                 location,
#                 encoder=LocationVOEncoder,
#                 safe=False
#             )
#         except LocationVO.DoesNotExist:
#             return JsonResponse({"message":"Does"})
def api_location_details(request, location_id):
    if request.method == "DELETE":
        count, _ = LocationVO.objects.filter(id=location_id).delete()
        return JsonResponse(
            {"deleted": count > 0}
        )
    else:
        try:
            location = LocationVO.objects.get(id=location_id)
            return JsonResponse(
                location,
                encoder=LocationVOEncoder,
                safe=False
            )
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid id"},
                status=400
            )


# Lists the hat names and the link to the hat location
# for the specified location id.
@require_http_methods(["GET", "POST"])
def api_list_hats(request, location_id=None):
    if request.method == "GET":
        if location_id is not None:
            hats = Hat.objects.filter(location=location_id)
        else:
            hats = Hat.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatListEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        try:
            location_href = content["location"]
            location = LocationVO.objects.get(import_href=location_href)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )

        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "PUT", "GET"])
def api_hat_details(request, hats_id):
    if request.method == "DELETE":
        count, _ = Hat.objects.filter(id=hats_id).delete()
        return JsonResponse(
            {"deleted": count > 0}
        )
    elif request.method == "PUT":
        try:
            body = json.loads(request.body)
            Hat.objects.filter(id=hats_id).update(**body)
            hat = Hat.objects.get(id=hats_id)
            return JsonResponse(
                hat,
                encoder=HatDetailEncoder,
                safe=False
            )
        except Hat.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid hat id"},
                status=400
            )
    else:  # "GET"
        try:
            hat = Hat.objects.get(id=hats_id)
            return JsonResponse(
                hat,
                encoder=HatDetailEncoder,
                safe=False
            )
        except Hat.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid hat id"},
                status=400
            )
