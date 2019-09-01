import React, { Component } from 'react';
import "./bar.scss";

export default class componentName extends Component {

    state = {
        showBar:false,
        barHeight:0
    }


    componentWillReceiveProps(nextProps,nextStates){
        const {box,text} = nextProps;
        
        // 获取文本域的高度
        const scrollHeight = text.scrollHeight;
        const viewPortHeight = parseInt(getComputedStyle(box).height);

        // 滚动高度小于视口高度时不需要滚动条，否则显示滚动条
        if(scrollHeight <= viewPortHeight){
            text.onmousewheel = null;
            text.style.top = 0;
            return this.setState({
                showBar:false
            })
        }else{
            this.setState({
                showBar:true
            })
        }
        if(!this._bar) return false;
        // 计算滚动条高度
        const barHeight = viewPortHeight * viewPortHeight / scrollHeight;
        
        const pre_barHeight = this.state.barHeight;
        
        if( barHeight === pre_barHeight ) return false; // 高度没有变化，不更新
        this.setState({ // 高度发生变化
            barHeight
        })

        const bar = this._bar;
        const maxTop = viewPortHeight - barHeight;

        // 滚轮事件
        text.onmousewheel = function (e) {
            e.preventDefault();
            // 上下每次页面位移100px
            
            const barTop = parseInt(getComputedStyle(bar).top); // 滚动条初始位置
            const newBarTop = barTop + viewPortHeight * e.deltaY / scrollHeight;
            if( newBarTop > maxTop){ // 下界
                text.style.top = -( scrollHeight - viewPortHeight ) + "px";
                bar.style.top = maxTop + "px";
                return;
            }else if( newBarTop < 0 ){ // 上界
                text.style.top = 0;
                bar.style.top = 0;
                return;
            }

            text.style.top = parseInt(getComputedStyle(text).top) - e.deltaY + "px";
            // 计算滚动条比例
            bar.style.top = newBarTop + "px";
            box.scrollTop = 0;
        }


        // 鼠标拖动滚动条事件
        bar.onmousedown = function(e) {
            const startY = e.clientY; // 起始位置
            const barTop = parseInt(getComputedStyle(bar).top);

            // 解绑事件
            document.onmouseup = function(){
                document.onmousemove = null;
                document.onmouseup = null;
            }
            
            // 绑定事件
            document.onmousemove = function (e) {
                e.preventDefault();
                // 解绑事件
                const viewPortWidth = document.body.clientX;
                if (e.clientX < 0 || e.clientX > viewPortWidth || e.clientY > viewPortHeight || e.clientY < 0) {// 鼠标离开视口
                    document.onmousemove = null;
                    document.onmouseup = null;
                    return;
                }

                const endY = e.clientY; // 移动中的末位置
                const deltaY = endY - startY; // 变化值 δ<0 表示向上 ，δ>0 表示向下

                const endPos = barTop + deltaY;
                
                // 滚轮表示已经拉到了极点
                if(endPos < 0 ){ // 上边界
                    text.style.top = 0;
                    bar.style.top = 0;
                    return; 
                }else if(endPos > maxTop){ // 下边界
                    text.style.top = ( viewPortHeight - scrollHeight) +"px";
                    bar.style.top = maxTop + "px";
                    return; 
                }
                
                // 改变滚动条位置
                bar.style.top = endPos+"px";

                // 计算等比例的barTop对应的textTop
                const textTop = (scrollHeight -  viewPortHeight) * (barTop + deltaY) / maxTop
                text.style.top = - textTop +"px";
                
            }
        }
    }

    render() {

        return (
            <div className="slide" ref={_slide => this._slide = _slide} onClick={this.test}>
                {
                    this.state.showBar && <div className="bar" style={{height:this.state.barHeight}} ref={_bar => this._bar = _bar}></div>
                }
            </div>
        )
    }
}
