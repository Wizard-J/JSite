"""BlogBackEnd URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import user, article_api, tag_api, log_api

urlpatterns = [
    path('admin/', admin.site.urls),
    path('get/sign', user.get_sign),

    # 文章接口
    path("new/article", article_api.new_article), # 新建文章
    path("list/articles", article_api.list_articles), # 获取文章列表

    # 标签接口
    path("new/tag", tag_api.new_tag), # 新建标签
    path("list/tags", tag_api.list_tags), # 获取标签列表
    path("del/tag", tag_api.del_tag), # 删除标签

    # 日志接口
    path("list/log", log_api.list_log), # 获取日志列表
    path("get/logs", log_api.get_log), # 获取日志列表

]
