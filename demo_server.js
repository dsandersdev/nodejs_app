
const http = require('http');
const port = 3000;
const ip = '192.168.50.89';

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('<h2>Hello World</h2>');
}).listen(port, ip);

console.log(`server is running on ${ip}:${port}`);
