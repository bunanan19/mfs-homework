## HTML

1. HTML：超文本标记语言。

   超文本：超级文本的中文缩写。超链接的方法，将各种不同空间的文字信息组织在一起。可以理解为“超越纯文本”。

   

2. HTML标签：HTML的基本单位，不是编程语言，而是使用一系列的标记，来表示/存储信息。

   特点：由尖括号包围的关键词，如<html>

   ​            通常成对出现，如<div>和 </div>

   ​            标签对第一个为开始标签，第二个为结束标签

   ​             

3. 浏览器及其内核

   ![image-20230908171214074](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230908171214074.png)

   

4.  < !DOCTYPE html> 声明为HTML5文档，HTML 文档的**第一行**，位于 `<html>` 标签之前。 `<!DOCTYPE>` 并不属于 HTML 标签，它只是标示当前 HTML 文档的版本信息

   ![image-20230908172851826](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230908172851826.png)

      ![image-20230908182854918](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230908182854918.png)

这个元素的主要部分有：

**开始标签**（Opening tag）：包含元素的名称（本例为 p），被大于号、小于号所包围。表示元素从这里开始或者开始起作用 —— 在本例中即段落由此开始。

**结束标签**（Closing tag）：与开始标签相似，只是其在元素名之前包含了一个斜杠。这表示着元素的结尾 —— 在本例中即段落在此结束。初学者常常会犯忘记包含结束标签的错误，这可能会产生一些奇怪的结果。

**内容**（Content）：元素的内容，本例中就是所输入的文本本身。

**元素**（Element）：开始标签、结束标签与内容相结合，便是一个完整的元素。

元素也可以有属性（Attribute）：

![image-20230908183326666](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230908183326666.png)

属性包含了关于元素的一些额外信息，这些信息本身不应显现在内容中。本例中，`class` 是属性名称，`editor-note` 是属性的值（属性值建议用双引号括起来）。`class` 属性可为元素提供一个标识名称，以便进一步为元素指定样式或进行其他操作时使用。

属性应该包含：

+ 在属性与元素名称（或上一个属性，如果有超过一个属性的话）之间的空格符。

+ 属性的名称，并接上一个等号。

+ 由引号所包围的属性值。



### [嵌套元素](https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web/HTML_basics#嵌套元素)

也可以将一个元素置于其他元素之中 —— 称作**嵌套**。要表明猫咪非常暴躁，可以将“very”用 [`<strong>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/strong) 元素包围，爆字将突出显示：

```
<p>My cat is <strong>very</strong> grumpy.</p>
```

必须保证元素嵌套次序正确：本例首先使用 [`<p>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/p) 标签，然后是 [`<strong>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/strong) 标签，因此要先结束 [`<strong>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/strong) 标签，最后再结束 [`<p>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/p) 标签。这样是不对的：

```
<p>My cat is <strong>very grumpy.</p></strong>
```

元素必须正确地开始和结束，才能清楚地显示出正确的嵌套层次。否则浏览器就得自己猜测，虽然它会竭尽全力，但很大程度不会给你期望的结果。所以一定要避免！



5. `<html>`，`<body>`，`<head>`标签的相对包含关系是什么？

   <html>:`<html>`的直接子元素，该元素包含整个页面的所有内容，有时候也称作根元素。

   <body>：`<html>`的直接子元素，该元素包含期望让用户在访问页面时看到的*全部*内容，包括文本、图像、视频、游戏、可播放的音轨或其他内容。

   <head>：所有那些你加到页面中，且不向看客展示的页面成员，都以这个元素为容器。其中包含诸如提供给搜索引擎的关键字和页面描述、用作风格化页面的 CSS、字符集声明等等。



6. `<head>`标签中可以放置哪些子标签？各有什么作用？

可以放置如下子元素：

- `<title>` 该元素设置页面的标题，在 HTML/XHTML 文档中是必须的,显示在浏览器标签页上，也作为收藏网页的描述文字。

- ```
  <base>
  ```

  标签描述了基本的链接地址/链接目标，该标签作为HTML文档中所有的链接标签的默认链接。(指定用于一个文档中包含的所有相对 URL 的根 URL。一份中只能有一个该元素。具有全局属性)

  ```html
  <base href="http://www.mafengshe.com/a/" target="_blank">
  ```

  其中的target

  默认浏览上下文的关键字或作者定义的名称，当没有明确目标的链接 [`<a>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a) 或表单 [`<form>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/form) 导致导航被激活时显示其结果。该属性值定位到*浏览上下文*（例如选项卡，窗口或内联框 [`<iframe>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe)）。以下的关键字指定特殊的意思：

  - `_self`: 载入结果到当前浏览上下文中。（该值是元素的默认值）。
  - `_blank`: 载入结果到一个新的未命名的浏览上下文。
  - `_parent`: 载入结果到父级浏览上下文（如果当前页是内联框）。如果没有父级结构，该选项的行为和`_self`一样。
  - `_top`: 载入结果到顶级浏览上下文（该浏览上下文是当前上下文的最顶级上下文）。如果没有父级，该选项的行为和_self 一样。

- ```
  <link>
  ```

  标签定义了文档与外部资源之间的关系,通常用于链接到样式表(当css内容过多时，不便于写入HTML文件，需要link链接css文件)

  ```html
  <link rel="stylesheet" type="text/css" href="style.css">
  ```

- ```
  <style>
  ```

  标签定义了HTML文档的样式文件引用地址,指定样式文件来渲染HTML文档（少量css内容可以直接写在HTML中，用<style>标签）

  ```html
  <style type="text/css">
    body {background-color:yellow}
    p {color:blue}
  </style>
  ```

- ```
  <meta>
  ```

  标签提供了元数据.元数据也不显示在页面上，但会被浏览器解析。META元素通常用于指定网页的描述，关键词，文件的最后修改时间，作者，和其他元数据。元数据可以使用于浏览器（如何显示内容或重新加载页面），搜索引擎（关键词），或其他Web服务。一般放置于[<head>]()区域

  - 这个元素简单地指定了文档的字符编码——在这个文档中被允许使用的字符集。`utf-8`是一个通用的字符集，它包含了任何人类语言中的大部分字符，意味着该网页可以显示任何语言；所以对于你的每个页面都使用这个设置会是一个好主意！也就是说，你的页面可以很好地处理中文和日文：

    ```html
    <meta charset="utf-8">
    ```

  - 为网页定义描述内容

    name指定了元素类型；说明该元素包含什么类型信息

    content指定实际的元数据内容

    ```html
    <meta name="keywords" content="HTML, CSS, JavaScript">
    ```

  - 定义网页作者

    ```html
    <meta name="author" content="mafengshe">
    ```

    这两个例子为搜索引擎提供了该网页的关键信息，当用户进行关键字搜索时，该段的内容与关键字匹配高，位置就更靠前。

  - 定时刷新当前页面（30秒）

    ```html
    <meta http-equiv="refresh" content="30">
    ```

- `<script>`标签用于加载脚本文件，如： JavaScript。在标签内部书写脚本或引入脚本文件位置

  ```html
  <script type="text/javascript">
    document.write("Hello World!")
  </script>
  ```

  ```html
  <script type="text/javascript" src="scripts.js"></script>
  ```



### 代码题

https://github.com/bunanan19/mfs-homework/blob/main/test.html







