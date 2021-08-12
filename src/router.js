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
          import('./modules/message/Message.vue'),
      },
      {
        path: 'history',
        name: 'History',
        component: () => 
          import('./modules/history/History.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
   
    component: () => import('./views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
