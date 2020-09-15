from rest_framework import viewsets
from django.http import HttpResponse
from .serializers import BookSerializer
from .models import Book

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def post(self, request, *args, **kwargs):
        selectedFile = request.data['selectedFile']
        title = request.data['title']

        sFrequency = request.data['sFrequency']
        soundType = request.data['soundType']
        fileType = request.data['fileType']
        cvtOperation = request.data['cvtOperation']
        startTime = request.data['startTime']
        endTime = request.data['endTime']



        Book.objects.create(title=title, selectedFile=selectedFile, sFrequency= sFrequency, soundType= soundType, fileType= fileType, cvtOperation=cvtOperation, startTime= startTime, endTime= endTime )
        return HttpResponse({'message': 'Audio created'}, status=200)


    def get(self, request, format=None):
        return Response({
            'in_bitRate': 0 ,
            'in_sFrequency': 0, 
            'in_bitPerSample': 0 ,
            'in_length': 0, 
            'in_cre': 0 ,
            'in_soundType': 0, 
            })
