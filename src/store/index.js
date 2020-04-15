// Vuex 共享数据管理
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        userInfo: '',//登录者的个人信息
        roleObj: {//账号的 角色 划分
            1: "超级管理员",
            2: "管理员",
            3: "老师",
            4: "学生"
        },
        role:'超级管理员'//默认先给最大权限让他进来再说，在获取到真实角色时再处理
    }
})
export default store