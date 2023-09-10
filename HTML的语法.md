## HTML的语法

### HTML元素语法

+ HTML 元素以开始标签起始

+ HTML 元素以结束标签终止

+ 元素的内容是开始标签与结束标签之间的内容

+ 某些 HTML 元素具有空内容（empty content）

+ 空元素在开始标签中进行关闭（以开始标签的结束而结束）

+ 大多数 HTML 元素可拥有属性

+ HTML 元素必须正确的嵌套

  

​        正确：元素嵌套

```html 
<p><em>这是一个要强调的段落。</em></p>
```



​         错误：元素交叉

```html
<em><p>这是一个要强调的段落。</em></p>
```



```<em>``` 标签告诉浏览器把其中的文本表示为强调的内容。对于所有浏览器来说，这意味着要把这段文字用斜体来显示。

在文本中加入强调也需要有技巧。如果强调太多，有些重要的短语就会被漏掉；如果强调太少，就无法真正突出重要的部分。这与调味品一样，最好还是不要滥用强调。

尽管```` <em> ```标签修饰的内容都是用斜体字来显示，但这些内容也具有更广泛的含义，将来的某一天，浏览器也可能会使用其他的特殊效果来显示强调的文本。如果你只想使用斜体字来显示文本的话，请使用``` <i> ```标签。除此之外，文档中还可以包括用来改变文本显示的级联样式定义。

除强调之外，当引入新的[术语](https://baike.baidu.com/item/术语?fromModule=lemma_inlink)或在引用特定类型的术语或[概念](https://baike.baidu.com/item/概念?fromModule=lemma_inlink)时作为固定样式的时候，也可以考虑使用``` <em> ```标签。例如，W3School 经常对重要的术语使用 ```<em> ```签。```<em> ```标签可以用来把这些名称和其他斜体字区别开来。

例子：

```html
<p>这是一个段落</p>
<a href="a">这是一个链接</a>
<br />
<a href="b" target="_blank">这是另一个链接</a>
```

![image-20230909194909362](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230909194909362.png)

```<br />```：换行作用，相当于enter键

![image-20230909212710272](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230909212710272.png)

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230909212548010.png" alt="image-20230909212548010" style="zoom:67%;" />

删除```<br/>```后：变成一行了，但是中间又个空格，因为两个标签之间输入了一个enter键(换行)。对于空格：HTML元素内容里面一个或者多个空白字符序列，都会被映射为一个空格。

![image-20230909212649442](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230909212649442.png)

![image-20230909212744584](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230909212744584.png)



### HTMl空元素

没有内容的 HTML 元素被称为空元素。空元素可以在开始标签中关闭的。

如 一个空的段落

```html
<p />
```



### 额外说明

+ 一个或多个空白字符序列映射为 **单个字符**

  即内容文本里面一个或多个连续的空格符映射到网页上只有一个空格

  想要表示多个空格：使用```&nbsp;```实体来表示多余的空格。在浏览器中，每个```&nbsp;```实体将显示为一个空格。

  ![image-20230909214927855](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230909214927855.png)

  ![image-20230909214948201](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230909214948201.png)

  

+ <和&会被认为是标记的开始，若想使用这两个字符，请使用转义写法：```&lt;```和```&amp```;

  ```&lt;```或```&#60```表示'<'

  ```&gt;```或```&#62;```表示'>'

  ```&amp;```或```&#38;```表示'&'

  ```&quot;``` :双引号 ''

  ```&copy;``` :版权 ©

  ```&reg;``` :已注册商标 ®

  ```™``` ：商标（美国）™

  ```&times;``` :乘号 ✖

  ```&pide;``` :除号➗

  ```&nbsp;```或```&#160;``` ：普通的英文半角**空格**但不换行

  ```&ensp;```或```&#8194``` ： 半个中文宽度

  ```&emsp;```或```&#8195; ``` ：全角空格

  ```&#12288;``` ：中文全角空格 （一个中文宽度）其实它就相当于一个空白的汉字。

  更多转义字符：[转义字符](https://www.php.cn/faq/481912.html)

  

+ 属性值建议用双引号包裹

  <img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230909195610789.png" alt="image-20230909195610789" style="zoom:80%;" />

+ 元素名称和属性必须小写（XHMTML要球）



### 常见标签



#### 标题

```html
<h1>h1</h1>
<h2>h2</h2>
……
<h6>h6</h6>
<!--块状元素占整行-->
```

#### ![image-20230910192146517](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230910192146517.png)

#### 段落和块

```html
<p>
    Text
</p>
<div>
    Text
</div>
<!--块状元素-->
```

区别

```html
<div>就是普通的快标签，多用于布局； </p>是语义化的段落标签，用于文章分段
<div>默认没有边距，<p>标签为了表示文章分段，有默认间距
```



#### 行内书写

![image-20230909202102274](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230909202102274.png)

```html
<p>
    '<san>'标签一般与CSS结合使用，调整样式，比如将<span style="color:red;">内容</span>改为红色
</p>
```

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230910194926490.png" alt="image-20230910194926490" style="zoom:67%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230910195002975.png" alt="image-20230910195002975" style="zoom:67%;" />



行内元素不占整行：

![image-20230910192242868](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230910192242868.png)

行内元素可以放在块状元素以内，比如在块状元素里面放一个超链接，但是一般块状元素不放在行内元素

```html
<h2>
    块状元素里面放置<a href="https://www.baidu.com">行内元素</a>
</h2>
```





#### 超链接

![image-20230909202127281](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230909202127281.png)

#### 图片

![image-20230909202315422](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230909202315422.png)

### 内容相关

#### 有序列表order list（ol） li：list item

```html
<ol>
    <li>a</li>
    <li>b</li>
    <li>c</li>
</ol>
```

#### 无序列表unordered list（ul）

```html
<ul>
    <li>Coffe</li>
    <li>Tea</li>
    <li>Milk</li>
</ul>
```

#### 换行

```html
<br/>
```

#### 分割线

```html
<hr/>
```

####  按钮

````html
<button>
    click
</button>
<button>
    yes
</button>
````

#### table

```html
<table>
    <thead>
    <tr>
    	<th>Name</th>
    	<th>Age</th>
    	<th>Num</th>
    </tr>           
    </thead>
    <tbody>
    <tr>
    	<td>F</td>
        <td>22</td>
        <td>123</td>
    </tr>
	</tbody>
</table>
```

```<table>```标签，```<thead>```：表头部分，```<tbody>```：表格主题内容，```<tr>```:table row,表格行，```<th>```：表头，```<td>```:单元格

### 文本相关

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230909203324307.png" alt="image-20230909203324307" style="zoom: 67%;" />



全部标签：[HTML标签参考](https://www.w3cschool.cn/htmltags/html-reference.html)



### HTML属性

- HTML 元素可以设置属性
- 属性可以在元素中添加附加信息
- 属性一般在开始标签中
- 属性一般以名称/值对的形式出现，比如：name="value"

![image-20230909203616810](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230909203616810.png)

全部属性：[HTML标准属性参考](https://www.w3cschool.cn/htmltags/ref-standardattributes.html)
