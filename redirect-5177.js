import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(302, { Location: `http://localhost:5180${req.url}` });
  res.end();
});

server.listen(5177, '0.0.0.0', () => {
  console.log('Redirecting http://localhost:5177 -> http://localhost:5180');
});
