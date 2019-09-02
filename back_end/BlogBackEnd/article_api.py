from django.http import HttpResponse
from django.forms.models import model_to_dict
from DbModel.models import Article

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
    