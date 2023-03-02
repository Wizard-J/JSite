---
title: tfv1 和 tfv2api冲突
date: 2019-10-29 02:41:07
tags: TensorFlow
categories: 
- 算法
- 深度学习
---

在`tf2`下使用`tf1`的api会报错：
```
AttributeError: module 'tensorflow' has no attribute 'name_scope'
```
还有诸如`placeholder`的错误，为了避免错误，要这样写

```python
import tensorflow.compat.v1 as tf

tf.disable_v2_behavior()
```

