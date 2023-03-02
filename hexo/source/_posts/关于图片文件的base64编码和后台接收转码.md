---
title: 关于图片文件的base64编码和后台接收转码
date: 2019-09-07 07:26:26.052628
tags: JavaScript
categories: 
- 前端
---

<hr>

> 时间: 2019/7/1:

以前只知道base64，并没有实际使用它来传输图片字符串到后台，我在周末的时候用浏览器将图片转码post到后台发现竟然识别不出；

今天早上我一抖机灵，干脆把后台接收到的文件保存下来与我前端传过去的比一下就好了嘛。

一比较，发现：果然显示“图片已经损坏”。

原来前端封装base64之后会有如下格式：
```
imag/png:base64,```一大堆64位码```base64blablabal==
```
而真正需要转码保存下来的文件只是逗号后面的一堆base64码而已，错误的将前面的格式声明“image/png:base64,”也转码称二进制会导致图片损坏不能识别。

附我在前台转码的方式：
<!--more-->
``` javascript
const box = document.getElementById("box");
        box.ondragOver = fucntion(e){
            e.preventDefault();
            e.stopPropgation();
            return false;
        }
        // 第一种读取方式
        box.ondrop = fucntion(e){
            e.preventDefault();
            e.stopPropgation();

            const file = e.dataTransfer.files[0];// 获取到文件

            const img = new Image();

            img.src = window.URL.createURL(new Blob(file)) // 这就是url


            return false;
        }

        // 第二种方式
        box.ondrop = fucntion(e){
            e.preventDefault();
            e.stopPropgation();

            const file = e.dataTransfer.files[0];// 获取到文件

            const reader = new FileReader();

            reader.readAsURL(file);

            reader.onload = function () {

                const url = this.result; // reader.result就是base64的转码

            }

            return false;
        }
```