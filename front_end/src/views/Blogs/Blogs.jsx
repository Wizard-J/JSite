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
            // 返回页面时获取到之前的页面位置
            if (window._wizard.content_scrollTop) { // 异步设置，保证能够正确获取scrollTop
                this._articles.scrollTo(0, window._wizard.content_scrollTop)
            }

            // 懒加载
            const viewHeight = this._articles.offsetHeight;
            const articleBlock = document.getElementsByClassName("article-block")[0];

            const height = articleBlock ? getComputedStyle(articleBlock).height : 0;
            const limit = !!height ? Math.ceil(viewHeight / parseInt(height)) : 4;
            this.setState({ limit: limit * 2 })
            let offset = this.state.data.length;
            // console.log("offset:",offset,"limit:",limit*2)// 每次获取2倍首屏能够展示的文章数量
            this.getArticle(offset, limit * 2); // 获取第一页
            this._articles.onscroll = () => {
                if (this._articles.scrollHeight - (this._articles.scrollTop + viewHeight) <= 0) {
                    this.requestMore()
                }
            }
        })
    }


    getArticle = (offset, limit) => {
        let localArticle = Article.getList();

        if (localArticle && localArticle.length >= offset + limit) { // 本地存储
            this.setState({
                data: localArticle
            })
            return;
        }
        listArticles(offset, limit).then(res => {
            if (res.data.status === "OK") { // 请求成功
                if(res.data.result && res.data.result.length < limit ) this._articles.onscroll = null;
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

    // 需要被节流的 函数
    // 当页面滚动到剩下一个block的时候，再次发起请求，下一页,重新绑定scroll事件
    requestMore = () => {
        console.log("request more")
        const data = this.state.data;
        const offset = data ? data.length : 0;
        const limit = this.state.limit;
        this.getArticle(offset, limit); // 请求新的文章
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
