import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: '@increment',
      name: '@title(5, 10)',
      code: Mock.Random.string(24),
      status: '@integer(0, 2)',
      createTime: '@datetime'
    })
  )
}

export default {
  getInfo: config => {
    console.log('config', config)
    return { total: List.length, items: List }
  }
}
