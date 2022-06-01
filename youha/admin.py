from django.contrib import admin
from .models import *


class UserAdmin(admin.ModelAdmin):  # add this
  list_display = ('name', 'email', 'password') # add this
  

admin.site.register(User,UserAdmin)
admin.site.register(originalVid)
admin.site.register(record)
admin.site.register(chapter)
admin.site.register(highlightVid)
admin.site.register(chatFlow)
admin.site.register(audioFlow)
admin.site.register(topWords)
admin.site.register(sentiment)
admin.site.register(TwitchData)
admin.site.register(TwitchChapter)
