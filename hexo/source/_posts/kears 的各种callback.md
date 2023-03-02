---
title: kears 的各种callback
date: 2019-10-27 06:35:57
tags: keras
categories: 
- 算法
- 深度学习
---

最近遇到一个困难，使用xshell连接服务器开启训练，服务器在进行训练的过程中，xshell不可以断开连接，否则主线程中断必然导致训练线程中断；
长期保持连接是不合适的，所以必须将django部署到后台，但试验发现uwsgi打印日志有bug，无法打印子线程的错误。
<!--more-->
采用了nohup命令：
```shell
nohup python3 -u manage.py runserver 0.0.0.0:8000 > server.out 2>&1 &
```
输出正常了。

`keras`训练日志仍然无法正常被捕获，经过两日查找文献，了解到`callback`的使用。
要捕获日志信息，总的来说，有两种方案：

> 方法一：使用history方法

```python
history = model.fit_generator(data_generator_wrapper(lines[:num_train], batch_size, input_shape, anchors, num_classes),
                steps_per_epoch=max(1, 1000),
                validation_data=data_generator_wrapper(lines[num_train:], batch_size, input_shape, anchors, num_classes),
                validation_steps=max(1, num_val//batch_size),
                epochs=my_epochs,#9-epochs是迭代次数，越大训练时间就越长
                initial_epoch=0,
                callbacks=[logging, checkpoint, mycall],
                verbose=2)
        print("自定义打印>>>",history.history)
        print(history.epoch)
        print(history.loss)
```

我发现history方法只能在训练最后打印，这与我们实时记录的需求不符合。经过探索，采取了方法二。

>方法二：使用callback

仔细观察就会发现，拟合函数中传入了callback，只需要自定义callback就可以了。

```python
from time import strftime, localtime
from keras.callbacks import Callback

class MyCallback(Callback):

    def on_epoch_begin(self,epoch,logs):
        print(strftime("%Y-%m-%d %H:%M:%S"),">>>",self.params,"\nepoch:",epoch,"\nlogs:",logs)
        with open("/home/dp/Django_Api/back_end/DeepLearning/data_1.log", "a+") as writer:
            writer.write(strftime("%Y-%m-%d %H:%M:%S")+">>>"+str(self.params)+"\nepoch:"+str(epoch)+"\nlogs:"+str(logs)+"\n")
            writer.close()

    def on_epoch_end(self,epoch,logs):
        print(strftime("%Y-%m-%d %H:%M:%S"),"<<<",self.params,"\nepoch:",epoch,"\nlogs:",logs,"\n")
        with open("/home/dp/Django_Api/back_end/DeepLearning/data_1.log", "a+") as writer:
            writer.write(strftime("%Y-%m-%d %H:%M:%S")+">>>"+str(self.params)+"\nepoch:"+str(epoch)+"\nlogs:"+str(logs)+"\n")
            writer.close()
```

然后在拟合函数中传入即可
```python
mycall = MyCallback()
model.fit_generator(data_generator_wrapper(lines[:num_train], batch_size, input_shape, anchors, num_classes),
            steps_per_epoch=max(1, 500),
            validation_data=data_generator_wrapper(lines[num_train:], batch_size, input_shape, anchors, num_classes),
            validation_steps=max(1, num_val//batch_size),
            epochs=my_epochs2,#12-第二阶段的epoch
            initial_epoch=1300,
            callbacks=[logging, checkpoint,reduce_lr, mycall],
            verbose=2)
```