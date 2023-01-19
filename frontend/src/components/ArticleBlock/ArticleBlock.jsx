import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {markCode} from "../../interfaces/ariticle";
import {Tag} from "antd";
import "./articleblock.scss";

export default class componentName extends Component {

    render() {

        const tag = this.props.tags

        return (
            <div className="article-block">
                {/* <a href="/tale/2017-03-29/introducing-tale" class="catalogue-item"> */}
                <div className="catalogue-item">
                    <time dateTime="2017-03-29 00:00:00 +0000"
                          className="catalogue-time">{new Date(this.props.createdAt).toDateString()}</time>
                    <NavLink to={this.props.to}>
                        <h1 className="catalogue-title">{this.props.title}</h1>
                    </NavLink>
                    <div className="catalogue-line"></div>

                    <p dangerouslySetInnerHTML={{__html: markCode(this.props.content).substring(0, 100)}}/>

                    <Tag color={tag.color}>{tag.name}</Tag>

                </div>

            </div>
        )
    }
}
