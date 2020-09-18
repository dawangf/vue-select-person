<!--
 * @file: select-person.
 * @authors: dawangf (dawangf@sina.com).
 * @createDate: 2020/9/12.
 * @version: 1.0.
 * @copyright © 2020 新和兴 All rights reserved.
 -->

<template>
  <div class="selector-tree">
    <div class="w50p">
      <el-input
          :placeholder="placeholder"
          v-model="filterText">
      </el-input>
      <div class="selector-tree-content">
        <el-tree
            ref="tree"
            class="filter-tree"
            :empty-text="emptyText"
            :data="data"
            :props="defaultProps"
            :show-checkbox="showCheckbox"
            :node-key="nodeKey"
            :default-checked-keys="checkedKeys"
            :highlight-current="!showCheckbox"
            :current-node-key="currentNodeKey"
            :filter-node-method="filterNode"
            default-expand-all
            @node-click="handleNodeClick"
            @check-change="handleCheckChange"
            @check="handleCheck">
        </el-tree>
      </div>
    </div>
    <div class="w50p">
      <div class="selector-tree-content result">
        <div class="result-wrap">
          <div class="cell" v-for="item in resultList" :key="item[nodeKey]">
            <div class="cell-content" :title="item[defaultProps.label]">{{ item[defaultProps.label] }}</div>
            <i class="el-icon-close" @click="removeResult(item)"></i>
          </div>
          <!-- 暂无数据 -->
          <div class="el-tree__empty-block" v-if="resultList && !resultList.length">
            <span class="el-tree__empty-text">{{ emptyText }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="btns">
      <el-button type="primary" @click="handerSure">确定</el-button>
    </div>
  </div>
</template>

<script>
import {Input, Button, Tree} from 'element-ui'
import 'element-ui/lib/theme-chalk/icon.css'

export default {
  name: 'selectPerson',
  data() {
    return {
      isVisible: this.visible,
      resultList: this.defaultChecked,
      parentNodes: [],
      filterText: ''
    }
  },
  props: {
    // 弹窗显示隐藏
    visible: {
      type: Boolean,
      default: false
    },
    // 弹窗名称
    title: {
      type: String,
      default: '人员选择器'
    },
    // 搜索框提示语
    placeholder: {
      type: String,
      default: '请输入姓名/部门搜索'
    },
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    // 对象的唯一值，一般用id，不要用循环的index(每个树节点用来作为唯一标识的属性，整棵树应该是唯一的)
    nodeKey: {
      type: String,
      default: 'id'
    },
    // 节点是否可被选择
    showCheckbox: {
      type: Boolean,
      default: true
    },
    // 展示数据
    data: {
      type: Array,
      default: () => []
    },
    // 配置选项, 具体参考 https://element.eleme.io/#/zh-CN/component/tree
    defaultProps: {
      type: Object,
      default: () => {
        return {
          children: 'children',
          label: 'label'
        }
      }
    },
    // 默认勾选的节点的数组
    defaultChecked: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    visible(val) {
      this.isVisible = val
    }
  },
  computed: {
    // 【多选模式】 默认勾选的节点的 key 的数组
    checkedKeys() {
      return this.defaultChecked.map(value => value[this.nodeKey])
    },
    // 【单选模式】默认选中的节点的 key
    currentNodeKey() {
      let _tmp = ''
      if (!this.showCheckbox && this.defaultChecked && this.defaultChecked.length) {
        _tmp = this.defaultChecked[0][this.nodeKey]
      }
      return _tmp
    }
  },
  components: {
    elInput: Input, elButton: Button, elTree: Tree
  },
  mounted() {
    this.parentNodes = this.filterParent(this.data)
    console.log('data:', this.data, this.parentNodes )
  },
  methods: {
    /**
     * 获取所有父节点
     * @author: dawangf(dawangf@sina.com)
     * @createDate: 2020/7/29
     */
    filterParent(data, list = []) {
      const ListKey = this.defaultProps['children']
      data.forEach(value => {
        if (value[ListKey] && value[ListKey].length) {
          this.filterParent(value[ListKey], list)
          list.push(value)
        }
      })
      return list
    },
    /**
     * 获取所有的子元素的key
     * @author: dawangf(dawangf@sina.com)
     * @createDate: 2020/7/29
     * @param childrens
     * @param list
     * @return {any[]}
     */
    // filterChildrenKeys(childrens, list = []) {
    //   const ListKey = this.defaultProps['children']
    //   childrens.forEach(value => {
    //     if (value[ListKey] && value[ListKey].length) this.filterChildrenKeys(value[ListKey], list)
    //     list.push(value[this.nodeKey])
    //   })
    //   return list
    // },
    /**
     * 关闭/取消按钮事件
     * @author: dawangf(dawangf@sina.com)
     * @createDate: 2020/7/24
     */
    closeDialog() {
      console.log('closeDialog:',)
      this.$emit('update:visible', false)
      this.$emit('closeDialog')
    },
    /**
     * 确定按钮事件
     * @author: dawangf(dawangf@sina.com)
     * @createDate: 2020/7/24
     * @return {ElMessageComponent}
     */
    handerSure() {
      console.error('resultList', this.resultList)
      // if (this.resultList && this.resultList.length < 1) return this.$message.warning('请先选择数据')
      this.$emit('update:visible', false)
      this.$emit('check-change', this.resultList)
    },
    /**
     * 删除选中的数据
     * @author: dawangf(dawangf@sina.com)
     * @createDate: 2020/7/24
     * @param item {Object} 当前对象信息
     */
    removeResult(item) {
      console.error('this.removeResult',  item)
      // const _List = this.parentNodes.filter(value => value[this.nodeKey] === item[this.nodeKey])
      // let _tmpArr = this.filterChildrenKeys(_List)
      // _tmpArr.unshift(item[this.nodeKey])
      // // 过滤掉父节点
      // _tmpArr.forEach(value => {
      //   this.resultList = this.resultList.filter(val => return val[this.nodeKey] !== value)
      // })

      // 【单选】清除当前选中状态
      if(!this.showCheckbox) this.$refs.tree.setCurrentKey()

      // 删除子菜单
      this.resultList = this.resultList.filter(val => val[this.nodeKey] !== item[this.nodeKey])
      // 设置某个节点的勾选状态
      this.$refs.tree.setChecked(item[this.nodeKey], false, true)
      console.log('this.tmpCheckedKeys:',  this.resultList)
    },
    /**
     * 点击获取当前菜单(单选会触发当前前方法)
     * @author: dawangf(dawangf@sina.com)
     * @createDate: 2020/7/24
     * @param {Object} data
     */
    handleNodeClick(data) {
      console.log('this.currentNodeKey', this.currentNodeKey)
      console.log(data)
      if (!this.showCheckbox) {
        this.resultList = []
        this.resultList.push(data)
      }
    },
    /**
     * 节点选中状态发生变化时的回调
     * @author: dawangf(dawangf@sina.com)
     * @createDate: 2020/7/24
     * @param data
     * @param checked
     * @param indeterminate
     */
    handleCheckChange(data, checked, indeterminate) {
      console.log('handleCheckChange:', data, checked, indeterminate);
    },
    /**
     * 当复选框被点击的时候触发
     * @author: dawangf(dawangf@sina.com)
     * @createDate: 2020/7/24
     * @param current
     * @param data
     */
    handleCheck(current, data) {
      console.log(current, 'data', data);
      this.parentNodes.forEach(value => {
        data.checkedNodes = data.checkedNodes.filter(menu => menu[this.nodeKey] !== value[this.nodeKey])
      })
      this.resultList = data.checkedNodes
      console.error('未选中', this.$refs.tree.getHalfCheckedKeys())
    },
    /**
     * 树节点进行筛选时执行的方法
     * @author: dawangf(dawangf@sina.com)
     * @createDate: 2020/7/24
     * @param value
     * @param data
     * @return {boolean}
     */
    filterNode(value, data) {
      if (!value) return true
      return data[this.defaultProps.label].indexOf(value) !== -1
    }
  }
}
</script>

<style lang="scss">
.selector-tree {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px;
  border: 1px solid #DCDFE6;
  box-sizing: border-box;

  .w50p {
    width: 49%;
  }

  .btns {
    margin-top: 10px;
    width: 100%;
    text-align: right;
  }

  &-content {
    margin-top: 15px;
    height: 300px;
    padding: 10px 5px 10px 10px;
    border: solid 1px #DCDFE6;

    .el-tree {
      width: 100%;
      height: 100%;
    }

    &.result {
      margin-top: 0;
      height: 355px;

      .result-wrap {
        height: 100%;
        overflow: auto;

        .cell {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-left: 15px;
          color: #000000;
          line-height: 35px;

          &-content {
            overflow: hidden; //隐藏文字
            text-overflow: ellipsis; //显示...
            white-space: nowrap; //不换行
          }

          .el-icon-close {
            padding: 0 10px;
            color: #000000;
            font-size: 18px;
            cursor: pointer;
          }
        }

        .empty-block {
          position: relative;
          min-height: 60px;
          text-align: center;
          width: 100%;
          height: 100%;
          color: #909399;
          font-size: 14px;

          .empty-text {

          }
        }
      }
    }
  }
}
</style>
