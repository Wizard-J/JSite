import Axios from "axios";

// 获取用户名
export async function getUser(qqNum) {
    return Axios.get("/api/get/sign?uins=" + qqNum)
}

// 访问admin，获取csrf
export async function getCSRF() {
    return Axios.get("/api/admin/login/")
}