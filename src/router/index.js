import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/Home.vue'),
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('../views/home/welcome/Welcome.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/home/user/UserList.vue')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import('../views/home/role/RoleList.vue')
      }
    ]
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    const token = sessionStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
