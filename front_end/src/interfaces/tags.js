import Axios from "axios";


export async function newTag(tagObj) {
    const form = new FormData();
    for (let field in tagObj) {
        form.append(field, tagObj[field])
    }
    if (!tagObj.createdBy) form.append("createdBy", "佚名")
    return Axios.post("/new/tag", form)
}