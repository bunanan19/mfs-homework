## 问答题

1. ES6 中的 class 其本质是 es5 声明类的方式的语法糖吗？请从原型链方面证明你的想法

   >
   >
   >

2. ES6 中的类构造函数如何声明？

   >
   >
   >

3. ES6 实现类 `private` 方法有几种形式？各是什么？

   > 

4. 如何声明类的`get`，`set`方法？何时会调用`get`、`set`方法？

   > 

5. 什么是类的静态方法？如何声明？如何调用？

   > 

6. ES6 中如何进行继承？子类的构造函数中如何调用父类的构造函数？

   > 

7. ES6 的模块中如何导入导出变量？

   > 

8. ES6 的模块 `export default` 和 `export` 有何异同？

   > 

9. 修饰器（Decorator）是什么？如何使用？

   > 

## 代码题

1. 请写出与下面 ES5 代码等价的 ES6 代码

   ```javascript
   function Point(x, y) {
      this.x = x;
      this.y = y;
   }
   
   Point.prototype.toString = function () {
      return '(' + this.x + ', ' + this.y + ')';
   };
   
   var p = new Point(1, 2);
   ```

2. 请实现`Circle`类，其表示平面上的一个圆，构造时需要传入 `x`,`y`,`r` 分别为圆在平面上的坐标 (x,y）和其半径 `r`，需要支持使用 `circle.area` 获取圆的面积

3. 假定我们的代码中需要4个类，分别是 `Animal`，`Dog`，`Cat`，`Human`。`Animal` 有方法 `eat`,`sleep`;`Dog`,`Cat`有方法`bark`；`Human`有方法`speak`；请使用 ES6 中的继承实现。