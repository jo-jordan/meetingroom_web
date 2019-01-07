import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://gif-avatars.com/img/45x45/slash.gif',
    name: 'Super Admin',
    asyncRouterMap: [
      {
        path: '/meetingroom',
        name: 'MeetingRoom',
        location: 'root',
        redirect: '/meetingroom/overview',
        meta: {
          title: 'MeetingRoom',
          icon: 'table'
        },
        children: [
          {
            path: 'overview',
            component: 'meetingRoomOverview',
            location: 'end',
            name: 'Overview',
            meta: { title: 'Overview' }
          },
          {
            path: 'manage',
            component: 'meetingRoomManage',
            location: 'end',
            name: 'Manage',
            meta: { title: 'Manage' }
          }
        ]
      },
      {
        path: '/user',
        name: 'User',
        location: 'root',
        redirect: '/user/book',
        meta: {
          title: 'User',
          icon: 'table'
        },
        children: [
          {
            path: 'book',
            component: 'bookInfoOverview',
            location: 'end',
            name: 'Book',
            meta: { title: 'Book' }
          },
          {
            path: 'manage',
            component: 'userManage',
            location: 'end',
            name: 'Manage',
            meta: { title: 'Manage' }
          }
        ]
      }
    ]
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://gif-avatars.com/img/45x45/slash.gif',
    name: 'Normal Editor',
    asyncRouterMap: [
      {
        path: '/meetingroom',
        hidden: false, // (默认 false)
        name: 'MeetingRoom',
        alwaysShow: true,
        redirect: '/meetingroom/overview',
        meta: {
          title: 'MeetingRoom',
          icon: 'table'
        },
        children: [
          {
            path: 'overview',
            component: 'bookTable',
            name: 'Overview',
            meta: { title: 'Overview' }
          }
        ]
      },
      {
        path: '/user',
        name: 'User',
        alwaysShow: true,
        redirect: '/user/book',
        meta: {
          title: 'User',
          icon: 'table'
        },
        children: [
          {
            path: 'book',
            component: 'bookTable',
            name: 'Book',
            meta: { title: 'Book' }
          }
        ]
      }
    ]
  }
}

export default {
  loginByUsername: config => {
    console.log('loginByUsername config', config)
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    console.log('getUserInfo config', config)
    if (userMap[token]) {
      console.log('getUserInfo has token', userMap[token])
      return userMap[token]
    } else {
      console.log('getUserInfo has not token', config)
      return false
    }
  },
  logout: () => 'success'
}
