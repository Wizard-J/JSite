import React, { Component } from 'react';
import { Avatar , Tooltip } from 'antd';
import { NavLink } from "react-router-dom";
import { getUser } from "../../interfaces/user"

import "./sidebar.scss";

export default class Left extends Component {

    state = {
        nikeName: "我是..."
    }

    // 向左收起菜单页
    foldMenu() {
        const oleft = this._left;
        oleft.style.width = "25vw";// 横屏设备始终保持菜单显示
        // 将content页色调恢复调亮
        const ocontent = document.getElementsByClassName("content")[0];
        ocontent.style.transitionDuration = "0.5s";
        ocontent.style.backgroundColor = "rgba(238, 205, 168, 0.2)";
    }

    // 向右展开菜单页
    unfoldMenu() {
        const oleft = this._left;
        oleft.style.width = "100vw";
        // 将content页色调调暗
        const ocontent = document.getElementsByClassName("content")[0];
        ocontent.style.transitionDuration = "0.5s";
        ocontent.style.backgroundColor = "rgba(102, 90, 77, 0.5)";
    }

    // 左右方向的展开或收起
    lrMenu(e, startX) {
        const oleft = this._left;
        document.onmousemove = null;
        oleft.onmouseup = null;
        // 判断左划、右划，左划收起，右划展开
        oleft.style.transitionDuration = "0.5s";
        const endX = e.clientX;
        if (endX <= startX) { // 左划、收起
            this.foldMenu() // 横屏设备始终保持菜单显示
        } else { // 右划、展开
            this.unfoldMenu()
        }
    }

    // 下拉菜单到底部
    pullMenu() {
        const oleft = this._left;
        oleft.style.top = 0;
        // 将content页色调调暗
        const ocontent = document.getElementsByClassName("content")[0];
        ocontent.style.backgroundColor = "rgba(102, 90, 77, 0.5)";
    }

    // 上拉菜单到顶部
    liftMenu() {
        const oleft = this._left;
        oleft.style.top = "-99vh";
        // 将content页色调恢复明亮
        const ocontent = document.getElementsByClassName("content")[0];
        ocontent.style.backgroundColor = "rgba(238, 205, 168, 0.2)";
    }

    btMenu(e, startY) {
        const oleft = this._left;
        document.onmousemove = null;
        oleft.onmouseup = null;
        oleft.style.transitionDuration = "0.5s";
        const endY = e.clientY;
        if (startY < endY) {// 下滑,打开菜单
            this.pullMenu()
        } else { //上滑
            this.liftMenu()
        }
    }

    // 向右隐藏菜单，打开编辑器
    hideMenu = e =>{
        const oleft = this._left;
        const ocontent = document.getElementsByClassName("content")[0];
        ocontent.style.left = "0";
        ocontent.style.width = "100vw";
        ocontent.style.backgroundColor = "rgba(238, 205, 168, 0.2)";
        oleft.style.width = "0vw";
    }



    // 禁用菜单
    disableMenu = e =>{
        window.onmousewheel = null; // 锁定菜单
        this.hideMenu();
    }

    // 激活菜单
    enableMenu = e=>{
        const viewPortWidth = document.body.clientWidth;
        const viewPortHeight = document.body.clientHeight;
        const ocontent = document.getElementsByClassName("content")[0];
        if (viewPortHeight <= viewPortWidth) {
            // 横屏
            this._left.style.width = "25vw";
            this.foldMenu(); // 向左收起菜单
            ocontent.style.left="25vw";
            ocontent.style.width="75vw";
        }else{
            this._left.style.width = "100vw";
            this.liftMenu();//上拉菜单到顶部
            ocontent.style.left="0";
        }
    }

    componentDidMount() {
        // 将封装好的事件存储到window对象下，供其他组件使用
        window._wizard = { disableMenu:this.disableMenu,enableMenu:this.enableMenu,hideMenu:this.hideMenu,pullMenu:this.pullMenu,liftMenu:this.liftMenu,foldMenu:this.foldMenu,unfoldMenu:this.unfoldMenu }
        this.bindEvent()
        // 获取昵称
        getUser(79328210)
            .then(res => {
                this.setState({
                    nikeName: res.data.message
                })
                window._wizard.user = res.data.message
            })

    }

