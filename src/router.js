import { createRouter, createWebHistory } from 'vue-router'

import BaseLayout from './layouts/Base.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'Message'},
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
