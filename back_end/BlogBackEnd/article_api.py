from django.http import HttpResponse
from django.forms.models import model_to_dict
from DbModel.models import Article,Tag

import json

# 获取文章列表，每一页固定获取10篇文章
def list_articles(request):
    pageNum = int(request.GET['page']) # 获取第几页，返回第(pageNum-1)*10-pageNum*10篇文章
    result = []
    for article in Article.objects.order_by("-id")[(pageNum-1)*10:10]:
        item = model_to_dict(article)
        item["createdAt"] = article.createdAt.strftime("%Y-%m-%d %H:%M:%S")
        result.append(item)

    return HttpResponse(json.dumps({"status":"OK","result":result}))
    
# 新建文章
def new_article(request):
    title = request.POST['title'] # 标题
    author = request.POST['author'] # 作者
    content = request.POST['content'] # 内容
    tagId = request.POST['tags'] # 标签id
    createdBy = request.POST['createdBy'] # 作者

    article = Article.objects.create(title=title,author=author,content=content,tags=Tag.objects.get(id=tagId),createdBy=createdBy)
    
    result = {}
    for filed in article:
        result[filed] = article[filed]
    result["createdAt"] = article.createdAt.strftime("%Y-%m-%d %H:%M:%S")

    return HttpResponse(json.dumps({"status":"OK","result":result}))