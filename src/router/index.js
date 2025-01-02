import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
      path: '/',
      name: 'root',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: () => import('@/views/Index.vue')
    },
      {
       path: '/config',
       name: 'Config',
       component: () => import('@/views/Configuration.vue')
      }
  ],
})

export default router
