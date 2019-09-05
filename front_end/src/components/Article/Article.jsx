import React, { Component } from 'react';
import { markCode } from "../../interfaces/ariticle";
import Article from "../../local/articleUtil";
import "./article.scss";

export default class componentName extends Component {


    render() {

        const articleId = parseInt(this.props.match.params.id);
        const article = Article.get(articleId);

        return (
            <div className="article">
                <div className="post">
                    <div className="post-info">
                        <span>Written by</span>
                        {article.author}
                        <br />
                        <span>on&nbsp;</span><time>{article.createdAt}</time>
                    </div>

                    <h1 className="post-title">{article.title}</h1>
                    <div className="post-line"></div>

                    <div className="content-preview" dangerouslySetInnerHTML={{__html:markCode(article.content)}} >
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
