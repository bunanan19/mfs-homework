let express = require('express')
let router = express.Router()
router.use((req,res,next)=>{
    console.log('-----------3------------')
    next()
})
router.get('/a',(req,res,next)=>{
    res.write('subrouter')
    res.end()
    // next()
})
let app = express()

app.use((req,res,next)=>{
    console.log('所有请求开始之前都会进入use')
    next()
})
app.use('subrouter',router)

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
//除以上路径以外的路径执行以下代码：
app.use((req,res)=>{
    res.write('404 Not Found')
    res.status(404)
    res.end()
})
app.listen(3000, () => {
    console.log('Example express app listening on port 3000!')
})

// 启动服务器
// node index.js