    render() {
        return (
            <div className="side-bar" ref={left => this._left = left}>
                <div className="sidebar-bg">
                    <ul className="sidebar-nav">
                        <li className="avatar"><Avatar size={64} src={"http://q1.qlogo.cn/g?b=qq&nk=79328210&s=100"} /></li>
                        <li className="sign"><span><a href="http://wizardj.cn">{this.state.nikeName}</a></span></li>
                        <li className="motto"><span>"God was never on your side"</span></li>
                        <li className="hover-bottom"><NavLink to="/">博文</NavLink></li>
                        <li className="hover-bottom"><NavLink to="/timeline">归档</NavLink></li>
                        <li className="hover-bottom"><NavLink to="/tags">标签</NavLink></li>
                        <li className="hover-bottom"><NavLink to="/logs">日志</NavLink></li>
                        <li className="hover-bottom" onClick={this.openEditor}><NavLink to="/editorc">写文章</NavLink></li>
                    </ul>
                    <ul className="sidebar-social">
                        <li>
                            <Tooltip  placement="bottomLeft" title={"花费挺贵的，发邮件就好..."}>
                                <div>
                                    <i className="iconfont icon-Blog"></i>
                                </div>
                            </Tooltip >
                        </li>
                        <li>
                            <Tooltip  placement="bottom" title={"邮箱：79328210@qq.com"}>
                                <div>
                                    <i className="iconfont icon-email"></i>
                                </div>
                            </Tooltip >
                        </li>
                        <li>
                            <Tooltip  placement="bottomRight" title={"掘金社区"}>
                                <a href="https://juejin.im/user/5d2d8a2351882554c007bdcd" text="掘金社区"><i className="iconfont icon-web_xiangxiazhankai"></i></a>
                            </Tooltip >
                        </li>
                        <li>
                            <Tooltip  placement="bottomRight" title={"同性交友社区"}>
                                <a href="https://github.com/Wizard-J" text="github"><i className="iconfont icon-github"></i></a>
                            </Tooltip >
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    bindEvent = ()=>{
        const oleft = this._left;
        const ocontent = document.getElementsByClassName("content")[0];
        
        const viewPortWidth = document.body.clientWidth;
        const viewPortHeight = document.body.clientHeight;
        const that = this;
        if (viewPortHeight <= viewPortWidth) {
            // 横屏
            window.onmousewheel = function () {
                that.foldMenu()
            }
            // 左划屏幕事件-菜单向左
            oleft.onmousedown = function (e) {
                e.preventDefault()
                oleft.style.transitionDuration = "initial";
                const startX = e.clientX; // 鼠标初始坐标
                const startW = parseFloat(getComputedStyle(oleft).width); // 初始宽度

                oleft.onmouseup = function (e) {
                    that.lrMenu(e, startX)
                }

                document.onmousemove = function (e) {
                    const endX = e.clientX;
                    const deltaX = startX - endX; // δ>0表示向左划，δ<0表示右划

                    const endWidth = startW - deltaX

                    if (endWidth <= 0.25 * viewPortWidth || endWidth >= viewPortWidth) return; // 小于25vw的边界,或者大于100vw视口宽度就不要再变化了
                    else {
                        oleft.style.width = endWidth + "px"; // 否则照常将宽度设置为目标宽度
                        ocontent.style.transitionDuration = "initial";
                        const colorAlpha = 0.2 + 0.3 / 75 * ( parseFloat(oleft.style.width) / viewPortWidth * 100 )
                        ocontent.style.backgroundColor = "rgba(238, 205, 168, "+colorAlpha+")";
                     }  

                    if (e.clientX < 0 || e.clientY < 0 || e.clientX > viewPortWidth || e.clientY > viewPortHeight) { // 鼠标离开视口
                        that.lrMenu(e, startX)
                    }
                }
            }
            
        } else {
            // 竖屏手机
            const oleft = this._left;
            const viewPortHeight = document.body.clientHeight; // 视口高度
            const initialTop = viewPortHeight / 100; // 隐藏状态下的高度

            oleft.style.transitionDuration = "initial";
            oleft.style.top = "-99vh";
            // 将content页色调恢复
            ocontent.style.backgroundColor = "rgba(238, 205, 168, 0.2)";
            ocontent.style.left = 0;
            ocontent.style.width = "100vw";
            // 下滑降下菜单
            oleft.onmousedown = function (e) {
                e.preventDefault();
                const startY = e.clientY; // 鼠标初始位置
                const startPositionY = oleft.style.top.endsWith("vh") ? parseFloat(oleft.style.top) / 100 * viewPortHeight : parseFloat(oleft.style.top); // 鼠标按下时的初始位置
                oleft.onmouseup = function (e) {
                    // 上下收起菜单
                    that.btMenu(e, startY)
                }
                document.onmousemove = function (e) {
                    const endY = e.clientY; // 当前位置
                    const deltaY = startY - endY; // 手指Y方向位移,δY > 0 表示向上滑；δY < 0 表示向下滑

                    const postition = startPositionY - deltaY;
                    if (postition < - viewPortHeight || postition > - initialTop) return;
                    else {
                        oleft.style.transitionDuration = "initial";
                        oleft.style.top = postition + "px";
                    }
                    if (e.clientX < 0 || e.clientX > viewPortWidth || e.clientY > viewPortHeight || e.clientY < 0) {// 鼠标离开视口
                        that.btMenu(e, startY)
                    }
                }
            }
            
        }
    }
}
