import React, { Component } from 'react';
import { markCode } from "../../interfaces/ariticle";
import Article from "../../local/articleUtil";
import Login from "../../components/Login/Login";
import "./article.scss";

export default class componentName extends Component {

    toTop = ()=>{
        const content = this._article.parentNode;
        content.scrollTop = 0;
    }


    render() {

        const articleId = parseInt(this.props.match.params.id);
        const article = Article.get(articleId);

        return (
            <div className="article" ref={_article => this._article = _article}>
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
                <Login></Login>
                <div className="pagination">
                    <span className="top" onClick={this.toTop}>Top</span>
                </div>
            </div>
        )
    }
}
