import React, { Component } from 'react';
import ArticleBlock from "../../components/ArticleBlock/ArticleBlock";

export default class componentName extends Component {
    render() {
        return (
            <div>
                <ArticleBlock to="/article/1"/>
                <ArticleBlock to="/article/2"/>
                <ArticleBlock to="/article/3"/>
                <ArticleBlock to="/article"/>
                <ArticleBlock to="/article"/>
                <ArticleBlock to="/article"/>
                <ArticleBlock to="/article"/>
                <ArticleBlock to="/article"/>
            </div>
        )
    }
}
