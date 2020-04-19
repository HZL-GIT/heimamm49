import instance from '@/utils/request.js'
// 获取题目列表信息
function getQuestionData(params) {
    return instance({
        url: '/question/list',
        method: 'get',
        params,
    })
}
// 新增题目
function addQuestionData(data) {
    return instance({
        url: '/question/add',
        method: 'post',
        data,
    })
}
// 修改题目状态
function setQuestionstatus(data) {
    return instance({
        url: '/question/status',
        method: 'post',
        data,
    })
}
// 删除题目
function delQuestionData(data) {
    return instance({
        url: '/question/remove',
        method: 'post',
        data,
    })
}
// 编辑题目
function editQuestionData(data) {
    return instance({
        url: '/question/edit',
        method: 'post',
        data,
    })
}
export { getQuestionData,addQuestionData,setQuestionstatus,delQuestionData,editQuestionData }