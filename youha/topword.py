import konlpy
import re
import pandas as pd
from konlpy.tag import Okt
from sqlalchemy import create_engine
import pymysql
import sqlalchemy as db

from .models import topWords

class keywords():
    def topwords_list(video_id):
        engine = create_engine("mysql+pymysql://admin:soobiz2020@soobiz-1.caac1nulptmh.ap-northeast-2.rds.amazonaws.com:3306/ict-master",encoding='utf-8-sig')
        conn = engine.connect()
        db=pymysql.connect(host="soobiz-1.caac1nulptmh.ap-northeast-2.rds.amazonaws.com",port=3306,user="admin",passwd="soobiz2020",db="ict-master",charset='utf8')
        db_name = str(video_id) + ".txt"
        query_result = pd.read_sql(db_name,conn)

        chat = query_result["chat"]
        okt = Okt()
        stopwords = ['진짜','어우', '방송', '네네', '그냥']

        word_dict={}
        for text in chat:
            noun = okt.nouns(text)
            for i in noun:
                if i in stopwords:
                    continue
                if len(i)<2:
                    continue
                if i in word_dict:
                    word_dict[i] += 1
                else: 
                    word_dict[i] = 1
        sorted_dict = sorted(word_dict.items(),
                            reverse=True,
                            key=lambda item:item[1])

        result = sorted_dict[:10]

        if(topWords.objects.filter(video=video_id).first() ==None):
            print("not saved")
            for i in range(0,9):
                topWords(topWordsID=str(video_id)+"_"+str(i+1), 
                         word=result[i][0], rank=str(i+1), count=result[i][1],
                         appearance_time1=0,
                         appearance_time2=0,
                         appearance_time3=0,
                         appearance_time4=0,
                         appearance_time5=0,
                         video_id=str(video_id)).save()