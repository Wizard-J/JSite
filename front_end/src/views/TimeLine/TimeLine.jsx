import React, { Component } from 'react';
import { Timeline, Icon,Tooltip } from 'antd';
import { getTimeline } from "../../interfaces/ariticle"
import TimelineUtil from "../../local/timelineUtil";

import "./timeline.scss";

export default class componentName extends Component {
    
    _UNMOUNTED = false;

    state ={
        data: null
    }

    componentWillUnmount(){
        this._UNMOUNTED = true;
    }

    componentDidMount(){ 
        //从本地缓存获取数据
        if(TimelineUtil.getList()){
            this.setState({
                data:TimelineUtil.getList()
            })
            return;
        }else{
            // 从服务器获取
            getTimeline()
                .then(res=>{
                    if(res.data.status === "OK"){
                        TimelineUtil.save(res.data.result)
                        if(this._UNMOUNTED) return; // 请求已过期
                        this.setState({
                            data: res.data.result
                        })
                    }
                })
        }
        
    }
    
    randomColor = () => {
        const color = ["magenta","red","volcano","orange","gold","lime","green","cyan","blue","geekblue","purple"]
        return color[Math.floor(Math.random()*color.length)]
    }
    

    render() {

        const data = this.state.data;
        
        let date = "1970-01-01"; // 样式选择，每天第一篇文章返回一个时钟样式
        
        return (
            <div className="timeline">
                <Timeline mode="alternate">
                    {
                        data && data.map((item,index)=>{
                            const thisDate = item.createdAt.split(" ")[0];
                            if(thisDate !== date){
                                date = thisDate; // 新一天
                                return(
                                        <Timeline.Item key={item.id} dot={<Tooltip placement="bottomRight" title={thisDate}><Icon type="clock-circle-o" style={{ fontSize: '16px' }} /></Tooltip>}>
                                            {item.title}
                                        </Timeline.Item>
                                )
                            }else{
                                return(
                                    <Timeline.Item key={item.id} color={this.randomColor()}>{item.title}</Timeline.Item>
                                )
                            }
                        })
                    }
                </Timeline>
            </div>
        )
    }
}
