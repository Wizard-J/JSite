---
title: tensorflow踩坑
date: 2019-09-07 07:29:36
tags: TensorFlow
categories: 
- 算法
- 深度学习
---

我的显卡是GT750M，然后环境是学校官网的win10专业版。

> 坑1: 不同版本python冲突

刚开始使用了python3.7，发现python3,7版本并不能支持tensorflow<=1.13.1以前的版本，遂重新安装python3.5，浪费2小时，
其坑1.配置好环境后，pip失灵，按照上一篇文章重新配置pip，安装各种依赖的包，又浪费2小时，其坑2.

> 坑2： GPU算力限制
<!--more-->
终于不报错了，跑通了，喝口水，惊奇地发现，怎么不动地方，一个epoch跑这么久，一看设备，呵呵，cpu占100%，gpu占用0，这不是开国际玩笑嘛，好好的tensoflow-gpu为啥不用gpu，反而使用了cpu呢？

遂运行如下命令检查：
```python 
from tensorflow.python.client import device_lib
print("-"*50)
print(device_lib.list_local_devices())
print("-"*50)
```
发现我的可用设备里只有一个cpu，而tensorflow1.11.0最小算力要求是3.7,而我的GT750M算力未3.0，遂自动忽略我的显卡，直接用了cpu进行运算，好嘛，我被一个包给鄙视了。

怎么办呢，果断删除tensorflow 1.11.0，安装tensorflow 1.9.0.这下应该没问题了。

> 坑3：keras.backend.clear_session

在考虑加载多个模型的情况下，就不得不使用这个命令，使用了就可能会报各种错:
```python
ValueError: Tensor Tensor("Placeholder:0", shape=(3, 3, 1, 32), dtype=float32) is not an element of this graph.
```
诸如此类，然后用了clear_session命令之后就会发现上面那个shape=()，注意括号里面是空的。

这样一来模型就变成了一次性的了：

也就是load_model()之后马上可以调用predict()方法，但是下次再次需要predict的时候就又要重新load_model，可怕吧？

**关键点**在于：

- clear_session()必须在graph初始化之前执行。很显然嘛，你刚刚执行完初始化，随手就把graph清了，就跟没初始化一样。
```python
graph=tf.Graph().as_default()
K.clear_session()
```
- 每一个model要有自己的graph，都使用默认的graph就会出现混乱。因为keras的设定就是，工作中的默认graph只有一个，所以就有了
```python
with graph.as_default():
    blablabla()...
```
这种写法，他的意思就是把graph加载到当前上下文的意思。
于是，为了保证正确性就这样写：
```python
 K.clear_session()
 graph = tf.Graph()
 with graph.as_default():
    sess = tf.Session(graph=graph) #把识别需要的数据放在自己创建的Graph和Session中，避免使用默认Graph,造成数据错误
    with sess.as_default():
        model = YOLO(**vars(Args(model_path,classes_path)))
        print("model loaded\n","-"*100)
```