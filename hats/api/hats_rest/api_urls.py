from django.urls import path

from .views import api_list_hats, api_hat_details, api_list_locations, api_location_details

urlpatterns = [
    path("hats/", api_list_hats, name="api_create_hats"),
    path("hats/<int:hats_id>/", api_hat_details, name="api_hat_details"),
    path("locations/", api_list_locations, name="api_list_locations"),
    path("locations/<int:location_id>/", api_location_details, name="api_location_details"),
    path("locations/<int:location_id>/hats/", api_list_hats, name="api_list_hats"),
]
