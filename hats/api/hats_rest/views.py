from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import Hat, LocationVO


class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = [
        "import_href",
        "closet_name",
        "section_number",
        "shelf_nmber",
        "id",
    ]


class HatListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "style_name",
        "id",
    ]

    def get_extra_data(self, o):
        return {"style_name": o.hat.style_name}


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
        "location": LocationVODetailEncoder(),
    }


# Lists the locations
@require_http_methods(["GET"])
def api_list_locations(request):
    locations = LocationVO.objects.all()
    return JsonResponse(
        {'locations': locations},
        encoder=LocationVODetailEncoder,
    )


# Lists the hat names and the link to the hat location
# for the specified location id.
@require_http_methods(["GET", "POST"])
def api_list_hats(request, location_vo_id=None):
    if request.method == "GET":
        if location_vo_id is not None:
            hats = Hat.objects.filter(location=location_vo_id)
        else:
            hats = Hat.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatListEncoder,
        )
    else:
        content = json.loads(request.body)

        # Get the Location object and put it in the content dict
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


# Returns the details for the Hat model specified
# by the pk parameter.
@require_http_methods(["DELETE", "GET"])
def api_show_hat(request, pk):
    if request.method == "GET":
        hat = Hat.objects.get(id=pk)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )
    else:
        request.method == "DELETE"
        count, _ = Hat.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
