import { createRouter, createWebHistory } from 'vue-router'

import BaseLayout from './layouts/Base.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: BaseLayout,
    children: [
      {
        path: 'message',
        name: 'Message',
        component: () => 
          import('./modules/Message.vue'),
      },
      {
        path: 'history',
        name: 'History',
        component: () => 
          import('./modules/History.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
