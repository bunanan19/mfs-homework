# JQuery

http://it028.com/jquery-intro.html

https://www.w3school.com.cn/jquery/index.asp

**jQuery 是一个 JavaScript 库。**

**jQuery 极大地简化了 JavaScript 编程。**



jQuery 库包含以下特性：

- HTML 元素选取
- HTML 元素操作
- CSS 操作
- HTML 事件函数
- JavaScript 特效和动画
- HTML DOM 遍历和修改
- AJAX
- Utilities

## 向页面添加 jQuery 库

jQuery 库位于一个 JavaScript 文件中，其中包含了所有的 jQuery 函数。将jQuery中的jQuery.js文件复制到本地文件中jquery.js。

可以通过下面的标记把 jQuery 添加到网页中：

```html
<html>
<head>
<script type="text/javascript" src="jquery.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
  	$("p").click(function(){
 	$(this).hide();
  		});
	});
</script>
</head>

<body>
<p>If you click on me, I will disappear.</p>
</body>

</html> 
```

## 库的替代

Google 和 Microsoft 对 jQuery 的支持都很好。

如果您不愿意在自己的计算机上存放 jQuery 库，那么可以从 Google 或 Microsoft 加载 CDN jQuery 核心文件。

### 使用 Google 的 CDN

```html
<head>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs
/jquery/1.4.0/jquery.min.js"></script>
</head>
```

### 使用 Microsoft 的 CDN

```html
<head>
<script type="text/javascript" src="http://ajax.microsoft.com/ajax/jquery
/jquery-1.4.min.js"></script>
</head>
```

在` <script> `标签中使用 type="text/javascript" ？

在 HTML5 中，不必那样做了。JavaScript 是 HTML5 以及所有现代浏览器中的默认脚本语言！



**JQuery标志：`JQuery`和`$`**



**通过 jQuery，您可以选取（查询，query） HTML 元素，并对它们执行“操作”（actions）。**

document不支持多重属性查找，但是jQuery可以。<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015150205008.png" alt="image-20231015150205008" style="zoom:67%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015145720421.png" alt="image-20231015145720421" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015145828931.png" alt="image-20231015145828931" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015150511657.png" alt="image-20231015150511657" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015150559518.png" alt="image-20231015150559518" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015150711562.png" alt="image-20231015150711562" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015150824935.png" alt="image-20231015150824935" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015151041445.png" alt="image-20231015151041445" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015151510923.png" alt="image-20231015151510923" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015151809738.png" alt="image-20231015151809738" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015152005836.png" alt="image-20231015152005836" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015152148920.png" alt="image-20231015152148920" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015152331315.png" alt="image-20231015152331315" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015152531512.png" alt="image-20231015152531512" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015152755620.png" alt="image-20231015152755620" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015152813327.png" alt="image-20231015152813327" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015153555481.png" alt="image-20231015153555481" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015153717975.png" alt="image-20231015153717975" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015153906975.png" alt="image-20231015153906975" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015154105423.png" alt="image-20231015154105423" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015154154338.png" alt="image-20231015154154338" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015155044550.png" alt="image-20231015155044550" style="zoom:80%;" />

在html中写入script，我们通常写在body的最下面，是为了避免文本内容没有加载出来的时候js代码已经加载了，就会报错。jQuery有更好的处理方法，就是当document文档完全加载好了后，再执行某些操作，如上图，也可以简化掉document.ready，直接$(function(){});这也是再document加载好了后才执行的，是document.ready的事件处理函数。

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015155644930.png" alt="image-20231015155644930" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015155918409.png" alt="image-20231015155918409" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015160107890.png" alt="image-20231015160107890" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015160614305.png" alt="image-20231015160614305" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015160747024.png" alt="image-20231015160747024" style="zoom:80%;" />在其中传入参数就可以设置动画的时间

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015161128807.png" alt="image-20231015161128807" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015161324810.png" alt="image-20231015161324810" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015161558766.png" alt="image-20231015161558766" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015162433534.png" alt="image-20231015162433534" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015162539831.png" alt="image-20231015162539831" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015163232327.png" alt="image-20231015163232327" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015163814514.png" alt="image-20231015163814514" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015163938602.png" alt="image-20231015163938602" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015164245770.png" alt="image-20231015164245770" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015164427093.png" alt="image-20231015164427093" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015164517271.png" alt="image-20231015164517271" style="zoom:80%;" />





## jQuery 语法实例

