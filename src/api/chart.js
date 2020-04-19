import instance from '@/utils/request.js'
// 获取图表数据
function getChartData(data) {
    return instance({
        url: '/data/title',
        method: 'post',
        data,
    })
}
// 获取企业题目数据
function getStatistics(data) {
    return instance({
        url: '/data/statistics',
        method: 'post',
        data,
    })
}
export { getChartData,getStatistics }