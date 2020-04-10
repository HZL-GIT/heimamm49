import axios from 'axios';
import { Message } from 'element-ui';
import { getToken,removeToken } from '@/utils/token.js'
import router from '@/router/router.js'
// 自定义实例默认值
var instance = axios.create({
    baseURL: process.env.VUE_APP_URL,   //设置基地址
    withCredentials: true //跨域照样协带cookie
});

// 拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (getToken()) {
        config.headers.token = getToken()
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // 200 响应成功 返回数据
    if (response.data.code == 200) {
        // 因为返回数据里面axios帮我们额外的包了一层data但实际我们基本不用，所以我们把它干掉
        return response.data;
        // 206 token错误全局处理
    } else if (response.data.code == 206) {
        Message.error(response.data.message);// 提示用户错误
        router.push('/');//不能用this.$router因为this指向不明，而是直接导入route使用
        removeToken()//清除token
        return Promise.reject("error");
    } else {
        // 提示用户错误
        // 出错了我们还有必要返回数据出去吗？
        //抛出一个错误，不要让后面代码执行
        //只要return了一个Promise.reject("error")后面的接口的.then就不会执行了
        Message.error(response.data.message);
        return Promise.reject("error");
    }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance