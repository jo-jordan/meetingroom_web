import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: '@increment'
    })
  )
}

export default {
  getInfo: config => {
    console.log('config', config)
    return { total: List.length, items: List }
  }
}
