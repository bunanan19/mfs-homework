# CSS 常用属性

## 颜色与背景

### 颜色的表示方法

#### 命名颜色

前景色：通过color或bordercolor属性设置，比如文字颜色。

背景色：通过background-color属性设置，网页背景。

给颜色起一个名字，例如`red`、`blue`、`sliver`等，这种被称为命名颜色。例如：

```css
h1 {
  color: red
}
```

如果所需要的颜色只要在一个很小的基本颜色集中选取，则可以考虑使用命名颜色，合法的命名颜色关键字很有限。

全部的 CSS 命名颜色可以在[这里](http://www.runoob.com/cssref/css-colornames.html)查看。

#### RGB表示法

- 函数式RGB表示法

  颜色利用一个百分数三元组或者整数三元组表示，百分数范围在 0%-100%， 整数范围在 0-255。

  ```css
  color: rgb(100%,100%,100%);/*白色*/
  color: rgb(0%,0%,0%);/*黑色*/
  color: rgb(255,255,255);/*白色*/
  color: rgb(0,0,0);/*黑色*/
  ```

- 函数式RGBA表示法

  RGBA颜色值被IE9, Firefox3+, Chrome, Safari,和Opera10+支持。RGBA颜色值是RGB颜色值Alpha通道的延伸 - 指定对象的透明度。Alpha参数是一个介于0.0（完全透明）和1.0（完全不透明）之间的参数。

- 十六进制RGB颜色

  十六进制记法在数学上等价于整数三元组记法, 该方法将三个介于00-FF的十六进制数连起来，按照#RRGGBB的顺序组合起来，表示一种颜色。

  例如，以下两者等价：

  ```css
  color: rgb(255,255,255);
  color: #FFFFFF;
  ```

### 前景色

要设置一个元素的前景色，最容易的方法是使用 color 属性。

```css
color: <color>
```

## 背景

| 属性                  | 描述                                       |
| --------------------- | ------------------------------------------ |
| background            | 简写属性，作用是将背景属性设置在一个声明中 |
| background-attachment | 背景图像是否固定或者随着页面的其余部分滚动 |
| background-color      | 设置元素的背景颜色                         |
| background-image      | 把图像设置为背景                           |
| background-position   | 设置背景图像的起始位置                     |
| background-repeat     | 设置背景图像是否及如何重复                 |
| background-size       | 设置背景图像的尺寸。                       |

- background-position：默认左上角（也就是 `0% 0%` 或者`top left`）

  - x y
  - x% y%
    - x = (元素的宽度 - 图片的宽度) * x%
    - y = (元素的高度 - 图片的高度) * y%
  - [top | center | bottom] [left | center | right]

- background-repeat

  - no-repeat：背景图片在规定位置
  - repeat-x：图片横向重复
  - repeat-y：图片纵向重复
  - repeat：全部重复

- background-size

  - length（如：50px 50px） 设置背景图像的高度和宽度。 第一个值设置宽度，第二个值设置高度。 如果只设置一个值，则第二个值会被设置为 "auto"。

  - percentage（如：50% 50%）以父元素的百分比来设置背景图像的宽度和高度。 第一个值设置宽度，第二个值设置高度。 如果只设置一个值，则第二个值会被设置为 "auto"。

  - cover 把背景图像扩展至足够大，以使背景图像刚好完全**覆盖**背景区域。

  - contain 把图像扩展至不超过背景尺寸的最大尺寸，以使其宽度和高度完全**适应**内容区域。

  - 具体区别可以在

    这里查看

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

## font

1. font-size：字体大小
2. font-family：字体，宋体、微软雅黑、Arial等
3. font-weight：文字粗度，常用的就是默认值`regular`和粗体`bold`
4. line-height：行高，可以用百分比、倍数或者固定尺寸

```css
span {
  line-height: 1.5;
  font-size: 14px;
  font-family: Arial,'微软雅黑','宋体';
  font-weight: bold;
}
```

> Chrome等浏览器规定汉字的最小尺寸是`12px`，所以设置更小的尺寸都显示为12px

```css
font:bold 12px/1.8em Arial;
```

可以缩写为一句：但文字缩写一定要具有字号、字体样式这两个属性。行高用`/`分隔

### iconfont

项目中我们经常使用图标(icon)。传统项目中一般使用图片(img)实现图标；但是这种解决方案并不完美，比如

- 不方便调节大小
- 耗费流量
- 不同分辨率下需要不同图片
- 视网膜下不清晰

以上问题，我们都可以使用矢量图(svg)解决。

为了让我们的图标更加灵活，我们可以使用字体(font)来实现图标。

iconfont 就是阿里巴巴的矢量图标库，建议大家实际项目中使用

![image-20230915213232505](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230915213232505.png)

## 文本

1. text-align：文本对其方式 `left`:左对齐、`center`：居中对齐、`right`右对齐、`justify`两端对齐

2. text-indent：文案第一行缩进距离

   ![image-20230915214414919](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230915214414919.png)

3. text-decoration： `none`、`underline`、`line-through`、`overline`

   ![image-20230915214545797](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230915214545797.png)

4. color：文字颜色

5. text-transform：改变文字大小写`none`、`uppercase`、`lowercase`、`capitalize`

   ![image-20230915214641528](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230915214641528.png)

   

6. direction：文本方向，`ltr`、`rtl`

   ![image-20230915214819395](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230915214819395.png)

7. word-spacing：可以改变字（单词）之间的标准间隔

   ![image-20230915214943123](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230915214943123.png)

8. letter-spacing：字母间隔修改的是字符或字母之间的间隔

   

9. white-space

   1. normal：多个空白符会变为一个，换行变为空格
   2. pre：空白符不被忽略
   3. nowrap：防止元素中的文本换行，除非使用了一个 `br` 元素

> [direction和unicode-bidi](http://www.cnblogs.com/dolphinX/p/4087816.html)
>
> # [direction和unicode-bidi](https://www.cnblogs.com/dolphinX/p/4087816.html)
>
> 在做多语言页面，接触过阿利伯语、希伯来语的同学肯定了解书写方向的重要性，包括我们五四运动前的书写顺序也是从右到左的。css中 `unicode-bidi`和`direction`属性决定了HTML或XML文字渲染方向，两个属性结合使用可以改变文字书写顺序
>
> # direction
>
> direction属性有三个值
>
> 1. `inherit` 使用父元素的设置
> 2. `ltr` 默认值，left to right，从左到右
> 3. `rtl` right to left 从右到左
>
> 我们默认的书写顺序是从左到右的，不用做特殊设置，但是对于阿拉伯语是从右到左的，这时候就需要设置direction属性来正确展示了
>
> 防止浏览器重写`text-align`我们做一下默认设置
>
> طهيس يس تآخت تهات يس وريتتآن فروم ريغت تو لآفت تهات يس وسآد
>
> ```xml
> <div style="direction:rtl;text-align: initial;">
> 	طهيس يس تآخت تهات يس وريتتآن فروم ريغت تو لآفت تهات يس وسآد    
> </div>
> ```
>
> 对应的也有个html属性dir可以设置
>
> ```bash
> <div dir="rtl" dtyle="text-align: initial;">
> 	طهيس يس تآخت تهات يس وريتتآن فروم ريغت تو لآفت تهات يس وسآد    
> </div>
> ```
>
> طهيس يس تآخت تهات يس وريتتآن فروم ريغت تو لآفت تهات يس وسآد
>
> direction属性局定了默认的书写顺序这是和`text-align`的区别，后者是对其方向，书写书写顺序不变
>
> ```xml
> <div style="direction: rtl;text-align: initial;">1 2 3 4 5 6。</div>
> <div style="text-align:right;">1 2 3 4 5 6。</div>
> ```
>
> 。6 5 4 3 2 1
>
> 1 2 3 4 5 6。
>
> # unicode-bidi
>
> 貌似有direction就可以应付书写方向的问题了，`unicode-bidi`是做什么的呢？
>
> 浏览器通常根据`lang`属性或者特殊的`font-family`决定书写方向，但是如果一句话中同时包括两种方向的文案的时候就需要用到unicode-bidi属性了
>
> unicode-bidi 有三个广泛支持的值
>
> 1. `normal` 原来是什么顺序就使用什么顺序
> 2. `embed` 作用于inline元素，direction属性的值指定嵌入层，在对象内部进行隐式重排序
> 3. `bidi-override` 严格按照direction属性的值重排序。忽略隐式双向运算规则
>
> 说实话这么解释我也看不懂，看个例子
>
> ```kotlin
> <div style="direction:rtl;text-align: initial;">this is a test</div>
> 
> <div style="direction:rtl;unicode-bidi:bidi-override;text-align: initial;">
> 	this is a test
> </div>
> 
> <div style="direction:rtl;unicode-bidi:bidi-override;text-align: initial;">
> 	this <span style="unicode-bidi:embed;">is a</span> test
> </div>
> ```
>
> this is a test
>
> tset a si siht
>
> tset is a siht
>
> 第一行就是简单的右对齐，文字不会倒着写（阿拉伯语会，后面有解释）
>
> 第二行两个属性结合使用，不但右对左书写而且真的是从右到左书写了，这才是正经的阿拉伯语写法
>
> 第三行的效果奇妙之处在于在第二行的基础上加了样式`unicode-bidi:embed;`不会倒着写了，按着正常的书写顺序在写
>
> # 小疑惑
>
> 为什么对于阿拉伯语只设置`direction`就能正确展示了，但是英文单词却只有右对齐效果，不会从右到左书写，只有设置了`unicode-bidi:bidi-override;`才好使呢
>
> 这和具体语言有关，对于阿拉伯语和希伯来语自动就好使了，单个数字、字母浏览器不能判断语言就用rtl默认设置了，英语等还是使用默认的左到右的方式，只能用`unicode-bidi`重写
>
> 在声明的时候指定语言为阿拉伯语页面会自动书写顺序rtl
>
> ```xml
> <html lang="ar">
> ```

## border

- border-width：边框宽度
- border-color：边框颜色
- border-style：边框样式（`solid`、`dashed`）

支持合写

```css
border: solid 1px #333;
```

**边框与三角形**

```css
.t0 {
  margin: 30px;
  height: 200px;
  width: 200px;
  border-top: solid 100px red;
  border-left: solid 100px green;
  border-right: solid 100px orange;
  border-bottom: solid 100px blue;
}
```

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230915215226888.png" alt="image-20230915215226888" style="zoom:50%;" />

通过demo可以看到border的相交的地方在45deg平分，当元素的width、和height属性被设置为0的时候

```css
.t1 {
  margin: 30px;
  height: 0px;
  width: 0px;
  border-top: solid 100px red;
  border-left: solid 100px green;
  border-right: solid 100px orange;
  border-bottom: solid 100px blue;
}
```

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230915215319648.png" alt="image-20230915215319648" style="zoom:80%;" />

这样我们就可以看到三角形了，尝试一下去掉两个边框，值保留上边和左边

```css
.t2 {
  margin: 30px;
  height: 0px;
  width: 0px;
  border-top: solid 100px red;
  border-left: solid 100px green;
}
```

![image-20230915215341783](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230915215341783.png)

这时候做三角形好像简单了，只要我们保留两个相邻边，把另外的一个设置为透明就可以了

```css
.t3 {
  margin: 30px;
  height: 0px;
  width: 0px;
  border-top: solid 100px red;
  border-right: solid 100px rgba(0,0,0,0);
}
```

![image-20230915215431868](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230915215431868.png)

[使用border做三角形](http://www.cnblogs.com/dolphinX/p/4068894.html)

![image-20230915194113330](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230915194113330.png)

[w3School](http://www.w3school.com.cn/css/css_margin_collapsing.asp)



1. CSS 中颜色有几种表示方法？`RGB 表示法`参数为数值和百分数时分别为什么意思？`RGBA 表示法`中 A 参数表示什么意思，取值范围是什么？

   + 两种，命名颜色和RGB表示法。

   + 函数式RGB表示法：颜色利用一个百分数三元组或者整数三元组表示，百分数范围在 0%-100%， 整数范围在 0-255。当RGB参数为数值时，R、G、B的取值范围为0-255，表示红、绿、蓝三原色的亮度级别。其中，255表示亮度最大，0表示亮度为0。当RGB参数为百分数时，R、G、B的取值范围为0.0%-100.0%，表示红、绿、蓝三原色的色彩强度。

     ```css
     color: rgb(100%,100%,100%);/*白色*/
     color: rgb(0%,0%,0%);/*黑色*/
     color: rgb(255,255,255);/*白色*/
     color: rgb(0,0,0);/*黑色*/
     ```

   + 函数式RGBA表示法

     RGBA颜色值是RGB颜色值Alpha通道的延伸 ，A参数 指定对象的透明度。Alpha参数是一个介于0.0（完全透明）和1.0（完全不透明）之间的参数。

     

2. 什么是前景色，什么是背景色？

   前景色：通过color或bordercolor属性设置，比如文字颜色。

   背景色：通过background-color属性设置，网页背景。

3. `background` 属性可以缩写哪些子属性(如:`background-color`)？他们的参数各是什么，有何含义？

   + background-attachment：背景图像是否固定或者随着页面的其余部分滚动。scroll：默认值，背景图像会随着页面的其余部分滚动。fixed：背景图像会固定在屏幕上，不会随着页面的其余部分滚动。local：背景图像会随着元素内容滚动。
   + backgroun-color：设置元素的背景颜色
   + background-image：把图像设置为背景
   + background-position：设置背景图像的起始位置<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230916125907386.png" alt="image-20230916125907386" style="zoom: 80%;" />
   + background-repeat：设置背景图像是否及如何重复<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230916125936604.png" alt="image-20230916125936604" style="zoom:80%;" />
   + background-size：设置背景图像的尺寸<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230916130018375.png" alt="image-20230916130018375" style="zoom:80%;" />

4. 同时指定 `background-color` 和 `background-image` 时会怎么样？请分各种情况讨论

   img透明的部分显示为背景色，不透明的部分就是img图片

5. `background-position` 可以写哪几种参数？他们的含义是什么？

   - x y：图片的（0，0）点在元素的（x，y）点
   - x% y%：图片和元素x%，y%的点重合
     - x = (元素的宽度 - 图片的宽度) * x%
     - y = (元素的高度 - 图片的高度) * y%
     - `background-position: 50% 50%`，表示图像的中心点将与元素的中心点对齐显示。
   - [top | center | bottom] [left | center | right]

6. 什么是雪碧图？为什么要使用雪碧图？雪碧图的实现原理是什么？

   + 把一堆图标整合在一张背景透明的大图上，通过设置对应的位置来显示不同的图片
   + 减少了http请求，多张图片放在了一张图片上，多次请求变成一次请求，提高了网页性能
   + 雪碧图的实现是通过设置每个元素的`background-position`属性来展现不同位置的图标。其中第一个参数代表x轴控制左右，第二个参数代表y轴控制上下。

7. 现代前端中为什么很少使用雪碧图了？有哪些替代方案？相比之下有何好处？

   + 当图标过多时，雪碧图加载也会变慢。不灵活，雪碧图需要计算每个图片的位置，维护困难。
   + http2协议将不同的请求整理在一块
   + 使用打包工具将图片加进HTML里面
   + 使用懒加载

   

## 代码题

1. 请使用雪碧图实现一个**按钮**，当鼠标 hover 时，切换图片。

   



1. `font` 属性可以缩写哪些子属性？它们的参数各是什么，有何含义？

   ![image-20230916150348245](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230916150348245.png)

2. 如何实现单行文本的垂直居中？

   使用line-height，使line-height=height

   <img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230916151839783.png" alt="image-20230916151839783" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230916151925430.png" alt="image-20230916151925430" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230916151945147.png" alt="image-20230916151945147" style="zoom:80%;" />

3. 如何实现文本的水平居中？

   <img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230916162709258.png" alt="image-20230916162709258" style="zoom:80%;" />

   <img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230916152211676.png" alt="image-20230916152211676" style="zoom:80%;" />

4. 什么是 iconfont？使用它有什么优势？如何使用 iconfont？

   + IconFont 是**字体图标**，严格地说，是一种字体，通过 CSS 设置样式，可以像设置常规文本一样设置图标。
   + 使用 IconFont 的优势有：
     1. 可以方便地将任何 CSS 效果应用于它们。
     2. 它们是矢量图形，所以是可伸缩的。
     3. 只需要发送一个或少量 HTTP 请求来加载它们，不会像图片一样需要多个 HTTP 请求。
     4. 它们在所有浏览器中都得到支持（甚至支持到 IE6）。
   + 使用：引入fontclass代码<link rel="stylesheet" type="text/css" href="./iconfont.css">;挑选相应图标并获取类名，应用于页面：<i class="iconfont icon-xxx"></i>

   <img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230915213232505.png" alt="image-20230915213232505" style="zoom:80%;" />

5. 文本相关的属性哪些是可以继承的？

   `text-align`、`text-indent`、`text-transform`、`word-spacing`、`color`。

   + text-align：文本对其方式 `left`:左对齐、`center`：居中对齐、`right`右对齐、`justify`两端对齐

   + text-indent：文案第一行缩进距离

     ![image-20230915214414919](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230915214414919.png)

   + text-decoration： `none`、`underline`、`line-through`、`overline`

     ![image-20230915214545797](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230915214545797.png)

   + color：文字颜色

   + text-transform：改变文字大小写`none`、`uppercase`、`lowercase`、`capitalize`

     ![image-20230915214641528](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230915214641528.png)

     

   + direction：文本方向，`ltr`、`rtl`

     ![image-20230915214819395](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230915214819395.png)

   + word-spacing：可以改变字（单词）之间的标准间隔

     ![image-20230915214943123](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230915214943123.png)

   + letter-spacing：字母间隔修改的是字符或字母之间的间隔

     

   + white-space

     1. normal：多个空白符会变为一个，换行变为空格
     2. pre：空白符不被忽略
     3. nowrap：防止元素中的文本换行，除非使用了一个 `br` 元素

6. 什么是 CSS 边框？如何使用边框？

   ![image-20230916165349430](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230916165349430.png)

   

## 代码题

1. 请使用 border 实现**四个方向**的**直角三角形**
2. 请使用 border 属性画出一个**正三角形**，方向不限
3. 请使用 border 属性画出一个**直角梯形**，方向不限