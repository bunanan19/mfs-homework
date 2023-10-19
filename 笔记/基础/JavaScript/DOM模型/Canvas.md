# Canvas

**Canvas API** 提供了一个通过[JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript) 和 [HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML)的[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas)元素来绘制图形的方式。它可以用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理等方面。

Canvas API 主要聚焦于 2D 图形。而同样使用`<canvas>`元素的 [WebGL API](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API) 则用于绘制硬件加速的 2D 和 3D 图形。

## [基础示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API#基础示例)

这个简单的例子在画布绘制一个绿色的长方形。

### [HTML](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API#html)

HTMLPlayCopy to Clipboard

```
<canvas id="canvas"></canvas>
```

### [JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API#javascript)

[`Document.getElementById()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementById) 方法获取 HTML `<canvas>` 元素的引用。接着，[`HTMLCanvasElement.getContext()`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/getContext) 方法获取这个元素的 context——图像稍后将在此被渲染。

由 [`CanvasRenderingContext2D`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D) 接口完成实际的绘制。[`fillStyle`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillStyle) 属性让长方形变成绿色。[`fillRect()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillRect) 方法将它的左上角放在 (10, 10)，把它的大小设置成宽 150 高 100。

JSPlayCopy to Clipboard

```
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "green";
ctx.fillRect(10, 10, 150, 100);
```

### [结果](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API#结果)

![image-20230926225116656](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230926225116656.png)

## [参考](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API#参考)

