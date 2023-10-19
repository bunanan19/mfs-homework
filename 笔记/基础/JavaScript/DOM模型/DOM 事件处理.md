# DOM 事件处理

HTML DOM 使 JavaScript 有能力对 HTML 事件做出反应。

## 事件绑定

我们可以在事件发生时执行 JavaScript，在事件发生之前，我们需要指定事件的响应函数（也就是告诉计算机，当某件事发生时，需要执行哪些代码）；这个指定过程就是事件绑定。

### 元素事件属性

我们可以通过配置HTML元素属性 `onXXXX` 绑定事件发生时执行的代码，比如 `onClick`：

```javascript
<div onclick="this.innerHTML='谢谢!'">请点击该文本</div>
```

当事件发生时，需要执行很多行代码时，我们可以绑定函数：

```html
<!DOCTYPE html>
<html>
<head>
  <script>
    function changetext(element){
      element.innerHTML="谢谢!";
    }
  </script>
</head>
<body>
  <h1 onclick="changetext(this)">请点击该文本</h1>
</body>
</html>
```

注意：`changetext` 的参数 `this` 是浏览器在事件发生时传入的函数的参数，其指向当前元素。

注意：使用事件绑定的js放在head部分，回调函数（js一般放在body的最下面）

### 使用 DOM 指定事件响应函数

除了配置元素属性外，我们还可以使用 DOM 来动态的指定事件响应函数

```html
<!DOCTYPE html>
<html>
<head>
</head>
<body>

  <p>点击按钮就可以执行 <em>displayDate()</em> 函数。</p>

  <button id="myBtn">点击这里</button>

  <script>
  document.getElementById("myBtn").onclick = displayDate;

  function displayDate()
  {
    document.getElementById("demo").innerHTML = Date();
  }
  </script>

  <p id="demo"></p>

</body>
</html>
```

在上面的例子中，名为 displayDate 的函数被分配给 id=myButn" 的 HTML 元素。

当按钮被点击时，会执行该函数。

使用 DOM 指定事件可以处理灵活多变的需求，但是会增加程序复杂度。实际中需要根据实际情况判断是否采用。

### 使用 addEventListener() 指定事件响应函数

思考这样一个问题：

```html
<!DOCTYPE html>
<html>
<head>
</head>
<body>

  <p>点击按钮就可以执行 <em>displayDate()</em> 函数。</p>

  <button id="myBtn">点击这里</button>

  <script>
  document.getElementById("myBtn").onclick = displayDate;

  function displayDate()
  {
    document.getElementById("demo").innerHTML = Date();
  }

  // 这里有很多代码
  // 项目多人写完成，这里的代码有可能是别人写的

  document.getElementById("myBtn").onclick = other;
  function other()
  {
    alert("other code")
  }
  </script>

  <p id="demo"></p>

</body>
</html>
```

当我再点击按钮时，会显示当前时间吗？

在大型项目中，我们通常使用 `addEventListener` 给元素添加属性从而避免以上的问题。

addEventListener() 方法用于向指定元素添加事件句柄。

我们可以通过以下方法，为 `<button>` 元素添加点击事件

```javascript
document.getElementById("myBtn").addEventListener("click", function(){
  document.getElementById("demo").innerHTML = "Hello World";
});
```

当我们需要给一个元素添加多个事件时，可以继续添加：

```javascript
document.getElementById("myBtn").addEventListener("click", function(){
  alert("other code")
});
```

以下是 `addEventListener` 的参数说明

| 参数       | 描述                                                         |
| :--------- | :----------------------------------------------------------- |
| event      | 必须。字符串，指定事件名。 注意: 不要使用 "on" 前缀。 例如，使用 "click" ,而不是使用 "onclick"。 提示： 所有 HTML DOM 事件，可以查看我们完整的 HTML DOM Event 对象参考手册。 |
| function   | 必须。指定要事件触发时执行的函数。 当事件对象会作为第一个参数传入函数。 事件对象的类型取决于特定的事件。例如， "click" 事件属于 MouseEvent(鼠标事件) 对象。 |
| useCapture | 可选。布尔值，指定事件是否在捕获或冒泡阶段执行。 可能值: true - 事件句柄在捕获阶段执行 false- false- 默认。事件句柄在冒泡阶段执行 |

在JavaScript中，我们可以使用addEventListener方法来绑定捕获和冒泡事件。

```js
element.addEventListener(event, handler, useCapture);
```

其中，event表示要绑定的事件类型，function表示事件触发时要执行的函数，useCapture是一个可选的参数，用于指定事件是使用捕获还是冒泡阶段进行处理。

