## 问答题

1. Symbol 是什么？有哪些使用场景？
2. `Symbol("foo") == Symbol("foo")`输出什么？为什么？
3. `Symbol.iterator` 是什么？这里为什么要使用 `Symbol` 那？
4. 哪些对象（容器）内部实现了 iterator ？
5. 数组解构的核心本质是什么？哪些对象（容器）可以作为数组解构的右值？

## 代码题

1. 请实现与下面 generator 函数 等价的迭代器

   ```javascript
   function* gen(){
      yield 1
      yield 2
      return 3;
   }
   ```

2. 请给对象 `let obj={}` 加上迭代器，实现可以无限打印 `a`

3. 请给对象 `obj` 加上迭代器，使其可以像数组一样使用 `for of` 循环

   ```javascript
   let obj = {
      [0] : "a",
      [1] : "b",
      [2] : "c",
      length : 3
   }
   ```