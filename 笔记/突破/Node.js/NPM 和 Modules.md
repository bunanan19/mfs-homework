## 问答题

1. 如何新建一个npm项目，本质是创建了什么文件？

   > `npm init`创建一个 npm 项目，本质上是创建一个 package.json 文件。package.json 文件是 npm 项目的配置文件，它包含了项目的名称、版本、描述、依赖项等信息。

2. 如何安装删除npm包？全局安装和局部安装有什么区别？

   > 安装 npm 包
   > npm install XX
   > 删除 npm 包
   > npm uninstall XX
   >
   > 全局安装和局部安装的区别在于，全局安装的包会被安装到系统中，所有项目都可以使用。局部安装的包只会被安装到当前项目中，其他项目无法使用。
   >
   > 默认情况下，npm 包是全局安装的。如果要局部安装一个包，可以使用 --save-dev 或 --save-optional 参数。例如，要局部安装 lodash 包，可以使用以下命令：
   > npm install lodash --save-dev
   > 或者
   > npm install lodash --save-optional

3. 如何自定义 npm 命令（scripts）？

   > 在 package.json 文件中，scripts 字段可以用来定义 npm 命令。例如，可以定义一个名为 build 的命令，用于编译你的项目。
   > ```js
   > {
   >   "name": "my-project",
   >   "version": "1.0.0",
   >   "scripts": {
   >    "webpack-version":"webpack -v"
   >   }
   > }
   > ```
   >
   > 可以在 package.json 文件中定义任意数量的 npm 命令。可以使用 npm run <command> 命令来运行任何 npm 命令。
   >

4. Node.js中`require('./xxxx')`和`require('xxxx')`导入的包相同吗？

   > -  `require('./xxxx')`  是相对路径引入，用于引入当前项目中的自定义模块或文件。
   > -  `require('xxxx')`  是绝对路径引入或者是引入第三方模块，用于引入 Node.js 内置模块或者  `node_modules`  目录下的模块。

5. Node.js中是如何处理循环引用？

   > 为了防止无限循环，将导出对象的未完成副本a.js返回给 b.js模块。b.js然后完成加载，并将其exports对象提供给a.js模块。
   > 到main.js加载两个模块时，它们都已完成。
   >
   > - 处理：当有循环 require() 调用时，模块在返回时可能尚未完成执行。为了防止模块载入的死循环，Node.js 在模块第一次载入后会把它的结果进行缓存，下一次再对它进行载入的时候会直接从缓存中取出结果。node.js中的循环引用的闭环是用“断点”这一方式打开的，以断点为出口去执行其他模块，也以断点为入口进行返回，之后继续执行断点之后的代码。如模块A中引用了模块B，而模块B中引用了模块A。模块A中执行到了要引入模块B时产生断点，此时执行模块B。当执行到模块B中引用模块A的代码时，此时是将模块A断点之前的执行结果输出给模块B，然后继续执行模块B直到模块B执行完，然后返回至断点处，继续执行模块A中的代码。

6. Node.js 模块如何如何导出变量/函数/对象？

   > Node.js 模块可以通过以下方式导出变量/函数/对象：
   >
   > * 使用  `export`  关键字。
   > * 使用  `module.exports`  对象。
   >

7. `module.exports` 和 `exports` 的使用有何区别？(饿了么面试题)

   > *  `module.exports`  是模块的导出对象，它是一个对象，可以包含多个属性，每个属性对应一个导出的变量/函数/对象。
   > *  `exports`  是模块的导出对象的引用，它是一个对象，可以通过  `module.exports`  对象访问。
   > *  `module.exports`  和  `exports`  都可以用来导出变量/函数/对象。但是， `module.exports`  是模块的导出对象的引用，所以它不能用来直接导出变量/函数/对象。如果要直接导出变量/函数/对象，应该使用  `exports` 。
   > * 1)exports 对象是 module 对象的一个属性,在初始时 module.exports 和 exports 指向同一块内存区域
   >   2)module.exports可以直接赋值一个对象，而exports只能通过为其属性赋值。
   > * 区别：其实,在node执行一个文件时,会给这个文件内生成一个 exports 对象和一个 module 对象,而这个module 对象又有一个属性叫做 exports
   >
   >   > - exports 对象是 module 对象的一个属性,在初始时 module.exports 和 exports 指向同一块内存区域
   >   > - 模块导出的是 module.exports , exports 只是对它的引用,在不改变exports 内存的情况下,修改exports 的值可以改变 module.exports 的值
   >   > - module.exports可以直接赋值一个对象，export只能为其属性赋值对象
   > *  require返回的是module.exports，module.exports被修改时，exports不会改变
   > *  module.exports和exports指向同一个对象，只是exports是模块包裹函数的一个参数。

