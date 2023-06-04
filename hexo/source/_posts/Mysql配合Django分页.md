---
title: Mysql配合Django分页
date: 2019-09-07 06:50:15
tags: Django
categories: 
- Py后端
---

终于写到文章模块了.
分页的思路:

```mysql
SELECT * FROM ARTICLE LIMIT $(numPerPage) OFFSET $(pageNum-1) * $(numPerPage) 
```
<!--more-->
```python
from DbModel.models import Article;

Article.objects.order_by("-id")[(pageNum-1)*numPerPage : numberPerPage]
```
先去试验下，回来再记录。

---

