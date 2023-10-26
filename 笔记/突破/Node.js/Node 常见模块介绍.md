## 问答题

1. Node.js 中什么是事件？如何定义事件？如何触发事件？
2. Node.js 中如何读写文件？请分别给出示例代码
3. 流是什么？如何使用流读取文件？
4. Node.js 中如何获取环境变量？

## 代码题

1. 请自行查阅资料学习`fs.ReadStream`，并使用它读取任意文件并将其中内容打印
2. 请使用 http server 配合流处理，完成form表单的文件上传功能（浏览器提交的文件需要保存到服务器端自己定义的目录下）
3. Node.js 中 http 模块既有 server 端，又有 client 端，请实现一个简单的server：对于任何请求返回`hello`。而后使用 client 端请求你自己的server，并打印出结果

## 算法题

1. [[29\]Divide Two Integers](https://leetcode.com/problems/divide-two-integers)

   **两个整数相除**

   请实现两个整数相除，但是不能使用加法，除法和求余操作

   如果溢出，请返回 MAX_INT

   hint: MAX_INT = 2147483647

2. [[30\]Substring with Concatenation of All Words](https://leetcode.com/problems/substring-with-concatenation-of-all-words)

   **子字符串是系列单词**

   给出一个字符串`s`，还有一些列的相同长度的单词`words`。请找出所有的`s`满足条件的子字符串的起始位置。条件是：子字符串是所有的`words`里的单词的组合，中间不允许存在其他字符。

   如给出

   `s`:`"barfoothefoobarman"`

   `words`:`["foo", "bar"]`

   你需要返回索引 `[0,9]`

   