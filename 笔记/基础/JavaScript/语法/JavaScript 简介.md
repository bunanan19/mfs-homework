# JavaScript 简介

> JavaScript 与 Java 是两种完全不同的语言，无论在概念上还是设计上。Java（由 Sun 发明）是更复杂的编程语言。
>
> ECMA-262 是 JavaScript 标准的官方名称。
>
> JavaScript 由 Brendan Eich 发明。它于 1995 年出现在 Netscape 中（该浏览器已停止更新），并于 1997 年被 ECMA（一个标准协会）采纳。
>
> JavaScript 是互联网上最流行的脚本语言，这门语言可用于 HTML 和 web，更可广泛用于服务器、PC、笔记本电脑、平板电脑和智能手机等设备。

## JavaScript 是脚本语言

- JavaScript 是解释执行的，不需要预先编译（要用编译器编译成机器语言，计算机才能执行）。
- <img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230923165347556.png" alt="image-20230923165347556" style="zoom:80%;" />
- JavaScript 是一种轻量级的编程语言。
- JavaScript 是可插入 HTML 页面的编程代码。
- JavaScript 插入 HTML 页面后，可由所有的现代浏览器执行。

## 用法

在 HTML 页面中插入 JavaScript，需要使用 `<script>` 标签。 `<script>` 和 `</script>` 会告诉 JavaScript 在何处开始和结束。 `<script>` 和 `</script>` 之间的代码行包含了 JavaScript:

```html
<script>
alert("我的第一个 JavaScript");
</script>
```

上面例子中的 JavaScript 语句，会在页面加载时执行。 通常，我们需要在某个事件发生时执行代码，比如当用户点击按钮时。 如果我们把 JavaScript 代码放入函数中，就可以在事件发生时调用该函数。 后面的章节会学到更多有关 JavaScript 函数和事件的知识。

## JavaScript 可以干什么？

### 直接写入 HTML 输出流

我们可以在 JS 中直接输出文档

```javascript
document.write("<h1>这是一个标题</h1>");
document.write("<p>这是一个段落。</p>");
```

> 试一试在文档已经存在的情况下使用 `document.write()` 输出文档会怎么样

### 响应事件

我们可以在 JS 中响应元素的事件

```html
<button type="button" onclick="alert('hello')">点我</button>
```

### 改变页面内容

我们可以在 JS 中获取页面元素，然后改变元素。

```javascript
x = document.getElementById("demo")  //通过id查找元素，id=demo
x.innerHTML = "Hello JavaScript";    //改变内容
```

### 表单验证

通过 JS 我们可以实现验证用户的输入的表单是否合法

### 用户交互

通过使用 JS，我们可以自定义用户交互的逻辑（流程），实现弹窗/跳转等功能



## 问答题

1. 如何在 HTML 文档中嵌入 JavaScript 脚本？

   在 HTML 页面中插入 JavaScript，需要使用 `<script>` 标签。 `<script>` 和 `</script>` 会告诉 JavaScript 在何处开始和结束。 `<script>` 和 `</script>` 之间的代码行包含 JavaScript代码

2. JavaScript 需要预先编译吗？它是如何执行的？

   JavaScript 是解释执行的，不需要预先编译。

3. 如何使用 JavaScript 在网页加载完毕时弹窗？

   

## 代码题

1. 请实现在文档流中**动态输出**如下 HTML

```html
<ul>
  <li>码蜂社</li>
  <li>前端</li>
  <li>教程</li>
</ul>
```