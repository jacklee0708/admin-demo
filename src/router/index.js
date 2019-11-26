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
    component: () => import('../views/home/Home.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/test/Test.vue')
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
    console.log(token)
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
