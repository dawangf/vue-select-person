// src/index.js
// 导入组件，组件必须声明 name
import selectPerson from './src/select-person'

// 为组件提供 install 安装方法，供按需引入
selectPerson.install = function (Vue) {
  Vue.component(selectPerson.name, selectPerson)
}
// 默认导出组件
export default selectPerson
