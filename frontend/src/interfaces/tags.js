import Axios from "axios";
import {getCSRF} from "./user";

getCSRF();

// 新建标签
export async function newTag(tagObj) {
    return getCSRF().then(CSRFTOKEN => {
        const form = new FormData();
        for (let field in tagObj) {
            form.append(field, tagObj[field])
        }
        if (!tagObj.createdBy) form.append("createdBy", "佚名")
        form.append("csrfmiddlewaretoken", CSRFTOKEN)
        return Axios.post("/api/new/tag", form)
    })
}

// 获取标签列表
export async function listTags() {
    return Axios.get("/api/list/tags")
}

// 删除标签
export async function delTag(id) {
    return Axios.get("/api/del/tag?id=" + id)
}