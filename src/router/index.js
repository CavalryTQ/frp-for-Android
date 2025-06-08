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
      component: () => import('@/views/Index.vue'),
    },
      {
       path: '/config',
       name: 'Config',
       component: () => import('@/views/Configuration.vue'),
      },
      {
        path: '/add_config',
        name: 'AddConfig',
        component: () => import('@/views/AddConfiguration.vue')
      },
      {
        path: '/config_edit:',
        name: 'ConfigEdit',
          props: route => ({
              file: route.query.file
          }),
        component: () => import('@/views/ConfigurationEdit.vue')
      },
      {
       path: '/log',
       name: 'Log',
       redirect: '/logcat', //       TODO：先开发LogCat，Log列表功能暂缓...2025.1.24
       // component: () => import('@/views/Log.vue'),
      },
      {
       path: '/logcat',
       name: 'LogCat',
       component: () => import('@/views/LogCat.vue'),
      },
      {
          path: '/setting_app',
          name: 'Setting-app',
          component: () => import('@/views/AppSetting.vue'),
      }
  ],
})

export default router
