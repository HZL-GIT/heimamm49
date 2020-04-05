import Vue from 'vue'
import App from './App.vue'

import router from '@/router/router.js'


// 导入element插件
import ElementUI from 'element-ui';
// 导入element响应的css样式
import 'element-ui/lib/theme-chalk/index.css';
// 注册element-ui
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
