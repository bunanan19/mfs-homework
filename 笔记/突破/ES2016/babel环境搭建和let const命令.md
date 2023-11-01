## ES6新特性

#### [JavaScript6、7、8、9、10、11新特性](https://blog.csdn.net/qq_54954413/article/details/126186493)

### babel环境搭建

##### babel-core:https://www.npmjs.com/package/babel-core

##### babel-cli:https://www.npmjs.com/package/babel-cli ：把一个文件从高版本转码到低版本的文件，es6、es7编译成es5

安装命令：npm install -g babel-cli

测试安装是否成功：babel，不报错

Babel-cli使用方法：

node会成功是因为本地安装的node版本高，支持es6

babel后将转码的文件输出到了控制台，不方法，另外一种方法：--out-file 

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231026213057362.png" alt="image-20231026213057362" style="zoom:80%;" />

执行` babel index.js --out-file index-compiled.js`后，生成了一个新的index-compiled.js文件，里面是转码后的代码。但是并没有转化的效果，没有变成将源代码中的箭头函数转化为function函数，是因为没有设置预设presets(当前版本比较新，支持箭头函数)

babel index.js --out-file index-compiled.js --presets=es2015,react

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231026213839815.png" alt="image-20231026213839815" style="zoom:80%;" />

##### babel-node：直接去执行es6、es7或者高版本代码，不用去编译

安装：npm install -g babel-cli(babel-node已经废弃掉了，安装cli即可使用babel-node)

另外一种安装方式：npm包`npm init` 一路回车全使用默认。会在根目录下生成package.json文件，然后局部安装babel-node，babel-cli，`npm install babel-node`

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231026220811589.png" alt="image-20231026220811589" style="zoom:80%;" />

node本身对es高版本的支持已经很高了，所以不是非要用Babel。

测试node所支持的es版本：`node --v8-options`

设置.babelrc文件：

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231026222639927.png" alt="image-20231026222639927" style="zoom:80%;" />

并局部安装babel对应版本编译器：<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231026222851350.png" alt="image-20231026222851350" style="zoom:80%;" />

并在package.json文件添加语句：

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231026223400982.png" alt="image-20231026223400982" style="zoom:80%;" />

然后就可以在终端执行：<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231026223518562.png" alt="image-20231026223518562" style="zoom:80%;" />

将之前安装到全局的babel-cli删除：

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231026223704975.png" alt="image-20231026223704975" style="zoom:80%;" />

然后再调用Babel，出错：

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231026223758739.png" alt="image-20231026223758739" style="zoom:80%;" />

但是项目里面，即compiled文件里面是可以执行babel命令的：使用npm run compile，便执行script里面的compile：<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231026224246197.png" alt="image-20231026224246197" style="zoom:80%;" />

但是终端输出有一个错误error，couldn't find presets “env”,这是因为我们编写了presets文件，但是node_modules文件里没有安装presets相关的模块，所以解析出错

安装：`npm install babel-preset-es2017 `  `npm install babel-preset-env `

然后再执行`npm run compile`,compiled文件编译后效果：<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231027152133379.png" alt="image-20231027152133379" style="zoom:80%;" />

垫片效果展示：

对于代码`var arr = Array(3).fill(1)`<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231027153050172.png" alt="image-20231027153050172" style="zoom:80%;" />

不添加垫片编译后的compile：<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231027153124314.png" alt="image-20231027153124314" style="zoom:67%;" />

此代码在旧版本的浏览器中可能会出错，添加垫片：` npm install babel-polyfill`

并在代码文件夹下引入：`import "babel-polyfill"`<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231027153647413.png" alt="image-20231027153647413" style="zoom:80%;" />

在执行npm run，在compile文件里面生成了<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231027153832089.png" alt="image-20231027153832089" style="zoom:80%;" />









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

**const 用于声明一个或多个常量，声明时必须进行初始化，且初始化后值不可再修改**

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

   > Babel是一个广泛使用的转码器，可以将ES6代码转化为ES5代码。Ecmascript的代码一直在更新 但是浏览器的兼容却没有根上，babel让我们可以随意使用新语法而不用考虑浏览器的兼容性问题。
   >
   > Babel的主要功能包括：  
   >
   > 1. 语法转换：Babel可以将使用了新语言特性的代码转换为向后兼容的旧版本，以便在不支持这些特性的环境中运行。  
   > 2.  源码转换：Babel可以将使用一种源码语言编写的代码转换为另一种源码语言。例如，将使用TypeScript编写的代码转换为纯JavaScript代码。  
   > 3. 插件系统：Babel具有可扩展的插件系统，允许开发人员根据自己的需求自定义转换规则。  
   >
   > Babel的局限性包括：  
   >
   > 1. 运行时依赖：由于Babel是在运行时对代码进行转换，因此在生产环境中使用Babel可能会增加应用程序的大小和运行时开销。  
   > 2. 不支持所有语言特性：尽管Babel可以转换许多新语言特性，但它可能无法处理某些复杂或实验性的特性。  
   > 3. 性能影响：由于转换过程需要额外的计算资源，使用Babel可能会对代码的性能产生一定的影响。 
   > 4. babel默认只转换新的 JavaScript 语法，比如箭头函数、扩展运算（spread）。不转换新的 API，如果想使用这些新的对象和方法，则需要为当前环境提供一个垫片（polyfill）。

