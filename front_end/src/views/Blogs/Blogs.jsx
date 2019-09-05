import React, { Component } from 'react';
import ArticleBlock from "../../components/ArticleBlock/ArticleBlock";
import { listArticles } from "../../interfaces/ariticle";
import Article from "../../local/articleUtil";

export default class componentName extends Component {

    _UNMOUNTED = false // 组件卸载标记，true表示已卸载

    state = {
        data:[],
    }
    componentWillUnmount(){
        this._UNMOUNTED = true;
    }

    componentDidMount(){
        this.getArticle(1); // 获取第一页
    }

    getArticle = pageNum=>{
        if(Article.getList()){
            this.setState({
                data:Article.getList()
            })
            return;
        }
        listArticles(pageNum).then(res=>{
            if(this._UNMOUNTED) return;
            if(res.data.status==="OK"){ // 请求成功
                Article.save(res.data.result);
                this.setState({
                    data:res.data.result
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="ariticles" style={{height:"100%",overflowY:"scroll"}}>
                {
                    this.state.data.map((item,index)=>{
                        return <ArticleBlock key={item.id} to={"/article/"+item.id} {...item}/>
                    })
                }
            </div>
        )
    }
}
