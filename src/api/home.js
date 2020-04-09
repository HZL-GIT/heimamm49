import instance from '@/utils/register'
function getUserInfo(params) {
    return instance({
        url: '/info',
        method: 'get',
        params,
    })
}
export {getUserInfo}