- [$(this).hide()](https://www.w3school.com.cn/tiy/t.asp?f=jquery_hide_this)

  演示 jQuery hide() 函数，隐藏当前的 HTML 元素。

- [$("#test").hide()](https://www.w3school.com.cn/tiy/t.asp?f=jquery_hide_id)

  演示 jQuery hide() 函数，隐藏 id="test" 的元素。

- [$("p").hide()](https://www.w3school.com.cn/tiy/t.asp?f=jquery_hide_p)

  演示 jQuery hide() 函数，隐藏所有 <p> 元素。

- [$(".test").hide()](https://www.w3school.com.cn/tiy/t.asp?f=jquery_hide_class)

  演示 jQuery hide() 函数，隐藏所有 class="test" 的元素。

## jQuery 语法

jQuery 语法是为 HTML 元素的选取编制的，可以对元素执行某些操作。

基础语法是：*$(selector).action()*

- 美元符号定义 jQuery
- 选择符（selector）“查询”和“查找” HTML 元素
- jQuery 的 action() 执行对元素的操作

### 示例

$(this).hide() - 隐藏当前元素

$("p").hide() - 隐藏所有段落

$(".test").hide() - 隐藏所有 class="test" 的所有元素

$("#test").hide() - 隐藏所有 id="test" 的元素

## 文档就绪函数

您也许已经注意到在我们的实例中的所有 jQuery 函数位于一个 document ready 函数中：

```
$(document).ready(function(){

  // jQuery functions go here

});
```

这是为了防止文档在完全加载（就绪）之前运行 jQuery 代码。

如果在文档没有完全加载之前就运行函数，操作可能失败。下面是两个具体的例子：

- 试图隐藏一个不存在的元素
- 获得未完全加载的图像的大小

**选择器允许您对元素组或单个元素进行操作。**

## jQuery 选择器

在前面的章节中，我们展示了一些有关如何选取 HTML 元素的实例。

关键点是学习 jQuery 选择器是如何准确地选取您希望应用效果的元素。

jQuery 元素选择器和属性选择器允许您通过标签名、属性名或内容对 HTML 元素进行选择。

选择器允许您对 HTML 元素组或单个元素进行操作。

在 HTML DOM 术语中：

选择器允许您对 DOM 元素组或单个 DOM 节点进行操作。

## jQuery 元素选择器

jQuery 使用 CSS 选择器来选取 HTML 元素。

$("p") 选取 <p> 元素。

$("p.intro") 选取所有 class="intro" 的 <p> 元素。

$("p#demo") 选取所有 id="demo" 的 <p> 元素。

## jQuery 属性选择器

jQuery 使用 XPath 表达式来选择带有给定属性的元素。

$("[href]") 选取所有带有 href 属性的元素。

$("[href='#']") 选取所有带有 href 值等于 "#" 的元素。

$("[href!='#']") 选取所有带有 href 值不等于 "#" 的元素。

$("[href$='.jpg']") 选取所有 href 值以 ".jpg" 结尾的元素。

## jQuery CSS 选择器

jQuery CSS 选择器可用于改变 HTML 元素的 CSS 属性。

下面的例子把所有 p 元素的背景颜色更改为红色：

### 实例

```
$("p").css("background-color","red");
```

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015142138065.png" alt="image-20231015142138065" style="zoom: 80%;" />

 [jQuery 选择器参考手册](https://www.w3school.com.cn/jquery/jquery_ref_selectors.asp)

[JQuery API](https://api.jquery.com/)

[JQuery CDN](https://releases.jquery.com/)

## jQuery 事件函数

jQuery 事件处理方法是 jQuery 中的核心函数。

事件处理程序指的是当 HTML 中发生某些事件时所调用的方法。术语由事件“触发”（或“激发”）经常会被使用。

通常会把 jQuery 代码放到 <head>部分的事件处理方法中：

### 实例

```javascript
<html>
<head>
<script type="text/javascript" src="jquery.js"></script>
<script type="text/javascript">
$(document).ready(function(){
  $("button").click(function(){
    $("p").hide();
  });
});
</script>
</head>

<body>
<h2>This is a heading</h2>
<p>This is a paragraph.</p>
<p>This is another paragraph.</p>
<button>Click me</button>
</body>

</html>
```

在上面的例子中，当按钮的点击事件被触发时会调用一个函数：

```
$("button").click(function() {  // some code... } )
```

该方法隐藏所有 <p> 元素：

```
$("p").hide();
```



## jQuery 名称冲突

jQuery 使用 $ 符号作为 jQuery 的简介方式。

某些其他 JavaScript 库中的函数（比如 Prototype）同样使用 $ 符号。

jQuery 使用名为 noConflict() 的方法来解决该问题。

*var jq=jQuery.noConflict()*，帮助您使用自己的名称（比如 jq）来代替 $ 符号。

## 结论

由于 jQuery 是为处理 HTML 事件而特别设计的，那么当您遵循以下原则时，您的代码会更恰当且更易维护：

- 把所有 jQuery 代码置于事件处理函数中
- 把所有事件处理函数置于文档就绪事件处理器中
- 把 jQuery 代码置于单独的 .js 文件中
- 如果存在名称冲突，则重命名 jQuery 库

## jQuery 事件

下面是 jQuery 中事件方法的一些例子：<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231015165042417.png" alt="image-20231015165042417" style="zoom:80%;" />

[jQuery 事件参考手册](https://www.w3school.com.cn/jquery/jquery_ref_events.asp)

## jQuery toggle()

通过 jQuery，您可以使用 toggle() 方法来切换 hide() 和 show() 方法。

显示被隐藏的元素，并隐藏已显示的元素：

### 实例

```
$("button").click(function(){
  $("p").toggle();
});
```

### 语法：

```
$(selector).toggle(speed,callback);
```

可选的 *speed* 参数规定隐藏/显示的速度，可以取以下值："slow"、"fast" 或毫秒。

可选的 *callback* 参数是 toggle() 方法完成后所执行的函数名称。

## jQuery fadeToggle() 方法

jQuery fadeToggle() 方法可以在 fadeIn() 与 fadeOut() 方法之间进行切换。

如果元素已淡出，则 fadeToggle() 会向元素添加淡入效果。

如果元素已淡入，则 fadeToggle() 会向元素添加淡出效果。

### 语法：

```
$(selector).fadeToggle(speed,callback);
```

可选的 *speed* 参数规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。

可选的 *callback* 参数是 fading 完成后所执行的函数名称。

下面的例子演示了带有不同参数的 fadeToggle() 方法：

### 实例

```
$("button").click(function(){
  $("#div1").fadeToggle();
  $("#div2").fadeToggle("slow");
  $("#div3").fadeToggle(3000);
});
```

## jQuery slideToggle() 方法

jQuery slideToggle() 方法可以在 slideDown() 与 slideUp() 方法之间进行切换。

如果元素向下滑动，则 slideToggle() 可向上滑动它们。

如果元素向上滑动，则 slideToggle() 可向下滑动它们。

```
$(selector).slideToggle(speed,callback);
```

可选的 *speed* 参数规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。

可选的 *callback* 参数是滑动完成后所执行的函数名称。

下面的例子演示了 slideToggle() 方法：

### 实例

```
$("#flip").click(function(){
  $("#panel").slideToggle();
});
```

## jQuery stop() 方法

jQuery stop() 方法用于停止动画或效果，在它们完成之前。

stop() 方法适用于所有 jQuery 效果函数，包括滑动、淡入淡出和自定义动画。

### 语法

```
$(selector).stop(stopAll,goToEnd);
```

可选的 *stopAll* 参数规定是否应该清除动画队列。默认是 false，即仅停止活动的动画，允许任何排入队列的动画向后执行。

可选的 *goToEnd* 参数规定是否立即完成当前动画。默认是 false。

因此，默认地，stop() 会清除在被选元素上指定的当前动画。

下面的例子演示 stop() 方法，不带参数：

### 实例

```
$("#stop").click(function(){
  $("#panel").stop();
});
```

## 获得内容 - text()、html() 以及 val()

三个简单实用的用于 DOM 操作的 jQuery 方法：

- text() - 设置或返回所选元素的文本内容
- html() - 设置或返回所选元素的内容（包括 HTML 标记）
- val() - 设置或返回表单字段的值

下面的例子演示如何通过 jQuery text() 和 html() 方法来获得内容：

### 实例

```
$("#btn1").click(function(){
  alert("Text: " + $("#test").text());
});
$("#btn2").click(function(){
  alert("HTML: " + $("#test").html());
});
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_dom_html_get)

下面的例子演示如何通过 jQuery val() 方法获得输入字段的值：

### 实例

```
$("#btn1").click(function(){
  alert("Value: " + $("#test").val());
});
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_dom_val_get)

## 获取属性 - attr()

jQuery attr() 方法用于获取属性值。

下面的例子演示如何获得链接中 href 属性的值：

### 实例

```
$("button").click(function(){
  alert($("#w3s").attr("href"));
});
```

## 设置内容 - text()、html() 以及 val()

我们将使用前一章中的三个相同的方法来设置内容：

- text() - 设置或返回所选元素的文本内容
- html() - 设置或返回所选元素的内容（包括 HTML 标记）
- val() - 设置或返回表单字段的值

下面的例子演示如何通过 text()、html() 以及 val() 方法来设置内容：

### 实例

```
$("#btn1").click(function(){
  $("#test1").text("Hello world!");
});
$("#btn2").click(function(){
  $("#test2").html("<b>Hello world!</b>");
});
$("#btn3").click(function(){
  $("#test3").val("Dolly Duck");
});
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_dom_html_set)

## text()、html() 以及 val() 的回调函数

上面的三个 jQuery 方法：text()、html() 以及 val()，同样拥有回调函数。回调函数由两个参数：被选元素列表中当前元素的下标，以及原始（旧的）值。然后以函数新值返回您希望使用的字符串。

下面的例子演示带有回调函数的 text() 和 html()：

### 实例

```
$("#btn1").click(function(){
  $("#test1").text(function(i,origText){
    return "Old text: " + origText + " New text: Hello world!
    (index: " + i + ")";
  });
});

$("#btn2").click(function(){
  $("#test2").html(function(i,origText){
    return "Old html: " + origText + " New html: Hello <b>world!</b>
    (index: " + i + ")";
  });
});
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_dom_html_callback)

## 设置属性 - attr()

jQuery attr() 方法也用于设置/改变属性值。

下面的例子演示如何改变（设置）链接中 href 属性的值：

### 实例

```
$("button").click(function(){
  $("#w3s").attr("href","http://www.w3school.com.cn/jquery");
});
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_dom_attr_set)

attr() 方法也允许您同时设置多个属性。

下面的例子演示如何同时设置 href 和 title 属性：

### 实例

```
$("button").click(function(){
  $("#w3s").attr({
    "href" : "http://www.w3school.com.cn/jquery",
    "title" : "W3School jQuery Tutorial"
  });
});
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_dom_attr_set2)

## attr() 的回调函数

jQuery 方法 attr()，也提供回调函数。回调函数由两个参数：被选元素列表中当前元素的下标，以及原始（旧的）值。然后以函数新值返回您希望使用的字符串。

下面的例子演示带有回调函数的 attr() 方法：

### 实例

```
$("button").click(function(){
  $("#w3s").attr("href", function(i,origValue){
    return origValue + "/jquery";
  });
});
```

## 添加新的 HTML 内容

我们将学习用于添加新内容的四个 jQuery 方法：

- append() - 在被选元素的结尾插入内容
- prepend() - 在被选元素的开头插入内容
- after() - 在被选元素之后插入内容
- before() - 在被选元素之前插入内容

## jQuery append() 方法

jQuery append() 方法在被选元素的结尾插入内容。

### 实例

```
$("p").append("Some appended text.");
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_html_append)

## jQuery prepend() 方法

jQuery prepend() 方法在被选元素的开头插入内容。

### 实例

```
$("p").prepend("Some prepended text.");
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_html_prepend)

## 通过 append() 和 prepend() 方法添加若干新元素

在上面的例子中，我们只在被选元素的开头/结尾插入文本/HTML。

不过，append() 和 prepend() 方法能够通过参数接收无限数量的新元素。可以通过 jQuery 来生成文本/HTML（就像上面的例子那样），或者通过 JavaScript 代码和 DOM 元素。

在下面的例子中，我们创建若干个新元素。这些元素可以通过 text/HTML、jQuery 或者 JavaScript/DOM 来创建。然后我们通过 append() 方法把这些新元素追加到文本中（对 prepend() 同样有效）：

### 实例

```
function appendText()
{
var txt1="<p>Text.</p>";               // 以 HTML 创建新元素
var txt2=$("<p></p>").text("Text.");   // 以 jQuery 创建新元素
var txt3=document.createElement("p");  // 以 DOM 创建新元素
txt3.innerHTML="Text.";
$("p").append(txt1,txt2,txt3);         // 追加新元素
}
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_html_append2)

## jQuery after() 和 before() 方法

jQuery after() 方法在被选元素之后插入内容。

jQuery before() 方法在被选元素之前插入内容。

### 实例

```
$("img").after("Some text after");

$("img").before("Some text before");
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_html_after)

## 通过 after() 和 before() 方法添加若干新元素

after() 和 before() 方法能够通过参数接收无限数量的新元素。可以通过 text/HTML、jQuery 或者 JavaScript/DOM 来创建新元素。

在下面的例子中，我们创建若干新元素。这些元素可以通过 text/HTML、jQuery 或者 JavaScript/DOM 来创建。然后我们通过 after() 方法把这些新元素插到文本中（对 before() 同样有效）：

### 实例

```
function afterText()
{
var txt1="<b>I </b>";                    // 以 HTML 创建新元素
var txt2=$("<i></i>").text("love ");     // 通过 jQuery 创建新元素
var txt3=document.createElement("big");  // 通过 DOM 创建新元素
txt3.innerHTML="jQuery!";
$("img").after(txt1,txt2,txt3);          // 在 img 之后插入新元素
}
```

## 删除元素/内容

如需删除元素和内容，一般可使用以下两个 jQuery 方法：

- remove() - 删除被选元素（及其子元素）
- empty() - 从被选元素中删除子元素

## jQuery remove() 方法

jQuery remove() 方法删除被选元素及其子元素。

### 实例

```
$("#div1").remove();
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_dom_remove)

## jQuery empty() 方法

jQuery empty() 方法删除被选元素的子元素。

### 实例

```
$("#div1").empty();
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_dom_empty)

## 过滤被删除的元素

jQuery remove() 方法也可接受一个参数，允许您对被删元素进行过滤。

该参数可以是任何 jQuery 选择器的语法。

下面的例子删除 class="italic" 的所有 <p> 元素：

### 实例

```
$("p").remove(".italic");
```

## jQuery 操作 CSS

jQuery 拥有若干进行 CSS 操作的方法。我们将学习下面这些：

- addClass() - 向被选元素添加一个或多个类
- removeClass() - 从被选元素删除一个或多个类
- toggleClass() - 对被选元素进行添加/删除类的切换操作
- css() - 设置或返回样式属性

## 实例样式表

下面的样式表将用于本页的所有例子：

```
.important
{
font-weight:bold;
font-size:xx-large;
}

.blue
{
color:blue;
}
```

## jQuery addClass() 方法

下面的例子展示如何向不同的元素添加 class 属性。当然，在添加类时，您也可以选取多个元素：

### 实例

```
$("button").click(function(){
  $("h1,h2,p").addClass("blue");
  $("div").addClass("important");
});
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_dom_addclass)

您也可以在 addClass() 方法中规定多个类：

### 实例

```
$("button").click(function(){
  $("#div1").addClass("important blue");
});
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_dom_addclass2)

## jQuery removeClass() 方法

下面的例子演示如何不同的元素中删除指定的 class 属性：

### 实例

```
$("button").click(function(){
  $("h1,h2,p").removeClass("blue");
});
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_dom_removeclass)

## jQuery toggleClass() 方法

下面的例子将展示如何使用 jQuery toggleClass() 方法。该方法对被选元素进行添加/删除类的切换操作：

### 实例

```
$("button").click(function(){
  $("h1,h2,p").toggleClass("blue");
});
```

## jQuery css() 方法

css() 方法设置或返回被选元素的一个或多个样式属性。

## 返回 CSS 属性

如需返回指定的 CSS 属性的值，请使用如下语法：

```
css("propertyname");
```

下面的例子将返回首个匹配元素的 background-color 值：

### 实例

```
$("p").css("background-color");
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_css_getcolor)

