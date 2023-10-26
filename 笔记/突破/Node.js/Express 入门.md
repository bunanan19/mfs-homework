## 问答题

1. Express的Http请求处理模型是什么？
2. 如何使用 express-generator 生成 express 项目？请使用它生成项目并对`app.js`和`bin/www`两个文件关键代码进行注释详解
3. 请查阅资料完成：什么是 Restful API ？如何使用Restful API访问服务器端资源？
4. 如果使用Express写Restful API？
5. 如何使用express Router？

## 代码题

1. 请实现 CRUD 用户 的 restful API，用户必须要有 id，用户名，密码，邮箱字段，其他字段可以自行扩展。需要实现 `GET`，`POST`，`PUT`,`DELETE`,`PATCH`五种访问形式，数据存储在内存中即可

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

   