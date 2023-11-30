let express = require('express')

let app = express()

app.get('/', (req, res) => {
    res.write('hello get express')
    res.end()
})
app.post('/', (req, res) => {
    res.write('hello post express')
    res.end()
})
app.delete('/', (req, res) => {
    res.write('hello delete express')
    res.end()
})
app.put('/', (req, res) => {
    res.write('hello put express')
    res.end()
})
app.patch('/', (req, res) => {
    res.write('hello patch express')
    res.end()
})

app.listen(3000, () => {
    console.log('Example express app listening on port 3000!')
})

// 启动服务器
// node index.js