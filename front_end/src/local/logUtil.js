const logTool = {}

// 获取标签列表
logTool.getList = () => {
    return window.sessionStorage.getItem("logs") ? JSON.parse(window.sessionStorage.getItem("logs")) : null;
}

// 将标签列表保存起来
logTool.save = (logArr) => {
    window.sessionStorage.setItem("logs", JSON.stringify(logArr));
}

// 删除标签
logTool.delete = (id) => {
    const logs = window.sessionStorage.getItem("logs") ? JSON.parse(window.sessionStorage.getItem("logs")) : [];
    logs.forEach((item, index) => {
        if (item.id === id) logs.splice(index, 1);
    });
    window.sessionStorage.setItem("logs", JSON.stringify(logs));
}


export default logTool;