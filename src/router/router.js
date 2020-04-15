import Vue from 'vue';

// import Login from '../view/login/login.vue'
import Login from '@/view/login/login.vue'
import Layout from '@/view/home/layout.vue'
import chart from '@/view/home/chart/chart.vue'
import userList from '@/view/home/userList/userList.vue'
import question from '@/view/home/question/question.vue'
import business from '@/view/home/business/business.vue'
import subject from '@/view/home/subject/subject.vue'
// 导入路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const router = new VueRouter({
    routes: [
        {
            path: '/',//路径地址
            component: Login,//组件名
            meta: {//路由元信息 meta  通过this.$router.meta.XXX进行访问
                title: '登录',
                rules: ['超级管理员', '管理员', '老师', '学生']//定义角色规则，用于判断登录的用户角色是否有权限进行访问
            }
        },
        {
            path: '/home',
            //利用路由重定向，实现页面一进入就默认加载某个组件
            redirect: '/home/subject',
            component: Layout,
            children: [
                {
                    path: 'chart',
                    component: chart,
                    meta: {
                        title: '数据概览',
                        rules: ['超级管理员', '管理员', '老师'],
                        icon: 'el-icon-pie-chart'//定义他们的字体图标，用于v-for循环，根据权限进行左侧列表显示与否时的字体图标使用
                    }
                },
                {
                    path: 'userList', component: userList,
                    meta: {
                        title: '用户列表',
                        rules: ['超级管理员', '管理员'],
                        icon: 'el-icon-user'
                    }
                },
                {
                    path: 'question',
                    component: question,
                    meta: {
                        title: '题库列表',
                        rules: ['超级管理员', '管理员', '老师'],
                        icon: 'el-icon-edit-outline'
                    }
                },
                {
                    path: 'business',
                    component: business,
                    meta: {
                        title: '企业列表',
                        rules: ['超级管理员', '管理员', '老师'],
                        icon: 'el-icon-office-building'
                    }
                },
                {
                    path: 'subject',
                    component: subject,
                    meta: {
                        title: '学科列表',
                        rules: ['超级管理员', '管理员', '老师', '学生'],
                        icon: 'el-icon-notebook-2'
                    }
                }
            ],
        },
    ],
});

// 特殊处理：为路由管理器的push方法做一次改造，加入 catch 异常处理
// 不加会出现 重复请求 就会 报错 的情况
let oldPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (url) {
    return oldPush.call(this, url).catch(err => err)
}

import NProgress from 'nprogress'//加载进度条的插件
import 'nprogress/nprogress.css'//加载进度条的插件的样式
import { Message } from 'element-ui';
import store from '@/store/index.js'
import { removeToken } from '@/utils/token.js'
//路由进入拦截   路由前守卫
router.beforeEach((to, from, next) => {
    NProgress.start()//进度条（插件）开始
    // 判断用户权限
    // 再次判断权限，以防止用户进入页面之后，再点击其他组件还可以进行访问（因为前面在layout中的判断是在created里面进行的，生命周期created钩子只会执行一次）
    if (to.meta.rules.includes(store.state.role)) {
        next()
    } else {
        Message.warning('您无权访问该页面')
        removeToken()
        next('/')
    }
    // window.console.log("to:", to)
    // window.console.log("from:", from)
    // if (to.fullPath == "/") {
    //     next("/home/sonb")
    // } else {
    //     next()
    // }
    //形成了一个死微循环  
    //不写next它就卡在那里了

    //to到哪去，需要进入的路由的基本信息   要去的路由的$route
    //from从哪来，来的那个路由的基本信息  从哪来的路由的$route
    //next() 给不给你过，给过就是next(),
    //不给过他可以把你换到另一个地方  next("可以写一个path把你甩到任意地方去，这里的next相当于一个$router.push后面控制 了）
    //如果next直接写死跳某地址如next("/")而没有next()它会形成了一个死循环，如从/到/它又走到了beforeEach里，又开始执行beforeEach,到了beforeEach又是从/到/形成死微循环,只有next()它就不会再跑到beforeEach里面来
})

router.afterEach((to, from) => {
    //路由进入后的处理    路由后守卫
    // 根据路由元信息修改网页标题
    // window.console.log('路由元信息：',this.$route)
    document.title = to.meta.title // to:要去的路由的$route

    NProgress.done()//进度条（插件）结束
    window.console.log(from)
})
export default router;