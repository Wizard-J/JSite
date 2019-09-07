import React, { Component } from 'react';
import Content from "../Content/Content";
import Sidebar from "../Sidebar/Sidebar";
import { getCSRF } from "../../interfaces/user";

import "./layout.scss";

export default class Layout extends Component {

    orienResize(){
        window.location.reload();
    }

    componentDidMount(){
        // window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize" , this.orienResize, false);
        getCSRF()
            .then(res=>{
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })
    }

    render() {
        return (
            <div className="layout">
                <Sidebar/>
                <Content/>
            </div>
        )
    }
}
