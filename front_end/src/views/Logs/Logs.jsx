import React, { Component } from 'react';
import { listLog, getLogs } from "../../interfaces/logs";
import { Divider, DatePicker } from "antd";
import Log from "../../local/logUtil";

import "./logs.scss";

export default class componentName extends Component {

    _UNMOUNTED = false

    state = {
        data: [],
        history: []
    }

    componentWillMount() {
        if(Log.getList()){ // 首先尝试从本地缓存读取
            return this.setState({
                data:Log.getList()
            })
        }
        listLog() // 从服务器读取
            .then(res => {
                if (res.data.status === "OK") {
                    Log.save(res.data.result); // 保存缓存
                    if (this._UNMOUNTED) return;
                    // 请求成功
                    this.setState({
                        data: res.data.result,
                        history: res.data.dir
                    })
                }

            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const { RangePicker } = DatePicker;
        let thisIp = -1; // 初始化人员计数
        return (
            <div className="logs">
                <div className="history">
                    <div>
                        <RangePicker onChange={this.onChange} />
                    </div>
                </div>
                {
                    this.state.data.map((item, index) => {
                        const reg = /(?<ip>\d{1,3}\.\d{1,3}\.\d{1,3}.\d{1,3}):\[(?<timestamp>[\d-:\s]+)\] (?<computerName>[\S-]+) (?<os>\S+) (?<method>\S+) (?<path>\S+)/;
                        const result = reg.exec(item).groups;
                        const ip = result.ip;
                        const timestamp = result.timestamp;
                        const computerName = result.computerName;
                        const os = result.os;
                        const method = result.method;
                        const path = result.path;

                        const logItem = (
                            <div key={timestamp+index+""} className="log-item">
                                <span className="item">[<span className="timestamp">{timestamp}</span>]</span>
                                <span className="item computer-name">{computerName}</span>
                                <span className="item os">{os}</span>
                                <span className="item method">{method}</span>
                                <span className="item path">{path}</span>
                            </div>
                        )

                        if (thisIp === ip) return logItem
                        else {
                            thisIp = ip;
                            return (
                                <div className="log-item" key={timestamp+index+""}>
                                    <Divider />
                                    <div className="ip">{thisIp}</div>
                                    {logItem}
                                </div>
                            )
                        }
                    })
                }
            </div>
        )
    }

    onChange = (date, dateString) => {
        // console.log(new Date(dateString[0]) , new Date(dateString[1]))
        getLogs(dateString)
            .then(res=>{
                // console.log(res)
                if(this._UNMOUNTED) return;
                if(res.data.status==="OK"){
                    // 请求成功
                    this.setState({data:res.data.result})
                }
            })
            .catch(err=>{
                console.log(err)
            })
    }
}
