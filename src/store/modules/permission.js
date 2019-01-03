import { componentsMap, constantRouterMap } from '@/router'
import Layout from '@/views/layout/Layout'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.includes(role))
//   } else {
//     return true
//   }
// }

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
// function filterAsyncRouter(routes, roles) {
//   const res = []

//   routes.forEach(route => {
//     const tmp = { ...route }
//     console.log('tmp', tmp)
//     if (hasPermission(roles, tmp)) {
//       if (tmp.children) {
//         tmp.children = filterAsyncRouter(tmp.children, roles)
//       }
//       res.push(tmp)
//     }
//   })

//   return res
// }

/**
 * 处理路由数据
 * @param {*} asyncRouterMap
 */
function handleRouterMap(asyncRouterMap) {
  let accessedRouters = []
  if (asyncRouterMap) {
    accessedRouters = convertRouter(asyncRouterMap)
  }
  accessedRouters.push({ path: '*', redirect: '/404', hidden: true })
  console.log('asyncRouterMap', asyncRouterMap)
  return accessedRouters
}

/**
 * 递归将数据解析到router中去
 * @param {*} asyncRouterMap
 */
function convertRouter(asyncRouterMap) {
  const res = []
  asyncRouterMap.forEach(item => {
    const parent = generateRouter(item)
    if (item.children) {
      parent.children = convertRouter(item.children)
    }
    res.push(parent)
  })

  return res
}

/**
 * 对component的处理
 * @param {*} item
 * @param {*} isParent
 *
 */
function generateRouter(item, isParent) {
  console.log('item', item)
  var router = {
    path: item.path,
    name: item.name,
    meta: item.meta,
    redirect: item.redirect,
    alwaysShow: isParent,
    component: item.location === 'root' ? Layout : componentsMap[item.component]
  }
  return router
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { asyncRouterMap } = data
        console.log('data', data)
        const accessedRouters = handleRouterMap(asyncRouterMap)
        // if (roles.includes('admin')) {
        //   accessedRouters = asyncRouterMap
        // } else {
        //   accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        // }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
