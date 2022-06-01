import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "soobiz.settings")
import django
django.setup()
import os
import youtube_dl
import ffmpeg
import requests
from .models import originalVid
from sqlalchemy import create_engine
import pandas as pd
import pymysql

class download():


    def downloader(video_id):
        # #audio 다운로드 부분
        # print("@")
        video_id=str(video_id)
        # youtube_video_list=[]
        # youtube_video_list.append('https://www.twitch.tv/videos/'+video_id)
        
        # #download_path = os.path.join('.\youha\output', video_id+'.%(ext)s')
        # print("시작")
        # for video_url in youtube_video_list:

        #     # youtube_dl options
        #     ydl_opts = {
                
        #       #'format': 'bestaudio/worst',  # 가장 좋은 화질로 선택(화질을 선택하여 다운로드 가능)
        #         'format': 'worstvideo/worst',  # 가장 좋은 화질로 선택(화질을 선택하여 다운로드 가능)
        #         #'outtmpl': download_path, # 다운로드 경로 설정
        #         #'outtmpl': '.\output',
        #         'outtmpl': '.\youha\output\.'+video_id+'.%(ext)s',

        #     }

        #     try:
        #         with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        #             ydl.download([video_url])
                
        #     except Exception as e:
        #         print('error', e)  
        # print("?")
        #chat 다운로드 부분
        initial_offset=0
        filename=video_id+".txt"
        filepath = os.path.join('.\youha\output', filename)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            request_headers = {'Accept': 'application/vnd.twitchtv.v5+json', 'Client-ID': 'qs5msq3whryszinfw7pt110aep84wr'}
            request_url = f'https://api.twitch.tv/v5/videos/{video_id}/comments?content_offset_seconds={initial_offset}'

            while True :
                #print('request ' + request_url)
                response = requests.get(request_url, headers=request_headers).json()
                received_count = 0
            
            
                for comment in response['comments']:
                    if comment['source'] == 'chat':
                        offset = comment['content_offset_seconds']
                    
                        rem, secs = divmod(offset, 60)
                        hours, mins = divmod(rem, 60)
                        time = f'{int(hours):d}:{int(mins):02d}:{secs:06.3f}'

                        user = comment['commenter']['display_name']
                        message = comment['message']['body']

                        output = f'{offset:.3f} {time} [{user}] {message}'
                        # print(output)
                        f.write(output + '\n')

                        received_count += 1

                #print(f'{received_count} comments received')
                if received_count > 0:
                    print(output)
                print()

                if '_next' not in response:
                    break

                next_cursor = response['_next']
                request_url = f'https://api.twitch.tv/v5/videos/{video_id}/comments?cursor={next_cursor}'

        filename=video_id+".txt"
        filepath = os.path.join('.\youha\output', filename)
        chatfile = open(filepath, mode='rt', encoding='utf-8')
        list_dict=[] 
 
        for row in chatfile:
            tmp_list= []
            for i in range(3):
                idx= row.index(" ")
                tmp_list.append(row[:idx])
                row=row.replace(tmp_list[i]+" ","",1)
                i+=1
            
            tmp_dict={"timeline":tmp_list[0],"chat":row.replace("\n","")}
            list_dict.append(tmp_dict)

        df = pd.DataFrame(list_dict)
        df = df.convert_dtypes()

        engine = create_engine("mysql+pymysql://admin:soobiz2020@soobiz-1.caac1nulptmh.ap-northeast-2.rds.amazonaws.com:3306/ict-master",encoding='utf-8-sig')
        conn = engine.connect()
        df.to_sql(name=filename, con=engine, if_exists='append') #if_exists='replace'

        print("#####################ddd#################")
        queryset =originalVid.objects.get(video_url=video_id)
        queryset.downloadState= True
        queryset.save()

        print("#####################done#################")

   