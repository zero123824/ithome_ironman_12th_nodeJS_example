// const request = require('request')
// const url = 'https://data.coa.gov.tw/Service/OpenData/FaRss.aspx?key=015'

// request.get(url, (err, res, body) => {
//   let json = JSON.parse(body)
//   console.log(res)
//   console.log(json)
// })

// import request from 'request'
// const url = 'https://data.coa.gov.tw/Service/OpenData/FaRss.aspx?key=015'

// request.get(url, (err, res, body) => {
//   let json = JSON.parse(body)
//   console.log(res)
//   console.log(json)
// })

import {descript, fibonacci, divivde} from './cal.js'
import {serv} from './userapi.js'

console.log(descript)
console.log(fibonacci(5))
console.log(divivde(19,2))
serv()