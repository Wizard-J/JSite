import React, { Component } from 'react';
import { markCode } from "../../interfaces/ariticle";
import "./article.scss";

export default class componentName extends Component {

    state = {
        articleId : -1,
        article: ""
    }

    componentDidMount(){
        const articleId = parseInt(this.props.match.params.id);
        const articles = window.localStorage.getItem("articles") ? JSON.parse( window.localStorage.getItem("articles") ) : [];
        this.setState({
            articleId: articleId,
            article: articles[articleId]
        })
    }

    render() {
        
        const html = markCode(this.props.articleContents);

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
