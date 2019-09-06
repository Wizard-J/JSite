import Axios from "axios";


export async function getUser(qqNum) {
    return Axios.get("/api/get/sign?uins=" + qqNum)
}