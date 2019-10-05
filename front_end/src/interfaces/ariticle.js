import Axios from "axios";
import marked from "marked";
import hljs from "highlight.js";
import { getCSRF } from "./user";


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
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    },
});

// mark编译
export function markCode(code) {
    return marked(code)
}

// 保存文章
export async function newArticle(articleObj) {
    return getCSRF().then(CSRFTOKEN => {
        const form = new FormData();
        form.append("title", articleObj.title)
        form.append("author", articleObj.author ? articleObj.author : "Wizard J")
        form.append("content", articleObj.content)
        form.append("tagId", articleObj.tagId)
        form.append("csrfmiddlewaretoken", CSRFTOKEN)
        return Axios.post("/api/new/article", form)
    })
}

// 获取文章列表
export async function listArticles(offset,limit) {
    return Axios.get("/api/list/articles?limit=" + limit + "&offset=" + offset)
}