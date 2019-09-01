import Axios from "axios";
import { message } from "antd";

// 保存各种接口

// 保存文章
export async function saveArticle(articleObj) {
    const form = new FormData();
    form.append("title",articleObj.title)
    form.append("author",articleObj.author?articleObj.author:"Wizard J")
    form.append("content",articleObj.content)
    return Axios.post("save/article",form)
        .then(res=>{
            console.log(res)
            if(res.data.status==="OK"){
                message.success("保存成功")
            }else{
                throw new Error(res.data.message)
            }
        })
        .catch(err =>{
            message.error("保存失败:",err)
            console.log(err)
        })
    
}