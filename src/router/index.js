import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PostDetails from '../views/PostDetails.vue'
import Map from '../views/Map.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/post/:id',
      name: 'PostDetails',
      component: PostDetails,
      props: true
    },
    {
      path: '/map',
      name: 'Map',
      component: Map
    }
  ]
})

export default router
