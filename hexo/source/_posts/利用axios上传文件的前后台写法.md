---
title: 利用axios上传文件的前后台写法
date: 2019-09-07 07:23:43.867898
tags: React
categories: 
- 前端
- 网络请求
---

额，经过试验，不用设置请求头'Content-type'之类的那么麻烦，直接创建表单对象就可以了，附代码：
```javascript
beforeUploadHandler = (file,e)=>{

        console.log(file)
        
        const data = new FormData();
        data.append("file",file);

        Axios.post("upload/dataset/",data)
        .then(response=>{
            console.log(response)
        })
        .catch(error=>{
            console.log(error);
        })

        return false; // 屏蔽掉antd的自动上传功能，因为我们不需要，我们是要对图片进行转码
    }
```
然后后台写法是这样的：
<!--more-->
# 数据集上传功能

```javascript
def uploadFile(request):
    if request.method == 'POST': # 请求方法是POST时，进行处理
        myfile = request.FILES.get('file',None) # 获取上传的文件，如果没有，就默认是None
        print(request.FILES)
        if not myfile:
            return HttpResponse("no files for upload!")
        destination = open(os.path.join("/home/qzh/keras-yolo3-master/DjangoApi/dataSet",myfile.name),'wb+') # 二进制读写
        for chunk in myfile.chunks(): # 分块写入
            destination.write(chunk)
        destination.close()
        return HttpResponse("upload over!")
```
如果文件太大，就要检测上传进度，上传进度的检测方法：
```javascript
beforeUploadHandler = (file,e)=>{
        const data = new FormData();
        data.append("file",file);
        const _this = this;

        Axios({
            url:"upload/dataset/",
            method:'POST',
            data:data,
            onUploadProgress:function(processEvent){
                // 原生获取上传进度的事件
                if(processEvent.lengthComputable){
                    // lengthCompoutable 主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
                    // 如果lengthComputable为false,就获取不到progressEvent.total和progressEvent.loaded
                    let progress = (processEvent.loaded / processEvent.total*100).toFixed(2)*1;
                    _this.setState({
                        progress:progress
                    })
                }
            }
        })
        .then(response=>{
            console.log(response)
        })
        .catch(error=>{
            console.log(error);
        })

        return false; // 屏蔽掉antd的自动上传功能，因为我们不需要，我们是要对图片进行转码
    }
```