8. Node.js 模块中可以定义全局变量（其他模块可以直接引用访问）吗？如果能，应该如何定义？如果不能，请说明原因。（饿了么[面试题](https://github.com/ElemeFE/node-interview/blob/master/sections/zh-cn/module.md#模块机制)改编）

   > Node.js 模块中不能定义全局变量，因为 Node.js 的模块是单线程的，每个模块都有自己的作用域，因此模块中的变量只能在该模块中使用。如果要定义全局变量，可以使用global对象或者使用 module.export 创建伪全局变量。
   >
   > 以下是一个使用  `module.exports`  对象定义全局变量的例子：
   >
   > ```js
   > // index.js
   > module.exports = {
   >   name: "John Doe",
   >   age: 20
   > };
   > 
   > // app.js
   > const { name, age } = require("./index");
   > console.log(name); // John Doe
   > console.log(age); // 20在这种情况下， `name`  和  `age`  是全局变量，可以被任何模块访问。
   > ```
   >
   > 需要注意的是，使用  `module.exports`  对象定义的全局变量，在模块被卸载后会被删除。如果需要在模块被卸载后仍然保留全局变量，可以使用  `require()`  函数的  `cache`  参数。
   >
   > 以下是一个使用  `require()`  函数的  `cache`  参数定义全局变量的例子：
   >
   > ```js
   > // index.js
   > const name = "John Doe";
   > const age = 20;
   > 
   > module.exports = {
   >   name,
   >   age
   > };
   > 
   > // app.js
   > const { name, age } = require("./index", { cache: true });
   > 
   > console.log(name); // John Doe
   > console.log(age); // 20
   > 
   > // 卸载模块
   > delete require.cache[require.resolve("./index")];
   > 
   > console.log(name); // John Doe
   > console.log(age); // 20
   > ```
   >
   > 在这种情况下，即使模块被卸载， `name`  和  `age`  仍然是全局变量，可以被任何模块访问。
   >
   > 
   >
   > 在 Node.js 项目中，可以通过 `global` 对象来定义全局变量。在 Node.js 中，所有模块都是在一个闭包中执行的，模块中定义的变量只在模块内部有效，不会泄漏到全局作用域。
   >
   > 如果要在一个模块中定义全局变量，可以将变量挂载到 `global` 对象上，例如：
   >
   > ```text
   > global.myGlobal = 'hello world';
   > ```
   >
   > 上面的代码将一个名为 `myGlobal` 的全局变量挂载到了 `global` 对象上，这样在应用的其他地方就可以直接访问它了，例如：
   >
   > ```js
   > console.log(myGlobal); // 输出 'hello world'
   > ```
   >
   > 需要注意的是，在实际开发中，定义全局变量可能会导致命名冲突和代码可维护性降低，应该谨慎使用或者避免使用，哪怕是文件的全局变量（class, function外定义）

## 算法题

1. [[26\]Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array)

   **从有序数组中删除重复元素**

   给出一个有序数组，请删除数组中的重复元素，使得所有元素只出现一次，请返回新**数组的长度**

   请不要使用额外的空间，你只能使用常数内存

   如：

   给定的输入数组为 `[1,1,2]`

   你的函数需要返回长度为`2`，因为有两个不同的元素 `1` 和 `2`。你不用在意除了长度外原数组中的内容。

   > 

2. [[25\]reverse-nodes-in-k-group](https://leetcode.com/problems/reverse-nodes-in-k-group)

   **按k组逆序节点**

   给出一个链表，每次逆序k个元素返回修改后的链表

   k是一个小于等于链表长度的正整数。如果总节点数不是k的倍数，则将从左数最后一组逆序。

   你不能直接修改节点的值，只能修改节点指针的指向。

   只允许使用常数内存

   如：

   给的链表是：`1->2->3->4->5`

   对于 k = 2，你需要返回 `2->1->4->3->5`

   对于 k = 3，你需要返回 `3->2->1->4->5`
   
   