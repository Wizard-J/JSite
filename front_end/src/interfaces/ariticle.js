import Axios from "axios";
import marked from "marked";
import hljs from "highlight.js";

// 保存各种接口

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
    highlight: function(code) {
        return hljs.highlightAuto(code).value;
    },
});

// mark编译
export function markCode(code) {
    return marked(code)
}

// 保存文章
export async function saveArticle(articleObj) {
    const form = new FormData();
    form.append("title", articleObj.title)
    form.append("author", articleObj.author ? articleObj.author : "Wizard J")
    form.append("content", articleObj.content)
    return Axios.post("/save/article", form)
}

// 获取文章列表
export async function listArticle(pageNum) {
    return Axios.get("/list/articles?page=" + pageNum)
}