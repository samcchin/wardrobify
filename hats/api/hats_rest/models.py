from django.db import models
from django.urls import reverse


class LocationVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    closet_name = models.CharField(max_length=100)
    section_number = models.PositiveSmallIntegerField()
    shelf_number = models.PositiveSmallIntegerField()

    def get_api_url(self):
        return reverse("api_location", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.closet_name} - {self.section_number}/{self.shelf_number}"

    class Meta:
        ordering = ("closet_name", "section_number", "shelf_number")


"""
The Hat model represents a hat in the wardrobe, and tracks the fabric,
style name, its color, a URL for a picture, and the location
in the wardrobe where it exists.
"""


class Hat(models.Model):
    style_name = models.CharField(max_length=200)
    fabric = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.URLField(null=True)
    location = models.ForeignKey(
        LocationVO,
        related_name="hats",
        on_delete=models.CASCADE,)

    def __str__(self):
        return self.style_name

    def get_api_url(self):
        return reverse("api_show_hat", kwargs={"pk": self.pk})
