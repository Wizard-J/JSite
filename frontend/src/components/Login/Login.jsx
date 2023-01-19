import React, {Component} from 'react';
import {Input} from "antd";
// import {getUser} from "../../interfaces/user";

export default class componentName extends Component {

    pressEnter = (e) => {
        console.log(">>>", e)
    }

    render() {

        return (
            <div>
                <Input placeholder="输入QQ号自动拉取昵称" onPressEnter={this.pressEnter}/>
            </div>
        )
    }
}