## 设置 CSS 属性

如需设置指定的 CSS 属性，请使用如下语法：

```
css("propertyname","value");
```

下面的例子将为所有匹配元素设置 background-color 值：

### 实例

```
$("p").css("background-color","yellow");
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_css_setcolor)

## 设置多个 CSS 属性

如需设置多个 CSS 属性，请使用如下语法：

```
css({"propertyname":"value","propertyname":"value",...});
```

下面的例子将为所有匹配元素设置 background-color 和 font-size：

### 实例

```
$("p").css({"background-color":"yellow","font-size":"200%"});
```

## jQuery 尺寸 方法

jQuery 提供多个处理尺寸的重要方法：

- width()
- height()
- innerWidth()
- innerHeight()
- outerWidth()
- outerHeight()

## jQuery width() 和 height() 方法

width() 方法设置或返回元素的宽度（不包括内边距、边框或外边距）。

height() 方法设置或返回元素的高度（不包括内边距、边框或外边距）。

下面的例子返回指定的 <div> 元素的宽度和高度：

### 实例

```
$("button").click(function(){
  var txt="";
  txt+="Width: " + $("#div1").width() + "</br>";
  txt+="Height: " + $("#div1").height();
  $("#div1").html(txt);
});
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_dim_width_height)

## jQuery innerWidth() 和 innerHeight() 方法

