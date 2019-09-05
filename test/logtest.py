import os
import time

timestamp = time.strftime("%Y_%m_%d")

log_path = "./logs/log/log_"+timestamp+".log"

# log_path = os.path.join(os.path.dirname(cur_path), 'logs')
if not os.path.exists(os.path.split(log_path)[0]) : os.makedirs(os.path.split(log_path)[0]) # 如果不存在这个logs文件夹，就自动创建一个
with open(log_path,"a") as f:
    f.write("log1\n")