from django.urls import path

from .views import api_list_hats, api_show_hat, api_list_locations

urlpatterns = [
    path("hats/", api_list_hats, name="api_create_hats"),
    path("hats/<int:pk>/", api_show_hat, name="api_show_hat"),
    path("locations/", api_list_locations, name="api_list_locations"),
    path("locations/<int:location_vo_id>/hats/", api_list_hats, name="api_list_hats")
]
