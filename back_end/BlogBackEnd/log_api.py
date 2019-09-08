from django.http import HttpResponse

import os
import time
import json

from BlogBackEnd.log_util import logInfo

PROJECT_PATH = os.path.abspath("..")
log_path = os.path.join(PROJECT_PATH,"logs")

# 返回全部日志
def list_log(request):
    logInfo(request)
    timestamp = time.strftime("log_%Y_%m_%d.log")
    logfile = os.path.join(log_path,timestamp)
    result = []
    if not os.path.exists(log_path):
        os.makedirs(log_path)
    if not os.path.exists(logfile):
        f = open(logfile,"a+")
        f.close()
    with open(logfile,"r+") as f:
        for line in f.readlines():
            result.append(line)
    
    return HttpResponse(json.dumps({"status":"OK","result":result}))

# 获取请求日期范围内的所有日志信息
def get_log(request):
    timeRange = request.GET.getlist("datestring")

    small_time = int(time.mktime(time.strptime(timeRange[0],"%Y-%m-%d")))
    bigger_time = int(time.mktime(time.strptime(timeRange[1],"%Y-%m-%d")))
    
    logs = os.listdir(log_path)
    result = []
    # 找到所有目标日志，并写入返回
    for log in logs:
        log_time = int(time.mktime(time.strptime(log,"log_%Y_%m_%d.log")))
        if log_time <= bigger_time and log_time >= small_time:
            with open(os.path.abspath("../logs/"+log),"r") as reader:
                for line in reader.readlines():
                    result.append(line)
    return HttpResponse(json.dumps({"status":"OK","result":result}))

