import { createRouter, createWebHashHistory } from 'vue-router';

export const routes = [
  { path: '/', component: () => import('../views/Home.vue') }
]

// app router
const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes,
})


export default router
