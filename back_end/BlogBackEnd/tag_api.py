from django.http import HttpResponse
from DbModel.models import Tag
from django.forms.models import model_to_dict

import json


# 获取标签列表
def list_tags(request):
    tags = Tag.objects.order_by("-id")
    result = []
    for tag in tags:
        item = model_to_dict(tag)
        item["createdAt"] = tag.createdAt.strftime("%Y-%m-%d %H:%M:%S")
        result.append(item)
    return HttpResponse(json.dumps({"status":"OK","result":result}))

# 新建标签
def new_tag(request):
    name = request.POST['name']
    color = request.POST['color']
    createdBy = request.POST['createdBy']
    result = {}
    newtag = Tag.objects.create(name=name,color=color,createdBy=createdBy)

    for field in newtag:
        result[field] = newtag[field]
    result["createdAt"] = newtag.createdAt.strftime("%Y-%m-%d %H:%M:%S")

    return HttpResponse(json.dumps({"status":"OK","result":result}))
