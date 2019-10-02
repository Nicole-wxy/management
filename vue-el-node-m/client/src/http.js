import axios from 'axios'
import router from './router'
import { Message, Loading } from 'element-ui'

let loading
//开始动画
function starLoading() {
    loading = Loading.service({
        lock: true,
        text: "拼命加载中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.8)"
    })
}
//结束动画
function endLoading() {
    loading.close()
}
//请求拦截
axios.interceptors.request.use(config => {
    //加载动画
    starLoading()
    if (localStorage.eleToken) {
        config.headers.Authorization = localStorage.eleToken
    }
    return config
}, error => {
    return Promise.reject(error)
})
//响应拦截
axios.interceptors.response.use(response => {
    //结束动画
    endLoading()
    return response
}, error => {
    endLoading()
    Message.error({
        message: "注册失败"
    })
    const { status } = error.response
    if (status == 401) {
        Message.error({
            message: "token失效，请重新登录"
        })
        localStorage.removeItem('eleToken')
        router.push('/login')
    }
    return Promise.reject(error)
})
export default axios