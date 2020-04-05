import Vue from 'vue';

// import Login from '../view/login/login.vue'
import Login from '@/view/login/login.vue'

// 导入路由
import VouRouter from 'vue-router';
Vue.use(VouRouter);
const router = new VouRouter({
    routes: [
        {path:'/',component:Login}
    ]
});
export default router;