innerWidth() 方法返回元素的宽度（包括内边距）。

innerHeight() 方法返回元素的高度（包括内边距）。

下面的例子返回指定的 <div> 元素的 inner-width/height：

### 实例

```
$("button").click(function(){
  var txt="";
  txt+="Inner width: " + $("#div1").innerWidth() + "</br>";
  txt+="Inner height: " + $("#div1").innerHeight();
  $("#div1").html(txt);
});
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_dim_innerwidth_innerheight)

## jQuery outerWidth() 和 outerHeight() 方法

outerWidth() 方法返回元素的宽度（包括内边距和边框）。

outerHeight() 方法返回元素的高度（包括内边距和边框）。

下面的例子返回指定的 <div> 元素的 outer-width/height：

### 实例

```
$("button").click(function(){
  var txt="";
  txt+="Outer width: " + $("#div1").outerWidth() + "</br>";
  txt+="Outer height: " + $("#div1").outerHeight();
  $("#div1").html(txt);
});
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_dim_outerwidth_outerheight)

outerWidth(true) 方法返回元素的宽度（包括内边距、边框和外边距）。

outerHeight(true) 方法返回元素的高度（包括内边距、边框和外边距）。

### 实例

```
$("button").click(function(){
  var txt="";
  txt+="Outer width (+margin): " + $("#div1").outerWidth(true) + "</br>";
  txt+="Outer height (+margin): " + $("#div1").outerHeight(true);
  $("#div1").html(txt);
});
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_dim_outerwidth_outerheight2)

## jQuery - 更多的 width() 和 height()

下面的例子返回文档（HTML 文档）和窗口（浏览器视口）的宽度和高度：

### 实例

```
$("button").click(function(){
  var txt="";
  txt+="Document width/height: " + $(document).width();
  txt+="x" + $(document).height() + "\n";
  txt+="Window width/height: " + $(window).width();
  txt+="x" + $(window).height();
  alert(txt);
});
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_dim_width_height2)

