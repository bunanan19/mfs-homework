在文件下创建npm项目 `npm init`

安装express

创建入口文件，并在入口文件index.js写入代码，使用 Express 框架创建一个简单的 Web 服务器。



 

创建express项目，安装`cnpm install -g express-generator@4`

 创建一个基于 Express 框架的新项目，并使用 EJS 模板引擎和 Stylus CSS 预处理器。创建一个叫express的项目express express -e=ejs -s=stylus

安装依赖 `npm install`

## 问答题

1. Express的Http请求处理模型是什么？

   > node中的http server模块，创建的web服务器
   >
   > 流水线模式，按照所有use中间件的顺序对请求进行处理，然后再进行分配(get、post请求等)。
   >
   > Express 的 HTTP 请求处理模型是基于中间件的，中间件是一系列函数，它们在请求到达应用程序之前或之后被调用。中间件可以用于处理各种任务，例如验证请求、设置响应头、或将请求转发到其他服务。   Express 提供了一个简单的 API 来注册中间件，只需将中间件函数添加到应用程序的  `use()`  方法中即可。例如，以下代码注册了一个中间件函数，它会在请求到达应用程序之前打印一条日志消息：
   >
   > ```
   > app.use((req, res, next) => {
   >   console.log(`Request received: ${req.method} ${req.url}`);
   >   next();
   > });
   > ```
   >
   > 当请求到达应用程序时，Express 会从  `use()`  方法中注册的中间件列表中依次调用每个中间件函数。如果中间件函数返回  `false` ，则 Express 将停止调用其他中间件函数，并将请求发送到应用程序的处理程序。如果中间件函数返回  `true` ，则 Express 将继续调用其他中间件函数。   Express 的中间件模型提供了很大的灵活性，可以用于构建各种复杂的 HTTP 应用程序。例如，可以使用中间件来实现身份验证、授权、缓存、负载均衡等功能。   Express 还提供了一些内置的中间件，例如  `body-parser`  中间件可以解析请求体， `cookie-parser`  中间件可以解析 Cookie， `session`  中间件可以实现会话管理。   Express 的中间件模型非常灵活，可以用于构建各种复杂的 HTTP 应用程序。

2. 如何使用 express-generator 生成 express 项目？请使用它生成项目并对`app.js`和`bin/www`两个文件关键代码进行注释详解

   > 使用 express-generator 生成 express 项目非常简单，只需要在命令行中输入以下命令即可：
   >
   > ```
   > express myproject
   > ```
   >
   > 这个命令会在当前目录下创建一个名为  `myproject`  的文件夹，该文件夹中包含了 Express 项目所需要的所有文件。   `app.js`  文件是 Express 应用程序的入口文件，它负责初始化应用程序并注册路由。
   >
   > ```
   > const express = require('express');
   > const path = require('path');
   > 
   > const app = express();
   > 
   > app.get('/', (req, res) => {
   >   res.send('Hello World!');
   > });
   > 
   > app.listen(3000, () => {
   >   console.log('Example app listening on port 3000!');
   > });
   > 
   > module.exports = app;
   > ```
   >
   > `bin/www`  文件是 Express 应用程序的启动文件，它负责启动应用程序并监听端口。
   >
   > ```
   > const express = require('express');
   > const app = express();
   > 
   > app.get('/', (req, res) => {
   >   res.send('Hello World!');
   > });
   > 
   > app.listen(3000, () => {
   >   console.log('Example app listening on port 3000!');
   > });
   > ```
   >
   > 以下是  `app.js`  文件中关键代码的注释详解：   *  `const express = require('express');`  这行代码引入了 Express 模块。  *  `const path = require('path');`  这行代码引入了 path 模块。  *  `const app = express();`  这行代码创建了一个新的 Express 应用程序实例。  *  `app.get('/', (req, res) => {`  这行代码注册了一个路由，当用户访问  `/`  路径时，该路由会返回一个  `Hello World!`  的响应。  *  `app.listen(3000, () => {`  这行代码启动应用程序并监听端口 3000。  *  `console.log('Example app listening on port 3000!');`  这行代码在控制台上打印一条消息，指出应用程序正在监听端口 3000。   以下是  `bin/www`  文件中关键代码的注释详解：   *  `const express = require('express');`  这行代码引入了 Express 模块。  *  `const app = express();`  这行代码创建了一个新的 Express 应用程序实例。  *  `app.get('/', (req, res) => {`  这行代码注册了一个路由，当用户访问  `/`  路径时，该路由会返回一个  `Hello World!`  的响应。  *  `app.listen(3000, () => {`  这行代码启动应用程序并监听端口 3000。  *  `console.log('Example app listening on port 3000!');`  这行代码在控制台上打印一条消息，指出应用程序正在监听端口 3000。 

