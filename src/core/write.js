/**
 * @author http://dengwj.vip
 * @date 2022-08-29
 */
const Influx = require('influx')

const { username, password, database, host, port } = require('../conf')

// 写入
/**
 * @param {string} measurement 类似表
 * @param {any[]} fields 第一个元素是字段定义类型，第二个元素是字段的值
 * @param {Record<string, any>} tags 也是里面的字段，是自带索引光环
 */
const writeData = (measurement, fields, tags) => {
  const tagsList = Object.keys(tags)

  // 定义数据库链接和数据格式，建立 client
  const client = new Influx.InfluxDB({
    database,
    username,
    password,
    host,
    port,
    schema: [
      {
        measurement, //相似于数据表的概念
        fields: fields[0], // tag 也是里面的字段，是自带索引光环
        tags: tagsList
      }
    ]
  })

  client.writePoints([
    {
      measurement,
      fields: fields[1],
      tags
    }
  ])
}

module.exports = writeData
