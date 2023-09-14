# HTML5新特性

## HTML5 中的一些有趣的新特性：

- 用于绘画的 canvas 元素和可伸缩矢量图形 SVG
- 用于媒介回放的 video 和 audio 元素
- 对本地离线存储的更好的支持
- 新的特殊内容元素，比如 article、footer、header、nav、section
- 新的表单控件，比如 calendar、date、time、email、url、search

## HTML5 Canvas

HTML5 的 canvas 元素使用 JavaScript 在网页上绘制图像。

画布是一个矩形区域，您可以控制其每一像素。

canvas 拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。

```html
<canvas id="myCanvas" width="200" height="100"></canvas>
```

Canvas 需要使用 JavaScript 来绘制，在这里不再展开介绍。著名数据可视化工具 [echarts](http://echarts.baidu.com/) 就是基于 Canvas

## HTML5 内联 SVG

### 什么是 SVG

- SVG 指可伸缩矢量图形 (Scalable Vector Graphics)
- SVG 用于定义用于网络的基于矢量的图形
- SVG 使用 XML 格式定义图形
- SVG 图像在放大或改变尺寸的情况下其图形质量不会有损失
- SVG 是万维网联盟的标准

### SVG 的优势

- SVG 图像可通过文本编辑器来创建和修改
- SVG 图像可被搜索、索引、脚本化或压缩
- SVG 是可伸缩的
- SVG 图像可在任何的分辨率下被高质量地打印
- SVG 可在图像质量不下降的情况下被放大

把下面代码放入 html 中试试

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="190">
  <polygon points="100,10 40,180 190,60 10,60 160,180"
  style="fill:lime;stroke:purple;stroke-width:5;fill-rule:evenodd;" />
</svg>
```

+ xmlns: xmlns（XML Namespaces的缩写）是一个属性，是XML（[标准通用标记语言](https://baike.baidu.com/item/标准通用标记语言/6805073?fromModule=lemma_inlink)的子集）命名空间。作用是赋予[命名空间](https://baike.baidu.com/item/命名空间/2887476?fromModule=lemma_inlink)一个唯一的名称。用于标示命名空间的地址不会被[解析器](https://baike.baidu.com/item/解析器/17458345?fromModule=lemma_inlink)用于查找信息。其惟一的作用是赋予命名空间一个惟一的名称。不过，很多公司常常会作为指针来使用命名[空间指向](https://baike.baidu.com/item/空间指向/8907505?fromModule=lemma_inlink)实际存在的网页，这个网页包含关于命名空间的信息 。

+ version：版本

+ stroke：绘制当前路径

+ polygon:多边形
+ even：偶数
+ odd：奇数

## HTML 视频

```<video>```  是 HTML 5 中的新标签。```<video> ```标签的作用是在 HTML 页面中嵌入视频元素。


把下面代码放入 html 中试试

```html
<video width="320" height="240" controls>
  <source src="http://static.mafengshe.com/video/2017-05-13-%E6%AF%8D%E4%BA%B2%E8%8A%82&520%E4%B8%93%E9%A2%98-%E5%9B%BE%E7%89%87%E5%A2%99.mp4" type="video/mp4" />
Your browser does not support the video tag.
</video>
```

在代码  `<video width="320" height="240" controls>`  中， `controls`  是一个属性。   `controls`  属性用于  `<video>`  标签，表示要为视频播放器**显示**控制面板。这些控制面板通常包括播放、暂停、音量控制和视频进度条等按钮。通过包含  `controls`  属性，用户可以与视频播放器进行交互，并对播放和其他功能进行控制。没有controls用户需要自己右键点击视频选择显示所以控件。如果引用的视频不能·被HTML5解析的视频格式

## HTML 音频

```<audio>``` 元素是一个 HTML5 元素，在 HTML 4 中是非法的，但在所有浏览器中都有效。


把下面代码放入 html 中试试

```html
<audio controls>
  <source src="https://static.mafengshe.com/audio/%E4%BD%A0%E8%BF%98%E8%A6%81%E6%88%91%E6%80%8E%E6%A0%B7.mp3" type="audio/mp3" />
Your browser does not support this audio format.
</audio>
```

## HTML5新的结构元素

- article元素 - article元素代表文档、页面或应用程序中独立的、完整的、可以独自被外部引用的内容，与上下文不相关的独立内容

  ```html
  <article>
   <header>
   <h1>The Very First Rule of Life</h1>
   <p><time datetime="2016-8-8">3 days ago</time></p>
   </header>
  <p>If there's a microphone anywhere ...</p>
  <p>...</p>
  <footer>
   <a itemprop="discussionUrl" href="https://wwww.baidu.com">Show comments...</a>
  </footer>
  </article>
  ```

  

- section元素 - section元素表示页面中的一个内容区块，比如章节、页眉、页脚或页面中的其他部分 - 不要为没有标题的内容区块使用section元素

> section元素 用来定义文章中的章节(通常应该有标题和段落内容)
>
> section元素的作用就是给内容分段，给页面分区
>
> 1、section元素 和 div元素的区别是什么？
>
> div强调在形式上的独立性，section强调的是内容上的独立性，注意它的语义。
>
> 2、article元素和section元素的区别是什么？
>
> article元素更强调内容的独立性(比如说一篇文章)：可能有header和footer
>
> section元素更强调内容的关联性(比如说两个段落，是相似的)：可能有标题和段落内容
>
> <img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230914142235183.png" alt="image-20230914142235183" style="zoom:67%;" />
>
> ```html
> <body>
> 文章的结构:
>     <article>
>            <header>
>                <h2>乡愁</h2>
>                <h4>
>                    作者：XXX
>                </h4>
>         </header>
>         <section>
>         		<h3>
>                     第一章
>             </h3>
>             <p>
>                 乡愁，小时候，故乡在那头，我在这头。长大后……
>             </p>
>         </section>
>         <section>
>         		<h3>
>                     第二章
>             </h3>
>             <p>
>                 床前明月光，疑是地上霜……
>             </p>
>         </section>
>     </article>
>     评论区结构：
>     <section>
>     	<article>
>             <header><h4>
>                 网友A：
>                 </h4></header>
>             <p>
>                 发布评论的内容……
>             </p>
>             <footer>发布时间：2015/10/20</footer>
>         </article>
>         <article>
>         	<header><h4>
>                 网友B:
>                 </h4></header>
>             <p>
>                 balaballabalbla……
>             </p>
>             <footer>发布时间：2017.4.8</footer>
>         </article>
>     </section>
> </body>
> ```
>
> 

- nav元素 - 表示页面中导航链接的部分，例如：传统导航条，侧边栏导航，页内导航，翻页等。结合css使用。

  ```html
  <nav>
      <ul>
          <li>first</li>
          <li>second</li>
          <li>third</li>
          <li>fourth</li>
      </ul>
  </nav>
  ```

  

- aside元素 - aside元素表示article元素的内容之外的、与article元素的内容相关的辅助信息，它可以包含与当前页面或主要内容相关的引用、侧边栏、广告、导航条，以及其他类似的有别于主要内容的部分

```
<aside>
    <nav>
        <h2>评论</h2>
        <ul>
            <li>
            <a href="https://i.cnblogs.com/EditPosts.aspx?opt=1">aside元素</a>2018-4-30<br/>
            <a href="https://i.cnblogs.com/EditPosts.aspx?opt=1">点击了解详情</a>
            </li>
        </ul>
    </nav>
</aside>
```

- header元素 - 表示页面中一个内容区块或整个页面的标题

- hgroup元素 - 将标题及其子标题进行分组的元素。hgroup元素通常会将h1-h6元素进行分组，譬如一个内容区块的标题及其子标题算一组。

  ```html
  <hgroup>
    <h1>文章主标题</h1>
    <h2>文章子标题</h2>
  </hgroup>
  ```

- footer元素 - 表示整个页面或页面中一个内容区块的脚注。一般来说，它会包含创作者的姓名、创作日期以及创作者联系信息

- figure元素 - 表示一段独立的流内容，一般表示文档主体流内容中的一个独立单元。使用figcaption元素为figure元素组添加标题。figure元素用来表示网页上一块独立的内容，将其从网页上移除后不会对网页上的其他内容产生影响。figure元素所表示的内容可以是图片、统计图或代码示例。
  注意：使用figure元素时，需要用figcaption元素为figure元素组添加标题。不过，figure元素内最多只允许放置一个figcaption元素，其他元素可武宣放置。

  ```html
  <figure>
      <img alt="img1.jpg"/>
      <img alt="img2.jpg"/>
  </figure>
  <figcaption>标题</figcaption>
  ```

  

​	

## html5对于表单的增强

input标签的增强,新增type属性类型

- date - 选取日、月、年
- month - 选取月、年
- week - 选取周和年
- time - 选取时间（小时和分钟）
- datetime - 选取时间、日、月、年（UTC 时间）
- datetime-local - 选取时间、日、月、年（本地时间）
- range－数字范围选择
- number－填写数字
- url-url地址
- email-邮件
- color-颜色选取
- search-搜索
- input标签新增属性

更多参考[这里](https://sallypanda.gitbooks.io/html5/content/html5/lesson2.html)



1. HTML5引入了哪些新标签？

   + ```<canvas>```用于绘画
   + ```<svg>```可伸缩矢量图形
   + ```<video>```视频播放
   + ```<audio>```音频播放

2. Canvas是什么？它能干什么？

   > canvas元素使用JavaScript在网页上绘制图像。画布是一个矩形区域，可以控制每一个像素。canvas拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。

3. SVG 是什么？它能干什么？它和 Canvas 有什么区别？
   - *SVG 指可伸缩矢量图形 (Scalable Vector Graphics)
   - SVG 用于定义用于网络的基于矢量的图形
   - SVG 使用 XML 格式定义图形
   - SVG 图像在放大或改变尺寸的情况下其图形质量不会有损失
   - SVG 是万维网联盟的标准
   - SVG 图像可通过文本编辑器来创建和修改
   - *SVG 图像可被搜索、索引、脚本化或压缩
   - SVG 是可伸缩的
   - SVG 图像可在任何的分辨率下被高质量地打印
   - *SVG 可在图像质量不下降的情况下被放大
   - canvas是位图；依赖分辨率，svg不依赖分辨率；canvas不支持事件处理器，svg支持，并且svg可以被搜索、索引、脚本化。

4. 如何在网页上播放视频、音频？

+ ```html
  <video width="400" controls>
  	<source src="XXX" type="video/mp4">
      Your browser does not support the video tag.
  </video>
  ```

+ ```html
  <audio height="400" controls>
  	<source src="XXx" type="audio/mp3">
      Your browser does not support the audio tag.
  </audio>
  ```

  

5. HTML5引入了哪些结构性元素？他们各有哪些含义？

​	![image-20230914151818649](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230914151818649.png)

6. 如果网页发生乱码，我们应该检查什么？具体该怎么做？
   请写出一个包含乱码的网页，并合理设置字符集编码，使得它可以正常显示

> 乱码产生的根本原因是你保存的编码格式和浏览器解析时的解码格式不匹配导致的。乱码一般是英文以外的字符才会出现。
>
> 若出现乱码，应该检查编码设置，将编码格式设置为UTF-8
>
> 比如文件编码为 UTF-8，可以通过设置编码格式解决：
>
> ```html
> <meta charset = "UTF-8">
> ```
>
> ![image-20230914152847864](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230914152847864.png)
>
> ![image-20230914152921091](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230914152921091.png)
>
> 修改编码格式为UTF-8即可

7. 在哪里查浏览器对标签或属性的支持程度? 请查询`<video>`标签的浏览器兼容性，并截图

> https://caniuse.com/
>
> ![image-20230914153349270](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230914153349270.png)