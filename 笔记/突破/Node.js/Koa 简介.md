https://www.koajs.net/

koa项目的创建：koa-generator 

安装`npm install -g koa-generator`

创建项目 `koa2 koa2-start -e=ejs  `

koa不能使用http 动词get，post，delete等等，不同的路径去执行不同事件需要使用koa-router



## 问答题

1. Koa和express的中间件调用方式上有什么不同？

   > express使用回调函数，基于流去实现的，函数中有两个参数req,res，单向执行，像流水线中间件是按照定义的顺序依次调用，当前中间件执行完便结束执行下一个中间件
   >
   > kos使用异步调用，避免了回调地狱，直接对ctx赋值，不需要调用流的write等方法，使用 `async/await` 来实现中间件的调用顺序。可以使用 `next()` 函数将控制权传递给下一个中间件。像洋葱一样一层一层执行到里面，在从里面一层一层往回继续执行，当前中间件执行完，执行下一个中间件后，又回到上一层中间件继续执行，这种方式可以实现对某个函数调用过程计时的功能

2. Koa比express更加轻量，基本只实现了中间件机制，如需实现完整的Web应用需要配合中间件，如何查找koa的中间件？有哪些途径可以查找？

   > Koa官方中间件列表：Koa官方网站提供了一个中间件列表，koa中文文档中：https://www.koajs.net/api/application
   >
   > NPM搜索：可以使用NPM来搜索Koa中间件。在命令行中运行以下命令可以查找与Koa相关的中间件：
   >
   > ```
   > npm search koa-middleware
   > ```
   >
   > GitHub搜索：许多开发者在GitHub上共享自己编写的Koa中间件。

3. 【选做题】koa可以兼容express的中间件吗？如果能请实现转换中间件的demo代码，如果不能请说明原因

   > Koa和Express的中间件机制有一些差异，因此Koa不能直接兼容Express的中间件。在Express中，中间件函数接收三个参数： `req` （请求对象）、 `res` （响应对象）和 `next` （下一个中间件函数）。而在Koa中，中间件函数接收两个参数： `ctx` （上下文对象，包含请求和响应信息）和 `next` （下一个中间件函数）。 

## 代码题

1. 请使用Koa当后端实现省市区三级联动（结合后端，实现数据懒加载），省市区数据可使用[讲义](http://web-senior.books.mafengshe.com/JS高级/复杂表单.html)中的数据

   > <img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231201165742099.png" alt="image-20231201165742099" style="zoom:80%;" />
   >
   > https://github.com/bunanan19/mfs-homework/blob/main/%E7%AA%81%E7%A0%B4/node/koa2-start/routes/index.js

2. 请使用Koa当后端实现有如下功能的用户注册表单

| 字段     | 含义     | 要求                                                   |
| :------- | :------- | :----------------------------------------------------- |
| username | 用户名   | 以字母开头，6-18个字符，需要去数据库查重，实时提现用户 |
| password | 密码     | 6-18个字符                                             |
| pwd-rpt  | 重复密码 | 6-18个字符，需要和 password 字段一致                   |

> https://github.com/bunanan19/mfs-homework/blob/main/%E7%AA%81%E7%A0%B4/node/koa2-start/routes/users.js





















## 算法题

1. [[34\]Search for a Range](https://leetcode.com/problems/search-for-a-range)

   **范围搜索**

   给出一个有序数组（递增顺序），请找出目标数的开始位置和结束位置。

   你的算法的时间复杂度需要是`O(log n)`

   如果目标数不在数组内，请返回 `[-1,-1]`

   如：

   给出 `[5,7,7,8,8,10]` 和目标数8

   则返回`[3,4]`

1. [[32\]Longest Valid Parentheses](https://leetcode.com/problems/longest-valid-parentheses)

   **最长合法匹配**

   给出一个字符串只包含`'('`和`')'`字符，请找出最长合法匹配的子字符串（的长度）。

   如`"(()"`，最长合法匹配子字符串是`"()"`，它的长度为 2

   另外一个例子`")()())"`，最长合法匹配子字符串是`"()()"`，它的长度为4