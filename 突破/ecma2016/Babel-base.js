import "babel-polyfill"
let main = () =>{
    console.log("hello es6")
}
main();
let {a:{sa,sb},b} = {a:{sa:"sa",sb:"sb"},b:"b"}//所支持的es版本高，此写法支持
class Test{

}
var test = new Test();//此方法也支持


var arr = Array(3).fill(1)

for(let i = 0; i<2; i++){
    console.log(i)
}
//console.log(i)//报错undefined，因为let块级作用域

for(var j = 0; j<2; j++){
    console.log(j)
}
console.log(j)//2

var a = 10;
{
   let _a = 11;
   const b = 12;
   console.log(_a);
}
var _a = 13;
console.log(_a);

// const a = 10
// a = 20;

function fun1(a,b){
    console.log(a,b)
    return "ret val"
}
fun1(1,2)
//等价于箭头函数：
let fun = (a,b) => {
    console.log(a,b)
    return "ret val"
}
fun(1,2)
//箭头函数有返回值的还可以这样表示：
let fun2 = (a,b) => (console.log(a,b),"ret val")
//逗号运算符，计算每一项的值，返回最后一个值，函数参数运算符不同于普通逗号运算符。
//箭头函数可以这样表示，省去了return和'{'字符，Babel编译后的的代码为：
// var fun2 = function fun2(a,b){
//     return console.log(a,b),"ret val";
// }

let a = ("1","2","3")//逗号运算符。a的值为3

let fun3 = (a,b) => "ret val"//babel编译后的函数体内为return "ret val"
let fun4 = (a,b) => "ret val"//babel编译后的函数体内直接为为字符串 "ret val"运行时返回undefined

function add_currying(a){
    return function(b){
        return a+b;
    }
}//柯里化，闭包
add(1)(2)//3
let addOne = add_currying(1)
console.log(addOne(10))//11

//箭头函数表示：
let fun_currying = a=> b=> a+b//babel后等价于add_curying
