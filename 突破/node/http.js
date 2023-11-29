const http = require('http')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
    console.log(req.headers)
    res.statusCode = 200
    // res.setHeader('Content-Type', 'text/plain');//纯文本类型
    res.setHeader('Content-Type', 'text/html');//超文本类型
    res.end('<h2>Hello World</h2>')
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})