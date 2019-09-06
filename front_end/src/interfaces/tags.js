import Axios from "axios";

const cookie = document.cookie;
const reg = /csrftoken=(?<csrftoken>.+)/;
const CSRFTOKEN = reg.exec(cookie).groups.csrftoken;

// 新建标签
export async function newTag(tagObj) {
    const form = new FormData();
    for (let field in tagObj) {
        form.append(field, tagObj[field])
    }
    if (!tagObj.createdBy) form.append("createdBy", "佚名")
    form.append("csrfmiddlewaretoken", CSRFTOKEN)
    return Axios.post("/api/new/tag", form)
}

// 获取标签列表
export async function listTags() {
    return Axios.get("/api/list/tags")
}

// 删除标签
export async function delTag(id) {
    return Axios.get("/api/del/tag?id=" + id)
}