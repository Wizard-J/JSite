import Axios from "axios";
import qs from "qs";

// 获取当日的日志
export async function listLog() {
    return Axios.get("/list/log")
}

// 获取目标日期范围内的日志列表
export async function getLogs(datestring) {
    return Axios.get("/get/logs",
        {
            params: {
                datestring: datestring
            },
            paramsSerializer: function (params) {
                return qs.stringify(params, { arrayFormat: 'repeat' })
            }
        }
    )
}