2. 我们使用 babel 把 es6/7的代码编译为 es5代码后，为什么还需要引入 polyfill？

   >`polyfill`顾名思义就是“补丁”，根据浏览器的一些情况，做一些兼容，比如`indexOf`的`polyfill`，当Array的原型中没有`indexOf`时，通过`polyfill`也能适配一些浏览器的使用。
   >
   >Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、 Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign ）都不会转码。 举例来说，ES6在 Array 对象上新增了 Array.from 方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使 用 babel-polyfill ，为当前环境提供一个垫片。

3. `.babelrc`文件是干嘛的？常见配置是什么？

   >该文件用来设置转码规则和插件，它是一个JSON格式的文件，在项目根目录下创建，并告诉Babel如何处理代码转换。 基本格式如下。
   >
   > ```js
   > { 
   >     "presets": [], 
   >     "plugins": [] 
   > } 
   > ```
   >
   >常见的.babelrc配置包括：   
   >
   >1. 预设（Presets）：预设是一组预定义的转换规则和插件集合，可以一次性配置多个转换。常见的预设包括:
   >
   >   @babel/preset-env：根据目标环境自动选择需要的转换规则。    
   >
   >   @babel/preset-react：用于转换React代码的规则集。    
   >
   >   @babel/preset-typescript：用于转换TypeScript代码的规则集。   
   >
   >2. 插件（Plugins）：插件是Babel的转换规则，用于执行特定的代码转换。常见的插件包括：    
   >
   >   @babel/plugin-proposal-class-properties：用于转换类属性的插件。    @babel/plugin-transform-arrow-functions：将箭头函数转换为普通函数的插件。    @babel/plugin-transform-runtime：将一些辅助函数提取到运行时以减少重复代码。   
   >
   >3. 配置选项：除了预设和插件外，.babelrc文件还可以包含其他配置选项，例如：   "sourceMaps"：指定是否生成源映射文件以方便调试。
   >
   >    "ignore"：指定哪些文件或文件夹不需要进行转换。   
   >
   >   以下是一个示例的.babelrc文件配置：
   >
   >```json
   >{
   >  "presets": ["@babel/preset-env", "@babel/preset-react"],
   >  "plugins": ["@babel/plugin-proposal-class-properties", "@babel/plugin-transform-runtime"],
   >  "sourceMaps": true,
   >  "ignore": ["node_modules"]
   >}
   >```
   >
   >这个配置示例使用了@babel/preset-env和@babel/preset-react预设，以及@babel/plugin-proposal-class-properties和@babel/plugin-transform-runtime插件。同时，它还开启了源映射并忽略了node_modules文件夹。根据项目需要，可以根据具体情况进行配置。

4. presets 中设置 env 是什么含义？

   >在Babel的预设（presets）中设置"@babel/preset-env"意味着使用了一个称为"env"的预设。
   >
   >这个预设允许根据目标环境自动选择需要的转换规则。  
   >
   > "@babel/preset-env"预设的作用是根据指定的目标环境（如浏览器、Node.js版本）或配置选项来确定需要的转换规则。它根据目标环境的支持情况，自动启用相关的转换插件，以确保代码在目标环境中能够正常运行。   
   >
   >例如，如果你的目标环境是最新版本的浏览器，那么"@babel/preset-env"会根据最新的JavaScript语言规范，自动启用对应的转换规则。如果目标环境是旧版浏览器，它会根据这些旧版浏览器的支持情况，自动启用适当的转换规则，以使代码能够在这些旧版浏览器中运行。   
   >
   >通过使用"@babel/preset-env"预设，开发人员可以更方便地配置Babel，而不需要手动选择和配置大量的转换规则和插件。预设会根据目标环境智能地选择适当的转换规则，从而简化了Babel的配置过程。

