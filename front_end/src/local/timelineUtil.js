const timelineTool = {}


// 通过id从列表中获取文章归档信息
timelineTool.get = id => {
    let targetId = -1;
    const timeline = window.sessionStorage.getItem("timeline") ? JSON.parse(window.sessionStorage.getItem("timeline")) : [];
    timeline.forEach((item, index) => {
        if (item.id === id) targetId = index;
    });
    if (targetId !== -1) return timeline[targetId];
    else return null;
}

// 获取文章归档信息列表
timelineTool.getList = () => {
    return window.sessionStorage.getItem("timeline") ? JSON.parse(window.sessionStorage.getItem("timeline")) : null;
}

// 将文章归档信息列表保存起来
timelineTool.save = (articleArr) => {
    window.sessionStorage.setItem("timeline", JSON.stringify(articleArr));
}

// 删除文章归档信息
timelineTool.delete = (id) => {
    const timeline = window.sessionStorage.getItem("timeline") ? JSON.parse(window.sessionStorage.getItem("timeline")) : [];
    timeline.forEach((item, index) => {
        if (item.id === id) timeline.splice(index, 1);
    });
    window.sessionStorage.setItem("timeline", JSON.stringify(timeline));
}

// 新建文章归档信息
timelineTool.create = (article) => {
    const timeline = window.sessionStorage.getItem("timeline") ? JSON.parse(window.sessionStorage.getItem("timeline")) : [];
    let targetIndex = -1;
    timeline.forEach((item, index) => { // 去重
        if (item.id === article.id) {
            timeline.splice(index, 1, article);
            targetIndex = index;
        }
    });
    if (targetIndex === -1) timeline.unshift(article);
    window.sessionStorage.setItem("timeline", JSON.stringify(timeline));
}

export default timelineTool;