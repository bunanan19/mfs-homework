var axios =require('axios')//没有写./此时在node_module里面查找文件axios
var text = require('./text.txt')//写路径时必须加上./  不加是在node_module里面找文件，Webpack对node_modules中的模块有默认的查找规则，而对自己编写的模块需要明确指定路径
require('./styles.css')

axios,get('/').then(data=>{console.log(data)})
console.log(text.default)
//console.log(a)//此处a为undefined，为了测试插件sourceMap的作用(让代码可读性更高)