from django.db import models

"""
The Hat resource should track its fabric, its style name, its color,
 a URL for a picture, and the location in the wardrobe where it exists.
"""

class LocationVO(models.Model):
    closet_name = models.CharField(max_length=200)
    import_href = models.CharField(max_length=200, unique=True)


class Hats(models.Model):
    fabric = models.CharField(max_length=200)
    style_name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.URLField(null=True)
    location = models.CharField(max_length=200)
