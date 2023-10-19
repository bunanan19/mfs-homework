# DOM

当网页被加载时，浏览器会创建页面的文档对象模型（Document Object Model）。

html文档类似树形结构，而js中的object对象也可以是树形结构，obj的嵌套关系和HTML相似时就可能达到等价的效果，文档和对象有一个对应关系。js可以操作dom接口实现动态HTML

通过obj去写文档时，就算先写div、a、h1，最后的顺序也是a、 div、h1，对象里面有顺序，但是document对象在编写的时候像数组一样，有先后顺序，先写的啥，谁就在前面。

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231001120113346.png" alt="image-20231001120113346" style="zoom:80%;" />





HTML DOM 模型被构造为对象的树：

![img](http://www.w3school.com.cn/i/ct_htmltree.gif)

通过可编程的对象模型，JavaScript 获得了足够的能力来创建动态的 HTML。

- JavaScript 能够改变页面中的所有 HTML 元素
- JavaScript 能够改变页面中的所有 HTML 属性
- JavaScript 能够改变页面中的所有 CSS 样式
- JavaScript 能够对页面中的所有事件做出反应

### document 对象

每个载入浏览器的HTML文档都会成为`document`对象。document对象包含了文档的基本信息，我们可以通过JavaScript对HTML页面中的所有元素进行访问、修改。

## document对象常用属性

document对象有很多属性来描述文档信息，介绍几个常用的

### doctype

在书写HTML文档的时候第一句一般都是`doctype`声明，可以通过document对象获取，没有则返回`null`

```
document.doctype; // <!DOCTYPE html>
document.doctype.name; // "html"
```

### head、body

```
document.head;
document.body;
```

通过这两个属性何以分别获取文档的`head`，`body`节点，但是获取head下面的link或者body下面的div就不行了，因为document不是单纯像object那样简单，document有像数组一样的顺序结构，访问div、link需要用到函数

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231001120335370.png" alt="image-20231001120335370" style="zoom:80%;" />

### activeElement

activeElement属性返回当前文档中获得焦点的那个元素。

用户通常可以使用tab键移动焦点，使用空格键激活焦点，比如如果焦点在一个链接上，此时按一下空格键，就会跳转到该链接

### title、characterSet

1. title属性返回当前文档的标题，该属性是可写的
2. characterSet属性返回渲染当前文档的字符集

### cookie

cookie是存储在客户端的文本（前端的数据），后续在客户端存储章节会介绍到

### innerText

innerText是一个可写属性，返回元素内包含的文本内容，在多层次的时候会按照元素由浅到深的顺序拼接其内容

```html
<div>
    <p>
        123
        <span>456</span>
    </p>
</div>
```

外层div的innerText返回内容是 `123456`

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231001122804139.png" alt="image-20231001122804139" style="zoom:80%;" />

### innerHTML、outerHTML

innerHTML属性作用和innerText类似，但是不是返回元素的文本内容，而是返回元素的HTML结构，在写入的时候也会自动构建DOM

```html
<div>
    <p>
        123
        <span>456</span>
    </p>
</div>
```

外层div的innerHTML返回内容是 `"<p>123<span>456</span></p>"`

outerHTML 返回内容还包括本身

## document对象常用方法

### open()、close()

document.open方法用于新建一个文档，供write方法写入内容。它实际上等于清除当前文档，重新写入内容

document.close方法用于关闭open方法所新建的文档。一旦关闭，write方法就无法写入内容了。

### write()

document.write方法用于向当前文档写入内容。只要当前文档还没有用close方法关闭，它所写入的内容就会追加在已有内容的后面。

```javascript
document.open();
document.write("hello");
document.write("world");
document.close();
```

1. 如果页面已经渲染完成再调用write方法，它会先调用open方法，擦除当前文档所有内容，然后再写入。
2. 如果在页面渲染过程中调用write方法，并不会调用open方法。

需要注意的是，虽然调用close方法之后，无法再用write方法写入内容，但这时当前页面的其他DOM节点还是会继续加载。

除了某些特殊情况，应该尽量避免使用document.write这个方法。



## 问答题

1. 什么是 Dom？为什么要用 Dom？

   > 是当网页被加载时，浏览器创建的页面的文档对象模型。DOM可以使JavaScript创建动态的 HTML，对HTML页面中的所有元素进行访问、修改。

2. Dom 有哪些常见属性？

   > document.doctype；//<！DOCTYPE html>
   >
   > document.head;
   >
   > document.body;
   >
   > document.activeElement;
   >
   > document.title;
   >
   > document.characterSet;
   >
   > document.cookie;
   >
   > document.innerText;
   >
   > document.innerHTMl;document.outerHTMl；
   >
   > document.open();
   >
   > document.close();
   >
   > document.write();

3. 如何设置 Cookie？

   > document.cookie

4. `innerText` 和 `innerHTML` 有什么异同？

   > innerText返回元素的文本内容，在多层次的时候会按照元素由浅到深的顺序拼接其内容；innerHTML返回内容是当前元素里的HTML结构

5. `innerHTML` 和 `outerHTML` 有什么不同？

   > innerHTML返回内容是当前标签里的HTML内容；
   >
   > outerHTML 返回内容还包括本身

6. 我们可以使用 `document.write()` 动态生成文档流吗？如何可以，如何操作？

   > 可以

   > document.write("文档流")

7. 在什么时候，`document.write()` 会重写文档流？

   > document.open方法用于新建一个文档，供write方法写入内容。它实际上等于清除当前文档，重新写入内容。如果页面已经渲染完成再调用write方法，它会先调用open方法，擦除当前文档所有内容，然后再写入。如果在页面渲染过程中调用write方法，并不会调用open方法。

## 代码题

1. 请使用 JavaScript 动态生成以下文档

   ```html
   <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
   </ul>
   ```

```javascript
 document.write("<ul><li>1</li><li>2</li><li>3</li></ul>")
```

