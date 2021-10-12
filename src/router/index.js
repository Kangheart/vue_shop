import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../components/Login.vue'

const Login = () => import('../components/Login.vue')
const Home = () => import('../components/Home.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //to: 将要访问的路径
  //from：代表从哪个路径跳转而来
  //next：代表一个函数，表示放行
  //next() 放行   next('/home') 跳转页面

  //如果访问登录页，直接放行
  if(to.path === '/login') {
    next();
  } else {
    //若访问的不是登录页，则获取sessionStorage中的token
    const tokenStr = window.sessionStorage.getItem('token');
    if(tokenStr) {
      next()  //有token放行
    } else {
      next('/login') //无token，强制跳转到登录页
    }
  }
})

export default router
