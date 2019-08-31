import React, { Component } from 'react';
import marked from "marked";
import hljs from "highlight.js";
import "./article.scss";

export default class componentName extends Component {

    state = {
        articleId : -1,
        article: ""
    }

    componentDidMount(){

        // marked相关配置
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false,
            highlight: function(code) {
                return hljs.highlightAuto(code).value;
            },
        });

        const articleId = parseInt(this.props.match.params.id);
        const articles = window.localStorage.getItem("articles") ? JSON.parse( window.localStorage.getItem("articles") ) : [];
        this.setState({
            articleId: articleId,
            article: articles[articleId]
        })
    }

    render() {
        
        const html =marked(this.props.articleContents);

        return (
            <div className="article">
                <div className="post">
                    <div className="post-info">
                        <span>Written by</span>
                        {this.props.author}
                        <br />
                        <span>on&nbsp;</span><time>{this.props.date}</time>
                    </div>

                    <h1 className="post-title">{this.props.title}</h1>
                    <div className="post-line"></div>

                    <div className="content-preview" dangerouslySetInnerHTML={{__html:html}} >
                    </div>

                </div>
                <div className="pagination">
                    <a href="/tale/2017-03-16/example-content" className="right arrow">→</a>
                    <a href="/" className="top">Top</a>
                </div>
            </div>
        )
    }
}
