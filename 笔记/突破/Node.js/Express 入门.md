在文件下创建npm项目 `npm init`

安装express

创建入口文件，并在入口文件index.js写入代码，使用 Express 框架创建一个简单的 Web 服务器。



 

创建express项目，安装`cnpm install -g express-generator@4`

 创建一个基于 Express 框架的新项目，并使用 EJS 模板引擎和 Stylus CSS 预处理器。创建一个叫express的项目`express express -e=ejs -s=stylus`

安装依赖 `npm install`

## 问答题

1. Express的Http请求处理模型是什么？

   > Express 的 HTTP 请求处理模型是基于use中间件的，中间件是一系列函数，在请求到达应用程序之前或之后被调用,按照use中间件的顺序对http请求进行处理，然后再进行分配(get、post请求等)。

2. 如何使用 express-generator 生成 express 项目？请使用它生成项目并对`app.js`和`bin/www`两个文件关键代码进行注释详解

   > 创建一个基于 Express 框架的新项目express，并使用 EJS 模板引擎和 Stylus CSS 预处理器。`express express -e=ejs -s=stylus`,安装依赖 `npm install`
   >
   > `app.js`  文件是 Express 应用程序的入口文件，负责初始化应用程序并注册路由。
   >
   > <img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231201022325232.png" alt="image-20231201022325232" style="zoom:80%;" />
   >
   > `bin/www`  文件是 Express 应用程序的启动文件，负责启动应用程序并监听端口。
   >
   > <img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231201023035516.png" alt="image-20231201023035516" style="zoom:80%;" />
   >
   > <img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231201023051985.png" alt="image-20231201023051985" style="zoom:80%;" />

3. 请查阅资料完成：什么是 Restful API ？如何使用Restful API访问服务器端资源？

   >RESTful API 是一种基于 HTTP 协议的网络应用程序接口设计风格，使用 HTTP 动词来表示对资源的操作，使用 URI 来表示资源的地址。   
   >
   >常见的RESTful API包括：   
   >
   >- GET：获取资源的信息。 
   >- POST：创建新的资源。  
   >- PUT：更新已有资源。  
   >- DELETE：删除资源。  
   >- PATCH：部分更新资源。  
   >- OPTIONS：获取资源支持的HTTP方法。  
   >- HEAD：获取资源的元数据。 

4. 如果使用Express写Restful API？

   > ```js
   > let express = require('express')
   > let app = express()
   > 
   > app.get('/', (req, res) => {
   >     res.write('hello get express')
   >     res.end()
   > })
   > app.post('/', (req, res) => {
   >     res.write('hello post express')
   >     res.end()
   > })
   > app.delete('/', (req, res) => {
   >     res.write('hello delete express')
   >     res.end()
   > })
   > app.put('/', (req, res) => {
   >     res.write('hello put express')
   >     res.end()
   > })
   > app.patch('/', (req, res) => {
   >     res.write('hello patch express')
   >     res.end()
   > })
   > app.listen(3000, () => {
   >     console.log('Example express app listening on port 3000!')
   > })
   > ```

5. 如何使用express Router？

   > ```js
   > let express = require('express')
   > let router = express.Router()
   > //注册中间件
   > router.use((req,res,next)=>{
   >     console.log('-----------3------------')
   >     next()
   > })
   > //定义路由,当请求的URL是`/a`时，这个路由将会匹配，并且`res.write()`方法将会被调用。
   > router.get('/a',(req,res,next)=>{
   >     res.write('subrouter')
   >     res.end()
   > })
   > ```
   >
   > 

## 代码题

1. 请实现 CRUD 用户 的 restful API，用户必须要有 id，用户名，密码，邮箱字段，其他字段可以自行扩展。需要实现 `GET`，`POST`，`PUT`,`DELETE`,`PATCH`五种访问形式，数据存储在内存中即可

   > https://github.com/bunanan19/mfs-homework/blob/main/%E7%AA%81%E7%A0%B4/node/express/express/user.js





























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

   