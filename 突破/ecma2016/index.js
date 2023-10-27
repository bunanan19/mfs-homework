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
console.log(i)//报错undefined，因为let块级作用域

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

