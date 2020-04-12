import instance from '@/utils/request.js'
// 获取学科信息
function getSubjectData(params) {
    return instance({
        url: '/subject/list',
        method: 'get',
        params,
    })
}
export { getSubjectData }