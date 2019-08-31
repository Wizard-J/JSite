from django.http import HttpResponse
from urllib.request import urlopen
import json
import re

def get_sign(request):

    uins = request.GET.get("uins")
    url = "https://users.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?uins="+uins

    result = urlopen(url).read().decode()
    pattern = r'portraitCallBack\({\"\d+\":\[\"http://.+",.+\"(.+)\".+\]}\)'
    res = re.search(pattern, result)

    return HttpResponse(json.dumps({"status":"OK","message":res.group(1)}))