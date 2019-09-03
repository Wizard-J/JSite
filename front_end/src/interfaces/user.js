import Axios from "axios";


export async function getUser(qqNum) {
    return Axios.get("/get/sign?uins=" + qqNum)
}