3. 请查阅资料完成：什么是 Restful API ？如何使用Restful API访问服务器端资源？

   >RESTful API 是一种基于 HTTP 协议的网络应用程序接口设计风格。它遵循 REST 架构原则，使用 HTTP 动词来表示对资源的操作，使用 URI 来表示资源的地址。   RESTful API 的特点是简单、灵活、可扩展。它可以用于构建各种各样的网络应用程序，包括 Web 应用程序、移动应用程序、桌面应用程序等。   要使用 RESTful API 访问服务器端资源，需要使用 HTTP 客户端库。例如，在 JavaScript 中，可以使用  `XMLHttpRequest`  对象来发送 HTTP 请求。   以下是一个使用 RESTful API 访问服务器端资源的示例：
   >
   >```
   >var xhr = new XMLHttpRequest();
   >xhr.open('GET', 'https://api.example.com/users/12345');
   >xhr.send();
   >
   >xhr.onload = function() {
   >  if (xhr.status == 200) {
   >    var user = JSON.parse(xhr.responseText);
   >    console.log(user);
   >  } else {
   >    console.log('Error: ' + xhr.status);
   >  }
   >};
   >```
   >
   >在这个示例中，我们使用  `XMLHttpRequest`  对象发送了一个 HTTP GET 请求到  
   >
   >https://api.example.com/users/12345 
   >
   > 这个 URL。当请求成功时，我们会解析响应数据，并将其转换为 JavaScript 对象。   RESTful API 是一种非常灵活的网络应用程序接口设计风格。它可以用于构建各种各样的网络应用程序。如果您正在构建一个网络应用程序，并且需要访问服务器端资源，那么 RESTful API 是一个非常好的选择。
   >
   >

4. 如果使用Express写Restful API？

   > Express 是一个用 JavaScript 编写的 Web 框架，它提供了一系列工具来帮助开发人员快速构建 Web 应用程序。Express 的特点是简单易用，并且提供了大量的插件和模块，可以扩展其功能。   Express 可以用来构建 RESTful API。RESTful API 是一种基于 HTTP 协议的网络应用程序接口设计风格，它遵循 REST 架构原则，使用 HTTP 动词来表示对资源的操作，使用 URI 来表示资源的地址。   要使用 Express 写 RESTful API，可以使用以下步骤：   1. 创建一个新的 Express 应用程序。  2. 使用  `app.use()`  方法注册路由。  3. 使用  `app.get()` 、 `app.post()` 、 `app.put()`  和  `app.delete()`  方法处理请求。  4. 使用  `res.send()`  方法发送响应。   以下是一个使用 Express 写 RESTful API 的简单示例：
   >
   > ```
   > const express = require('express');
   > const app = express();
   > 
   > app.get('/users', (req, res) => {
   >   res.send('Hello, world!');
   > });
   > 
   > app.listen(3000, () => {
   >   console.log('Example app listening on port 3000!');
   > });
   > ```
   >
   > 这个示例创建了一个简单的 RESTful API，它可以返回一个简单的字符串响应。 

5. 如何使用express Router？

   > Express Router 是一个用于构建 Express 应用程序的路由器。它提供了一个简单的 API，可以让你轻松地定义路由，并将请求路由到处理程序。   要使用 Express Router，你需要先创建一个新的 Router 实例。你可以使用  `express.Router()`  方法来创建一个新的 Router 实例。
   >
   > ```
   > const router = express.Router();
   > ```
   >
   > 接下来，你可以使用  `router.get()` 、 `router.post()` 、 `router.put()` 、 `router.delete()`  和  `router.head()`  方法来定义路由。这些方法都接受一个路径和一个处理程序作为参数。   路径是请求的 URL 部分，它将用于匹配请求。处理程序是当请求匹配路径时要执行的函数。
   >
   > ```
   > router.get('/', (req, res) => {
   >   res.send('Hello World!');
   > });
   > ```
   >
   > 当请求的 URL 是  `/`  时，这个路由将会匹配，并且  `res.send()`  方法将会被调用。   你可以使用  `router.use()`  方法来注册中间件。中间件是可以在请求到达处理程序之前或之后执行的函数。
   >
   > ```
   > router.use((req, res, next) => {
   >   // 执行中间件
   >   next();
   > });
   > ```
   >
   > 中间件可以用于处理各种任务，例如身份验证、授权、日志记录和缓存。   当你定义好路由后，你可以使用  `app.use()`  方法将 Router 实例注册到 Express 应用程序中。
   >
   > ```
   > app.use('/api', router);
   > ```
   >
   > 现在，当请求的 URL 以  `/api`  开头时，它们将会被路由到 Router 实例中。   Express Router 是一个非常强大的工具，它可以让你轻松地构建 Express 应用程序。它提供了一个简单的 API，可以让你轻松地定义路由，并将请求路由到处理程序。

