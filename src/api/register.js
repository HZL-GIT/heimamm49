import axios from 'axios';
import { Message } from 'element-ui';
// 自定义实例默认值
var instance = axios.create({
    baseURL: process.env.VUE_APP_URL,   //设置基地址
    withCredentials: true //跨域照样协带cookie
});

// 拦截器
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.data.code == 200) {
        // 因为返回数据里面axios帮我们额外的包了一层data但实际我们基本不用，所以我们把它干掉
        return response.data;
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


function getPhoneCode(data) {
    return instance({
        url: '/sendsms',
        method: 'post',
        data: data,
    })
}
function register(data) {
    return instance({
        url: '/register',
        method: 'post',
        data
    })
}

// export default getPhoneCode

// 在js中使用export 
// - export {a}    export {b}   
// - 它是与import对应使用   import {a}  from "export js"
// - 它们二个之间就是一个解构赋值     {a}  =    {a,b}
// - 注意点：命名方面需要一样，export可以写多个
export { getPhoneCode, register }