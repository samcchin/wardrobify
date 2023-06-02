from django.contrib import admin
from .models import Location, Bin

# Register your models here.
@admin.register(Bin)
class BinAdmin(admin.ModelAdmin):
    pass

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    pass
