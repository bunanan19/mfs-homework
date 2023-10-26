## 问答题

1. Vue 是通过什么方式检测 data 变化？

2. 以下过渡类名各是在什么时候添加的？

   1. `v-enter`
   2. `v-enter-active`
   3. `v-enter-to`
   4. `v-leave`
   5. `v-leave-active`
   6. `v-leave-to`

3. render 函数有什么用？Vue 是如何编译 template ？

4. 指令(directive)是如何声明？如何使用？

5. 如下代码会打印什么？

   ```javascript
   var mixin = {
      created: function () {
         console.log('混合对象的钩子被调用')
      }
   }
   new Vue({
      mixins: [mixin],
      created: function () {
         console.log('组件钩子被调用')
      }
   })
   ```

## 代码题

1. 请实现全局混合，当组件创建(created)的时候打印 `created`

2. 请手动将如下 template 转化为与之等价的 `render` 函数

   ```html
   <div>
      <h1>I'm a template!</h1>
      <p v-if="message">
         {{ message }}
      </p>
      <p v-else>
         No message.
      </p>
   </div>
   ```

3. 请完成如下渐变效果
   ![img](http://static.mafengshe.com/work/vue/transation.gif)

## 算法题

1. [[9\]Palindrome Number](https://leetcode.com/problems/palindrome-number/)

   回文数判断

   你需要判断一个数是否是回文的。

   一些提示：

   - 负数是回文的吗？
   - 如果你把数转化为字符串，请注意额外的空格
   - 如果你直接逆序 integer，请注意有可能整数会溢出

2. [[6\]ZigZag Conversion](https://leetcode.com/problems/zigzag-conversion)

   曲折转换

   把字符串 `"PAYPALISHIRING"` 写成曲折形式将看起来像下面这样

   ```
   P   A   H   N
   A P L S I I G
   Y   I   R
   ```

   然后我们按行读取结果就是`"PAHNAPLSIIGYIR"`

   你需要完成`convert`函数，convert(“PAYPALISHIRING”, 3) 应该返回 “PAHNAPLSIIGYIR”.