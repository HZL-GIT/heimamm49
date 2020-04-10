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
import VouRouter from 'vue-router';
Vue.use(VouRouter);
const router = new VouRouter({
    routes: [
        { path: '/', component: Login },
        {
            path: '/home',
            //利用路由重定向，实现页面一进入就默认加载某个组件
            redirect: '/home/subject',
            component: Layout,
            children: [
                { path: 'chart', component: chart },
                { path: 'userList', component: userList },
                { path: 'question', component: question },
                { path: 'business', component: business },
                { path: 'subject', component: subject }
            ],
        },
    ],
});
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//路由进入拦截
router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
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

router.afterEach((to,from) => {
    //路由进入后的处理
    NProgress.done()
    window.console.log(from)
})
export default router;