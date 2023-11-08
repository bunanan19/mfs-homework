//node的模块化，通过require关键字导入node模块
/*这段代码用于在JavaScript中导入内置的fs模块，其中fs代表 "文件系统"。 
fs模块是Node.js中的核心模块，提供与文件系统相关的功能，可以在计算机或服务器上读取、写入和操作文件。 
通过使用require('fs') ，导入了fs模块并将其赋值给变量fs。这样就可以在代码中使用fs模块提供的函数和方法。 
例如，使用fs.readFile()来读取文件的内容，使用fs.writeFile()来向文件写入数据*/
let fs = require('fs')

fs.readFile("symbol.js", (err, data) => {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
});//异步回调函数写法

console.log(fs.readFileSync("symbol.js"));//同步写法

//解构同步写法，读取文件
let {readFileSync} = require("fs")
console.log(readFileSync("symbol.js").toString())

//js中的模块化：
//import { readFileSyncjs } from 'fs';
//console.log(readFileSyncjs("symbol.js").toString())//报错 Cannot use import statement outside a module
import { readFileSyncjs } from 'fs';//导入
import{t,fun} from "./m2.c";//导入
console.log(readFileSyncjs("symbol.js").toString())
console.log(t)