## 代码题

1. 请实现 CRUD 用户 的 restful API，用户必须要有 id，用户名，密码，邮箱字段，其他字段可以自行扩展。需要实现 `GET`，`POST`，`PUT`,`DELETE`,`PATCH`五种访问形式，数据存储在内存中即可

   > ```js
   > const express = require('express');
   > const mongoose = require('mongoose');
   > 
   > // 创建一个新的 Express 应用程序
   > const app = express();
   > 
   > // 连接到 MongoDB 数据库
   > mongoose.connect('mongodb://localhost:27017/users');
   > 
   > // 创建一个新的用户模型
   > const User = mongoose.model('User', {
   >   id: { type: Number, required: true, unique: true },
   >   username: { type: String, required: true, unique: true },
   >   password: { type: String, required: true },
   >   email: { type: String, required: true, unique: true },
   > });
   > 
   > // 注册路由
   > app.get('/users', (req, res) => {
   >   // 查询所有用户
   >   User.find({}, (err, users) => {
   >     if (err) {
   >       res.status(500).send(err);
   >     } else {
   >       res.send(users);
   >     }
   >   });
   > });
   > 
   > app.post('/users', (req, res) => {
   >   // 创建一个新的用户
   >   const user = new User({
   >     username: req.body.username,
   >     password: req.body.password,
   >     email: req.body.email,
   >   });
   > 
   >   // 保存用户
   >   user.save((err, user) => {
   >     if (err) {
   >       res.status(500).send(err);
   >     } else {
   >       res.status(201).send(user);
   >     }
   >   });
   > });
   > 
   > app.put('/users/:id', (req, res) => {
   >   // 查询用户
   >   User.findById(req.params.id, (err, user) => {
   >     if (err) {
   >       res.status(500).send(err);
   >     } else if (!user) {
   >       res.status(404).send('User not found');
   >     } else {
   >       // 更新用户
   >       user.username = req.body.username;
   >       user.password = req.body.password;
   >       user.email = req.body.email;
   > 
   >       // 保存用户
   >       user.save((err, user) => {
   >         if (err) {
   >           res.status(500).send(err);
   >         } else {
   >           res.status(200).send(user);
   >         }
   >       });
   >     }
   >   });
   > });
   > 
   > app.delete('/users/:id', (req, res) => {
   >   // 查询用户
   >   User.findById(req.params.id, (err, user) => {
   >     if (err) {
   >       res.status(500).send(err);
   >     } else if (!user) {
   >       res.status(404).send('User not found');
   >     } else {
   >       // 删除用户
   >       user.remove((err, user) => {
   >         if (err) {
   >           res.status(500).send(err);
   >         } else {
   >           res.status(200).send(user);
   >         }
   >       });
   >     }
   >   });
   > });
   > 
   > // 启动应用程序
   > app.listen(3000, () => {
   >   console.log('App listening on port 3000');
   > });
   > ```
   >
   > 这个 API 可以通过以下方式访问：   * 获取所有用户： `GET /users`   * 创建一个新用户： `POST /users`   * 更新一个用户： `PUT /users/:id`   * 删除一个用户： `DELETE /users/:id`    数据会存储在内存中，因此当服务器重启时，数据会丢失。如果需要持久化数据，可以使用 MongoDB 的持久化功能。

## 算法题

1. [[35\]Search Insert Position](https://leetcode.com/problems/search-insert-position)

   **查询插入的位置**

   给出一个有序数组和一个目标值，如果能找到目标数，请直接返回下标。如果不能，返回可以插入此元素的位置。你可以认为数组中没有重复的元素。

   以下是一些例子。

   `[1,3,5,6]`, 5 → 2
   `[1,3,5,6]`, 2 → 1
   `[1,3,5,6]`, 7 → 4
   `[1,3,5,6]`, 0 → 0

2. [[33\]Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array)

   **在旋转的数组里搜索**

   假设一个数组以递增顺序排序，但是是排序后经过旋转的，而旋转点在处理前你是不知道的。

   （如：`0 1 2 4 5 6 7`可能会变成`4 5 6 7 0 1 2`）

   给你一个目标数，你需要在数组中查找它的位置，如果找到请返回它的下标，如果找不到请返回-1

   你可以假设数组中没有重复的元素存在。

   hint:可以尝试使用二分搜索

   