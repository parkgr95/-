from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
#router.register(r'TwitchData', views.TwitchDataViewSet)
#router.register(r'TwitchChapter', views.TwitchChapterViewSet)

urlpatterns=[
    path('',views.index),
    path('search',views.index),
    path('login',views.index),
    path('signup',views.index),
    path('selectchapter',views.index),
    path('mypage',views.index),
    path('highlightresult',views.index),
    path('statistics',views.index),
    path('analysis',views.index),

    path('', include(router.urls)),

]