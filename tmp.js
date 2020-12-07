const http = require('http')
const opendata = require('./opendata.js')
const port = 9876

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'applicaion/json'})
  res.end('hello world')
  opendata()
})

server.listen(port, () => {
  console.log('server on !!')
})

// --------------------------------------------------------------------------

// const server2 = http.createServer((req, res) => {
//   res.writableEnded(200, {'Content-Type': 'application/json'})
//   res.end('hello world')
// })

// server2.on('upgrade', (req, socket, head) => {
//   socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
//                'Upgrade: WebSocket\r\n' +
//                'Connection: Upgrade\r\n' +
//                '\r\n');

//   socket.pipe(socket); // echo back
// })

// server2.listen(9875, 'localhost', () => {
//   // make a request
//   const options = {
//     port: 9875,
//     host: 'localhost',
//     headers: {
//       'Connection': 'Upgrade',
//       'Upgrade': 'websocket'
//     }
//   };

//   const req = http.request(options);
//   req.end();

//   req.on('upgrade', (res, socket, upgradeHead) => {
//     console.log('got upgraded!');
//     socket.end();
//     process.exit(0);
//   });
// })
