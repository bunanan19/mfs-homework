"use strict";

require("babel-polyfill");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var main = function main() {
    console.log("hello es6");
};
main();
var _a$b = { a: { sa: "sa", sb: "sb" }, b: "b" //所支持的es版本高，此写法支持
},
    _a$b$a = _a$b.a,
    sa = _a$b$a.sa,
    sb = _a$b$a.sb,
    b = _a$b.b;

var Test = function Test() {
    _classCallCheck(this, Test);
};

var test = new Test(); //此方法也支持


var arr = Array(3).fill(1);

for (var _i = 0; _i < 2; _i++) {
    console.log(_i);
}
console.log(i); //报错undefined，因为let块级作用域

for (var j = 0; j < 2; j++) {
    console.log(j);
}
console.log(j); //2

var a = 10;
{
    var _a2 = 11;
    var _b = 12;
    console.log(_a2);
}
var _a = 13;
console.log(_a);