下面的例子设置指定的 <div> 元素的宽度和高度：

### 实例

```
$("button").click(function(){
  $("#div1").width(500).height(500);
});
```

## 向上遍历 DOM 树

这些 jQuery 方法很有用，它们用于向上遍历 DOM 树：

- parent()
- parents()
- parentsUntil()

## jQuery parent() 方法

parent() 方法返回被选元素的直接父元素。

该方法只会向上一级对 DOM 树进行遍历。

下面的例子返回每个 <span> 元素的的直接父元素：

### 实例

```
$(document).ready(function(){
  $("span").parent();
});
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_parent)

## jQuery parents() 方法

parents() 方法返回被选元素的所有祖先元素，它一路向上直到文档的根元素 (<html>)。

下面的例子返回所有 <span> 元素的所有祖先：

### 实例

```
$(document).ready(function(){
  $("span").parents();
});
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_parents)

您也可以使用可选参数来过滤对祖先元素的搜索。

下面的例子返回所有 <span> 元素的所有祖先，并且它是 <ul> 元素：

### 实例

```
$(document).ready(function(){
  $("span").parents("ul");
});
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_parents2)

## jQuery parentsUntil() 方法

parentsUntil() 方法返回介于两个给定元素之间的所有祖先元素。

下面的例子返回介于 <span> 与 <div> 元素之间的所有祖先元素：

### 实例

```
$(document).ready(function(){
  $("span").parentsUntil("div");
});
```

后代是子、孙、曾孙等等。

通过 jQuery，您能够向下遍历 DOM 树，以查找元素的后代。

## 向下遍历 DOM 树

下面是两个用于向下遍历 DOM 树的 jQuery 方法：

- children()
- find()

## jQuery children() 方法

children() 方法返回被选元素的所有直接子元素。

该方法只会向下一级对 DOM 树进行遍历。

下面的例子返回每个 <div> 元素的所有直接子元素：

### 实例

```
$(document).ready(function(){
  $("div").children();
});
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_children)

