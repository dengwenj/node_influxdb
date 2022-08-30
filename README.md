## 基于 nodejs 使用 InfluxDB

**启动**

```js
npm start
```

**首先在 conf 文件里面配置 database 必须**

```js
const database = 'ts_db'
```

**写入，调用这函数传入相应的参数即可**

```js
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

// 用 express 发送的请求
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
```

**查询 ，调用这函数传入 sql 即可**

```js
// 查询
const getData = (sql) => client.query(sql)

// 用 express 发送的请求
app.get('/query', async (req, res, next) => {
  const result = await getData(`SELECT * FROM "test2" WHERE time > now() - 5m`)
  res.json(result)
})
```

https://node-influx.github.io/
