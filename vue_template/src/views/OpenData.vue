<template>
  <div>
    <button @click="changeColor"> 拿資料</button>

  </div>
</template>

<script>
import chalk from 'chalk'
// import request from 'request'
// import { requestAPI as request } from '../utils/request.js'

export default {
  // components:{chalk},
  data(){
    return { bgcolor:''}
  },
  methods:{
    getData() {
      var url = '/api/user'
      //  var url = 'https://data.coa.gov.tw/Service/OpenData/FaRss.aspx?key=015'
      // request()
      // request.get(url, (err, res, body) => {
      //   let json = JSON.parse(body)
      //   console.log(json)
      // })
    },
    changeColor() {
      console.log(chalk)
      console.log(chalk.red('test'))
    }
  }
}
</script>

<style>

</style>