您也可以使用可选参数来过滤对子元素的搜索。

下面的例子返回类名为 "1" 的所有 <p> 元素，并且它们是 <div> 的直接子元素：

### 实例

```
$(document).ready(function(){
  $("div").children("p.1");
});
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_children2)

## jQuery find() 方法

find() 方法返回被选元素的后代元素，一路向下直到最后一个后代。

下面的例子返回属于 <div> 后代的所有 <span> 元素：

### 实例

```
$(document).ready(function(){
  $("div").find("span");
});
```

同胞拥有相同的父元素。

通过 jQuery，您能够在 DOM 树中遍历元素的同胞元素。

## 在 DOM 树中水平遍历

有许多有用的方法让我们在 DOM 树进行水平遍历：

- siblings()
- next()
- nextAll()
- nextUntil()
- prev()
- prevAll()
- prevUntil()

## jQuery siblings() 方法

siblings() 方法返回被选元素的所有同胞元素。

下面的例子返回 <h2> 的所有同胞元素：

### 实例

```
$(document).ready(function(){
  $("h2").siblings();
});
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_siblings)

您也可以使用可选参数来过滤对同胞元素的搜索。

下面的例子返回属于 <h2> 的同胞元素的所有 <p> 元素：

### 实例

```
$(document).ready(function(){
  $("h2").siblings("p");
});
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_siblings2)

## jQuery next() 方法

next() 方法返回被选元素的下一个同胞元素。

该方法只返回一个元素。

下面的例子返回 <h2> 的下一个同胞元素：

### 实例

```
$(document).ready(function(){
  $("h2").next();
});
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_next)

