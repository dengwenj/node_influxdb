/**
 * @author http://dengwj.vip
 * @date 2022-08-29
 * test（测试） 这个文件直接 node ./write.js
 */
const Influx = require('influx')

const { writeData } = require('./core')

// 插入数据
writeData(
  'test', 
  [
    { //数据表的字段，定义类型，FLOAT/INTEGER/STRING/BOOLEAN
      field1: Influx.FieldType.INTEGER,
      field2: Influx.FieldType.INTEGER,
      field3: Influx.FieldType.STRING
    },
    {
      field1: 12323,
      field2: 44233,
      field3: '1ttt1'
    }
  ],
  {
    tag7: 142787777777733,
    tag8: 41122111
  }
)

// writeData(
//   'demo', 
//   [
//     { //数据表的字段，定义类型，FLOAT/INTEGER/STRING/BOOLEAN
//       field4: Influx.FieldType.INTEGER,
//       field5: Influx.FieldType.FLOAT,
//       field6: Influx.FieldType.STRING
//     },
//     {
//       field4: 12323,
//       field5: 44233,
//       field6: '1ttt1'
//     }
//   ],
//   {
//     tag9: 14233,
//     tag10: 41122111
//   }
// )

