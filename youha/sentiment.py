#pip install scikit-learn
#pip install konlpy
import csv
from konlpy.tag import Okt 
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import pickle
import joblib
from sqlalchemy import create_engine
import pymysql
import os
import pandas as pd
import numpy as np
from .models import sentiment

class sentiment_analysis():
    

    def extract(video_id,n):

        engine = create_engine("mysql+pymysql://admin:soobiz2020@soobiz-1.caac1nulptmh.ap-northeast-2.rds.amazonaws.com:3306/ict-master",encoding='utf-8-sig')
        conn = engine.connect()
        db=pymysql.connect(host="soobiz-1.caac1nulptmh.ap-northeast-2.rds.amazonaws.com",port=3306,user="admin",passwd="soobiz2020",db="ict-master",charset='utf8')
        db_name = str(video_id) + ".txt"
        query_result = pd.read_sql(db_name,conn)

        db_list=[]
        for index, row in query_result.iterrows():
            try:
                db_list.append([int(float(row.timeline)),str(row.chat)])
            except ValueError:
                continue

        chat_list=[]
        for i in range(len(db_list)):
            chat_list.append(db_list[i][1])
        
        text = []
        y = []
        twitter_tag = Okt()

        
        with open('youha/sentiment_models/chat_746785184_labeling.csv', encoding='utf-8') as csvfile:
            csvreader = csv.reader(csvfile)
            for row in csvreader: 
                if row: 
                    text.append(row[0]) 
                    y.append(row[1]) 

        X_train, X_test, y_train, y_test = train_test_split(text, y,test_size=0.01,random_state=0)
        tfidf = TfidfVectorizer(tokenizer=twitter_tag.morphs, min_df=2)
        X_train_tfidf = tfidf.fit_transform(X_train)
        X_test_tfidf = tfidf.transform(chat_list)
        clf = LogisticRegression()
        clf.fit(X_train_tfidf, y_train)

        clf_result = clf.predict(X_test_tfidf)

        #j,sa,d,su,t,n,q

        result=[]
        for i in range(len(db_list)):
            result.append([db_list[i][0],clf_result[i]])

    
        senti=[]
        indexing=[]
        for i in range(len(result)):
            indexing.append(result[i][0])
            senti.append([0,0,0,0,0,0,0,0])
            senti[i][0]=result[i][0]
            if(result[i][1]=='j'):
                senti[i][1] +=1
            elif(result[i][1]=='sa'):
                senti[i][2] +=1
            elif(result[i][1]=='d'):
                senti[i][3] +=1
            elif(result[i][1]=='su'):
                senti[i][4] +=1
            elif(result[i][1]=='t'):
                senti[i][5] +=1
            elif(result[i][1]=='n'):
                senti[i][6] +=1
            else:
                senti[i][7] +=1
            
        set_index=set(indexing)
        indexing= list(set_index)
        indexing.sort()

     
        toDB=[]
        for i in range(len(indexing)):
            toDB.append([indexing[i],0,0,0,0,0,0,0])
            

        for i in range(len(senti)):
            idx = indexing.index(senti[i][0])
            for j in range(7):
                toDB[idx][j+1] += senti[i][j+1]

        # n 초당..... 하....
        # toDB_nsec=[]
        # for i in range(int(len(toDB)/n)):
        #     tmp=[toDB[i*n][0],0,0,0,0,0,0,0]
        #     for j in range(n):
        #         for k in range(7):
        #             tmp[k+1] += toDB[i*n+j][k+1]
        #     toDB_nsec.append(tmp)

        # toDB_nsec=[]
        # index_list=[]
        # for i in range(int(len(toDB)/n)):
        #     toDB_nsec.append([toDB[i*n][0],0,0,0,0,0,0,0])
        #     index_list.append(0)

        new_list=[]
        for i in range(int(toDB[-1][0]/n)+1):
            new_list.append([i*n,0,0,0,0,0,0,0])
            

        
        for i in range(len(toDB)):
            idx=int(toDB[i][0]//n)
            for j in range(7):
                new_list[idx][j+1] += toDB[i][j+1]


        # for i in range(len(toDB)):
        #     print(toDB[i][0])

        #     idx=int(toDB[i][0]/n)
        #     index_list[idx] +=1
        # print(index_list)

            
            #     for k in range(7):
            #         tmp[k+1] += toDB[i*n+j][k+1]
            # toDB_nsec.append(tmp)


        for i in range(len(new_list)):
            sentiment(sentimentID=str(video_id)+"_"+str(i),time=new_list[i][0],joy=new_list[i][1],sad=new_list[i][2],disappoint=new_list[i][3],surprise=new_list[i][4],teasing=new_list[i][5],neutral=new_list[i][6],questionmark=new_list[i][7],video_id=video_id).save()