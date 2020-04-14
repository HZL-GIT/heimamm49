import instance from '@/utils/request.js'
// 获取企业信息
function getBusinessData(params) {
    return instance({
        url: '/enterprise/list',
        method: 'get',
        params,
    })
}
// 添加新的企业
function addBusinessData(data) {
    return instance({
        url: '/enterprise/add',
        method: 'post',
        data,
    })
}
// 企业状态修改
function setBusinessStatus(data) {
    return instance({
        url: '/enterprise/status',
        method: 'post',
        data,
    })
}
// 企业删除
function delBusinessData(data) {
    return instance({
        url: '/enterprise/remove',
        method: 'post',
        data,
    })
}
// 企业编辑
function editlBusinessData(data) {
    return instance({
        url: '/enterprise/edit',
        method: 'post',
        data,
    })
}
export { getBusinessData, addBusinessData, setBusinessStatus, delBusinessData, editlBusinessData }