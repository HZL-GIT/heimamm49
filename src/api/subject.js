import instance from '@/utils/request.js'
// 获取学科信息
function getSubjectData(params) {
    return instance({
        url: '/subject/list',
        method: 'get',
        params,
    })
}
// 禁用按钮状态设置
function getSubjectStatus(data) {
    return instance({
        url: '/subject/status',
        method: 'post',
        data,
    })
}
// 删除按钮  学科删除
function delSubjectData(data) {
    return instance({
        url: '/subject/remove',
        method: 'post',
        data,
    })
}
// 新增按钮  学科添加
function addSubjectData(data) {
    return instance({
        url: '/subject/add',
        method: 'post',
        data,
    })
}
// 编辑按钮  学科编辑
function editSubjectData(data) {
    return instance({
        url: '/subject/edit',
        method: 'post',
        data,
    })
}
export { getSubjectData, getSubjectStatus, delSubjectData, addSubjectData, editSubjectData }