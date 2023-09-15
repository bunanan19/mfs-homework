# CSS语法

传统的设置样式的方式：

```html
<!--二级标题变灰-->
<h2 color="gray"> 二级标题</h2>
```

如果需要很多二级标题呢？手动为所有h2元素设置相应的标记？繁琐！如果需要更改为绿色呢？灾难！

**解决方案**：发挥CSS的优点，一行CSS，改变所有标题的颜色。

## 基本格式

CSS 规则由两个基本部分：[选择器(selector)](http://fe-base.books.mafengshe.com/前端基础/CSS/语法.html)和声明块(declaration block)。声明块中包括一个或多个声明，每条声明是一个属性-值对。

![image-20230914162633198](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230914162633198.png)

示例代码：

```css
h1 {
  color: red;
  font-size: 16px;
}
```

有5个基本概念：

1. `选择器（Selector）`: 选择需要应用样式的元素对象，具体用法参考[选择器](http://fe-base.books.mafengshe.com/前端基础/CSS/CSS选择器.md)。
2. `属性（property）`:CSS1、CSS2、CSS3规定了许多的属性，通过设置属性的值达到控制选择器的样式的目的。
3. `值（value）`:指属性接受的设置值/关键字，一个属性的值要么是关键字、要么是一个关键字列表。如果一个属性可以取多个关键字，则多个关键字时大都以空格隔开，例如`p{font:medium Helvetica}`。
4. `声明（declaration）`:属性和值之间用半角冒号`：`隔开，形成一条声明。
5. `声明块(declaration block)`：多个特性间用`；`隔开，前后用`{}`括起来，形成一个生命快。

## 选择器

关于选择器用法参考[选择器](http://fe-base.books.mafengshe.com/前端基础/CSS/CSS选择器.md)。

## 声明块

### 声明块格式

一般有两种格式：单行和多行。

```css
h1 {color:red; font-size:16px; width:150px; height:50px; border-bottom: 1px solid #333;}
```

```css
h1{
  color:red;
  font-size:16px;
  width:150px;
  height:50px;
  border-bottom: 1px solid #333;
}
```



单行格式CSS文件长度短,但属性多时会不利于阅读，多行则相反，可根据个人喜好选择。

## 代码注释

在CSS中也有注释语句：用`/*注释语句*/`来标明。示例代码：

```css
/*多行注释：
把h1标签的字体颜色设置为红色
字体大小为25px*/
h1 {
  color:red;
  font-size:25px;  /*单行注释，字体为25像素*/
}
```

## 浏览器前缀

有些新式的CSS样式并不是所有的浏览器都支持，一些浏览器率先支持了，或者不是所有的浏览器支持情况都一样，我们需要前缀写法

- Firefox: `-moz-`
- Safari/Chrome: `-webkit-`
- Opera: `-o-`
- IE: `-ms-`

书写顺序要注意，**先写私有的CSS3属性，再写标准的CSS3属性，这样以后不需要前缀了，能保证我们使用标准的**

```css
-webkit-transform:rotate(-3deg);
-moz-transform:rotate(-3deg);
-ms-transform:rotate(-3deg);
-o-transform:rotate(-3deg);
transform:rotate(-3deg);/*transform：是转换，带有3度负旋转的CSS样式*/
```

**注意：**

1. 就目前而言：一最新版本浏览绝大多数属性不需要添加前缀写法，但是为了兼容旧版本浏览器，我们还是需要使用前缀写法
2. 何时不可以书写前缀？
   - 当一个属性成为标准属性时
   - 根据软件项目浏览器兼容性要求（如需要兼容95%的浏览器，那么我们就可以根据浏览器占比，抛弃旧5%浏览器的兼容性写法）查看浏览器对属性的兼容性：caniuse.com
3. 前缀这么繁琐，有没有办法自动添加前缀？ **使用 css 预处理器**

## 缩写

使用CSS缩写可以减少CSS文件的大小，并使其更为易读，例如：

1. 颜色缩写：16进制的色彩值，如果每两位的值相同，可以进行缩写，例如： `＃000000`可以缩写为`#000`，`#336699`可以缩写为`#369`;#后面跟六个数字或字母，两个两个为一组，三组分别代表红绿蓝三原色。都是十六进制，范围为0~255（00-FF）

2. 盒尺寸缩写：Property: Value1 Value2 Value3 Value4；四个值依次表示Top，Right，Bottom，Left

3. 边框缩写 边框的属性如下：

   ```css
   border-width: 1px;
   border-style: solid;
   border-color: #000;
   ```

   可以缩写为一句：

   ```css
   border: 1px solid #000;
   ```

4. 背景缩写

   ```css
   background-color: #F00;
   background-image: url(background.gif);
   background-repeat: no-repeat;
   background-attachment: fixed;
   background-position: 0 0;
   ```

   可以缩写为一句：

   ```css
   background: #F00 url(background.gif) no-repeat fixed 0 0;
   ```

5. 文字缩写

   ```css
   font-weight: bold;
   font-size: 12px;
   line-height: 1.8em;
   font-family: Arial;
   ```

   可以缩写为一句： 但文字缩写一定要具有字号、字体样式这两个属性。行高用/分隔(font：文字样式，比如宋体、黑体、微软雅黑)font-family是CSS中的一个属性，用于指定元素的字体类型。font-family可以接受多个字体名称作为"回退"系统来保存。如果浏览器不支持第一个字体，则会尝试下一个。也就是说，font-family属性的值是用于某个元素的字体族名称或/及类族名称的一个优先表，浏览器会使用它可识别的第一个值

   ```css
   font:bold 12px/1.8em Arial;
   ```

## CSS继承

某些样式不仅能应用到指定的元素，还会应用到它的后代元素。可以通过文档的树图，来分析属性的继承。

**注意**:

- 有些属性不能继承，往往归因于简单的常识，例如大多数框模型属性（包括外边距、内边距、背景和边框）都不能继承，因为如果边框能继承，则文档会变得更加混乱，创作人员往往需要另外花功夫去掉继承的边框。
- 属性继承值没有特殊性，通配符的0特殊性属性也可以覆盖继承值。

### 哪些属性是可以继承的呢？

```
azimuth, border-collapse, border-spacing,
caption-side, color, cursor, direction, elevation,
empty-cells, font-family, font-size, font-style,
font-variant, font-weight, font, letter-spacing,
line-height, list-style-image, list-style-position,
list-style-type, list-style, orphans, pitch-range,
pitch, quotes, richness, speak-header, speaknumeral,
speak-punctuation, speak, speechrate,
stress, text-align, text-indent, texttransform,
visibility, voice-family, volume, whitespace,
widows, word-spacing
```

吓？！这么多？！怎么记得住呢？别急，我们来理一理这些属性。

文本相关属性：

```
font-family, font-size, font-style,
font-variant, font-weight, font, letter-spacing,
line-height, text-align, text-indent, 
texttransform, word-spacing
```

列表相关属性：

```
list-style-image, list-style-position,
list-style-type, list-style
```

还有一个属性比较重要，`color`属性。

其他属性不常用，了解下即可

### 继承是一个诅咒吗？

如果你不希望 "Verdana, sans-serif" 字体被所有的子元素继承，又该怎么做呢？比方说，你希望段落的字体是 Times。没问题。创建一个针对 p 的特殊规则，这样它就会摆脱父元素的规则：

```css
body {
  font-family: Verdana, sans-serif;
}

td, ul, ol, ul, li, dl, dt, dd {
  font-family: Verdana, sans-serif;
}

p {
  font-family: Times, "Times New Roman", serif;
}
```

## 书写风格

1. 语法不区分大小写，但建议统一使用小写
2. 最好不使用内联的style属性定义样式
3. id和class使用有意义的单词，分隔符建议使用`-`
4. 有可能就是用缩写
5. 属性值是`0`的省略单位
6. 块内容缩进
7. 属性名冒号后面添加一个空格

# 参考

1. [CSS样式层叠和选择器特殊性](https://github.com/YIXUNFE/blog/issues/9)
2. [CSS 编码规范-kissy](http://docs.kissyui.com/1.4/docs/html/tutorials/style-guide/css-coding-style.html)
3. [CSS编码规范](https://github.com/fex-team/styleguide/blob/master/css.md)



1. 什么是 CSS？它有什么优势？

   + CSS指层叠样式表，定义**如何显示**HTML元素
   + 解耦，实现内容与表现分离
   + 提高工作效率
   + 将多重样式重叠为一个

2. 内部样式表和外部样式表各是如何声明和使用？

   + 内部样式表：在```<head>```标签内部声明，比如：

   + ```html
     <head>
         <style type="text/css">
             p {
                 color: red;
                 font-size: 20px;
             }
         </style>
     </head>
     ```

   + 外部样式表：使用```<link>```标签链接css文件

   + ```html
     <head>
         <link rel="stylesheet" type="text/css" href="style.css" />
     </head>
     ```

   + ```css
     p {
         color: red;
         font-size: 20px;
     }
     ```

   + 内联模式：

   + ```html
     <p style="color: red; font-size: 20px">
         这是一个段落
     </p>
     ```

   + 

3. 多层样式层叠是什么意思？

   > 样式表允许以多种方式规定样式信息。样式可以规定在单个的 HTML 元素中，在 HTML 页的头元素中，或在一个外部的 CSS 文件中。即可以是继承的、连接的、内嵌的、内联的，之间的优先级关系。甚至可以在同一个 HTML 文档内部引用多个外部样式表。

4. 什么是优先级？样式表的优先级排序是什么？

   > 对于同一个的属性的不同属性值，比如font-size的10px和20px，同时作用于一个元素时，优先级高的为有效样式。
   >
   > 优先级顺序：内联样式>内部样式表>外部样式表>浏览器缺省设置

5. 请解释 CSS 如下概念

   - 选择器：选择需要应用样式的元素对象。
   - 属性：CSS1、CSS2、CSS3规定了许多的属性，通过设置属性的值达到控制选择器的样式的目的。有color、font-family、font-size、list-style、border、background等等属性。
   - 值：指属性接受的设置值/关键字，一个属性的值要么是关键字、要么是一个关键字列表。如果一个属性可以取多个关键字，则多个关键字时大都以空格隔开，例如```p{color: red;}
   - 声明：属性和值之间用半角冒号`：`隔开，形成一条声明。
   - 声明块:多个声明间用`；`隔开，前后用`{}`括起来，形成一个声明快

6. CSS 中回车符(`\n`)会影响 CSS 的解析吗？请测试在不同位置下的回车符对解析的影响，然后谈谈你的理解

   > 换行不会影响css的解析，而且换行后代码会更加整洁简明，方便阅读修改。

7. CSS 代码中如何使用注释？

   用/*注释语句*/注释

8. 浏览器前缀是什么？我们为什么需要浏览器前缀？

   > + 对于CSS样式中一些新的属性，有些浏览器不支持，为了避免出现兼容性问题，需要为不同的浏览器编写带有浏览器前缀的CSS代码。
   >
   > + 常见的浏览器前缀有火狐的-mzo-，谷歌的-webkit-，IE的-ms-等等。
   > + 不同浏览器的内核不同，渲染方式不同，相同的css样式在不同的浏览器中可以拿有不同呈现效果，使用浏览器前缀可以为每个浏览器提供专属的样式支持，避免了兼容性问题。

9. 对浏览器前缀的处理有哪些方案？其中较好处理方案是哪个？

   > 根据软件项目浏览器兼容性要求（如需要兼容95%的浏览器，那么我们就可以根据浏览器占比，抛弃旧5%浏览器的兼容性写法）
   >
   > 使用 css 预处理器自动添加前缀。

10. CSS 缩写是什么？哪些属性支持缩写？

    > CSS缩写可以使样式表更简明已读，减小文件大小
    >
    > 1. 颜色缩写：16进制的色彩值，如果每两位的值相同，可以进行缩写，例如#223344可以写成#234.
    > 2. 盒尺寸缩写:Property: Value1 Value2 Value3 Value4；四个值依次表示Top，Right，Bottom，Left
    > 3. 边框缩写：![image-20230914224021710](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230914224021710.png)
    > 4. 背景缩写：![image-20230914224044832](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230914224044832.png)
    > 5. ![image-20230914224058269](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230914224058269.png)

11. 什么是 CSS 中的继承？哪些属性可以继承？如果不希望子元素继承父元素的某个属性该怎么办？

    > + 某些样式不仅能应用到指定的元素，还会应用到它的后代元素。
    >
    > + ![image-20230914224200188](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230914224200188.png)
    >
    > + 对于不想继承父元素样式的内容可以为该内容重新声明样式
    >
    >   ![image-20230914224400191](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230914224400191.png)

12. 以下代码`<h2>`最终显示成什么颜色？为什么？

    黄色，h2继承了body的样式。

    ```html
    <!DOCTYPE html>
    <html>
    
    <head>
    <style type="text/css">
      body{
        color: yellow;
      }
    </style>
    </head>
    
    <body>
    <h2>标题</h2>
    </body>
    
    </html>
    ```

    ## 代码题

![image-20230914214440857](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230914214440857.png)![image-20230914214522490](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230914214522490.png)

![image-20230914214536649](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230914214536649.png)