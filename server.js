const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

// 获取文件的MIME类型
const getMimeType = (filePath) => {
    const extname = path.extname(filePath).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml'
    };
    return mimeTypes[extname] || 'application/octet-stream';
};

const server = http.createServer((req, res) => {
    console.log(`请求: ${req.url}`);
    
    // 处理根路径请求
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                console.error(`读取index.html错误: ${err.message}`);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('服务器内部错误');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    } 
    // 处理关于我们页面请求
    else if (req.url === '/about.html') {
        console.log('处理关于我们页面请求');
        const aboutPath = path.join(__dirname, 'about.html');
        console.log(`尝试读取文件: ${aboutPath}`);
        
        fs.readFile(aboutPath, (err, data) => {
            if (err) {
                console.error(`读取about.html错误: ${err.message}`);
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end('未找到页面');
            } else {
                console.log('成功读取about.html');
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    }
    // 处理静态文件请求
    else if (req.url.startsWith('/public/')) {
        const filePath = path.join(__dirname, '..', req.url);
        console.log(`尝试读取文件: ${filePath}`);
        
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error(`文件读取错误: ${err.message}`);
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end('未找到文件');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', getMimeType(filePath));
                res.end(data);
            }
        });
    } 
    // 处理其他请求
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('未找到页面');
    }
});

server.listen(port, hostname, () => {
    console.log(`服务器运行在 http://${hostname}:${port}/`);
});