---
title: 三步使用装饰器添加redux状态管理
date: 2019-09-07 07:25:09
tags: React
categories: 
- 前端
---

> 1.在最外边index组件用Provider将所有组件包裹起来，并提供全局唯一的store

<!--more-->
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { createStore } from "redux";
import { Provider } from "react-redux";
import {reducer} from "./redux/redux"
const store = createStore(
    reducer,
    window.devToolsExtension?window.devToolsExtension():undefined
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , 
    document.getElementById('root'));
```
> 2.reducer本身需要提供的两个方法，reducer和返回各种json对象的actions函数
```javascript
// actions
export function setState(data){
    return {
        type:"SET_STATE",
        data
    }
}

// reducers
export const reducer = (state = {
    path:"/dataset",
    columns:[],
    data:[]
}, action) => {
    let data = action.data;
    switch (action.type) {
        case 'SET_STATE':
            state.path = data.path
            console.log(data)
            return state
        default:
            return state
    }
}
```

> 3.在需要使用redux的组件中这样写
```javascript
/**
 * layout 侧边栏菜单
 */
@connect(
    state => ({reduxStore:state}),{setState}
)
class index extends Component {
    state = {
        collapsed: false
    };

    onCollapse = collapsed => {
```
然后调用this.props.reduxStore就可以使用保存在redux中的各种state了，调用action的话，直接调用this.props.action就可以了。

> 4.需要注意的地方

- 在reducer方法中一定要返回state,不然无法取到action设置的state

- 使用装饰器@connect的话就无法导出export default 组件名，只能在组件末尾导出export default 组件名，所以组件必须有一个临时的名字。