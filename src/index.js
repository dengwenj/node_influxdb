/**
 * @author http://dengwj.vip
 * @date 2022-08-30
 */
const Influx = require('influx')
const express = require('express')

const { host, database } = require('./conf')
const { writeData, getData } = require('./core')

// 创建服务器
const app = express()

// parser解析 用于获取 body 数据
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 创建
const client = new Influx.InfluxDB({
  host,
  database
})

client.getDatabaseNames()
  .then(names => {
    // console.log(names)
    if (!names.includes(database)) {
      return client.createDatabase(database)
    }
  })
  .then(() => {
    app.listen(1209, function () {
      console.log('服务器在 1209 端口启动成功！')
    })
  })
  .catch(err => {
    console.error(`创建 Influx 数据库时出错！${err}`)
  })

app.post('/write', (req, res, next) => {
  const { field1, field2, field3, tag7, tag8 } = req.body

  writeData(
    'test2', // 表
    [
      { //数据表的字段，定义类型，FLOAT/INTEGER/STRING/BOOLEAN
        field1: Influx.FieldType.INTEGER,
        field2: Influx.FieldType.INTEGER,
        field3: Influx.FieldType.STRING
      },
      {
        field1,
        field2,
        field3
      }
    ],
    {
      tag7,
      tag8
    }
  )

  res.end('write success!')
})

app.get('/query', async (req, res, next) => {
  const result = await getData(`SELECT * FROM "test2" WHERE time > now() - 5m`)
  res.json(result)
})
