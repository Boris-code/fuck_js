import http from "http"


const hostname = 'localhost';
const port = 7788;

const server = http.createServer((req, res) => {
  var data;
  if (req.method === 'POST') {
    // 定义一个变量来保存请求主体的数据
    let body = '';

    // 当有数据接收到时，将数据拼接到 body 中
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // 当所有数据接收完成时，将 body 中的数据解析为对象
    req.on('end', () => {
      data = JSON.parse(body);
      console.log(data); // 输出: { foo: 'bar' }
    });
  }

  if (req.url === '/pubkey') {

  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, world!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
