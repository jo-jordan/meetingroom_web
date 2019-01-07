import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './article'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'
import meetingRoomAPI from './meetingroom'
import bookInfoAPI from './bookInfo'
import userAPI from './user'

// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

// 会议室相关
Mock.mock(/\/meetingroom\/info\/get/, 'get', meetingRoomAPI.getList)
Mock.mock(/\/meetingroom\/info\/create/, 'post', meetingRoomAPI.createRoom)
Mock.mock(/\/meetingroom\/info\/delete/, 'delete', meetingRoomAPI.deleteRoom)
Mock.mock(/\/meetingroom\/info\/update/, 'update', meetingRoomAPI.updateRoom)

// 预订信息相关
Mock.mock(/\/book\/info\/get/, 'get', bookInfoAPI.getList)
Mock.mock(/\/book\/info\/create/, 'post', bookInfoAPI.createBook)
Mock.mock(/\/book\/info\/delete/, 'delete', bookInfoAPI.deleteBook)
Mock.mock(/\/book\/info\/update/, 'update', bookInfoAPI.updateBook)

// 用户相关
Mock.mock(/\/user\/get/, 'get', userAPI.getList)
Mock.mock(/\/user\/create/, 'post', userAPI.createUser)
Mock.mock(/\/user\/delete/, 'delete', userAPI.deleteUser)
Mock.mock(/\/user\/update/, 'update', userAPI.updateUser)

export default Mock
