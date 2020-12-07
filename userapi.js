const http = require('http');
const port = 45001

export function serv () {
  const server = http.createServer((req, res) => {
    console.log(req.headers)
    if (req.url == '/') {
      res.writeHead(400, { 'Content-type': 'text/plain' })
      res.end('mainPage')
    } else if (req.url == '/user' && req.method == 'GET') {
      res.writeHead(200, { 'Content-type': 'application/json' })
      res.end('{"name":"John", "age": "12"}')
    } else if (req.url == '/user' && req.method == 'POST') {
      res.writeHead(200, { 'Content-type': 'application/json' })
      res.end('got user data')
    } else if (req.url == '/user' && req.method == 'PUT') {
      res.writeHead(200, { 'Content-type': 'application/json' })
      res.end('user data updated')
    } else if (req.url == '/user' && req.method == 'DELETE') {
      res.writeHead(200, { 'Content-type': 'application/json' })
      res.end('user deleted')
    }
  });
  
  server.listen(port)
}
