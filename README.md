# [vue-select-person](https://terryz.github.io/vue/#/page) &middot;[![npm version](https://img.shields.io/npm/v/vue-select-person.svg)](https://www.npmjs.com/package/vue-select-person) [![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://mit-license.org/) [![npm download](https://img.shields.io/npm/dy/vue-select-person.svg)](https://www.npmjs.com/package/vue-select-person) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A simple personSelect, based on <strong>Vue2</strong>;
一个基于 [Element-UI](https://github.com/ElemeFE/element) 二次封装的人员选择器

## Installation

```
npm i -S vue-select-person
```

Include and install plugin in your `main.js` file.

```js
import Vue from 'vue'
import selectPerson from 'vue-select-person'
Vue.use(selectPerson)
```

You also can use `vue-select-person` in local component

```vue
<template>
  <select-person></select-person>
</template>

<script>
export default {
}
</script>
```

## Usage

```vue
<template>
  <select-person
    :data="data"
    @check-change="checkChange"
  ></select-person>
</template>

<script>
export default {
  data () {
    return {
      data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }],
    }
  },
  methods: {
    // receive check info change callback
    checkChange (List) {
      console.log(List) 
    }
  }
}
</script>
```

![Image text](https://raw.githubusercontent.com/hongmaju/light7Local/master/img/productShow/20170518152848.png)



#### Attributes


| Name           | Type     | Required | default | Description                     |
| -------------- | -------- | -------- | --------------- |  ------------------------------- |
| placeholder    | `string` | --       | 请输入姓名/部门搜索 | 搜索框提示语                     |
| empty-text	 | `string` | --       | 暂无数据       | 内容为空的时候展示的文本          |
| nodeKey        | `string` | --       | --       |  对象的唯一值，一般用id，不要用循环的index(每个树节点用                                            来作为唯一标识的属性，整棵树应该是唯一的) |
| show-check-box | `boolean`| --       | true       |  节点是否可被选择（控制单选还是多选）|
| data           | `object` | --       | --       | 展示数据(树)               |
| defaultProps   | `object` | --       | defaultProps: {children: 'children', label: 'label'}       |  配置选项, 具体参考 https://element.eleme.io/#/zh-CN/                                                   component/tree   |
| defaultChecked | `object` | --       | --       |  默认勾选的节点的数组   |


#### Events

| Name           | Description                | CallBack                     |
| -------------- | ------------------------   | ---------------------------- |
| check-change   | 点击确认按钮的回调         |选中的节点                    |
