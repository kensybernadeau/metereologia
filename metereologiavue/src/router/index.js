import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Map1 from '../views/Map1.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/map1',
    name: 'Map1',
    component: Map1

  }
]

const router = new VueRouter({
  routes
})

export default router
