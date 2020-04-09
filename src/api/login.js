import instance from '@/utils/register'
function toLogin(data) {
    return instance({
        url: '/login',
        method: 'post',
        data: data,
    })
}
export {toLogin}