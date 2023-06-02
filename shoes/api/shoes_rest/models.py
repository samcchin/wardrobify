from django.db import models

# Create your models here.
class BinVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    closet_name = models.CharField(max_length=100)
    bin_number = models.PositiveSmallIntegerField()
    bin_size = models.PositiveSmallIntegerField()

class Shoe(models.Model):
    manufacturer = models.CharField(max_length=200)
    model_name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    url = models.CharField(max_length=600)
    bin = models.ForeignKey(
        BinVO,
        related_name="shoes",
        on_delete=models.PROTECT,
    )

    def __str__(self):
        return self.name
