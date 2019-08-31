import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import "./articleblock.scss";

export default class componentName extends Component {
    render() {
        return (
            <div className="article-block">
                {/* <a href="/tale/2017-03-29/introducing-tale" class="catalogue-item"> */}
                <NavLink className="catalogue-item" to={this.props.to}>
                    <div>
                        <time dateTime="2017-03-29 00:00:00 +0000" className="catalogue-time">March 29, 2017</time>
                        <h1 className="catalogue-title">Introducing Tale</h1>
                        <div className="catalogue-line"></div>

                        <p>
                            Tale is a minimal Jekyll theme curated for storytellers. It is designed and developed by myself for a friend who writes short stories. Tale features Compatible with GitHub Pages Responsive...
                        </p>

                    </div>
                </NavLink>
            </div>
        )
    }
}
