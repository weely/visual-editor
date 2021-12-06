import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('@/views/index.vue') }
]

// app router
export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes, // `routes: routes` 的缩写
})
