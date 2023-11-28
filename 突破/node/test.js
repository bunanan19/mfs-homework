let m = require('./module.js')// ./相对目录
let axios = require('axios')// 直接写是node目录

axios.get('https://www.baidu.com').then(data=>console.log(data))
console.log(m)
console.log('hello node')