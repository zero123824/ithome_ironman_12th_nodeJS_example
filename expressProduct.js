const express = require('express')
const bodyParser = require('body-parser')

var productApi = express.Router();
productApi.use(bodyParser.text({type: '*/*'}))

productApi.get('/', (req, res) => {
  var product = JSON.parse(req.body)
  res.send('product: ' + JSON.stringify(product))
})

productApi.post('/', (req, res) => {
  var product = JSON.parse(req.body)
  res.send('insert new product, product name: ' + JSON.stringify(product.name))
})

productApi.put('/', (req, res) => {
  var product = JSON.parse(req.body)
  product.number += 1
  res.send('return new product number is ' + JSON.stringify(product))
})

productApi.delete('/', (req, res) => {
  var product = JSON.parse(req.body)
  res.send('product is deleted : ' + product.name)
})

module.exports = productApi;