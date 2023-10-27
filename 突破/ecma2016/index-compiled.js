"use strict";

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
