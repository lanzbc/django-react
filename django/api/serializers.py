from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Book
        fields = [
            'title', 'selectedFile',
            'sFrequency', 'soundType', 'fileType', 'cvtOperation', 'startTime', 'endTime',
            'in_bitRate', 'in_sFrequency', 'in_bitPerSample', 'in_length', 'in_cre', 'in_soundType'
         
          ]
