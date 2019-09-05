import os
import time

log_path = "../logs/log_"+time.strftime("%Y_%m_%d",time.localtime())+".log"

# 将request写入message
def logInfo(request):
    message = getRequestMessage(request)
    if not os.path.exists(os.path.split(log_path)[0]): os.makedirs(os.path.split(log_path)[0])  # 如果不存在这个logs文件夹，就自动创建一个
    with open(log_path,"a+") as log:
        log.write(message)


# 封装全部的完整请求信息
def getRequestMessage(request):
    timestamp = time.strftime("[%Y-%m-%d %H:%M:%S]") # 时间戳
    ip = request.META['REMOTE_ADDR'] # 请求ip
    method = request.method # 请求方法
    path = request.path # 请求路径
    return timestamp+ip+" " + method + " " + path+"\n"
    
