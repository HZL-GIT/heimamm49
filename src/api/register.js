import instance from '@/utils/request.js'
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