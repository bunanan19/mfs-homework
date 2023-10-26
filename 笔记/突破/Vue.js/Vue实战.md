## 实践题

1. 请实现 **Markdown 编辑器**，效果参考[这里](https://cn.vuejs.org/v2/examples/index.html)
2. 请实现 **树形视图**，效果参考[这里](https://cn.vuejs.org/v2/examples/tree-view.html)，hint:使用组件递归
3. 请实现 **TodoMVC**，效果参考[这里](https://cn.vuejs.org/v2/examples/todomvc.html)

## 算法题

> 从这次作业开始，大家需要完成算法题，请先去 [leetcode](https://leetcode.com/) 上注册账号，完成对应的代码并在线提交，在线提交通过后需要在作业管理系统中提交Accepted的代码，并截图 [problems](https://leetcode.com/problemset/all/) 中题号前绿色对勾
>
> [leetcode](https://leetcode.com/)上可以选择语言，建议使用 js 或者 c/c++（如果会） 完成，如下图所示选择语言
>
> ![0_1498292114350_upload-aeefa5bb-c26f-4af7-bb1f-f6ef2e645a09](http://bbs.static.mafengshe.com/FlvBVLh0IBNWqlnWOcuLObOGkB3k?imageMogr2/quality/40)

1. [[1\]Two Sum](https://leetcode.com/problems/two-sum/)

   **两数之和**

   给出一个整数的数组和一个目标数，你需要返回数组中两个数之和等于目标数的**数组下标**

   你可以假设所有的输入都有且只有一个解，并且你不能使用同一个元素两次

   例子：

   ```
   nums = [2, 7, 11, 15], target = 9
   
   因为 nums[0] + nums[1] = 2 + 7 = 9
   
   返回 [0, 1]
   ```

2. [[2\]Add Two Numbers](https://leetcode.com/problems/add-two-numbers/#/description)

   **两数相加**

   给出两个**非空**链表，其代表两个非负整数。数字是倒序，每一个节点都只包括一个数字，你需要将两个数相加，然后以链表的形式返回他们。

   你可以假设除了0自己，两个数并没有前置0

   如 342 + 465 = 807

   **Input:** (2 -> 4 -> 3) + (5 -> 6 -> 4)

   **Output:** 7 -> 0 -> 8