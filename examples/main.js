import Vue from 'vue'
import App from './App.vue'
import selectPerson from '../packages/select-person'

// 注册组件库
Vue.use(selectPerson)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
