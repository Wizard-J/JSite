import re
import json
from urllib.request import urlopen
import jsonschema._legacy_validators

url = "https://users.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?uins=79328210"
result = urlopen(url).read().decode()

# str = 'portraitCallBack({"\d+":["http://qlogo3.store.qq.com/qzone/79328210/79328210/100",17417,-1,0,0,0,"Wizard J",0]})'
pattern = r'portraitCallBack\({\"\d+\":\[\"http://.+",.+\"(.+)\".+\]}\)'

res = re.search(pattern, result, flags=0)
print("result:",result)
print("matched-res:",res.group(1))
print("get:",res.group(1))