当useCapture为false或未提供时，事件将在冒泡阶段进行处理；当useCapture为true时，事件将在捕获阶段进行处理。



对于 `addEventListener` 添加的事件，我们可以使用 `removeEventListener` 删除事件绑定

```javascript
// 添加事件绑定
document.getElementById("myDIV").addEventListener("mousemove", myFunction);
// 删除事件绑定
document.getElementById("myDIV").removeEventListener("mousemove", myFunction);
```

## 事件对象

有的时候我们还需要获得当前事件的具体信息，这时候我们可以获取事件对象

Event 对象代表事件的状态，比如事件在其中发生的元素、键盘按键的状态、鼠标的位置、鼠标按钮的状态。

在上面的例子中，我们只有稍加修改即可获得事件对象。

```html
<!DOCTYPE html>
<html>
<head>
</head>
<body>

  <p>点击按钮就可以执行 <em>displayDate()</em> 函数。</p>

  <button id="myBtn">点击这里</button>

  <script>
  document.getElementById("myBtn").onclick = displayDate;

  // 这里的 event 会由系统自动构建并传入
  function displayDate(event)
  {
    console.log(event)
    document.getElementById("demo").innerHTML = Date();
  }
  </script>

  <p id="demo"></p>

</body>
</html>
```

完整的事件对象属性可以参考[这里](http://www.w3school.com.cn/jsref/dom_obj_event.asp)

## DOM 事件列表

当然，除了绑定 `click` 事件，我们还可以绑定其他事件,如：

- 当用户点击鼠标时
- 当网页已加载时
- 当图像已加载时
- 当鼠标移动到元素上时
- 当输入字段被改变时
- 当提交 HTML 表单时
- 当用户触发按键时

完整的事件列表可以参考[这里](http://www.runoob.com/jsref/dom-obj-event.html)

## 实战 Tabs

我们可以使用 DOM 相关操作实现一个[标签页切换效果](http://www.material-ui.com/#/components/tabs)



## 问答题

1. 什么是事件绑定？我们为什么需要它？

   > 在事件发生时执行 JavaScript，在事件发生之前，我们需要指定事件的响应函数（也就是告诉计算机，当某件事发生时，需要执行哪些代码）；这个指定过程就是事件绑定。
   >
   > 通过事件绑定可以在事件触发时规定相关的执行操作。

2. 有哪三种方法绑定事件？

   > 在DOM元素中直接绑定```<div onclick="this.innerHTML='谢谢!'">请点击该文本</div>```
   >
   > 在javaScript代码中绑定```document.getElementById("eleID").onclick = onclickHandle``
   >
   > 绑定事件监听函数addEventListener("event","function")指定事件响应函数

3. `document.getElementById("eleID").onclick = onclickHandle` 和 `addEventListener()` 绑定事件处理函数有何异同？不同之处请至少说出3点。

   > 两者都能实现事件绑定
   >
   > 1.使用 `addEventListener` 方法时，可以选择事件冒泡或捕获的处理方式。这意味着可以选择事件从目标元素向上传播（冒泡）或者从父元素向下传播（捕获）到目标元素。然而，在使用 `onclick` 属性时，默认情况下，事件处理是冒泡的，但不能选择捕获。
   >
   > 2.事件监听事件名一律不带on
   >
   > 3.使用 `onclick` 属性，只能绑定一个事件处理函数。使用 `addEventListener` 方法，可以为同一个事件绑定多个处理函数。
   >
   > 4.addEventListener()添加的事件，我们可以使用 `removeEventListener` 删除事件绑定
   >
   > 

4. 什么是事件对象？我们如何获取事件对象？

   > Event 对象代表事件的状态，比如事件在其中发生的元素、键盘按键的状态、鼠标的位置、鼠标按钮的状态。
   >
   > 在事件处理函数中通过event或e参数来引用事件对象
   >
   > ```console.log(event.type);``` *// 打印事件类型* 
   >
   > ```console.log(event.target); ```*// 打印触发事件的元素*

## 代码题

1. 请实现标签页[效果](http://www.material-ui.com/#/components/tabs)，样式部分可以自行发挥

   > 

2. 请实现抽奖效果，实现开始抽奖后，`.award`不断变化，点击停止后提示用户中奖等级
   备选奖项和概率如下

   - 特等奖，1%
   - 一等奖，10%
   - 二等奖，30%
   - 三等奖，40%
   - 鼓励奖：19%

   可以参考如下 DOM 结构

   ```html
   <div id="award">点击“开始“按钮，开始抽奖！</div>
   <div class="action">
      <button id="start">开 始</button>
      <button id="stop">停 止</button>
   </div>
   ```





# 阻止事件传播

```html
<div id="blueBox">
   <div id="yellowBox">
     <div id="greenBox"></div>
   </div>
</div>

<script> 
 let blueBox = document.getElementById('blueBox');
 let yellowBox = document.getElementById('yellowBox');
 let greenBox = document.getElementById('greenBox');
 blueBox.addEventListener('click', () => {
     console.log('blueBox')
 })
 yellowBox.addEventListener('click', () => {
     console.log('yellowBox')
 })
 greenBox.addEventListener('click', () => {
     console.log('greenBox');
 })
</script>
```

当点击绿色方块时，输出greenBox、yellowBox、blueBox，因为绿色包含在黄色里，黄色和绿色被包含蓝色中。addEventListener不写第三个参数时，事件将在冒泡阶段进行处理，从目标元素开始，逐级向外层元素传播，直到达到最外层的元素，也就是绿色、黄色、蓝色。

同理，点击黄色时，输出yellowBox、blueBox。点击蓝色时，输出blueBox。

```js
 blueBox.addEventListener('click', () => {
     console.log('blueBox')
 }, true);
 yellowBox.addEventListener('click', () => {
     console.log('yellowBox')
 })
 greenBox.addEventListener('click', () => {
     console.log('greenBox');
 }, true);
```

如上代码所示，将blueBox和greenBox的第三个参数设成true，点击绿色(greenBox)，将输出blueBox、greenBox、yellowBox，因为blueBox和greenBox的事件将在捕获阶段进行处理，yellowBox的事件将在冒泡阶段进行处理。捕获的顺序是从最外层的元素开始，逐级向内部元素传播，直到达到目标元素，也就是蓝色、绿色，之后才是冒泡事件yellowBox。

如果将第三个参数全部设成true，点击绿色(greenBox)，将输出blueBox、yellowBox、greenBox，因为事件将在捕获阶段进行处理，事件捕获的顺序是从最外层的元素开始，逐级向内部元素传播，直到达到目标元素，也就是蓝色、黄色、绿色。

## 1.event.stopPropagation()

`调用该方法会阻止事件继续传播，但不会阻止其他事件处理程序被触发`。也就是说，如果一个元素上绑定了多个事件处理程序，调用该方法只会阻止事件传播到更高层级的元素，而不会阻止同一元素上的其他事件处理程序被触发。

```js
 blueBox.addEventListener('click', () => {
     console.log('blueBox')
 }, true);
 yellowBox.addEventListener('click', () => {
     console.log('yellowBox')
 })
 greenBox.addEventListener('click', (event) => {
     console.log('greenBox');
     event.stopPropagation();
 }, true);
```

在上面的示例中，当点击绿色方块时，调用event.stopPropagation()会阻止事件继续传播到外层元素，所以`只会输出"greenBox"`，而不会输出”yellowBox”和”blueBox”。

```js
blueBox.addEventListener('click',() => {
  console.log('blueBox')
});
yellowBox.addEventListener('click',(event) => {
  console.log('yellowBox');
});
yellowBox.addEventListener('click',(event) => {
  console.log('yellowBox222');
});
greenBox.addEventListener('click',(event) => {
  console.log('greenBox');
  event.stopPropagation();
});
greenBox.addEventListener('click',(event) => {
  console.log('greenBox222');
  console.log('greenBox333');
});
```

该方法不会阻止同一元素上的其他事件处理程序被触发，在上述代码中，输出结果是greenBox、greenBox222、greenBox333。

## 2.event.stopImmediatePropagation()

`调用该方法会阻止事件继续传播，并且会阻止同一元素上的其他事件处理程序被触发`。也就是说，如果一个元素上绑定了多个事件处理程序，调用该方法会立即停止事件传播，并且不会触发同一元素上的其他事件处理程序。

```js
blueBox.addEventListener('click',() => {
  console.log('blueBox')
});
yellowBox.addEventListener('click',(event) => {
  console.log('yellowBox');
});
yellowBox.addEventListener('click',(event) => {
  console.log('yellowBox222');
});
greenBox.addEventListener('click',(event) => {
  console.log('greenBox');
  event.stopImmediatePropagation();
});
greenBox.addEventListener('click',(event) => {
  console.log('greenBox222');
  console.log('greenBox333');
});
```

在上面的示例中，当点击绿色方块(greenBox)时，调用event.stopImmediatePropagation()会阻止事件继续传播到外层元素，并且还会阻止自身的其他事件的触发，`只会输出"greenBox"`，而不会输出其他内容。

### 事件委托，事件代理

#### JS的事件处理机制

> 1、事件流：指从页面中接收事件的顺序，有冒泡流和捕获流。事件流描述的是从页面接受事件的顺序。
> 为什么会产生事件流？
> 我们可以想到一个问题：当我们在浏览器上对着一个元素点击时，你点击的不仅仅是这个 元素本身；这是因为我们的HTML元素是存在父子元素叠加层级的；比如一个span元素是放在div元素上的，div元素是放在body元素上的，body元素是放在html元素上的；
>
> <img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231008191817198.png" alt="image-20231008191817198" style="zoom: 50%;" />
>
> - **事件冒泡**：默认情况下事件是从最内层的span向外依次传递的顺序（span -> body），这个顺序我们称之为事件冒泡（Event Bubble）
> - **事件捕获**：另外一种监听事件流的方式就是从外层到内层（body -> span），这种称之为事件捕获（Event Capture）
>
> 2、DOM2级事件规定事件流包括三个阶段：事件捕获阶段、处于目标阶段、事件冒泡阶段。首先发生的是事件捕获，然后是实际的目标接收道事件，最后是冒泡阶段，可以在这个阶段对事件做出响应。<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231008170748607.png" alt="image-20231008170748607" style="zoom:80%;" />
>
> 3. 事件委托，通俗说就是将元素的事件委托给它的父级或更外级的元素处理，它的实现机制就是事件冒泡。
>    - 因为当子元素被点击时，父元素可以通过冒泡可以监听到子元素的点击；
>    - 并且可以通过event.target获取到当前监听的元素；

因为冒泡机制，比如既然点击子元素，也会触发父元素的点击事件，那我们完全可以将子元素的事件要做的事写到父元素的事件里，也就是将子元素的事件处理程序写到父元素的事件处理程序中，这就是事件委托；利用事件委托，只指定一个事件处理程序，就可以管理某一个类型的所有事件；

通俗来说：事件委托是利用事件的冒泡原理来实现的，何为事件冒泡呢？就是事件从最深的节点开始，然后逐步向上传播事件，举个例子：页面上有这么一个节点树，div>ul>li>a;比如给最里面的a加一个click点击事件，那么这个事件就会一层一层的往外执行，执行顺序a>li>ul>div，有这样一个机制，那么我们给最外面的div加点击事件，那么里面的ul，li，a做点击事件的时候，都会冒泡到最外层的div上，所以都会触发，这就是事件委托，委托它们父级代为执行事件。

示例1：

```html
<ul>
    <li>111</li>
    <li>222</li>
    <li>333</li>
    <li>444</li>
</ul>
```

实现点击li出现123.

传统方法：

```html
window.onload = function(){
    var oUl = document.getElementById("ul1");
    var aLi = oUl.getElementsByTagName('li');
    for(var i=0;i<aLi.length;i++){
        aLi[i].onclick = function(){
            alert(123);
        }
    }
}
```

使用事件委托：

```javascript
window.onload = function(){
    var oUl = document.getElementById("ul1");
   oUl.onclick = function(){
        alert(123);
    }
}
```

这里用父级ul做事件处理，当li被点击时，由于冒泡原理，事件就会冒泡到ul上，因为ul上有点击事件，所以事件就会触发，当然，这里当点击ul的时候，也是会触发的，那么问题就来了，如果我想让事件代理的效果跟直接给节点的事件效果一样怎么办，比如说只有点击li才会触发？？？

示例2：

Event对象提供了一个属性叫target，可以返回事件的目标节点，我们称为事件源，也就是说，target就可以表示为当前的事件操作的dom，但是不是真正操作dom，当然，这个是有兼容性的，标准浏览器用ev.target，IE浏览器用event.srcElement。

```javascript
window.onload = function(){
　　var oUl = document.getElementById("ul1");
　　oUl.onclick = function(ev){
　　　　var ev = ev || window.event;
　　　　var target = ev.target || ev.srcElement;
　　　　if(target.nodeName.toLowerCase() == 'li'){
　 　　　　　　 alert(123);
　　　　　　　  alert(target.innerHTML);
　　　　}
　　}
}
```

这样，只有点击li才会触发事件。

示例3

对比下列两段代码实现：

```javascript
window.onload = function(){
            var oBtn = document.getElementById("btn");
            var oUl = document.getElementById("ul1");
            var aLi = oUl.getElementsByTagName('li');
            var num = 4;
            //鼠标移入变红，移出变白
            for(var i=0; i<aLi.length;i++){
                aLi[i].onmouseover = function(){
                    this.style.background = 'red';
                };
                aLi[i].onmouseout = function(){
                    this.style.background = '#fff';
                }
            }
            //添加新节点
            oBtn.onclick = function(){
                num++;
                var oLi = document.createElement('li');
                oLi.innerHTML = 111*num;
                oUl.appendChild(oLi);
            };
        }
```

注意：这里添加的新节点并不会有事件处理程序。

```javascript
window.onload = function(){
            var oBtn = document.getElementById("btn");
            var oUl = document.getElementById("ul1");
            var aLi = oUl.getElementsByTagName('li');
            var num = 4;
            //事件委托，添加的子元素也有事件
            oUl.onmouseover = function(ev){
                var ev = ev || window.event;
                var target = ev.target || ev.srcElement;
                if(target.nodeName.toLowerCase() == 'li'){
                    target.style.background = "red";
                }
            };
            oUl.onmouseout = function(ev){
                var ev = ev || window.event;
                var target = ev.target || ev.srcElement;
                if(target.nodeName.toLowerCase() == 'li'){
                    target.style.background = "#fff";
                }
            };
            //添加新节点
            oBtn.onclick = function(){
                num++;
                var oLi = document.createElement('li');
                oLi.innerHTML = 111*num;
                oUl.appendChild(oLi);
            };
        }
```

用事件委托的方式，新添加的子元素是带有事件效果的，我们可以发现，当用事件委托的时候，根本就不需要去遍历元素的子节点，只需要给父级元素添加事件就好了，其他的都是在js里面的执行，这样可以大大的减少dom操作，这才是事件委托的精髓所在。

示例4: 点击某一个 Li 标签时，将 Li 的背景色显示在 P 标签内，并将 P 标签中的文字颜色设置成 Li 的背景色

传统实现：

```javascript
var list = document.querySelectorAll("li");
   for (var i = 0, len = list.length; i < len; i++) {
       list[i].onclick = function(e) {
           var t = e.target;
           var c = t.style.backgroundColor;
           var p = document.getElementsByClassName("color-picker")[0];
           p.innerHTML = c;
           p.style.color = c;
       }
   }
```

运用事件委托：

```javascript
var ulist=document.getElementsByClassName("palette")[0];
 ulist.οnclick=function(ev){
     var ev = ev || window.event;
     var target = ev.target || ev.srcElement;
     if (target.nodeName.toLowerCase() === 'li') {
             var c = target.style.backgroundColor;
             var p = document.getElementsByClassName("color-picker")[0];
             p.innerHTML = c;
              p.style.color = c;
     }
 }
```

注意：ul只有一个，要用索引，[0]，如果不写，无法实现。
总结一下js委托相关的：

- 因为把事件绑定到了父节点上，因此省了绑定事件。就算后面新增的子节点也有了相关事件，删除部分子节点不用去销毁对应节点上绑定的事件
- 父节点是通过event.target来找对应的子节点的。（事件处理程序中的this值始终等于currentTarget的值，指向的是绑定到的那个元素）

##### event对象中 会有两个对象。一个是target，一个currentTarget。 

 currentTarget是 box.onlick= function(e){}。绑定的事件。也就是 事件监听器的对象。

 target。实际上点击的对象。

 1 绑定在水果上， 绑定的对象是水果。

如果点击水果。那么点击的对象是水果 == 绑定的水果。

如果点击的是 苹果，那么对点击的对象是苹果 ！== 绑定的水果。

2 如果绑定的是苹果，那么绑定的就是苹果。 currentTarget==苹果。

无论怎么点击都是苹果。

```html
<body>
    <ul id="box">
        水果
        <Li id="apple">苹果</Li>
        <li>香蕉</li>
        <li>桃子</li>
    </ul>
 </body>
 <script type="text/javascript">
    var box = document.getElementById('box');
    var apple = document.getElementById('apple');
  
   //绑定在父元素box上（如果点击apple这个li时）
    box.onclick = function (e){
        console.log(e.target);           // <li id="apple">苹果</li>
        console.log(e.currentTarget);       //<ul id="box">...</ul>
        console.log(this);                  //<ul id="box">...</ul>
        console.log(e.currentTarget===this);      //true
        console.log(e.target === e.currentTarget);        //false
        console.log(e.target === this);           //false
    }
 
	//直接绑定在目标元素apple上
    apple.onclick = function (e){  
        console.log(e.target);          //<li id="apple">苹果</li>
        console.log(e.currentTarget);    //<li id="apple">苹果</li>
        console.log(this);               //<li id="apple">苹果</li>
        console.log(e.target === e.currentTarget);      //true
        console.log(e.target === this);           //true
    } 
 </script>
```

