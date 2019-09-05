const articleTool = {}


// 通过id从列表中获取文章
articleTool.get = id => {
    let targetId = -1;
    const articles = window.localStorage.getItem("articles") ? JSON.parse(window.localStorage.getItem("articles")) : [];
    articles.forEach((item, index) => {
        if (item.id === id) targetId = index;
    });
    if (targetId !== -1) return articles[targetId];
    else return null;
}

// 获取文章列表
articleTool.getList = () => {
    return window.localStorage.getItem("articles") ? JSON.parse(window.localStorage.getItem("articles")) : null;
}

// 将文章列表保存起来
articleTool.save = (articleArr) => {
    window.localStorage.setItem("articles", JSON.stringify(articleArr));
}

// 删除文章
articleTool.delete = (id) => {
    const articles = window.localStorage.getItem("articles") ? JSON.parse(window.localStorage.getItem("articles")) : [];
    articles.forEach((item, index) => {
        if (item.id === id) articles.splice(index, 1);
    });
    window.localStorage.setItem("articles", JSON.stringify(articles));
}

// 新建文章
articleTool.create = (article) => {
    const articles = window.localStorage.getItem("articles") ? JSON.parse(window.localStorage.getItem("articles")) : [];
    let targetIndex = -1;
    articles.forEach((item, index) => { // 去重
        if (item.id === article.id) {
            articles.splice(index, 1, article);
            targetIndex = index;
        }
    });
    if (targetIndex === -1) articles.unshift(article);
    window.localStorage.setItem("articles", JSON.stringify(articles));
}


export default articleTool;