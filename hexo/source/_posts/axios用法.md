---
title: axios用法
date: 2019-09-07 07:22:21
tags: React
categories: 
- 前端
- 网络请求
---


> 时间：2019/7/08

我是万万没想到，get请求也出问题了，get方法传递数组的时候，后台接到的参数：

```
[08/Jul/2019 17:31:15] "GET /del/dataset/?data[]=3&data[]=2 HTTP/1.1" 200 36
```

后面莫名其妙的都带了一个'[ ]'，他们说用qs转一下，我就觉得不对，果然qs转完变成了这样：
```
[08/Jul/2019 17:34:12] "GET /del/dataset/?0=data%255B0%255D%3D3%26data%255B1%255D%3D2 HTTP/1.1" 200 36
```
<!--more-->
是这样解决的：
```javascript
Axios.get("/del/dataset/",
                {
                    params:{
                        data:selectedDataSets
                    },
                    paramsSerializer: function(params){
                        return qs.stringify(params,{arrayFormat:'repeat'})
                    }
                }
            )
                .then(response=>{
                    console.log(response)
                })
                .catch(error=>{
                    console.log(error)
                })
```
后台接到的参数终于正常了：
```
[08/Jul/2019 17:40:27] "GET /del/dataset/?data=3&data=2 HTTP/1.1" 200 36
```
django后台接到这个请求后要这么处理：
```
ids=request.GET.getlist("data")
```
就可以得到全部数据了，不然只能得到数组的第一个元素。

<hr>

> 时间: 2019/7/06号：

这一周又仔细研究了下请求方法，POST请求的三种写法：

- 1、application/json

```javascript
// 这个场合就是普通请求，没有数组，没有文件。
import axios from 'axios'

let data = {"code":"1234","name":"yyyy"};
axios.post(`${this.$url}/test/testRequest`,data)
    .then(res=>{
        console.log('res=>',res);            
    })
```

- 2、Content-Type: multipart/form-data

```javascript
// 当有文件作为参数的时候，文件必须作为FormData进行上传
import axios from 'axios'

let data = new FormData();
data.append('code','1234');
data.append('name','yyyy');

axios.post(`${this.$url}/test/testRequest`,data)
    .then(res=>{
        console.log('res=>',res);            
    })
```


**注意**：这里的关键就是借助一个 FormData对象来传递参数就好了。

- 3、Content-Type: application/x-www-form-urlencoded

```javascript
// 针对urlencoded格式要求
import axios from 'axios'
import qs from 'Qs'

let data = {"code":"1234","name":"yyyy"};

axios.post(`${this.$url}/test/testRequest`,qs.stringify({
    data
}))
    .then(res=>{
        console.log('res=>',res);            
    })
```
这里就是通过借助qs来讲data的json对象转换成urlencoded格式而已。

<hr>

> 时间: 2019/7/1:


今天在封装深度学习系统的时候，发生了小故障。志浩在后台用了xml格式的数据来传递post请求参数，我使用axios，用json格式传输数据，，结果，果然后台能接收到请求但读不到数据。

然后我就重写了数据后台，，，，你以为这就完了，然而并没有，我用Django重新封装了他的方法，发现还是读不到数据，同样还是可以接收到请求。这个bug在我纠结了好几个小时之后，终于调试通过了。原来Django接收数据是urlencoded格式，而axios请求体的格式是application/json.解决的办法是：

```javascript
import qs from "qs";

...一大段代码...
axios.get(url,params:{qs.stringify(data)})
    .then(()=>{})
    .catch(error=>{});
```

原来对于{"key":value}这种json数据未被qs处理前是字符串格式的"{'key':value}"，导致后台无法识别"key"这种参数，qs自动封装了方法，去掉了其中的引号就可以识别key了。


- get请求:

```javascript
axios.get("api/archives?page=1")
        .then(function(response){
            _this.setState({
                timeline:response.data.data
            })
        }).catch(function(error){
            console.log(error);
        })
```

请求路径是creact-react-app注入（eject）之后自动在webpack上配置好了的。

发起请求的时候自动注入，只需要在package.json中设置参数：
```
"proxy":"http://localhost:8000/"
```
需要配置请求头的写法：
```javascript
  configIP(){
    return {
      'headers': {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Forwarded-For': getRandomIp(),  
      },
      "Cache-Control": "no-cache",
      'withCredentials': true,   // 用于跨越处理
      'validateStatus': null,   // 用于跳过请求校验
    }
  }

  update(){
    axios.get("ajax/score/data?mt="+this.state.mt,this.configIP())
    .then(response => {
      let data = response.data.rs;
      // console.log(data);
      this.filtAndUpdate(data);
    }).catch(error=>{console.log(error)});
  }
```
`X-Forwarded-For`：注意这个请求头参数，在我请求数据的时候，目标网站对我频繁发起请求后，我的IP被关进了小黑屋，于是我就设置了这个请求头，果然再次成功。