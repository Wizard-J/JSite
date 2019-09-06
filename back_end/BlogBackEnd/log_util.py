import os
import time

log_path = "../logs/log_"+time.strftime("%Y_%m_%d", time.localtime())+".log"

# 将request写入message
def logInfo(request):
    message = getRequestMessage(request)
    if not os.path.exists(os.path.split(log_path)[0]):
        os.makedirs(os.path.split(log_path)[0])  # 如果不存在这个logs文件夹，就自动创建一个
    with open(log_path, "a+") as log:
        log.write(message)


# 封装全部的完整请求信息
def getRequestMessage(request):
    timestamp = time.strftime("[%Y-%m-%d %H:%M:%S]") # 时间戳

    real_ip = request.META['REMOTE_ADDR'] if 'HTTP_X_FORWARDED_FOR' not in request.META else request.META['HTTP_X_FORWARDED_FOR'].split(",")[0] # 关键一行
    computerName = "无名设备" if 'COMPUTERNAME' not in request.META else request.META['COMPUTERNAME'] # 计算机名
    OS = "未知系统" if "OS" not in request.META else request.META['OS'] # 操作系统


    method = request.method  # 请求方法
    path = request.path  # 请求路径
    return real_ip + ":" + timestamp+" " +computerName+" "+OS+" "+method + " " + path+"\n"
