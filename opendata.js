var request = require('request')
var url = 'https://data.coa.gov.tw/Service/OpenData/FaRss.aspx?key=015'


function get () {
  request.get(url, (err, res, body) => {
    let json = JSON.parse(body)
    console.log(json)
  })
}

module.exports = get