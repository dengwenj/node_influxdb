/**
 * @author http://dengwj.vip
 * @date 2022-08-29
 */
const Influx = require('influx')

const { database } = require('../conf')

// 查询
const getData = (sql) => {
  const client = new Influx.InfluxDB({
    database
  })

  return client.query(sql)
}

module.exports = getData
