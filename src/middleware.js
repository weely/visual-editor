import router, { routes } from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// NProgress不展示右上角加载图标
NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const accessRoutes = [ ...routes ]
  router.addRoute(accessRoutes)

  next()
})

router.afterEach(() => {
  // 进度条加载完成
  NProgress.done()
})
