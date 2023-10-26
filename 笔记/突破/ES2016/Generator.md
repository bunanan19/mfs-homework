## 问答题

1. 什么是 Generator 函数？和普通函数有什么区别？怎么声明 Generator 函数？
2. 怎样调用 Generator 函数并逐步执行 Generator 代码？
3. Generator 函数实现无限序列原理是什么？
4. Generator 函数怎么实现函数内的数据与函数外进行交互的？请从函数内数据传至函数外，和函数外数据传至函数内 两个方面说明
5. `yield*`有什么用？它和 `yield` 有什么关系？（此题请自学完成）
6. 怎么迭代出Generator 函数所有值？请使用 **for of 循环**实现

## 代码题

1. 请实现 Generator 函数 `range(start,end)`，可以迭代出`start`到`end`直接所有整数
2. 请实现 Generator 函数 `fib()`，实现计算无限序列：斐波那契数列
3. 请使用解构语法，使用上面实现的 `fib()` 函数计算斐波那契数列前 3 项