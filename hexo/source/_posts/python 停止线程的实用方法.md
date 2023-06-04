---
title: python 停止线程的实用方法
date: 2019-09-07 07:05:21
tags: Python
categories: 
- Py后端
---

之所以想终止线程，是因为线程被卡在了一个地方，肯能是`while True`循环，也可能是需要运算时间很长的语句，所以也就两个思路：

> 退出 while 循环

当然是把`while`判断标记手动的改为`false`，这无可厚非。

但是在做深度学习算法的时候，它线程里面没有`while`循环，`train`方法本身就是会执行很长时间，怎么办呢？

> 手动抛出异常
<!--more-->
具体写法是这样的，亲测有效：

```python
import threading
import time
import inspect
import ctypes

train_thread_pool = []
 
def _async_raise(tid, exctype):
    """raises the exception, performs cleanup if needed"""
    tid = ctypes.c_long(tid)
    if not inspect.isclass(exctype):
        exctype = type(exctype)
    res = ctypes.pythonapi.PyThreadState_SetAsyncExc(tid, ctypes.py_object(exctype))
    if res == 0:
        raise ValueError("invalid thread id")
    elif res != 1:
        # """if it returns a number greater than one, you're in trouble,
        # and you should call it again with exc=NULL to revert the effect"""
        ctypes.pythonapi.PyThreadState_SetAsyncExc(tid, None)
        raise SystemError("PyThreadState_SetAsyncExc failed")
 
def stop_thread(thread):
    _async_raise(thread.ident, SystemExit)
 
class TestThread(threading.Thread):
    def __init__(self,param1):
        threading.Thread.__init__(self)
        self.param1 = param1
    def run(self):
        print("begin")
        while True:
            print("running","---param1:",self.param1)
            time.sleep(0.1)
        print("end")
if __name__ == "__main__":
    t = TestThread("aaaa")
    train_thread_pool.append(t)
    print(train_thread_pool[0])
    t.start()
    time.sleep(1)
    stop_thread(t)
    print("----------stoped---------")
```