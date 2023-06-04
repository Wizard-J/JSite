---
title: keras 的六类callback方法补充
date: 2019-10-27 06:44:57
tags: keras
categories: 
- 算法
- 深度学习
---

> 六种`callback`在不同声明周期被调用:
- on_epoch_begin: 在每个epoch开始时调用
- on_epoch_end: 在每个epoch结束时调用
- on_batch_begin: 在每个batch开始时调用
- on_batch_end: 在每个batch结束时调用
- on_train_begin: 在训练开始时调用
- on_train_end: 在训练结束时调用
<!--more-->
>主要参数

- `params`：字典，训练参数集（如信息显示方法`verbosity`，`batch`大小，`epoch`数）

- `model`：`keras.models.Model`对象，为正在训练的模型的引用


```python
class roc_callback(keras.callbacks.Callback):
    def __init__(self,training_data, validation_data):
        
        self.x = training_data[0]
        self.y = training_data[1]
        self.x_val = validation_data[0]
        self.y_val = validation_data[1]
        
    
    def on_train_begin(self, logs={}):
        return
 
    def on_train_end(self, logs={}):
        return
 
    def on_epoch_begin(self, epoch, logs={}):
        return
 
    def on_epoch_end(self, epoch, logs={}):        
        y_pred = self.model.predict(self.x)
        roc = roc_auc_score(self.y, y_pred)      
        
        y_pred_val = self.model.predict(self.x_val)
        roc_val = roc_auc_score(self.y_val, y_pred_val)      
        
        print('\rroc-auc: %s - roc-auc_val: %s' % (str(round(roc,4)),str(round(roc_val,4))),end=100*' '+'\n')
        return
 
    def on_batch_begin(self, batch, logs={}):
        return
 
    def on_batch_end(self, batch, logs={}):
        return  

```