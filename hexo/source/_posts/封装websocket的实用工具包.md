---
title: 封装websocket的实用工具包
date: 2019-11-12 08:04:59
tags: Python
categories: 
- 工具
- python
- 网络请求
---


想手动封装websocket其实很容易出错的，把代码抄下来，需要的时候cv。


<!--more-->
```python
import websockets
import threading

# 获取ip
def get_host_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
    finally:
        s.close()
    return ip
class WS_pipe(threading.Thread):
    def __init__(self,port, model_instance, serviceId):
        threading.Thread.__init__(self)
        self.port = port
        self.loop = None
        self.model_instance = model_instance
        self.serviceId = serviceId
        self.host = get_host_ip()

    async def dojob(self,websocket, port): # 业务方法
        while True:
            message = await websocket.recv()
            if message == "end":
                break
            
            print(message) # 在这里可以对message进行处理
            
            await websocket.send(res)
    def run(self):
        loop = asyncio.new_event_loop() # 创建事件循环
        self.loop = loop
        asyncio.set_event_loop(loop)
        start_server = websockets.serve(self.predict_img, self.host, self.port)
        asyncio.get_event_loop().run_until_complete(start_server)
        asyncio.get_event_loop().run_forever()

    def close_pipe(self): # 封装一个关闭方法
        self.loop.stop()
        print("closed!") 

```