5. babel 中 `presets` 与 `plugin` 有什么区别？有什么联系？

   >  `Presets` 是一组预定义的转换规则和插件集合，它们被打包成一个预设，方便在配置文件中一次性引用。预设是为了简化配置，将常用的转换规则和插件组合在一起，以便于开发人员快速配置Babel的转换规则。预设可以包含一个或多个转换规则和插件。   
   >
   > `Plugins` 是Babel的转换规则，用于执行特定的代码转换。每个插件都是一个独立的转换规则，可以单独引用和配置。插件可以用于执行各种转换，例如转换箭头函数、类属性、模块导入等。   
   >
   > 联系：  
   >
   > `Presets` 可以包含一个或多个 `plugins` ，它们是预设中的转换规则和插件的集合。  
   >
   > 开发人员可以根据需要自定义预设，选择适合自己项目的转换规则和插件，或者使用已有的预设。  
   >
   > 预设和插件都可以在 `.babelrc` 配置文件中进行配置，以告诉Babel如何处理代码转换。   
   >
   > 区别：
   >
   >  `Presets` 是一组预定义的转换规则和插件的集合，旨在简化配置，提供一次性引用多个转换规则和插件。  
   >
   > `Plugins` 是Babel的转换规则，每个插件都是一个独立的转换规则，可以单独引用和配置。  `Presets` 是对常见转换规则和插件的打包，而 `plugins` 是单个转换规则或插件的配置项。  
   >
   >  总结来说， `presets` 是一组预定义的转换规则和插件的集合，而 `plugins` 是单个的转换规则或插件。它们在Babel的配置中可以同时使用，以实现代码的转换和兼容性处理。

6. 请比较 `let`,`var`,`const` 命令的不同

   > - 使用var关键字声明的全局作用域变量属于window对象。
   > - 使用let关键字声明的全局作用域变量不属于window对象。
   > - 使用var关键字声明的变量在任何地方都可以修改。
   > - 在相同的作用域或块级作用域中，不能使用let关键字来重置var关键字声明的变量。
   > - 在相同的作用域或块级作用域中，不能使用let关键字来重置let关键字声明的变量。
   > - let关键字在不同作用域，或不同块级作用域中是可以重新声明赋值的。
   > - 在相同的作用域或块级作用域中，不能使用const关键字来重置var和let关键字声明的变量。
   > - 在相同的作用域或块级作用域中，不能使用const关键字来重置const关键字声明的变量
   > - const 关键字在不同作用域，或不同块级作用域中是可以重新声明赋值的:
   > - var关键字定义的变量可以先使用后声明。
   > - let关键字定义的变量需要先声明再使用。
   > - const关键字定义的常量，声明时必须进行初始化，且初始化后不可再修改。
   >
   > 1、变量提升
   > var声明的变量存在变量提升，let和const不存在变量提升，即它们所声明的变量一定要在声明后使用，否则报错
   > 2、块级作用域
   > var不存在块级作用域，let和const存在块级作用域
   > 3、重复声明
   > var允许重复声明变量，let和const在同一作用域不允许重复声明变量
   > 4、修改声明的变量
   > var和let可以，const声明一个只读的常量。一旦声明，常量的值就不能改变，但对于对象和数据这种引用类型，内存地址不能修改，可以修改里面的值。

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

   >在 presets: ['env'] 环境下，上述代码的编译结果如下所示：
   >
   >```js
   >var a = 10;
   >{
   >    var _a2 = 11;
   >    var _b = 12;
   >    console.log(_a2);
   >}
   >var _a = 13;
   >console.log(_a);
   >```
   >
   >Babel对代码进行编译时，根据指定的环境和配置规则进行转换。在这种情况下， presets: ['env'] 表示使用 `@babel/preset-env` 预设，它根据目标环境的支持情况选择需要的转换规则。   
   >
   >在上述代码中，有使用 `let` 和 `const` 声明的变量，这些是ES6的新语言特性。在旧版本的JavaScript中，没有 `let` 和 `const` 关键字，只有 `var` 关键字。因此，Babel会将 `let` 和 `const` 声明的变量转换为使用 `var` 关键字的变量声明，以确保代码在不支持 `let` 和 `const` 的环境中正常运行。   
   >
   >在编译结果中， `let` 和 `const` 声明的变量 `_a` 和 `b` 被转换为使用 `var` 关键字的变量声明，以便与旧版本的JavaScript兼容。同时，变量 `_a` 的名称在转换过程中发生了变化，以避免与外部的变量 `a` 冲突。   
   >
   >Babel通过将新语言特性转换为旧版本的等效代码，以保证两段代码的等价性。它根据预设和插件的规则，将新语言特性转换为目标环境所支持的旧版本语法，从而确保代码在不同环境中的兼容性。

2. 以下代码在 `presets:['env']` 环境下编译结果是什么？为什么？

   ```javascript
   const a = 10
   a = 20;
   ```

   >在 presets: ['env'] 环境下，给出的代码将导致编译错误。   
   >
   ><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231027164721692.png" alt="image-20231027164721692" style="zoom:80%;" />
   >
   >使用 `const` 声明变量时，它创建了一个只读的引用，指向一个值。因此，一旦 `const` 变量被初始化，就无法重新赋值新的值。在给定的代码中， `const a = 10` 将 `a` 初始化为10。然而，后续的代码 `a = 20;` 试图重新给 `a` 赋予新的值，这违反了 `const` 变量的不可变性。   因此，在使用 presets: ['env'] 配置编译这段代码时，Babel会检测到无效的赋值操作，并抛出编译错误。错误消息将指示您试图给 `const` 变量赋予新的值，这是不允许的。



