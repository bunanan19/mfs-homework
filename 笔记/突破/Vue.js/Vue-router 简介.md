## 问答题

1. 单页面应用为什么要实现页面**切换**而**不刷新**页面？如何实现？
2. HTML5 history 和 Hash 都能实现切换 url 而不刷新页面，它们有何异同？
3. 自己实现的 VLink 的原理是什么？
4. vue-router 中 `<router-view></router-view>` 标签有何作用？
5. vue-router 中如何使用动态路由匹配？

## 代码题

1. 请自己动手实现一个简单的 Vue 路由（需要实现 VLink）并使用自己实现的 VLink 实现以下功能
   1. 有 Home 、 About 和 404 NOTFOUND 三个页面
   2. 三个页面共用一个导航条，导航条上有两个元素：Home 、 About。点击元素跳转到对应页面
   3. 当用户访问不存在的页面时，显示 404 NOTFOUND
2. 请使用 Vue-router 实现以下功能
   1. 有 Home 、 About 和 404 NOTFOUND 三个页面
   2. 三个页面共用一个导航条，导航条上有两个元素：Home 、 About。点击元素跳转到对应页面
   3. 当用户访问不存在的页面时，显示 404 NOTFOUND

## 算法题

1. [[20\]Valid Parentheses](https://leetcode.com/problems/valid-parentheses)

   **括号合法性**

   将给出一个字符串，其中只包括字符`'('`, `')'`, `'{'`, `'}'`, `'['` 和 `']'`，你需要判断输入是否是合法的

   括号必须要被争取的闭合，如`"()"` 和 `"()[]{}"` 是合法的，但是 `"(]"` 和 `"([)]"` 不是。

1. [[16\]3Sum Closest](https://leetcode.com/problems/3sum-closest/#/description)

   **三数最接近和**

   给出包含 n 个整数的数组 S，请找出三个在 S 中的数，使得它们的和最为接近给定的目标数。请返回三数之和，你可以假设所有的输入都有切只有一个解。

   ```
   如 S = {-1 2 1 -4}, target = 1.
   
   最接近目标数的答案是2。(-1 + 2 + 1 = 2)
   ```