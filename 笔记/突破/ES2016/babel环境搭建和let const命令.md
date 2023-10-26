## ES6新特性

#### [JavaScript6、7、8、9、10、11新特性](https://blog.csdn.net/qq_54954413/article/details/126186493)

### babel环境搭建



### **Babel** JavaScript 编译器

Babel 是编写下一代 JavaScript 的编译器。

**ES2015 and beyond。**Babel 默认使用一组 ES2015 语法转换器，允许你使用新的语法，无需等待浏览器支持。

**JSX and React。**Babel 内置支持 JSX，与  babel-sublime 包一起结合，将语法高亮功能带到一个新的高度。

**Pluggable。**Babel 支持用户插件。允许你插入强大的 Babel 转换层。

### 主要特性

- 支持 ES2015+
- 支持 [JSX](http://www.oschina.net/p/jsx2) 和 [React](http://www.oschina.net/p/facebook-react)
- 支持用户插件

### 示例

你输入的 JavaScript：

```
myJavaScript("foobar");
```

编译器输出的 JavaScript：

```
myNewTransformedJavaScript("yay!");
```

#### 先简单介绍一下Webpack和Babel
Webpack
webpack工作就是打包，只要你安装的插件就可以打包一切，并且会自动解析依赖项，是前端的热门工具。
Babel
Ecmascript的代码一直在更新 但是浏览器的兼容却没有根上，babel就实现了利用服务端node的 导入导出特性，实现了js代码的渐进增强、平稳退化。让我们可以随意使用新语法而不用考虑浏览器的兼容性问题





### ES2015(ES6) 新增加了两个重要的 JavaScript 关键字: **let** 和 **const**。

- let 声明的变量只在 let 命令所在的代码块内有效。
- const 声明一个只读的常量，一旦声明，常量的值就不能改变。

在 ES6 之前，JavaScript 只有两种作用域： **全局变量** 与 **函数内的局部变量**。

**全局变量**
在函数外声明的变量作用域是全局的，全局变量在 JavaScript 程序的任何地方都可以访问。

```javascript
var carName = "Volvo";
// 这里可以使用 carName 变量

function myFunction() {
    // 这里也可以使用 carName 变量
}
```

**局部变量**
在函数内声明的变量作用域是局部的（函数内），函数内使用 var 声明的变量只能在函数内容访问，如果不使用 var 则是全局变量。

```javascript
// 这里不能使用 carName 变量
function myFunction() {
    var carName = "Volvo";
// 这里可以使用 carName 变量
}// 这里不能使用 carName 变量
```

### 1.1、let 关键字

let 声明的变量只在 let 命令所在的**代码块**内有效。

let 关键字用来声明变量，使用 let 声明的变量有几个特点：

- 不允许重复声明
- 块级作用域
- 不存在变量提升
- 不影响作用域链

> 注意：以后声明变量使用 let 就对了

#### 1.1.1、不允许重复声明

在**相同**的作用域或块级作用域中，不能使用 **let** 关键字来重置 **var** 关键字声明的变量:

```javascript
var x = 2;       // 合法
let x = 3;       // 不合法
{
    var x = 4;   // 合法
    let x = 5   // 不合法
}
```

在**相同**的作用域或块级作用域中，不能使用 **let** 关键字来重置 **let** 关键字声明的变量:

```javascript
let x = 2;       // 合法
let x = 3;       // 不合法
{
    let x = 4;   // 合法
    let x = 5;   // 不合法
}
```

在**相同**的作用域或块级作用域中，不能使用 **var** 关键字来重置 **let** 关键字声明的变量:

```javascript
let x = 2;       // 合法
var x = 3;       // 不合法
{
    let x = 4;   // 合法
    var x = 5;   // 不合法
}
```

**let** 关键字在**不同**作用域，或不同块级作用域中是可以重新声明赋值的:

```javascript
let x = 2;       // 合法
{
    let x = 3;   // 合法
}
{
  let x = 4;   // 合法
}
```

#### 1.1.2、块级作用域

使用 var 关键字声明的变量不具备块级作用域的特性，它在 {} 外依然能被访问到。

```javascript
{ 
    var x = 2; 
}
// 这里可以使用 x 变量
var x = 10;
// 这里输出 x 为 10
{ 
    var x = 2;
    // 这里输出 x 为 2

}// 这里输出 x 为 2
```

**在 ES6 之前，是没有块级作用域的概念的。**

ES6 可以使用 let 关键字来实现块级作用域。

let 声明的变量只在 let 命令所在的代码块 **{}** 内有效，在 **{}** 之外不能访问。

```javascript
{ 
   let x = 2;
}
// 这里不能使用 x 变量
var x = 10;
// 这里输出 x 为 10
{ 
 let x = 2;
// 这里输出 x 为 2
}
// 这里输出 x 为 10
```

#### 1.1.3、不存在[变量提升](https://so.csdn.net/so/search?q=变量提升&spm=1001.2101.3001.7020)

JavaScript 中，var 关键字定义的变量可以在使用后声明，也就是变量可以先使用再声明（[JavaScript 变量提升](https://www.runoob.com/js/js-hoisting.html)）。

```javascript
// 在这里可以使用 carName 变量
var carName;
// 在这里可以不使用 carName 变量
let carName;
```

#### 1.1.4、不影响作用域链  

```javascript
var i = 5;
for (var i = 0; i < 10; i++) {
    // 一些代码...
}
// 这里输出 i 为 10
let i = 5;
for (let i = 0; i < 10; i++) {
   // 一些代码...
}
// 这里输出 i 为 5
```

在第一个实例中，使用了 **var** 关键字，它声明的变量是全局的，包括循环体内与循环体外。

在第二个实例中，使用 **let** 关键字， 它声明的变量作用域只在循环体内，循环体外的变量不受影响。

### 1.2、const 关键字

const 用于声明一个或多个常量，声明时必须进行初始化，且初始化后值不可再修改

const 关键字用来声明常量，const 声明有以下特点：

- 不允许重复声明
- 块级作用域
- 声明必须赋初始值
- 值不允许修改
- 标识符一般为大写

> 注意：声明对象类型使用 const，非对象类型声明选择 let

```javascript
// 声明常量
const MAX = 100;
console.log(MAX);
// 对于数组和对象的元素修改, 不算做对常量的修改, 不会报错
const TEAM1 = [1, 2, 3, 4];
const TEAM2 = [1, 2, 3, 4];
// 但是不能修改地址指向
// TEAM2 = TEAM1;
const PI = 3.141592653589793;
PI = 3.14;      // 报错
PI = PI + 10;   // 报错
```

#### 1.2.1、并非真正的常量

const 的本质: const 定义的变量并非常量，并非不可变，它定义了一个常量引用一个值。使用 const 定义的对象或者数组，其实是可变的。下面的代码并不会报错：

```javascript
// 创建常量对象
const car = {type:"Fiat", model:"500", color:"white"};
// 修改属性:
car.color = "red";
// 添加属性
car.owner = "Johnson";
// 创建常量数组
const cars = ["Saab", "Volvo", "BMW"];
// 修改元素
cars[0] = "Toyota";
// 添加元素
cars.push("Audi");
```

但是我们不能对常量对象数组重新赋值：

```javascript
const car = {type:"Fiat", model:"500", color:"white"};
car = {type:"Volvo", model:"EX60", color:"red"};    // 错误
const cars = ["Saab", "Volvo", "BMW"];
cars = ["Toyota", "Volvo", "Audi"];    // 错误
```

文中说到 const 定义的变量并非不可改变，比如使用const声明对象，可以改变对象值。

那么什么情况能彻底“锁死”变量呢？

可以使用Object.freeze()方法来 **冻结变量** ，如：

```javascript
const obj = {
  name:"1024kb"
}
Object.freeze(obj)
// 此时对象obj被冻结，返回被冻结的对象
```

需要注意的是，被冻结后的对象不仅仅是不能修改值，同时也

- 不能向这个对象添加新的属性
- 不能修改其已有属性的值
- 不能删除已有属性
- 不能修改该对象已有属性的可枚举性、可配置性、可写性

建议判断清除情况再进行使用

#### 1.2.2、var let const 区别

- 使用var关键字声明的全局作用域变量属于window对象。
- 使用let关键字声明的全局作用域变量不属于window对象。
- 使用var关键字声明的变量在任何地方都可以修改。
- 在相同的作用域或块级作用域中，不能使用let关键字来重置var关键字声明的变量。
- 在相同的作用域或块级作用域中，不能使用let关键字来重置let关键字声明的变量。
- let关键字在不同作用域，或不用块级作用域中是可以重新声明赋值的。
- 在相同的作用域或块级作用域中，不能使用const关键字来重置var和let关键字声明的变量。
- 在相同的作用域或块级作用域中，不能使用const关键字来重置const关键字声明的变量
- const 关键字在不同作用域，或不同块级作用域中是可以重新声明赋值的:
- var关键字定义的变量可以先使用后声明。
- let关键字定义的变量需要先声明再使用。
- const关键字定义的常量，声明时必须进行初始化，且初始化后不可再修改。





## 问答题

1. babel 是什么，它能干什么，不能干什么？
2. 我们使用 babel 把 es6/7的代码编译为 es5代码后，为什么还需要引入 polyfill？
3. `.babelrc`文件是干嘛的？常见配置是什么？
4. presets 中设置 env 是什么含义？
5. babel 中 `presets` 与 `plugin` 有什么区别？有什么联系？
6. 请比较 `let`,`var`,`const` 命令的不同

## 代码题

1. 以下代码在 `presets:['env']` 环境下编译结果是什么？ 请解释 babel 为什么这样编译（babel 是通过什么方法保证两段代码等价的）

   ```javascript
   var a = 10;
   {
      let _a = 11;
      const b = 12;
      console.log(_a);
   }
   var _a = 13;
   console.log(_a);
   ```

2. 以下代码在 `presets:['env']` 环境下编译结果是什么？为什么？

   ```javascript
   const a = 10
   a = 20;
   ```