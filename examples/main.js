import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import selectPerson from '../packages/select-person'

// 注册组件库
Vue.use(ElementUI)
Vue.use(selectPerson)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
