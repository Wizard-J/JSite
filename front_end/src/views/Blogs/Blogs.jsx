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
        this.getArticle(1); // 获取第一页
        if(window._wizard.content_scrollTop){
            setTimeout(()=>{this._articles.scrollTo(0,window._wizard.content_scrollTop)},0)
            
        }
    }

    getArticle = pageNum => {
        if (Article.getList()) {
            this.setState({
                data: Article.getList()
            })
            return;
        }
        listArticles(pageNum).then(res => {
            if (this._UNMOUNTED) return;
            if (res.data.status === "OK") { // 请求成功
                Article.save(res.data.result);
                this.setState({
                    data: res.data.result
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
