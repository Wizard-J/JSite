import time
import os
print(time.mktime(time.strptime("log_2019_09_06","log_%Y_%m_%d")))


# print(os.listdir("../logs"))
for log in  os.listdir("../logs"):
    print(os.path.abspath("../"+log))
    print(os.path.dirname(".."))

dic = {"HOST_NAME":"XK-PC"}
print( "127.0.0.1" if "HOST_NAME" not in dic else dic["HOST_NAME"])
print("127.0.0.1" if "REMOTE" not in dic else dic["REMOTE"])