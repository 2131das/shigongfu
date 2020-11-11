import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const a = {
  '/users': '用户列表',
  '/roles': '角色管理',
  '/goods': '商品列表',
  '/categories': '商品分类',
  '/systemsetup':'商品列表',
  '/authoritysetup':'商品列表',
}
export default new Vuex.Store({
  state: {
    rightList:JSON.parse(localStorage.getItem('rightList')||'[]'),
    username: localStorage.getItem('username'),
    tabList:[{
      name:'主页',
      type:''
    }]
  },
  mutations: {
    selectMenu(state,val){
    },
    addMenu(state,val){
      const b = a[val]
      const result = state.tabList.findIndex(item => item.name === b)  //判断有没有这个标签
      if(result == -1){
        state.tabList.push({
          name:b
        })
      }
    },
    setRightList(state, data) {
      state.rightList = data
      localStorage.setItem('rightList',JSON.stringify(data))
    },
    setUsername(state, data) {
      state.username = data
      localStorage.setItem('username',data)
    }
  },
  actions: {
  },
  getters: {
  }
})
