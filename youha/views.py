from django.shortcuts import render
from .twitchCrawling import parser
from datetime import datetime, timedelta
from rest_framework import viewsets, permissions, generics, serializers, status
from rest_framework.response import Response
from .models import *
from django.shortcuts import get_object_or_404
from .serializers import StreamerSerializer,downloadSerializer,OriginalVidSerializer,highlightVidSerializer, TwitchChapterSerializer,chatFlowSerializer,audioFlowSerializer,topWordsSerializer,sentimentSerializer,UserSerializer,CreateUserSerializer,LoginUserSerializer
from selenium.common.exceptions import NoSuchElementException
from knox.models import AuthToken
from django.contrib import auth
from rest_framework.views import APIView 
from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings
import os
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException,StaleElementReferenceException
from selenium.webdriver.chrome.options import Options
from .downloader import download
from .highlight import findhighlight
from .sentiment import sentiment_analysis
from .topword import keywords
import time

class chatFlowView(generics.ListAPIView):
    serializer_class = chatFlowSerializer

    queryset =chatFlow.objects.all()

    def get(self,request):
        queryset =self.get_queryset()
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(queryset,many=True)


        return Response(serializer.data)

class chatFlowDetailView(generics.ListAPIView):
    serializer_class = chatFlowSerializer

    def get_queryset(self):
        video_id=self.kwargs['pk']

        queryset =chatFlow.objects.all().filter(video=video_id).order_by('time')

        return queryset
    

class audioFlowDetailView(generics.ListAPIView):
    serializer_class = audioFlowSerializer

    def get_queryset(self):
        video_id=self.kwargs['pk']
        queryset =audioFlow.objects.all().filter(video=video_id)
        
        return queryset

class topWordsDetailView(generics.ListAPIView):
    serializer_class = topWordsSerializer

    def get_queryset(self):
        video_id=self.kwargs['pk']

        if(topWords.objects.all().filter(video=video_id).first() ==None):
            key = keywords.topwords_list(video_id)
            queryset =topWords.objects.all().filter(video=video_id).order_by('rank')
        else:
            queryset =topWords.objects.all().filter(video=video_id).order_by('rank')
        

        return queryset

class sentimentDetailView(generics.ListAPIView):
    serializer_class = sentimentSerializer

    def get_queryset(self):
        video_id=self.kwargs['pk']
        if(sentiment.objects.all().filter(video=video_id).first() ==None):
            print("########case1")
            sen = sentiment_analysis.extract(video_id,20)
            queryset =sentiment.objects.all().filter(video=video_id).order_by('time')
        else:
            print("########case2")
            queryset =sentiment.objects.all().filter(video=video_id).order_by('time')


        return queryset




class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class OriginalVidView(generics.ListAPIView):
    serializer_class = OriginalVidSerializer
    def get_queryset(self):
        video_id=self.kwargs['pk']
        
        if(originalVid.objects.all().filter(video_url=video_id).first() == None):
            crawling = parser.parse_twitch(video_id)
            queryset =originalVid.objects.all().filter(video_url=video_id)
        else:
            queryset =originalVid.objects.all().filter(video_url=video_id)
        return queryset


class OriginalVidAllView(generics.ListAPIView):
    serializer_class = OriginalVidSerializer
    def get_queryset(self):
        queryset =originalVid.objects.all()
        return queryset

class OriginalVidStreamerView(generics.ListAPIView):
    serializer_class = OriginalVidSerializer
    def get_queryset(self):
        streamer=self.kwargs['streamer']
        print(streamer)
        if(streamer=='all'):
            queryset =originalVid.objects.all()
        else:
            queryset =originalVid.objects.all().filter(name=streamer)
        return queryset

class StreamerView(generics.ListAPIView):
    serializer_class = StreamerSerializer
    def get_queryset(self):

        queryset =originalVid.objects.values('name').distinct()
        return queryset


class TwitchChapterView(generics.ListAPIView):
    serializer_class = TwitchChapterSerializer
    def get_queryset(self):
        video_id=self.kwargs['pk']

        try:
            state = originalVid.objects.get(video_url=video_id)
        except originalVid.DoesNotExist :
                time.sleep(20)
 
        queryset =TwitchChapter.objects.all().filter(video=video_id)

        return queryset



# def crawling(request, *args, **kwargs):
#     print(kwargs['pk'])
#     url = str(kwargs['pk'])
#     options = webdriver.ChromeOptions()
#     options.add_argument('headless')
#     options.add_argument('window-size=1920x1080')
#     options.add_argument("disable-gpu")
#     driver = webdriver.Chrome('chromedriver.exe', options=options)
#     driver.maximize_window()
#     driver.get('https://www.twitch.tv/videos/'+url)
#     driver.implicitly_wait(5)

#     crawling = parser.parse_twitch(url,driver)
#     state=True
#     return state
        
# class downloadView(generics.ListAPIView):
#     serializer_class=downloadSerializer
#     def get_queryset(self):
#         url = self.kwargs['pk']
#         # while(True):

#         queryset =originalVid.objects.get(video_url=url)
#         if(queryset.downloadState == 0):
#             downloading=download.downloader(url)

#         return queryset

def downloading(request, *args, **kwargs):
    print(kwargs['pk'])
    url = str(kwargs['pk'])
    while(True):
        try:
            queryset =originalVid.objects.get(video_url=url)
            if(queryset.downloadState == 0):
                downloading=download.downloader(url)
                return
            else:
                print("why?????")
                return

        except:
            continue
        else:
            return

    return 


class highlightVidView(generics.ListAPIView):
    serializer_class = highlightVidSerializer
    def get_queryset(self):
        video_id=self.kwargs['pk']

        chapter_name=self.kwargs['chapter']
        
        if(highlightVid.objects.all().filter(video=video_id,chapter=chapter_name).first() ==None):
            h=findhighlight.extract(video_id,chapter_name,20)
            queryset =highlightVid.objects.all().filter(video=video_id,chapter=chapter_name,isHighlight=True).order_by('start_time')
        else:
            queryset =highlightVid.objects.all().filter(video=video_id,chapter=chapter_name,isHighlight=True).order_by('start_time')

        return queryset
