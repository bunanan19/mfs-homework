## 问答题

1. 如何新建一个npm项目，本质是创建了什么文件？

   > 

2. 如何安装删除npm包？全局安装和局部安装有什么区别？

   > 

3. 如何自定义 npm 命令（scripts）？

   > 

4. Node.js中`require('./xxxx')`和`require('xxxx')`导入的包相同吗？

   > 

5. Node.js中是如何处理循环引用？

   > 

6. Node.js 模块如何如何导出变量/函数/对象？

   > 

7. `module.exports` 和 `exports` 的使用有何区别？(饿了么面试题)

   > 

8. Node.js 模块中可以定义全局变量（其他模块可以直接引用访问）吗？如果能，应该如何定义？如果不能，请说明原因。（饿了么[面试题](https://github.com/ElemeFE/node-interview/blob/master/sections/zh-cn/module.md#模块机制)改编）

   > 

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
   
   