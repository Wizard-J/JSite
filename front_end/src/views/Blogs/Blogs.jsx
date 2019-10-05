import React, { Component } from 'react';
import ArticleBlock from "../../components/ArticleBlock/ArticleBlock";
import { listArticles } from "../../interfaces/ariticle";
import Article from "../../local/articleUtil";
import { setTimeout } from 'timers';

export default class componentName extends Component {

    _UNMOUNTED = false // 组件卸载标记，true表示已卸载

    state = {
        data: [],
    }
    componentWillUnmount() {
        this._UNMOUNTED = true;
        window._wizard.content_scrollTop = this._articles.scrollTop;
    }

    componentDidMount() {
        
        setTimeout(() => {
            const height = document.getElementsByClassName("article-block")[0] ? getComputedStyle(document.getElementsByClassName("article-block")[0]).height : 0;
            const articleNum =!!height ? Math.ceil(this._articles.offsetHeight/parseInt(height)) : 4;
            let start = this.state.data.length;
            console.log("start:",start,"num:",articleNum*2)// 每次获取2倍首屏能够展示的文章数量
            this.getArticle(start,articleNum*2); // 获取第一页
        })
        if (window._wizard.content_scrollTop) { // 异步设置，保证能够正确获取scrollTop
            setTimeout(() => { this._articles.scrollTo(0, window._wizard.content_scrollTop) })
        }
    }

    getArticle = (start,pageNum) => {
        let localArticle = Article.getList();
        if (localArticle.length > start+pageNum) { // 本地存储
            this.setState({
                data: localArticle
            })
            return;
        }
        listArticles(start,pageNum).then(res => {
            if (res.data.status === "OK") { // 请求成功
                localArticle = localArticle.concat(res.data.result);
                Article.save(localArticle);

                if (this._UNMOUNTED) return;
                this.setState({
                    data: localArticle
                })
            }
        })
            .catch(err => {
                console.log(err)
            })
    }

    render() {

        return (
            <div className="ariticles" style={{ height: "100%", overflowY: "scroll" }} ref={_articles => this._articles = _articles}>
                {
                    this.state.data.map((item, index) => {
                        return <ArticleBlock key={item.id} to={"/article/" + item.id} {...item} />
                    })
                }
            </div>
        )
    }
}
