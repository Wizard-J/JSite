import Axios from "axios";
import { message } from "antd";

// 获取用户名
export async function getUser(qqNum) {
    return Axios.get("/api/get/sign?uins=" + qqNum)
}

// 访问admin，获取csrf
export async function getCSRF() {
    return Axios.get("/api/admin/login/")
                .then(res=>{
                    if(res.status!==200) message.warn("服务器不在线")
                    else{
                        const cookie = document.cookie;
                        const reg = /csrftoken=(?<csrftoken>.+)/;
                        const CSRFTOKEN = reg.exec(cookie).groups.csrftoken;
                        return CSRFTOKEN;
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
}