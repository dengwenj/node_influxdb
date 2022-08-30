/**
 * @author http://dengwj.vip
 * @date 2022-08-29
 * test（测试） 这个文件直接 node ./query.js
 */
const { getData } = require('./core')

// 获取5分钟内的数据
getData(` SELECT * FROM "test" WHERE time > now() - 5m `)
  .then((res) => {
    console.log(res) //输出一个数组。
    console.log(res['groups']()[0])
  })

// getData(` SELECT * FROM "demo" WHERE time > now() - 5m `)
//   .then((res) => {
//     console.log(res) //输出一个数组。
//     console.log(res['groups']()[0])
//   })
