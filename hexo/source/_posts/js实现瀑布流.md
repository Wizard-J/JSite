---
title: js实现瀑布流
date: 2019-09-07 07:32:21
tags: Html
categories: 
- 前端
---
> 直接抄代码即可
<!--more-->
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>fall</title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        body{
            display: flex;
            justify-content: space-around;  
        }
        li{
            float: left;
            list-style: none;
            margin-right: 10px;
            width:300px;
        }
        .clear::after{
            content:'';
            display: block;
            height: 0;
            clear: both;
        }
        img{
            padding-top: 10px;
        }

    </style>
</head>
<body>
    <div id="wrapper">
        <ul class="clear">
            <li class="col"></li>
            <li class="col"></li>
            <li class="col"></li>
        </ul>
    </div>
    <script>
        function getData(data){
            data = [];
            for(var i=0; i<9; i++){
                data.push("images/fall/"+i+".jpg")
            }
            return data;
        }
        

        function getMinHeight(){
            const oLi = document.getElementsByClassName("col");
            let index = 0;
            let oH = oLi[index].offsetHeight;
            for(let i=0; i<oLi.length; i++){
                if(oLi[i].offsetHeight <= oH){
                    index=i;
                    oH = oLi[i].offsetHeight;
                }
            }
            return index;
        }

        function appendDom(data){
            const container = document.getElementsByClassName("col");
            data.forEach((item,index)=>{
                const img = new Image();
                img.src = item;
                img.width = 300;
                // console.log(img)
                container[getMinHeight()].appendChild(img);
            })
        }
        
        const vH = document.documentElement.clientHeight; // 视口高度
        document.onscroll = function(){
            let sT = document.documentElement.scrollTop || document.body.scrollTop; // 谷歌不同版本的滚动高度
            if(sT + vH >= 0.8* document.body.scrollHeight){ // *0.8 的目的是防止出现白块,scrollHeight是元素的css固有高度（包括被父元素挡住的部分）
                appendDom(getData())
            }
        }

        appendDom(getData());
        </script>
</body>
</html>
```