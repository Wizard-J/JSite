---
title: antd实现读取上一次表单数据重新填充
date: 2019-09-07 07:02:26
tags: React
categories: 
- 前端
---

忽然碰到一个需求：

一张字段很多的`表单A`，中间需要创建新的表单，然后跳转到`表单B`创建一个子表单，再返回之前`表单A`，然后继续完成`表单A`中的字段信息，中途再跳到`表单C`...

大致上就是表单填了一半了，卸载视图之后再重新挂载视图，如何恢复上次的数据。
<!--more-->
**必要捷径**:

- antd表单（Form）组件的字段值获取和赋值方式：

```js
// 表单数据获取
this.props.form.validateFields((err,values)=>{
    console.log(">>>所有字段values:",values)
})

// 表单赋值
this.props.form.setFieldsValue(tempValue)
```

**实现思路**：

- 在跳转出页面之前，先获取Form表单的值，然后保存到window对象下;
- 从`FromB`跳转回来后，默认先到`window`对象下获取之前保存的对象，然后通过`setFieldsValue()`方法赋值;
- `FormA`成功提交后，将`window`下的临时对象清空;

```js
componentDidMount = (e)=>{
        const tempValue = window._dp_project_fields_temp;
        // console.log(">>>读取到上一次未完成数据：",tempValue)
        // 将数据赋值，重新填充到表单中
        this.props.form.setFieldsValue(tempValue) // 3、从window读取上一次填写的值
    }
    
newDataSet =(e)=>{
    e.preventDefault();
    this.props.form.validateFields((err,values)=>{
        // console.log(">>>临时value:",values)
        window._dp_project_fields_temp = values // 1、window下临时保存
        this.props.history.push("/dataSet/add") // 2、跳转到formB
    })
}
```