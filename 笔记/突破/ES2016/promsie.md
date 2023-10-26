## 问答题

1. Promsie 对象有几种状态？他们之间是怎么转换的？

2. 下面代码的输出结果是什么？（**饿了么面试题**）

   ```javascript
   setTimeout(function() {
      console.log(1)
   }, 0);
   new Promise(function executor(resolve) {
      console.log(2);
      for( var i=0 ; i<10000 ; i++ ) {
         i == 9999 && resolve();
      }
      console.log(3);
   }).then(function() {
      console.log(4);
   });
   console.log(5);
   ```

3. 什么是 Promise 对象？引入 Promise 对象是为了解决什么？

4. `var p = new Promise()` 中 `p` 对象有哪些方法？各有什么功能？

5. `Promise.all` 和 `Promise.race` 的区别是什么？

6. Promise 中抛出未处理的异常会怎么样？会阻碍后面的代码执行吗？Chrome 和 Node.js 环境下有什么不同？

7. `catch` 方法中再抛出异常会怎么样，需要怎样捕捉？

8. `then`的**链式调用**每次返回的是同一个 Promise 对象吗？请写一小段代码证明你的观点

## 代码题

1. 请使用 `Promise` 重构之前作业：*新闻瀑布流* 中的 **图片加载** 和 **加载更多** 部分，比较 `Promise` 写法与之前的写法的区别
2. 请自行封装 `ajaxGet(url)` 函数，其返回值为 Promise ，其中 data 为获取的数据（内部使用 XMLHttpRequest）
3. 请利用自己实现的 `ajaxGet(url)` 函数，实现**串行**（一个接一个的）发送10个请求，来获取下面 api 的前10页数据
4. 请利用自己实现的 `ajaxGet(url)` 函数，实现**并行**（同时）发送10个请求，来获取下面 api 的前10页数据

GET http://learning-api.mafengshe.com/news （后端已经添加跨域返回头），该地址支持如下几个参数

|    参数    | 含义                                     |
| :--------: | :--------------------------------------- |
| `pageSize` | 默认值 30（最大200），每一页的新闻条目数 |
|   `page`   | 默认 1，请求的页码                       |