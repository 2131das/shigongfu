import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Welcome from '@/components/Welcome.vue'
import Users from '@/components/user/Users.vue'
import Roles from '@/components/role/Roles.vue'
import GoodsCate from '@/components/goods/GoodsCate.vue'
import GoodsList from '@/components/goods/GoodsList.vue'
import NotFound from '@/components/NotFound.vue'
import store from '@/store'
import Authoritysetup from '@/components/setup/Authoritysetup.vue'
import Systemsetup from '@/components/setup/Systemsetup.vue'

Vue.use(Router)


// 对应哪个路由
const userRule = { path: '/users', component: Users }
const roleRule = { path: '/roles', component: Roles }
const goodsRule = { path: '/goods', component: GoodsList }
const categoryRule = { path: '/categories', component: GoodsCate }
const authoritysetup = { path: '/authoritysetup', component: Authoritysetup }
const systemsetup = { path: '/systemsetup', component: Systemsetup }

const ruleMapping = {
  'users': userRule,
  'roles': roleRule,
  'goods': goodsRule,
  'categories': categoryRule,
  'authoritysetup': authoritysetup,
  'systemsetup': systemsetup
}

const router = new Router({
  routes: [
    { 
      path: '/', 
      redirect: '/home' 
    },
    { 
      path: '/login', 
      component: Login 
    },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        // { path: '/authoritysetup', component: Authoritysetup },
        // { path: '/systemsetup', component: Systemsetup },
        // { path: '/users', component: Users },
        // { path: '/roles', component: Roles },
        // { path: '/goods', component: GoodsList },
        // { path: '/categories', component: GoodsCate }
      ]
    },
    {  //404界面
      path: '*',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  const a = `${sessionStorage.getItem('token')}`
  console.log(a)
  if (to.path === '/login') {
    next()
  } else {
    const token = sessionStorage.getItem('token')
    if(!token) {
      next('/login')
    } else {
      next()
    }
  }
})

// 动态添加左侧菜单
export function initDynamicRoutes() {
  const currentRoutes = router.options.routes
  const rightList = store.state.rightList
  console.log(rightList)
  rightList.forEach(item => {
    if(item.children){
      item.children.forEach(item => {
        const itemRule = ruleMapping[item.path]
        itemRule.meta = item.rights
        currentRoutes[2].children.push(itemRule)
      })
    }
  })
  console.log(currentRoutes)
  router.addRoutes(currentRoutes)
}

export default router
