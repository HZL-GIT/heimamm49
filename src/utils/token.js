// 保存token
function saveToken(val) {
    window.localStorage.setItem('token', val)
}
// 获取token
function getToken(name = 'token') {
    return window.localStorage.getItem(name)
}
// 删除token
function removeToken(name = 'token') {
    window.localStorage.removeItem(name)
}
export { saveToken, getToken, removeToken }