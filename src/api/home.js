import instance from '@/utils/request.js'
// 获取用户信息
function getUserInfo(params) {
    return instance({
        url: '/info',
        method: 'get',
        params,
    })
}
// 退出用户登录
function exitLogin() {
    return instance({
        url: '/logout',
        method: 'get',
    })
}
export {getUserInfo,exitLogin}