## jQuery nextAll() 方法

nextAll() 方法返回被选元素的所有跟随的同胞元素。

下面的例子返回 <h2> 的所有跟随的同胞元素：

### 实例

```
$(document).ready(function(){
  $("h2").nextAll();
});
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_nextall)

## jQuery nextUntil() 方法

nextUntil() 方法返回介于两个给定参数之间的所有跟随的同胞元素。

下面的例子返回介于 <h2> 与 <h6> 元素之间的所有同胞元素：

### 实例

```
$(document).ready(function(){
  $("h2").nextUntil("h6");
});
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_nextuntil)

## jQuery prev(), prevAll() & prevUntil() 方法

prev(), prevAll() 以及 prevUntil() 方法的工作方式与上面的方法类似，只不过方向相反而已：它们返回的是前面的同胞元素（在 DOM 树中沿着同胞元素向后遍历，而不是向前）。

## 缩写搜索元素的范围

三个最基本的过滤方法是：first(), last() 和 eq()，它们允许您基于其在一组元素中的位置来选择一个特定的元素。

其他过滤方法，比如 filter() 和 not() 允许您选取匹配或不匹配某项指定标准的元素。

## jQuery first() 方法

first() 方法返回被选元素的首个元素。

下面的例子选取首个 <div> 元素内部的第一个 <p> 元素：

### 实例

```
$(document).ready(function(){
  $("div p").first();
});
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_first)

## jQuery last() 方法

last() 方法返回被选元素的最后一个元素。

下面的例子选择最后一个 <div> 元素中的最后一个 <p> 元素：

### 实例

```
$(document).ready(function(){
  $("div p").last();
});
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_last)

## jQuery eq() 方法

eq() 方法返回被选元素中带有指定索引号的元素。

索引号从 0 开始，因此首个元素的索引号是 0 而不是 1。下面的例子选取第二个 <p> 元素（索引号 1）：

### 实例

```
$(document).ready(function(){
  $("p").eq(1);
});
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_eq)

## jQuery filter() 方法

filter() 方法允许您规定一个标准。不匹配这个标准的元素会被从集合中删除，匹配的元素会被返回。

下面的例子返回带有类名 "intro" 的所有 <p> 元素：

### 实例

```
$(document).ready(function(){
  $("p").filter(".intro");
});
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_filter)

## jQuery not() 方法

not() 方法返回不匹配标准的所有元素。

**提示：**not() 方法与 filter() 相反。

下面的例子返回不带有类名 "intro" 的所有 <p> 元素：

### 实例

```
$(document).ready(function(){
  $("p").not(".intro");
});
```

## jQuery load() 方法

jQuery load() 方法是简单但强大的 AJAX 方法。

load() 方法从服务器加载数据，并把返回的数据放入被选元素中。

### 语法：

```
$(selector).load(URL,data,callback);
```

必需的 *URL* 参数规定您希望加载的 URL。

可选的 *data* 参数规定与请求一同发送的查询字符串键/值对集合。

可选的 *callback* 参数是 load() 方法完成后所执行的函数名称。

