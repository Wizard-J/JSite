import React, { Component } from 'react';
import ArticleBlock from "../../components/ArticleBlock/ArticleBlock";
import { listArticles } from "../../interfaces/ariticle";
import Article from "../../local/articleUtil";
import { setTimeout } from 'timers';

export default class componentName extends Component {

    _UNMOUNTED = false // 组件卸载标记，true表示已卸载

    state = {
        data: [],
        limit: 0
    }
    componentWillUnmount() {
        this._UNMOUNTED = true;
        window._wizard.content_scrollTop = this._articles.scrollTop;
    }

    componentDidMount() {
        
        setTimeout(() => {
            const height = document.getElementsByClassName("article-block")[0] ? getComputedStyle(document.getElementsByClassName("article-block")[0]).height : 0;
            const limit =!!height ? Math.ceil(this._articles.offsetHeight/parseInt(height)) : 4;
            this.setState({limit})
            let offset = this.state.data.length;
            // console.log("offset:",offset,"limit:",limit*2)// 每次获取2倍首屏能够展示的文章数量
            this.getArticle(offset,limit*2); // 获取第一页
        })
        if (window._wizard.content_scrollTop) { // 异步设置，保证能够正确获取scrollTop
            setTimeout(() => { this._articles.scrollTo(0, window._wizard.content_scrollTop) })
        }

    }

    getArticle = (offset,limit) => {
        let localArticle = Article.getList();

        if (localArticle && localArticle.length >= offset+limit) { // 本地存储
            this.setState({
                data: localArticle
            })
            return;
        }
        listArticles(offset,limit).then(res => {
            if (res.data.status === "OK") { // 请求成功
                localArticle = localArticle ? localArticle.concat(res.data.result) : res.data.result;
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

    // 当页面滚动到剩下一个block的时候，再次发起请求，下一页
    requestMore = ()=>{
        const data = this.state.data;
        const offset = data ? data.length : 0;
        const limit = this.state.limit;

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
