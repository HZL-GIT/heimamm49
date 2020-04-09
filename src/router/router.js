import Vue from 'vue';

// import Login from '../view/login/login.vue'
import Login from '@/view/login/login.vue'
import Layout from '@/view/home/layout.vue'

// 导入路由
import VouRouter from 'vue-router';
Vue.use(VouRouter);
const router = new VouRouter({
    routes: [
        { path: '/', component: Login },
        { path: '/home', component: Layout }
    ]
});
export default router;