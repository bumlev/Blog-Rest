import { createRouter, createWebHashHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import register from '../views/register.vue'
import homePage from '../views/Home.vue'
import PostDetails from '../views/post_details'

let auth = localStorage.getItem('userAuth');
const routes = [
  {
    path:'/',
    name:'register',
    component:register

  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path: auth !== null ? '/home' : '/login',
    name: auth !== null ? "home" : "login",
    component: auth !== null ? homePage : Login
  },
  {
    path: auth !== null ? '/post_details/:postId' : '/login',
    name: auth !== null ? "post_details" : "login",
    component: auth !== null ? PostDetails : Login
  },

  /*{
    path: '/',
    name: 'home',
    component: HomeView
  },*/
 
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
