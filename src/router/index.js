/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    // 当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
    hidden: true, // (默认 false)
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    // 当设置 noredirect 的时候该路由在面包屑导航中不可被点击
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const componentsMap = {
  meetingRoomOverview: () => import('@/views/meetingroom/overview'),
  meetingRoomManage: () => import('@/views/meetingroom/manage'),

  bookInfoOverview: () => import('@/views/user/overview'),
  userManage: () => import('@/views/user/manage'),
}
