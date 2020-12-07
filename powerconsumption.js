const Influx = require('influxdb-nodejs');
const client = new Influx('http://127.0.0.1:8086/mydb');

var powerReader = null;

function continueRead() {
  setInterval(readNowPointer, 5000);
}

function readNowPointer() {
  powerReader = Math.random() * 1000 ;
  console.log(powerReader);
}

continueRead();