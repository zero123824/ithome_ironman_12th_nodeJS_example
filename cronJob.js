const schedule  = require('node-schedule')
var request = require('request')
const {knex,connectionConfig} = require('./knexConfig')

var taskFreq = '*/10 * * * *'

var count = 0

// var execDate = new Date(2020,8,24,17,6,30)

var sche = schedule.scheduleJob(taskFreq, () => {
  console.log('now is :' + new Date)
  var url = 'http://opendata.epa.gov.tw/webapi/Data/RainTenMin/?$orderby=PublishTime%20desc&$skip=0&$top=1000&format=json'
  let totalInsert = 0;
  request.get(url, (err, res, body) => {
    let stationInfos = JSON.parse(body)
    for(var info in stationInfos) {
      console.log(info)
      knex('stationinfo').insert({
        'site_id':info[SiteId],
        'site_name':info[SiteName],
        'county':info[County],
        'town_ship':info[Township],
        'TWD67_lon':info[TWD67Lon],
        'TWD67_lat':info[TWD67Lat],
        'rainfall_10min':info[Rainfall10min],
        'rainfall_1hr':info[Rainfall1hr],
        'rainfall_3hr':info[Rainfall3hr],
        'rainfall_6hr':info[Rainfall6hr],
        'rainfall_12hr':info[Rainfall12hr],
        'rainfall_24hr':info[Rainfall24hr],
        'now':info[Now],
        'unit':info[Unit],
        'publish_time':info[PublishTime]
      })
      .then(result => {
        totalInsert += 1;
      }).catch(err => {
        console.log(err)
      })
    }

    console.log(totalInsert)

    count += 1
    if(count > 1) {
      sche.cancel();
      console.log('任務終止')
    }
  })


})