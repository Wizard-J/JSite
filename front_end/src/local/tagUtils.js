const tagTool = {}

// 通过id从列表中获取标签
tagTool.get = id => {
    let targetId = -1;
    const tags = window.localStorage.getItem("tags") ? JSON.parse(window.localStorage.getItem("tags")) : [];
    tags.forEach((item, index) => {
        if (item.id === id) targetId = index;
    });
    if (targetId !== -1) return tags[targetId];
    else return null;
}

// 获取标签列表
tagTool.getList = () => {
    return window.localStorage.getItem("tags") ? JSON.parse(window.localStorage.getItem("tags")) : null;
}

// 将标签列表保存起来
tagTool.save = (tagArr) => {
    window.localStorage.setItem("tags", JSON.stringify(tagArr));
}

// 删除标签
tagTool.delete = (id) => {
    const tags = window.localStorage.getItem("tags") ? JSON.parse(window.localStorage.getItem("tags")) : [];
    tags.forEach((item, index) => {
        if (item.id === id) tags.splice(index, 1);
    });
    window.localStorage.setItem("tags", JSON.stringify(tags));
}

// 新建标签
tagTool.create = (tag) => {
    const tags = window.localStorage.getItem("tags") ? JSON.parse(window.localStorage.getItem("tags")) : [];
    let targetIndex = -1;
    tags.forEach((item, index) => { // 去重
        if (item.id === tag.id) {
            tags.splice(index, 1, tag);
        }
    });
    if (targetIndex === -1) tags.unshift(tag);
    window.localStorage.setItem("tags", JSON.stringify(tags));
}


export default tagTool;