- [`HTMLCanvasElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement)
- [`CanvasRenderingContext2D`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D)
- [`CanvasGradient`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasGradient)
- [`CanvasImageSource`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D)
- [`CanvasPattern`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasPattern)
- [`ImageBitmap`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageBitmap)
- [`ImageData`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData)
- `RenderingContext`
- [`TextMetrics`](https://developer.mozilla.org/zh-CN/docs/Web/API/TextMetrics)
- [`OffscreenCanvas`](https://developer.mozilla.org/zh-CN/docs/Web/API/OffscreenCanvas)实验性
- [`Path2D`](https://developer.mozilla.org/zh-CN/docs/Web/API/Path2D)实验性
- [`ImageBitmapRenderingContext`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageBitmapRenderingContext)实验性

**备注：** 与 `WebGLRenderingContext` 有关的接口请参考 [WebGL](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API)。

[`CanvasCaptureMediaStream`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasCaptureMediaStreamTrack) 也与之相关。

## [教程与指导](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API#教程与指导)

- **[Canvas 教程]**(https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)

  一个综合性教程，包括了<canvas>的基本用法与高级功能。

- [代码片段：Canvas](https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/Code_snippets/Canvas)

  一些面向开发者的 <canvas> 代码片段。

- [深入 HTML5 Canvas](https://joshondesign.com/p/books/canvasdeepdive/title.html)

  一个手把手的、长度与书本相若的 Canvas API 和 WebGL 介绍。

- [使用 canvas 绘制视频](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Manipulating_video_using_canvas)

  结合[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video)和 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas)来实现实时操作视频数据。

## [库](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API#库)

Canvas API 是非常强大的，但不总是很容易使用。以下列出的库能够使创建基于 canvas 的项目更快和更简单。

- [EaselJS](https://www.createjs.com/easeljs) 使制作游戏、创作类艺术和其他侧重图形项目更容易的开源 canvas 库
- [Fabric.js](http://fabricjs.com/) 具有 SVG 解析功能的开源 canvas 库
- [heatmap.js](https://www.patrick-wied.at/static/heatmapjs/) 基于 canvas 的热点图的开源库
- [JavaScript InfoVis Toolkit](https://thejit.org/) 创建交互式的 2D Canvas 数据可视化
- [Konva.js](https://konvajs.github.io/) 用于桌面端和移动端应用的 2D canvas 库
- [p5.js](https://p5js.org/) 包含给艺术家、设计师、教育者、初学者使用的完整的 canvas 绘制功能
- [Paper.js](http://paperjs.org/) 运行于 HTML5 Canvas 上的开源矢量图形脚本框架
- [Phaser](https://phaser.io/) 用于基于 Canvas 和 WebGL 的浏览器尤其的快速、自由、有趣的开源框架
- [Processing.js](https://processingjs.org/) 用于处理可视化语言
- [Pts.js](https://ptsjs.org/) 在 canvas 和 SVG 中进行创意性代码写作和可视化的库
- [Rekapi](https://github.com/jeremyckahn/rekapi) 关键帧动画库
- [Scrawl-canvas](https://scrawl.rikweb.org.uk/) 用来创建和编辑 2D 图形的开源库
- [ZIM](https://zimjs.com/) 框架为 canvas 上的代码创意性提供方便性、组件和可控性，包括可用性和数百个色彩缤纷的教程

**备注：** 与 WebGL 有关的 2D 和 3D 的库请参考 [WebGL](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API)。

## [标准](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API#标准)

| Specification                                                |
| :----------------------------------------------------------- |
| [HTML Standard # the-canvas-element](https://html.spec.whatwg.org/multipage/canvas.html#the-canvas-element) |

## [浏览器兼容性](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API#浏览器兼容性)

Mozilla 程序从 Gecko 1.8 ([Firefox 1.5 (en-US)](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/1.5)) 开始支持 `<canvas>`。它首先是由 Apple 引入的，用于 OS X Dashboard 和 Safari。Internet Explorer 从 IE9 开始支持`<canvas>` ，更旧版本的 IE 中，页面可以通过引入 Google 的 [Explorer Canvas](https://github.com/arv/explorercanvas) 项目中的脚本来获得`<canvas>`支持。Google Chrome 和 Opera 9+ 也支持 `<canvas>`。

## [其他相关](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API#其他相关)

- [WebGL](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API)

### Found a content problem with this page?

- [Edit the page on GitHub](https://github.com/mdn/translated-content/edit/main/files/zh-cn/web/api/canvas_api/index.md).
- [Report the content issue](https://github.com/mdn/translated-content/issues/new?template=page-report-zh-cn.yml&mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FCanvas_API&metadata= Page+report+details<%2Fsummary> *+Folder%3A+`zh-cn%2Fweb%2Fapi%2Fcanvas_api` *+MDN+URL%3A+https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FCanvas_API *+GitHub+URL%3A+https%3A%2F%2Fgithub.com%2Fmdn%2Ftranslated-content%2Fblob%2Fmain%2Ffiles%2Fzh-cn%2Fweb%2Fapi%2Fcanvas_api%2Findex.md *+Last+commit%3A+https%3A%2F%2Fgithub.com%2Fmdn%2Ftranslated-content%2Fcommit%2F19c5158b80b542aa282c301b9ee98b5a4a781bfd *+Document+last+modified%3A+2023-07-29T12%3A32%3A17.000Z <%2Fdetails>).
- [View the source on GitHub](https://github.com/mdn/translated-content/blob/main/files/zh-cn/web/api/canvas_api/index.md?plain=1).

Want to get more involved? [Learn how to contribute](https://github.com/mdn/content/blob/main/CONTRIBUTING.md).

This page was last modified on 2023年7月29日 by [MDN contributors](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/contributors.txt).



## 问答题

1. 什么是 Canvas？Canvas 能干那些事？

   > Canvas允许脚本语言动态渲染位图像。
   >
   > **Canvas API** 提供了一个通过[JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript) 和 [HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML)的[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas)元素来绘制图形的方式。它可以用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理等方面。

2. 画笔颜色，填充颜色各如何设置？

   > 1. **画笔颜色的设置**：可以通过ctx.strokeStyle属性设置，使用方法ctx.strokeStyle = "颜色"。
   > 2. **填充颜色的设置**：可以通过ctx.fillStyle属性设置，使用方法ctx.fillStyle = "颜色"。

3. Canvas 中如何画圆？如何填充圆？

   > 1. 使用arc(x，y，r，开始弧度1，结束弧度2)方法，其中前三个好理解就是圆心坐标，半径。后面两个分别是开始的弧度和结束的弧度。
   > 3. 填充或者画线：cv.fill()填充或者cv.stroke()画线。
   
4. Canvas 如何改变坐标系的位置和单位长度？

   > 1. **改变坐标系的位置**：可以通过translate()方法来实现。例如，translate(x, y)，其中x，y是坐标轴的偏移量。
   > 2. **改变单位长度**：可以通过scale()方法来实现。例如，scale(x, y)，其中x，y是缩放比例。
   >
   > 以下是一个示例代码：
   >
   > ```html
   > <canvas id="myCanvas" width="500" height="500"></canvas>
   > <script>  
   >     var canvas = document.getElementById("myCanvas");
   >     var ctx = canvas.getContext("2d"); 
   >     ctx.translate(100, 100);  // 改变坐标系的位置 
   >     ctx.scale(2, 2);  // 改变单位长度
   >     ctx.fillRect(0, 0, 100, 100);// 在新的坐标系中画一个矩形，左下角坐标(0,0)，宽度100，高度100 
   > </script>
   > ```
   >
   > 

## 代码题

1. 请使用 Canvas 绘制钟表，并可以**动态**显示当前时间
   ![img](https://static.mafengshe.com/fe-base/homework/canvas-clock.png)



 beginPath() 和 closePath() 并不是couple，不是一对非要成对使用的 API，只是在对应需要的场景调用对应的方法，下面通过几个案例说明对这两个 API 的具体理解，首先创建一个 canvas 标签
注意：canvas默认宽高是300 x 150，如果在标签中直接指定宽高其实就是重置宽高，如果通过 CSS 样式设置宽高其实就是将其默认的300*150的宽高进行了拉伸或缩放，这样内容会变形



beginPath
beginPath() 方法开始一条路径，或重置当前的路径

```javascript
context.moveTo(100, 100)
context.lineTo(200, 100)
context.strokeStyle ='red'
context.stroke() 

context.strokeStyle ='red'
context.moveTo(100, 200)
context.lineTo(200, 200)
context.stroke()
```

+ 第一个 stroke() 调用的时候路径列表只有一条线【从(100, 100)到(200,100)】
+ 第二个 stroke() 调用的时候此时路径列表里有两条线了【从(100, 100)到(200,100)，从(100, 200)到(200,200)】

+ 在我们绘制路径的时候，实际上会有一个路径列表帮我们纪录当前所画的的子路径，而这整一个列表就是我们当前绘制的路径。

- 每次调用 `stroke()` 都会将此时的路径绘制一次，这也就是这两条线中第一条比第二条颜色更深，因为第一条被绘制了两遍
- 如果是想要绘制两条单独的直线，需要用到 beginPath ，它是开始一条新的路径，当第一条路径画完，调用 beginPath 重新开始一条新的路径，那之前的路径就不会在后面的 stroke() 被重复绘制。stroke，fill，都会从上一次 beginPath 开始绘制，不管 moveTo 把画笔移到什么位置，都是在绘制一个路径。
  

```
closePath()` 方法不是结束路径，而是关闭路径，它会试图从当前路径的终点连一条路径到起点，让整个路径闭合起来
注意：**这并不意味着它之后的路径就是新路径了**，如果需要绘制不同路径内容，还是需要结合 `beginPath
```