## 问答题

1. 什么是 Webpack ，它能完成哪些功能？
2. Webpack 有哪 4 个核心概念？这些概念的意义是什么？有何作用？
3. 请列举 5 个 Webpack 常用 loader，并简述他们的作用
4. 请列举 5 个 Webpack 常用 plugin，并简述他们的作用
5. 如何实现 script 标签自动注入？
6. Webpack 中如何 require 资源文件（图片，字体）？为什么可以 require ，其原理是什么？
7. 如何安装 loader？
8. Webpack 支持链式 loader 吗？如何配置？
9. Webpack require 如何导入 node_modules 中的模块？如何导入自己写的模块？二者有何不同？
10. 什么是 source-map？为什么一般使用打包工具都需要 source-map?
11. 【选做】如何实现 Webpack 打包多页面应用？hint:多入口，多出口，多个注入 plugin

## 代码题

1. 请手动配置一个`webpack.conf.js`文件，实现如下功能
   1. script 标签自动注入
   2. 可以 require .txt 和 .stylus 文件
   3. 文件修改后自动刷新页面
   4. 导入 axios 包，实现 ajax 请求

## 算法题

1. [[12\]Integer to Roman](https://leetcode.com/problems/integer-to-roman)

   **整数转罗马数字**

   给你一个整数，请将它转化为罗马数字

   输入在1-3999之间

   > **hint:** 罗马数字表示规则可以参看[这里](http://baike.baidu.com/link?url=WTPwS9kT9lkd_vaoSbpxNKNjR2pDypI4Py828pXOHISpD302RBf1OZ7Pb_wnerLyibmamAtaifq1CjkGrfgHgZaDgNYOGUSYWn-FwtSl5qdjcn1PDkORsmywNozypYTH)

2. [[13\]Roman to Integer](https://leetcode.com/problems/roman-to-integer)

   **罗马数字转整数**

   给你一个罗马数字，请将它转化为整数

   输入在1-3999之间

   > **hint:** 罗马数字表示规则可以参看[这里](http://baike.baidu.com/link?url=WTPwS9kT9lkd_vaoSbpxNKNjR2pDypI4Py828pXOHISpD302RBf1OZ7Pb_wnerLyibmamAtaifq1CjkGrfgHgZaDgNYOGUSYWn-FwtSl5qdjcn1PDkORsmywNozypYTH)