这是示例文件（"demo_test.txt"）的内容：

```
<h2>jQuery and AJAX is FUN!!!</h2>
<p id="p1">This is some text in a paragraph.</p>
```

下面的例子会把文件 "demo_test.txt" 的内容加载到指定的 <div> 元素中：

### 示例

```
$("#div1").load("demo_test.txt");
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_ajax_load)



也可以把 jQuery 选择器添加到 URL 参数。

下面的例子把 "demo_test.txt" 文件中 id="p1" 的元素的内容，加载到指定的 <div> 元素中：

### 实例

```
$("#div1").load("demo_test.txt #p1");
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_ajax_load2)



可选的 callback 参数规定当 load() 方法完成后所要允许的回调函数。回调函数可以设置不同的参数：

- *responseTxt* - 包含调用成功时的结果内容
- *statusTXT* - 包含调用的状态
- *xhr* - 包含 XMLHttpRequest 对象

下面的例子会在 load() 方法完成后显示一个提示框。如果 load() 方法已成功，则显示“外部内容加载成功！”，而如果失败，则显示错误消息：

### 实例

```
$("button").click(function(){
  $("#div1").load("demo_test.txt",function(responseTxt,statusTxt,xhr){
    if(statusTxt=="success")
      alert("外部内容加载成功！");
    if(statusTxt=="error")
      alert("Error: "+xhr.status+": "+xhr.statusText);
  });
});
```

**jQuery get() 和 post() 方法用于通过 HTTP GET 或 POST 请求从服务器请求数据。**

## HTTP 请求：GET vs. POST

两种在客户端和服务器端进行请求-响应的常用方法是：GET 和 POST。

- *GET* - 从指定的资源请求数据
- *POST* - 向指定的资源提交要处理的数据

GET 基本上用于从服务器获得（取回）数据。注释：GET 方法可能返回缓存数据。

POST 也可用于从服务器获取数据。不过，POST 方法不会缓存数据，并且常用于连同请求一起发送数据。

如需学习更多有关 GET 和 POST 以及两方法差异的知识，请阅读我们的 [HTTP 方法 - GET 对比 POST](https://www.w3school.com.cn/tags/html_ref_httpmethods.asp)。

## jQuery $.get() 方法

$.get() 方法通过 HTTP GET 请求从服务器上请求数据。

### 语法：

```
$.get(URL,callback);
```

必需的 *URL* 参数规定您希望请求的 URL。

可选的 *callback* 参数是请求成功后所执行的函数名。

下面的例子使用 $.get() 方法从服务器上的一个文件中取回数据：

### 实例

```
$("button").click(function(){
  $.get("demo_test.asp",function(data,status){
    alert("Data: " + data + "\nStatus: " + status);
  });
});
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_ajax_get)

$.get() 的第一个参数是我们希望请求的 URL（"demo_test.asp"）。

第二个参数是回调函数。第一个回调参数存有被请求页面的内容，第二个回调参数存有请求的状态。

**提示：**这个 ASP 文件 ("demo_test.asp") 类似这样：

```
<%
response.write("This is some text from an external ASP file.")
%>
```

## jQuery $.post() 方法

$.post() 方法通过 HTTP POST 请求从服务器上请求数据。

### 语法：

```
$.post(URL,data,callback);
```

必需的 *URL* 参数规定您希望请求的 URL。

可选的 *data* 参数规定连同请求发送的数据。

可选的 *callback* 参数是请求成功后所执行的函数名。

下面的例子使用 $.post() 连同请求一起发送数据：

### 实例

```
$("button").click(function(){
  $.post("demo_test_post.asp",
  {
    name:"Donald Duck",
    city:"Duckburg"
  },
  function(data,status){
    alert("Data: " + data + "\nStatus: " + status);
  });
});
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jquery_ajax_post)

$.post() 的第一个参数是我们希望请求的 URL ("demo_test_post.asp")。

然后我们连同请求（name 和 city）一起发送数据。

"demo_test_post.asp" 中的 ASP 脚本读取这些参数，对它们进行处理，然后返回结果。

第三个参数是回调函数。第一个回调参数存有被请求页面的内容，而第二个参数存有请求的状态。

**提示：**这个 ASP 文件 ("demo_test_post.asp") 类似这样：

```
<%
dim fname,city
fname=Request.Form("name")
city=Request.Form("city")
Response.Write("Dear " & fname & ". ")
Response.Write("Hope you live well in " & city & ".")
%>
```