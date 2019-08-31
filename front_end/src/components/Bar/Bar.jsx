import React, { Component } from 'react';
import "./bar.scss";

export default class componentName extends Component {

    state = {
        scrollHeight: undefined
    }


    componentDidMount(){
        this.setState({
            scrollHeight: this.props.preview.scrollHeight
        })
    }

    componentWillReceiveProps(nextProps,nextStates){
        const nscrollHeight = nextProps.preview.scrollHeight;
        const noffsetHeight = nextProps.preview.offsetHeight; // 为了调整误差，将offset增大
        
        const {scrollHeight} = nextStates;

        if( nscrollHeight === scrollHeight ) return false; // 高度没有变化，不更新
        // 更新滚动条状态
        this.setState({
            scrollHeight:nscrollHeight
        })

        // 重新绑定滚动事件
        const ratioHeight = noffsetHeight * noffsetHeight / nscrollHeight;
        const minTop = noffsetHeight - ratioHeight; // 最大位移
        const preview = this._bar.parentNode; // 欲改变top值的父对象
        
        // 下拉滚动条，改变父组件的top值
        const handelBar = this._handel;
        
        // 滚轮事件
        preview.onmousewheel = function (e) {
            e.preventDefault();
            // 上下每次页面位移100px
            const handelBarTop = parseInt(getComputedStyle(handelBar).top); // 滚轮初始位置
            const previewTop = parseInt(getComputedStyle(preview).top); // 页面初始位置
            const scrollRatio = minTop *  e.deltaY / ( nscrollHeight - noffsetHeight );
            
            const newHandleBarTop = handelBarTop + scrollRatio;
            if( newHandleBarTop > minTop){
                preview.style.top = -( nscrollHeight - noffsetHeight ) + "px";
                handelBar.style.top = minTop + "px";
                return;
            }else if( newHandleBarTop < 0 ){
                preview.style.top = 0;
                handelBar.style.top = 0;
                return;
            }

            preview.style.top = previewTop - e.deltaY + "px";
            // 计算滚动条比例
            handelBar.style.top = newHandleBarTop + "px";
            
        }
        

        // 鼠标拖动滚动条事件
        handelBar.onmousedown = function(e) {
            const startY = e.clientY; // 起始位置
            const handelBarTop = parseInt(getComputedStyle(handelBar).top);

            // 解绑事件
            document.onmouseup = function(){
                document.onmousemove = null;
                document.onmouseup = null;
            }
            
            // 绑定事件
            document.onmousemove = function (e) {
                e.preventDefault();
                // 解绑事件
                const viewPortHeight = document.body.clientY;
                const viewPortWidth = document.body.clientX;
                if (e.clientX < 0 || e.clientX > viewPortWidth || e.clientY > viewPortHeight || e.clientY < 0) {// 鼠标离开视口
                    document.onmousemove = null;
                    document.onmouseup = null;
                    return;
                }

                const endY = e.clientY; // 移动中的末位置
                const deltaY = endY - startY; // 变化值 δ<0 表示向上 ，δ>0 表示向下

                const endPos = handelBarTop + deltaY;
                
                // 滚轮表示已经拉到了极点
                if(endPos < 0 ){ // 上边界
                    preview.style.top = 0;
                    handelBar.style.top = 0;
                    return; 
                }else if(endPos > minTop){ // 下边界
                    preview.style.top = ( noffsetHeight - nscrollHeight) +"px";
                    handelBar.style.top = minTop + "px";
                    return; 
                } 
                
                // 改变滚动条位置
                handelBar.style.top = endPos+"px";

                // 计算等比例的barTop对应的previewTop
                const previewTop = (nscrollHeight -  noffsetHeight) * (handelBarTop + deltaY) / minTop
                preview.style.top = - previewTop +"px";
                
            }
        }

    }

    render() {
        const {offsetHeight,scrollHeight} = this.props.preview;
        const ratioHeight = offsetHeight * offsetHeight /scrollHeight;

        return (
            <div className="slide" ref={_bar => this._bar = _bar} onClick={this.test}>
                <div className="bar" style={{height:ratioHeight}} ref={_handel => this._handel = _handel}></div>
            </div>
        )
    }
}
