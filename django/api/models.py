from django.db import models

def upload_path(instance, filname):
    return '/'.join(['covers', str(instance.title), filname])

class Book(models.Model):
    title = models.CharField(max_length=32, blank=False)
    selectedFile = models.FileField(blank=True, null=True, upload_to=upload_path)

    sFrequency = models.CharField(max_length=128, blank=False)
    soundType = models.CharField(max_length=128, blank=False)
    fileType = models.CharField(max_length=128, blank=False)
    cvtOperation = models.CharField(max_length=128, blank=False)
    startTime = models.CharField(max_length=128, blank=False)
    endTime = models.CharField(max_length=128, blank=False)

    in_bitRate = models.CharField(max_length=128, blank=False)
    in_sFrequency = models.CharField(max_length=128, blank=False)
    in_bitPerSample = models.CharField(max_length=128, blank=False)
    in_length = models.CharField(max_length=128, blank=False)
    in_cre = models.CharField(max_length=128, blank=False)
    in_soundType = models.CharField(max_length=128, blank=False)
