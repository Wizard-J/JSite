from django.db import models


# 文章类
class Article(models.Model):
    title = models.CharField(max_length=50,default="未命名") # 文章名称
    author = models.CharField(max_length=50,default="未署名") # 文章作者
    content = models.TextField(default="") # 文章内容
    tags = models.ForeignKey("Tag", to_field="id", on_delete=models.CASCADE) # 标签 每个文章可以有多个标签
    createdAt = models.DateTimeField("创建时间",auto_now_add=True) # 创建时间
    createdBy = models.CharField(max_length=50) # 创建者
    
    def __str__(self):
        return self.title;


# 标签类
class Tag(models.Model):
    color = models.CharField(max_length=7,default="gold") # 标签颜色
    name = models.CharField(max_length=20, default="其它") # 标签内容
    createdAt = models.DateTimeField("创建时间",auto_now_add=True) # 创建时间
    createdBy = models.CharField(max_length=50) # 创建者

    def __str__(self):
        return self.name;
