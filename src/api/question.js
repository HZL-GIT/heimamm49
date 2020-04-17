import instance from '@/utils/request.js'
// 获取企业信息
function getQuestionData(params) {
    return instance({
        url: '/question/list',
        method: 'get',
        params,
    })
}
export { getQuestionData }