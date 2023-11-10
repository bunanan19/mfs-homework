# 模板语法

Vue 使用一种基于 HTML 的模板语法，使我们能够声明式地将其组件实例的数据绑定到呈现的 DOM 上。所有的 Vue 模板都是语法层面合法的 HTML，可以被符合规范的浏览器和 HTML 解析器解析。

在底层机制中，Vue 会将模板编译成高度优化的 JavaScript 代码。结合响应式系统，当应用状态变更时，Vue 能够智能地推导出需要重新渲染的组件的最少数量，并应用最少的 DOM 操作。

如果你对虚拟 DOM 的概念比较熟悉，并且偏好直接使用 JavaScript，你也可以结合可选的 JSX 支持[直接手写渲染函数](https://cn.vuejs.org/guide/extras/render-function.html)而不采用模板。但请注意，这将不会享受到和模板同等级别的编译时优化。

## 文本插值

最基本的数据绑定形式是文本插值，它使用的是“Mustache”语法 (即双大括号)：

```template
<span>Message: {{ msg }}</span>
```

双大括号标签会被替换为[相应组件实例中](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#declaring-reactive-state) `msg` 属性的值。同时每次 `msg` 属性更改时它也会同步更新。

## 原始 HTML

双大括号会将数据解释为纯文本，而不是 HTML。若想插入 HTML，你需要使用 [`v-html` 指令](https://cn.vuejs.org/api/built-in-directives.html#v-html)：

```
<p>Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231109135359266.png" alt="image-20231109135359266" style="zoom:80%;" />

这里我们遇到了一个新的概念。这里看到的 `v-html` attribute 被称为一个**指令**。指令由 `v-` 作为前缀，表明它们是一些由 Vue 提供的特殊 attribute，你可能已经猜到了，它们将为渲染的 DOM 应用特殊的响应式行为。这里我们做的事情简单来说就是：在当前组件实例上，将此元素的 innerHTML 与 `rawHtml` 属性保持同步。

`span` 的内容将会被替换为 `rawHtml` 属性的值，插值为纯 HTML——数据绑定将会被忽略。注意，你不能使用 `v-html` 来拼接组合模板，因为 Vue 不是一个基于字符串的模板引擎。在使用 Vue 时，应当使用组件作为 UI 重用和组合的基本单元。

> 安全警告
>
> 在网站上动态渲染任意 HTML 是非常危险的，因为这非常容易造成 [XSS 漏洞](https://zh.wikipedia.org/wiki/跨網站指令碼)。请仅在内容安全可信时再使用 `v-html`，并且**永远不要**使用用户提供的 HTML 内容。

## Attribute 绑定

双大括号不能在 HTML attributes 中使用。想要响应式地绑定一个 attribute，应该使用 [`v-bind` 指令](https://cn.vuejs.org/api/built-in-directives.html#v-bind)：

```
<div v-bind:id="dynamicId"></div>
```

`v-bind` 指令指示 Vue 将元素的 `id` attribute 与组件的 `dynamicId` 属性保持一致。如果绑定的值是 `null` 或者 `undefined`，那么该 attribute 将会从渲染的元素上移除。

```html
<!-- 插值语法`{{}}` -->
<div id="app">{{message}}</div>

<!-- 属性绑定 `v-bind` -->
<!-- 使用v-bind指令来绑定"data-message"属性到"message"变量。
这将使得"data-message"属性的值与"message"变量的值保持同步 -->
<div id="app" v-bind:data-message="message">{{message}}</div>

<script>
    var app = new Vue({
        el:"#app",
        data: {
                message:"Hello vue!"
            }
    })
</script>

每个Vue实例只能绑定到一个唯一的元素上。在这段代码中Vue只会作用于第一个div元素，而不会作用于第二个div元素。 
如果您想让Vue作用于多个元素，您可以考虑将它们包装在一个父元素内，并将Vue实例绑定到该父元素上。如下所示：

<div id="app">
    <div v-bind:data-message="message">{{message}}</div>
    <div>{{message}}</div>
</div>
```

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231109142211276.png" alt="image-20231109142211276" style="zoom:80%;" />

### 简写

因为 `v-bind` 非常常用，我们提供了特定的简写语法：

```
<div :id="dynamicId"></div>
```

开头为 `:` 的 attribute 可能和一般的 HTML attribute 看起来不太一样，但它的确是合法的 attribute 名称字符，并且所有支持 Vue 的浏览器都能正确解析它。此外，他们不会出现在最终渲染的 DOM 中。简写语法是可选的，但相信在你了解了它更多的用处后，你应该会更喜欢它。

> 接下来的指引中，我们都将在示例中使用简写语法，因为这是在实际开发中更常见的用法。

#### 将字符串里面字母顺序倒序：

a.split(""),将字符串按照指定符号分割，即将一个字符串分割为多个字符串，

b.reverse(),方法用于颠倒数组中元素的顺序。该方法会改变原来的数组，而不会创建新的数组。

c.join(""),join() 方法用于把数组中的所有元素放入一个字符串，元素通过指定的分隔符进行分隔。

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231109162025091.png" alt="image-20231109162025091" style="zoom:80%;" />

### 布尔型 Attribute

[布尔型 attribute](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes#布尔值属性) 依据 true / false 值来决定 attribute 是否应该存在于该元素上。[`disabled`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled) 就是最常见例子之一。

`v-bind` 在这种场景下的行为略有不同：

template

```
<button :disabled="isButtonDisabled">Button</button>
```

当 `isButtonDisabled` 为[真值](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)或一个空字符串 (即 `<button disabled="">`) 时，元素会包含这个 `disabled` attribute。而当其为其他[假值](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)时 attribute 将被忽略。

### 动态绑定多个值

如果你有像这样的一个包含多个 attribute 的 JavaScript 对象：

js

```
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper'
}
```

通过不带参数的 `v-bind`，你可以将它们绑定到单个元素上：

template

```
<div v-bind="objectOfAttrs"></div>
```

## 使用 JavaScript 表达式

至此，我们仅在模板中绑定了一些简单的属性名。但是 Vue 实际上在所有的数据绑定中都支持完整的 JavaScript 表达式：

template

```
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div :id="`list-${id}`"></div>
```

这些表达式都会被作为 JavaScript ，以当前组件实例为作用域解析执行。

在 Vue 模板内，JavaScript 表达式可以被使用在如下场景上：

- 在文本插值中 (双大括号)
- 在任何 Vue 指令 (以 `v-` 开头的特殊 attribute) attribute 的值中

### 仅支持表达式

每个绑定仅支持**单一表达式**，也就是一段能够被求值的 JavaScript 代码。一个简单的判断方法是是否可以合法地写在 `return` 后面。

因此，下面的例子都是**无效**的：

template

```
<!-- 这是一个语句，而非表达式 -->
{{ var a = 1 }}

<!-- 条件控制也不支持，请使用三元表达式 -->
{{ if (ok) { return message } }}
```

### 调用函数

可以在绑定的表达式中使用一个组件暴露的方法：

```
<time :title="toTitleDate(date)" :datetime="date">
  {{ formatDate(date) }}
</time>
```

> TIP
>
> 绑定在表达式中的方法在组件每次更新时都会被重新调用，因此**不**应该产生任何副作用，比如改变数据或触发异步操作。

### 受限的全局访问

模板中的表达式将被沙盒化，仅能够访问到[有限的全局对象列表](https://github.com/vuejs/core/blob/main/packages/shared/src/globalsAllowList.ts#L3)。该列表中会暴露常用的内置全局对象，比如 `Math` 和 `Date`。

没有显式包含在列表中的全局对象将不能在模板内表达式中访问，例如用户附加在 `window` 上的属性。然而，你也可以自行在 [`app.config.globalProperties`](https://cn.vuejs.org/api/application.html#app-config-globalproperties) 上显式地添加它们，供所有的 Vue 表达式使用。

## 指令 Directives

指令是带有 `v-` 前缀的特殊 attribute。Vue 提供了许多[内置指令](https://cn.vuejs.org/api/built-in-directives.html)，包括上面我们所介绍的 `v-bind` 和 `v-html`。

指令 attribute 的期望值为一个 JavaScript 表达式 (除了少数几个例外，即之后要讨论到的 `v-for`、`v-on` 和 `v-slot`)。一个指令的任务是在其表达式的值变化时响应式地更新 DOM。以 [`v-if`](https://cn.vuejs.org/api/built-in-directives.html#v-if) 为例：

```
<p v-if="seen">Now you see me</p>
```

这里，`v-if` 指令会基于表达式 `seen` 的值的真假来移除/插入该 `<p>` 元素。

### 参数 Arguments

某些指令会需要一个“参数”，在指令名后通过一个冒号隔开做标识。例如用 `v-bind` 指令来响应式地更新一个 HTML attribute：

```
<a v-bind:href="url"> ... </a>

<!-- 简写 -->
<a :href="url"> ... </a>
```

这里 `href` 就是一个参数，它告诉 `v-bind` 指令将表达式 `url` 的值绑定到元素的 `href` attribute 上。在简写中，参数前的一切 (例如 `v-bind:`) 都会被缩略为一个 `:` 字符。

另一个例子是 `v-on` 指令，它将监听 DOM 事件：

```
<a v-on:click="doSomething"> ... </a>

<!-- 简写 -->
<a @click="doSomething"> ... </a>
```

这里的参数是要监听的事件名称：`click`。`v-on` 有一个相应的缩写，即 `@` 字符。我们之后也会讨论关于事件处理的更多细节。

### 动态参数

同样在指令参数上也可以使用一个 JavaScript 表达式，需要包含在一对方括号内：

```
<!--
注意，参数表达式有一些约束，
参见下面“动态参数值的限制”与“动态参数语法的限制”章节的解释
-->
<a v-bind:[attributeName]="url"> ... </a>

<!-- 简写 -->
<a :[attributeName]="url"> ... </a>
```

这里的 `attributeName` 会作为一个 JavaScript 表达式被动态执行，计算得到的值会被用作最终的参数。举例来说，如果你的组件实例有一个数据属性 `attributeName`，其值为 `"href"`，那么这个绑定就等价于 `v-bind:href`。

相似地，你还可以将一个函数绑定到动态的事件名称上：

```
<a v-on:[eventName]="doSomething"> ... </a>

<!-- 简写 -->
<a @[eventName]="doSomething">
```

在此示例中，当 `eventName` 的值是 `"focus"` 时，`v-on:[eventName]` 就等价于 `v-on:focus`。

#### 动态参数值的限制

动态参数中表达式的值应当是一个字符串，或者是 `null`。特殊值 `null` 意为显式移除该绑定。其他非字符串的值会触发警告。

#### 动态参数语法的限制

动态参数表达式因为某些字符的缘故有一些语法限制，比如空格和引号，在 HTML attribute 名称中都是不合法的。例如下面的示例：

```
<!-- 这会触发一个编译器警告 -->
<a :['foo' + bar]="value"> ... </a>
```

如果你需要传入一个复杂的动态参数，我们推荐使用[计算属性](https://cn.vuejs.org/guide/essentials/computed.html)替换复杂的表达式，也是 Vue 最基础的概念之一，我们很快就会讲到。

当使用 DOM 内嵌模板 (直接写在 HTML 文件里的模板) 时，我们需要避免在名称中使用大写字母，因为浏览器会强制将其转换为小写：

```
<a :[someAttr]="value"> ... </a>
```

上面的例子将会在 DOM 内嵌模板中被转换为 `:[someattr]`。如果你的组件拥有 “someAttr” 属性而非 “someattr”，这段代码将不会工作。单文件组件内的模板**不**受此限制。

### 修饰符 Modifiers

修饰符是以点开头的特殊后缀，表明指令需要以一些特殊的方式被绑定。例如 `.prevent` 修饰符会告知 `v-on` 指令对触发的事件调用 `event.preventDefault()`：

```
<form @submit.prevent="onSubmit">...</form>
```

之后在讲到 [`v-on`](https://cn.vuejs.org/guide/essentials/event-handling.html#event-modifiers) 和 [`v-model`](https://cn.vuejs.org/guide/essentials/forms.html#modifiers) 的功能时，你将会看到其他修饰符的例子。

最后，在这里你可以直观地看到完整的指令语法：

<img src="https://cn.vuejs.org/assets/directive.69c37117.png" alt="指令语法图" style="zoom:80%;" />



## 问答题

1. 什么是模板？它和真实的DOM有什么关系？

   > 在Vue中，模板是一种基于HTML语法的字符串，用于描述Vue实例的视图结构。模板中可以包含Vue的特殊语法和指令，用于绑定数据和控制视图的渲染。
   >
   > Vue 使用一种基于 HTML 的模板语法，使我们能够声明式地将其组件实例的数据绑定到呈现的 DOM 上。所有的 Vue 模板都是语法层面合法的 HTML，可以被符合规范的浏览器和 HTML 解析器解析。
   >
   > dom模板就是原先就写在页面上的，能被浏览器识别的HTML结构，会在一加载就被浏览器渲染。
   > vue.js使用了基于HTML的模板语法，允许开发者 声明式的将dom绑定至底层vue实例的数据。在底层的实现上，vue将模板编译成虚拟dom渲染函数。
   > 结合响应系统，vue能够智能地计算出最少需要重新渲染多少组件，并把dom操作次数减到最少。
   >
   > 模板和真实的DOM之间有关系，因为Vue会根据模板的描述来生成真实的DOM元素，并将其插入到页面中。当Vue实例的数据发生变化时，Vue会根据模板中的指令和绑定，自动更新对应的DOM元素，以反映数据的变化。
   >
   > Vue使用虚拟DOM（Virtual DOM）来优化性能。虚拟DOM是一种轻量级的JavaScript对象，它与真实的DOM具有相似的结构。当数据发生变化时，Vue会先更新虚拟DOM，然后通过比较虚拟DOM和真实DOM的差异，最小化对真实DOM的操作，从而提高性能和效率。
   >
   > 总结起来，模板是描述Vue实例视图结构的字符串，它与真实的DOM相关联，并通过Vue的响应式系统实现数据和视图的自动更新。
   >

2. 如何使用**插值**语法绑定变量到文本？

   > ```html
   > <p>{{message}}</p>
   > ```
   >
   > 可以在Vue模板中使用双大括号{{}}将变量包裹起来。
   >
   > 1. 在Vue实例的data属性中定义一个变量，例如：message: "Hello Vue!"。
   >
   > 2. 在模板中的文本内容中使用插值语法，将变量绑定到文本中。例如，可以将{{message}}放置在需要显示变量值的位置。
   >

3. 如何绑定属性？（请写出缩写和非缩写形式）

   > 在Vue中，可以使用v-bind指令来绑定属性。v-bind有两种形式，分别是缩写形式和非缩写形式。   非缩写形式：
   >
   > ```html
   > <div v-bind:属性名="变量名"></div>
   > ```
   >
   > 缩写形式：
   >
   > ```html
   > <div :属性名="变量名"></div>
   > ```
   >
   > 其中， `:属性名` 是缩写形式， v-bind:属性名 是非缩写形式。您可以将需要绑定的属性名替换为实际的属性名，将变量名替换为要绑定的数据。   例如，如果要绑定一个src属性，可以使用以下方式：
   >
   > ```html
   > <img v-bind:src="imageUrl">
   > ```
   >
   > 或者缩写形式：
   >
   > ```html
   > <img :src="imageUrl">
   > ```
   >
   > 在上述示例中， `imageUrl` 是要绑定的数据变量，Vue会将该变量的值动态地绑定到src属性上。 

4. 如何绑定事件？（请写出缩写和非缩写形式）

   > ```html
   > <button v-on:事件名="方法名"></button>
   > <button @事件名="方法名"></button>
   > ```

5. `v-if` `v-for` 各有什么用？

   > `v-if` 和 `v-for` 是Vue.js中的两个常用指令，用于在模板中进行条件渲染和列表渲染。   
   >
   > `v-if` 指令用于根据表达式的值来条件性地渲染元素。如果表达式的值为真（truthy），则元素会被渲染，否则将被移除。例如，可以根据某个条件来决定是否显示一个元素：
   >
   > ```html
   > <P v-if="login==true">欢迎</P>
   > ```
   >
   >  `v-for` 指令用于根据数据源循环渲染元素列表。它可以遍历数组或对象，并为每个项生成对应的元素。例如，可以使用 `v-for` 指令来循环渲染一个数组中的项：
   >
   > ```html
   > <ul>
   >   <li v-for="item in list">{{ item }}</li>
   > </ul>
   > ```
   >
   > 在上面的示例中， `list` 是一个数组， `v-for` 指令会为数组中的每个项生成一个 `<li>` 元素，并将项的值显示在列表中。   
   >
   > 总结一下： 
   >
   > `v-if` 用于条件性地渲染元素，根据表达式的值来决定元素是否显示。
   >
   > `v-for` 用于循环渲染元素列表，根据数据源的项生成对应的元素。 

6. 什么是过滤器（filter），如何声明？如何使用？

   > 过滤器（filter）是Vue.js中用于对文本进行格式化和处理的功能。可以用于在模板中对数据进行简单的转换和操作，例如格式化日期、转换文本大小写等。   
   >
   > 声明一个过滤器，可以使用Vue实例的 `filter` 选项或全局过滤器。下面是两种声明过滤器的方式：   1. 在Vue实例中声明过滤器：
   >
   > ```js
   > var app = new Vue({
   >      el: '#app',
   >      data: {
   >        message: 'Hello Vue!'
   >      },
   >      filters: {
   >        uppercase: function(value) {
   >          return value.toUpperCase();
   >        },
   >        reverseStr(str){
   >          return str.split("").reverse().join("")
   >        },
   >      }
   >    });
   > ```
   >
   > 在上述示例中，我们在Vue实例的 `filters` 选项中声明了一个名为 `uppercase` 的过滤器。该过滤器接收一个值作为参数，并将其转换为大写形式。   
   >
   > 2. 全局过滤器：
   >
   > ```js
   > Vue.filter('uppercase', function(value) {
   >      return value.toUpperCase();
   >    });
   > ```
   >
   > 在上述示例中，我们使用 `Vue.filter` 方法声明了一个名为 `uppercase` 的全局过滤器。   
   >
   > 要在模板中使用过滤器，可以使用管道符 `|` 将过滤器应用到表达式上。例如：
   >
   > ```html
   > <div id="app">
   >   <p>{{ message | uppercase }}</p>
   > </div>
   > ```
   >
   > 在上述示例中，我们将 `uppercase` 过滤器应用到 `message` 变量上，以将其转换为大写形式。   您还可以链式使用多个过滤器，例如：
   >
   > ```html
   > <p>{{ message | uppercase | reverse }}</p> 
   > ```

7. 什么是计算属性？如何声明？如何使用？

   > 计算属性（computed ）是Vue.js中一种方便的属性计算方式。它们是基于依赖的缓存属性，计算属性里面都是函数，可以根据其他数据的变化自动更新,只在其依赖项发生变化时才会重新计算。   
   >
   > 声明一个计算属性，可以在Vue实例的 `computed` 选项中定义一个函数。该函数会被作为计算属性的getter函数，用于计算和返回属性的值。   
   >
   > ```js
   > var app = new Vue({
   >   el: '#app',
   >   data: {
   >     message:"Hello world!",
   >   },
   >   computed: {
   >     reverseMessage: function(){
   >         return this.message.split("").reverse().join("")
   >     },
   >   }
   > });
   > ```
   >
   > 使用方法：
   >
   > ```html
   > <P>{{message}} reverse to {{reverseMessage}}</P>
   > ```
   >
   > 
   >
   > 
   >
   > 以下是一个示例：
   >
   > ```js
   > var app = new Vue({
   >   el: '#app',
   >   data: {
   >     firstName: 'John',
   >     lastName: 'Doe'
   >   },
   >   computed: {
   >     fullName: function() {
   >       return this.firstName + ' ' + this.lastName;
   >     }
   >   }
   > });
   > ```
   >
   > 在上述示例中，我们声明了一个计算属性 `fullName` ，它根据 `firstName` 和 `lastName` 的值计算并返回完整的姓名。   
   >
   > 在模板中使用计算属性时，可以像使用普通属性一样引用它。例如：
   >
   > ```html  
   > <div id="app">
   >   <p>Full Name: {{ fullName }}</p>
   > </div>
   > ```
   >
   > 在上述示例中，我们将 `fullName` 计算属性引用到模板中，以显示完整的姓名。   计算属性具有缓存机制，只有在依赖的数据发生变化时才会重新计算。这意味着多次访问计算属性时，只有在相关数据变化时才会执行计算，提高了性能和效率。 

8. 如何绑定 class和style 属性？绑定的对象为`Array`时如何解析？绑定对象为`object`时如何解析？

   > 可以使用 `v-bind` 指令来绑定class和style属性。
   >
   > 当绑定的对象是数组时，Vue会将数组中的每个元素解析为一个class或style。   
   >
   > 当绑定的对象是一个对象时，Vue会将对象的键解析为class，键值为真对应的class会被添加到元素上。
   >
   > ```html
   > <style>
   >     .red{
   >         color:red;
   >     }
   >     .blue{
   >         color:blue;
   >     }
   > </style>
   > <div v-bind:class="clazz" :style="style">蓝色字体{{message}}</div>
   > ```
   >
   > ```js
   > var app = new Vue({
   >   el: '#app',
   >   data: {
   >     message:"Hello world!",
   >     clazz:["red","blue"],
   >     clazz:{
   >         red:false,
   >         blue:true,
   >      },
   >     style:{
   >         color:"green",
   >         fontSize:"20px"
   >     }
   >   }
   > });
   > ```
   >
   > 
   >
   > 当绑定的对象是一个对象时，Vue会将对象的键解析为class或style的名称，值为布尔值或字符串。   绑定class属性的示例：
   >
   > ```html
   > <div v-bind:class="classObject">...</div>
   > ```
   >
   > 在Vue实例中定义一个 `classObject` 对象，例如：
   >
   > ```js
   > data: {
   >   classObject: {
   >     active: true,
   >     'text-danger': false
   >   }
   > }
   > ```
   >
   > 在上述示例中， `active` 和 `text-danger` 是class的名称，对应的值为布尔值。如果值为 `true` ，对应的class会被添加到元素上。   
   >
   > 绑定style属性的示例：
   >
   > ```html
   > <div v-bind:style="styleObject">...</div>
   > ```
   >
   > 在Vue实例中定义一个 `styleObject` 对象，例如：
   >
   > ```js
   > data: {
   >   styleObject: {
   >     color: 'red',
   >     fontSize: '14px'
   >   }
   > }
   > ```
   >
   > 在上述示例中， `color` 和 `fontSize` 是style的名称，对应的值为字符串。这些样式会被应用到元素上。 

## 代码题

1. 请使用属性绑定实现一个 `<img>`的`src`属性每隔1s自动变换，以实现图片自动切换。

   ```html
   <div id="app">
     <img :src="changeImage">
   </div>
   
   <script>
       var app = new Vue({
         el: "#app",
         data: {
           images: [
             "image1.url",
             "image2.url",
             "image3.url"
           ],
           Index: 0
         },
         created() {
             this.timer = setInterval(()=>{
                   this.Index = (this.Index + 1) % this.images.length;
               }, 1000);
         }//生命周期函数
         computed: {
           changeImage: function() {
               return this.images[this.Index];
           },
         },
         beforeDestroy() {
               clearInterval(this.timer);
               this.timer=null;
         }//生命周期函数,回收内存
       });
   </script>
   ```

   computed 属性只在其依赖项发生变化时才会重新计算，setInterval 函数不能放置在computed 属性中。我们可以将 `setInterval` 函数移到Vue实例的 `created` 或 `mounted` 生命周期钩子函数中。这样，当Vue实例被创建或挂载到DOM上时， `setInterval` 函数会开始执行。 

   如果  `(this.Index + 1)`  的结果小于  `this.images.length` ，则取模运算(求余数)的结果就是  `(this.Index + 1)` 。        

   如果  `(this.Index + 1)`  的结果大于等于  `this.images.length` ，则取模运算的结果就是  `(this.Index + 1)`  减去  `this.images.length`  后的余数。   

   这样，通过  `(this.Index + 1) % this.images.length`  的计算，可以确保索引始终在  `this.images`  数组的有效范围内循环，实现了图片的自动切换效果。 

   ```html
   <div id="app">
           <img :src="changeSrc" alt="" class="img1" @load="imgLoad()">
       </div>
       <script>
           var img1 = document.getElementsByClassName("img1")[0]
           const app = new Vue({
               el: "#app",
               data: {
                   imgSrc: [
                       "https://www.yulumi.cn/gl/uploads/allimg/201121/11200I923-1.jpg",
                       "https://pic.3gbizhi.com/2019/1112/20191112013312648.jpg",
                       "https://desk-fd.zol-img.com.cn/t_s960x600c5/g1/M0B/03/06/ChMljl402K6IOTZbAARWayFg6S4AAQJPwFhuRIABFaD752.jpg"
                   ],
                   imgIndex: 0
               },
               computed: {
                   changeSrc: function () {
                       return this.imgSrc[this.imgIndex]
                   }
               },
               methods: {
                   imgLoad() {
                       setTimeout(() => {
                           if (this.imgIndex < 2) {
                               this.imgIndex++
                           } else {
                               this.imgIndex = 0;
                           }
                       }, 1000);
                   }
               }
   
           })
       </script>
   ```

   

2. 请自行查阅文档实现：当用户提交表单时，防止页面刷新，并在组件内部使用`ajax`方式提交表单。

   > **click.prevent作用**
   >
   > 在介绍click.prevent的作用之前，我们先来了解一下click事件在前端开发中的常见应用。click事件是鼠标在某一元素上单击时触发的事件，通常用于实现点击某个按钮或链接后进行后续操作（如提交表单、跳转页面等）。但有些情况下，我们不希望某个链接或按钮的默认行为被触发，例如点击一个分享按钮时，我们不想跳转到分享链接，而是希望弹出一个分享窗口。这时候就可以使用click.prevent阻止默认的点击事件，实现自定义操作。
   >
   > click.prevent是Vue.js中常用的一个修饰符，它的含义是阻止默认的点击事件，同时防止事件冒泡。比如下面例子当用户点击button元素时，会优先触发submitform方法，而不会触发默认的点击事件提交表单。这样就可以实现自定义的点击操作，同时避免了不必要的页面跳转或表单提交。

   1. 在Vue组件的模板中，使用 `@click.prevent` 事件修饰符来阻止表单默认的提交行为，并绑定一个自定义的方法来处理表单的提交：

   ```html
   <form id="app">
       <!-- 表单内容 -->
       <button type="submit"  @click.prevent="submitForm">提交</button>
   </form>
   ```

   2. 在Vue组件的 `methods` 中定义 `submitForm` 方法，使用ajax发送异步请求来提交表单数据：

   ```vue
   <script>
   var app = new Vue({
     methods: {
       submitForm() {
         // 获取表单数据
         let formData = new FormData(/*表单元素*/);//创建一个FormData对象，将表单数据传递给它
         // 使用ajax发送异步请求
           $.ajax({ 
                method:'post',  
                url:url, 
                data:formData,  
                dataType:'json', 
                success:function(data){      
                  	// 处理服务器返回的数据
       			console.log(data);
                },
                error:function(err){ 
                 	// 处理请求失败的情况
       			console.error(err);
                }
           })
       }
     }
   })
   </script>
   ```

   > 要获取表单数据，您可以使用JavaScript或jQuery来获取。下面是两种方法的示例：   使用JavaScript：
   >
   > ```js
   > var form = document.getElementById("myForm"); // 获取表单元素
   > var formData = new FormData(form); // 创建一个FormData对象，将表单数据传递给它
   > 
   > // 获取表单数据中的特定字段值
   > var fieldValue = formData.get("fieldName");
   > ```
   >
   > 使用jQuery：
   >
   > ```js
   > var formData = $("#myForm").serialize(); // 使用serialize()方法获取表单数据
   > 
   > // 获取表单数据中的特定字段值
   > var fieldValue = $("#myForm input[name='fieldName']").val();
   > ```
   >
   > 在上述示例中，假设表单的id为"myForm"，要获取整个表单数据，可以使用 `FormData` 对象（JavaScript）或 `serialize()` 方法（jQuery）。要获取特定字段的值，可以使用 `get()` 方法（JavaScript）或选择器和 `val()` 方法（jQuery）。请确保将"myForm"替换为您实际表单的id，并将"fieldName"替换为您要获取其值的特定字段的名称。 

   ```html
   <div id="test">
   <form action="" onsubmit="return false">
       姓名：<input type="text" v-model="username">
       密码：<input type="password" v-model="password">
       <button type="button" @click="submit">提交</button>
   </form>
   </div>
   <script >
   var test=new Vue({
       el:"#test",
       data:{
           username:"Mary",
           password:"123"
       },
       methods:{
           submit: function () {
               $.ajax({
                   method: 'post',
                   url: 'http:a.test.com:8000/regist',
                   data: { username: this.username, password: this.password },
                   success: function (res) {
                       console.log(res);
                   }
               })
           }
       }
   })
   ```

   

3. 请实现 filter `uppercase` 实现将输入字符串转化为大写形式,并在模板中使用这个 filter

   ```js
   var app = new Vue({
        el: '#app',
        data: {
          message: 'Hello Vue!'
        },
        filters: {
          uppercase: function(str) {
            return str.toUpperCase();
          }
        }
      });
   ```

   ```html
   <div id="app">
     <p>{{ message | uppercase }}</p>
   </div>
   ```

   

4. 假设 Component 中有 `data:{firstName: 'Foo', lastName: 'Bar'}`，请实现模板中 `<div>{{fullname}}</div>` 的 `fullname` 会当 `firstName`，`lastName` 任意一个改变时而改变

   ```js
   var app = new Vue({
        el: '#app',
        data: {
          firstName: 'Foo', 
          lastName: 'Bar'
        },
        computed: {
            fullname(){
                return this.firstName+' '+this.lastName
            }
        }
      });
   ```

   ```html
   <div id="app">
     <p>{{ fullname }}</p>
   </div>
   ```

   

5. 假设 Component 中有 `data:{isActive: true}`，请实现模板中某个 `div` class `active`根据 `isActive` 变化而变化。

   ```html
   <div id="app" v-bind:class="isActive"></div>
   <script>
      	var app = new Vue({
           el:"#app",
           data:{
               isActive: {
               	isActive: true,
           	}
           }
       })
   </script>
   ```

   ```vue
   <style>
       .active {
           color: blue;
       }
   </style>
   <div id="test">
       <div :class ="{active:isActive}">text</div>
   </div>
   <script >
       var test=new Vue({
           el:"#test",
           data:{
               isActive:true
           }
       })
   </script>
   ```
   
   ```html
   <style>
           .Active {
               /* display: block; */
               background-color: green;
               height: 50px;
           }
           .Active:after {
               content: 'active';
           }
           .noActive {
               /* display: none; */
               background-color: red;
               height: 50px;
   
           }
           .noActive:after {
               content: 'noactive';
           }
       </style>
   </head>
   
   <body>
       <div id="app">
           <mycomponent :isactive="active" ></mycomponent>
       </div>
       <script>
           Vue.component('mycomponent', {
               props: ["isactive"],
               template: "<div :class='isactive'></div>",
           })
           let app = new Vue({
               el: "#app",
               data: {
                   isActive: true,
               },
               computed: {
                   active() {
                       return this.isActive ? "Active" : "noActive";
                   }
               }
           })
   
       </script>
   </body>
   ```
   
   