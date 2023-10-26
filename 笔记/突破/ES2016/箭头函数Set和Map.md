





## 问答题

1. 什么是箭头函数？它和 `function` 声明的函数有什么区别？

2. 下面代码输出的是什么？为什么？

   ```javascript
   var a = 2
   var obj = {
      a : 1,
      fun : function () {
         console.log(this.a)
      }
   }
   
   var obj2 ={
      a : 3
   }
   
   obj.fun()          // ?
   
   var fun = obj.fun;
   fun()              // ?
   
   obj2.fun = obj.fun
   obj2.fun()         // ?
   ```

3. 下面代码输出的是什么？为什么？

   ```javascript
   var a = 2
   var obj = {
      a : 1,
      fun : () => {
         console.log(this.a)
      }
   }
   
   var obj2 ={
      a : 3
   }
   
   obj.fun()          // ?
   
   var fun = obj.fun;
   fun()              // ?
   
   obj2.fun = obj.fun
   obj2.fun()         // ?
   ```

4. 箭头函数的`this`静态绑定是什么含义？和`this`的动态绑定有什么区别？请写出示例代码说明区别

5. 下面代码输出是什么？结合第三题，试理解`this`静态绑定的绑定规则。

   ```javascript
   var id = 2;
   function foo() {
      return () => {
         console.log('id:', this.id);
      };
   }
   
   foo.call({id: 1})()
   ```

6. 对于`function`声明的函数，如果想实现箭头函数的`this`静态绑定，需要怎么做？

7. 什么是柯里化(currying)，它有什么作用？

8. 下面代码输出的是什么？为什么？

   ```javascript
   let fun1 = i => i*2
   let fun2 = i => {i*2}
   
   console.log(fun1(1))   // ?
   console.log(fun2(1))   // ?
   ```

9. 什么是 Set ，它和数组有什么异同？

10. 什么是 WeakSet / WeakMap？和 Set / Map 有什么异同？

## 代码题

1. 请把下列代码改写成箭头函数的写法

   ```javascript
   [1,2,3].map(function (x) {
      return x * x;
   });
   ```

2. 请将下面函数柯里化(currying)，需要写出箭头函数和非箭头函数两种答案

   ```javascript
    function cala(add, mul, origin) {
        return (origin + add) * mul
    }
   ```

3. 请使用 Set 实现数组去重

4. 请实现打印 Map 中所有的键值对