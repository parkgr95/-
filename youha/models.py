from django.conf import settings
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.


class User(models.Model):
    email = models.CharField(max_length=20)
    name = models.CharField(max_length=20)
    password = models.CharField(max_length=20)

    def __str__(self):
        return [self.email,self.name, self.password]


class originalVid(models.Model):
    video_url=models.IntegerField(unique=True,primary_key=True)
    title=models.CharField(max_length=200)
    name=models.CharField(max_length=50)
    date=models.CharField(max_length=20)
    downloadState = models.BooleanField(default=False)
    crawlingState = models.BooleanField(default=False)
    

class record(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video=models.ForeignKey(originalVid,to_field="video_url", on_delete=models.CASCADE)
    create_date=models.CharField(max_length=20)

class chapter(models.Model):
    video=models.ForeignKey(originalVid,to_field="video_url", on_delete=models.CASCADE)
 
    chapter_name=models.CharField(max_length=30)
    start_time=models.IntegerField()
    end_time=models.IntegerField()

class highlightVid(models.Model):

    start_time=models.IntegerField()
    end_time=models.IntegerField()
    video=models.ForeignKey(originalVid,to_field="video_url", on_delete=models.CASCADE)
    highlightID = models.CharField(max_length=200,unique=True,primary_key=True)
    chapter=models.CharField(max_length=50, default="demo")
    isHighlight=models.BooleanField(default=False)

class chatFlow(models.Model):
    chatFlowID = models.CharField(max_length=200,unique=True,primary_key=True)
    video=models.ForeignKey(originalVid,to_field="video_url", on_delete=models.CASCADE)
 
    time=models.IntegerField()
    num_of_chat=models.IntegerField()


class audioFlow(models.Model):
    audioFlowID = models.CharField(max_length=200,unique=True,primary_key=True)
    video=models.ForeignKey(originalVid,to_field="video_url", on_delete=models.CASCADE)
   
    time=models.IntegerField()
    decibel=models.IntegerField()
  
class topWords(models.Model):
    topWordsID =models.CharField(max_length=200,unique=True,primary_key=True)
    video=models.ForeignKey(originalVid,to_field="video_url", on_delete=models.CASCADE)
    
    word=models.CharField(max_length=20)
    rank=models.IntegerField()
    count=models.IntegerField()
    appearance_time1=models.IntegerField(default =0)
    appearance_time2=models.IntegerField(default =0)
    appearance_time3=models.IntegerField(default =0)
    appearance_time4=models.IntegerField(default =0)
    appearance_time5=models.IntegerField(default =0)


class sentiment(models.Model):
    sentimentID = models.CharField(max_length=200,unique=True,primary_key=True)
    video=models.ForeignKey(originalVid,to_field="video_url", on_delete=models.CASCADE)
    
    time=models.IntegerField()
    joy=models.IntegerField(default =0)
    sad=models.IntegerField(default =0)
    disappoint=models.IntegerField(default =0)
    surprise=models.IntegerField(default =0)
    teasing=models.IntegerField(default =0)
    neutral=models.IntegerField(default =0)
    questionmark=models.IntegerField(default =0)


class TwitchData(models.Model):
    title = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    video=models.ForeignKey(originalVid,to_field="video_url", on_delete=models.CASCADE)
    
    

class TwitchChapter(models.Model):
    chaptername = models.CharField(max_length=200)
    startTime = models.IntegerField(default =0)
    endTime = models.IntegerField(default =0)
    video=models.ForeignKey(originalVid,to_field="video_url", on_delete=models.CASCADE)
    chapterID = models.CharField(max_length=200)