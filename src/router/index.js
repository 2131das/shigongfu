import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import NotFound from '@/components/NotFound.vue'
import store from '@/store'

Vue.use(Router)

// 对应哪个路由
const userRule = { path: '/users',component: () =>import('@/components/user/Users.vue')}
const roleRule = { path: '/roles', component: () =>import('@/components/role/Roles.vue') }
const goodsRule = { path: '/goods', component: () =>import('@/components/goods/GoodsList.vue') }
const categoryRule = { path: '/categories',  component: () =>import('@/components/goods/GoodsCate.vue')}
const authoritysetup = { path: '/authoritysetup', component: () =>import('@/components/setup/Authoritysetup.vue')}
const systemsetup = { path: '/systemsetup', component:() =>import('@/components/setup/Systemsetup.vue')}
const routing = { path: '/routing', component: () =>import('@/components/setup/Routing.vue') }
const namesw = { path: '/namesw', component:() =>import('@/components/setup/Namesw.vue') }

// 动态的注册组件
const ruleMapping = {
  'users': userRule,
  'roles': roleRule,
  'goods': goodsRule,
  'categories': categoryRule,
  'authoritysetup': authoritysetup,
  'systemsetup': systemsetup,
  'routing': routing,
  'namesw': namesw,
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
        { path: '/welcome', component: ()=>import('@/components/Welcome.vue') },
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
  const a = `${localStorage.getItem('token')}`
  if (to.path === '/login') {
    next()
  } else {
    const token = localStorage.getItem('token')
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
  rightList.forEach(item => {
    if(item.children){
      item.children.forEach(item => {
        const itemRule = ruleMapping[item.path]
        itemRule.meta = item.rights
        currentRoutes[2].children.push(itemRule)
      })
    }
  })
  router.addRoutes(currentRoutes)
}

export default router
