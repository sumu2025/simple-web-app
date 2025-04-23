const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('服务器内部错误');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    } else if (req.url.startsWith('/public/')) {
        fs.readFile(path.join(__dirname, req.url), (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end('未找到文件');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'image/jpeg');
                res.end(data);
            }
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('未找到页面');
    }
});

server.listen(port, hostname, () => {
    console.log(`服务器运行在 http://${hostname}:${port}/`);
});