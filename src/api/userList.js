import instance from '@/utils/request.js'
// 获取用户信息
function getuserListData(params) {
    return instance({
        url: '/user/list',
        method: 'get',
        params,
    })
}
// 新增用户
function adduserListData(data) {
    return instance({
        url: '/user/add',
        method: 'post',
        data,
    })
}
// 用户状态
function setuserListStatus(data) {
    return instance({
        url: '/user/status',
        method: 'post',
        data,
    })
}
// 删除用户
function deluserListData(data) {
    return instance({
        url: '/user/remove',
        method: 'post',
        data,
    })
}
// 编辑用户
function edituserListData(data) {
    return instance({
        url: '/user/edit',
        method: 'post',
        data,
    })
}
export { getuserListData, adduserListData, setuserListStatus, deluserListData,edituserListData }