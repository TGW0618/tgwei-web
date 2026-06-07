import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homeIndex',
      component: () => import('@/views/HomeIndex.vue'),
      // children: [
      //     {
      //         path: '',
      //         name: 'home',
      //         component: () => import('@/views/home/homeView.vue')
      //     },

      // ]
    },

  ],
})

export default router
