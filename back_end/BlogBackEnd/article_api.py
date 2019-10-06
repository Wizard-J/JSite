from django.http import HttpResponse
from django.forms.models import model_to_dict
from DbModel.models import Article, Tag

import json

# 导入日志
from BlogBackEnd.log_util import logInfo

# 获取文章列表，每一页固定获取10篇文章
def list_articles(request):
    logInfo(request)
    offset = int(request.GET["offset"])
    limit = int(request.GET['limit'])  # 获取第几页，返回第(pageNum-1)*10-pageNum*10篇文章
    result = []
    for article in Article.objects.order_by("-id")[offset:offset+limit]:
    # for article in Article.objects.order_by("-id"):
        item = model_to_dict(article)
        item["createdAt"] = article.createdAt.strftime("%Y-%m-%d %H:%M:%S")
        item["tags"] = model_to_dict(article.tags)
        result.append(item)
    return HttpResponse(json.dumps({"status": "OK", "result": result}))

# 新建文章
def new_article(request):
    logInfo(request)
    title = request.POST['title']  # 标题
    author = request.POST['author']  # 作者
    content = request.POST['content']  # 内容
    tagId = request.POST['tagId']  # 标签id
    createdBy = request.POST['author']  # 作者

    try:
        article = Article.objects.create(
            title=title, author=author, content=content, tags=Tag.objects.get(id=tagId), createdBy=createdBy)
        result = model_to_dict(article)
        result["tags"] = model_to_dict(article.tags)
        result["createdAt"] = article.createdAt.strftime("%Y-%m-%d %H:%M:%S")
        return HttpResponse(json.dumps({"status": "OK", "result": result}))
    except:
        return HttpResponse(json.dumps({"status": "ERROR", "message": "数据库错误或服务器异常"}))

