### [vue][https://cn.vuejs.org/]

[vue互动教程][https://cn.vuejs.org/tutorial/#step-1]

[菜鸟vue教程C:\Users\86153\Desktop\mfs-homework\突破\ecma2016\clazz.js][https://www.runoob.com/vue3/vue3-create-project.html]

[深度指南，文档][https://cn.vuejs.org/guide/introduction.html]

[示例，基础与实战][https://cn.vuejs.org/examples/#hello-world]

[术语表][https://cn.vuejs.org/glossary/]

## [什么是 Vue？](https://cn.vuejs.org/guide/introduction.html#what-is-vue)

Vue (发音为 /vjuː/，类似 **view**) 是一款用于构建用户界面的 JavaScript 框架。它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型，帮助你高效地开发用户界面。无论是简单还是复杂的界面，Vue 都可以胜任。

下面是一个最基本的示例：

```js
import { createApp, ref } from 'vue'

createApp({
  setup() {
    return {
      count: ref(0)
    }
  }
}).mount('#app')
```

```template
<div id="app">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>
```

![image-20231108145639034](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231108145639034.png)

上面的示例展示了 Vue 的两个核心功能：

- **声明式渲染**：Vue 基于标准 HTML 拓展了一套模板语法，使得我们可以声明式地描述最终输出的 HTML 和 JavaScript 状态之间的关系。
- **响应性**：Vue 会自动跟踪 JavaScript 状态并在其发生变化时响应式地更新 DOM。

你可能已经有了些疑问——先别急，在后续的文档中我们会详细介绍每一个细节。现在，请继续看下去，以确保你对 Vue 作为一个框架到底提供了什么有一个宏观的了解。

## [渐进式框架](https://cn.vuejs.org/guide/introduction.html#the-progressive-framework)

Vue 是一个框架，也是一个生态。其功能覆盖了大部分前端开发常见的需求。但 Web 世界是十分多样化的，不同的开发者在 Web 上构建的东西可能在形式和规模上会有很大的不同。考虑到这一点，Vue 的设计非常注重灵活性和“可以被逐步集成”这个特点。根据你的需求场景，你可以用不同的方式使用 Vue：

- 无需构建步骤，渐进式增强静态的 HTML
- 在任何页面中作为 Web Components 嵌入
- 单页应用 (SPA)
- 全栈 / 服务端渲染 (SSR)
- Jamstack / 静态站点生成 (SSG)
- 开发桌面端、移动端、WebGL，甚至是命令行终端中的界面

如果你是有经验的开发者，希望了解如何以最合适的方式在项目中引入 Vue，或者是对上述的这些概念感到好奇，我们在[使用 Vue 的多种方式](https://cn.vuejs.org/guide/extras/ways-of-using-vue.html)中讨论了有关它们的更多细节。

## [单文件组件](https://cn.vuejs.org/guide/introduction.html#single-file-components)

在大多数启用了构建工具的 Vue 项目中，我们可以使用一种类似 HTML 格式的文件来书写 Vue 组件，它被称为**单文件组件** (也被称为 `*.vue` 文件，英文 Single-File Components，缩写为 **SFC**)。顾名思义，Vue 的单文件组件会将一个组件的逻辑 (JavaScript)，模板 (HTML) 和样式 (CSS) 封装在同一个文件里。下面我们将用单文件组件的格式重写上面的计数器示例：

```vue
<script setup>
    import { ref } from 'vue'
    const count = ref(0)
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

单文件组件是 Vue 的标志性功能。如果你的用例需要进行构建，我们推荐用它来编写 Vue 组件。你可以在后续相关章节里了解更多关于[单文件组件的用法及用途](https://cn.vuejs.org/guide/scaling-up/sfc.html)。但你暂时只需要知道 Vue 会帮忙处理所有这些构建工具的配置就好。

## [API 风格](https://cn.vuejs.org/guide/introduction.html#api-styles)

Vue 的组件可以按两种不同的风格书写：**选项式 API** 和**组合式 API**。

### [选项式 API (Options API)](https://cn.vuejs.org/guide/introduction.html#options-api)

使用选项式 API，我们可以用包含多个选项的对象来描述组件的逻辑，例如 `data`、`methods` 和 `mounted`。选项所定义的属性都会暴露在函数内部的 `this` 上，它会指向当前的组件实例。

```vue
<script>
export default {
  // data() 返回的属性将会成为响应式的状态
  // 并且暴露在 `this` 上
  data() {
    return {
      count: 0
    }
  },
  // methods 是一些用来更改状态与触发更新的函数
  // 它们可以在模板中作为事件处理器绑定
  methods: {
    increment() {
      this.count++
    }
  },
  // 生命周期钩子会在组件生命周期的各个不同阶段被调用
  // 例如这个函数就会在组件挂载完成后被调用mounted():安装在…上的
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

### [组合式 API (Composition API)](https://cn.vuejs.org/guide/introduction.html#composition-api)

通过组合式 API，我们可以使用导入的 API 函数来描述组件逻辑。在单文件组件中，组合式 API 通常会与 [`script setup`](https://cn.vuejs.org/api/sfc-script-setup.html) 搭配使用。这个 `setup` attribute 是一个标识，告诉 Vue 需要在编译时进行一些处理，让我们可以更简洁地使用组合式 API。比如，`<script setup>` 中的导入和顶层变量/函数都能够在模板中直接使用。

下面是使用了组合式 API 与 `<script setup>` 改造后和上面的模板完全一样的组件：

```vue
<script setup>
import { ref, onMounted } from 'vue'
// 响应式状态
const count = ref(0)
// 用来修改状态、触发更新的函数
function increment() {
  count.value++
}
// 生命周期钩子
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

### [该选哪一个？](https://cn.vuejs.org/guide/introduction.html#which-to-choose)

两种 API 风格都能够覆盖大部分的应用场景。它们只是同一个底层系统所提供的两套不同的接口。实际上，选项式 API 是在组合式 API 的基础上实现的！关于 Vue 的基础概念和知识在它们之间都是通用的。

选项式 API 以“组件实例”的概念为中心 (即上述例子中的 `this`)，对于有面向对象语言背景的用户来说，这通常与基于类的心智模型更为一致。同时，它将响应性相关的细节抽象出来，并强制按照选项来组织代码，从而对初学者而言更为友好。

组合式 API 的核心思想是直接在函数作用域内定义响应式状态变量，并将从多个函数中得到的状态组合起来处理复杂问题。这种形式更加自由，也需要你对 Vue 的响应式系统有更深的理解才能高效使用。相应的，它的灵活性也使得组织和重用逻辑的模式变得更加强大。

在[组合式 API FAQ](https://cn.vuejs.org/guide/extras/composition-api-faq.html) 章节中，你可以了解更多关于这两种 API 风格的对比以及组合式 API 所带来的潜在收益。

如果你是使用 Vue 的新手，这里是我们的大致建议：

- 在学习的过程中，推荐采用更易于自己理解的风格。再强调一下，大部分的核心概念在这两种风格之间都是通用的。熟悉了一种风格以后，你也能够很快地理解另一种风格。
- 在生产项目中：
  - 当你不需要使用构建工具，或者打算主要在低复杂度的场景中使用 Vue，例如渐进增强的应用场景，推荐采用选项式 API。
  - 当你打算用 Vue 构建完整的单页应用，推荐采用组合式 API + 单文件组件。

在学习阶段，你不必只固守一种风格。在接下来的文档中我们会为你提供一系列两种风格的代码供你参考，你可以随时通过左上角的 **API 风格偏好**来做切换。

## [通过 CDN 使用 Vue](https://cn.vuejs.org/guide/quick-start.html#using-vue-from-cdn)

你可以借助 script 标签直接通过 CDN 来使用 Vue：

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

这里我们使用了 [unpkg](https://unpkg.com/)，但你也可以使用任何提供 npm 包服务的 CDN，例如 [jsdelivr](https://www.jsdelivr.com/package/npm/vue) 或 [cdnjs](https://cdnjs.com/libraries/vue)。当然，你也可以下载此文件并自行提供服务。

通过 CDN 使用 Vue 时，不涉及“构建步骤”。这使得设置更加简单，并且可以用于增强静态的 HTML 或与后端框架集成。但是，你将无法使用单文件组件 (SFC) 语法。



component树状结构：

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231108154551013.png" alt="image-20231108154551013" style="zoom:80%;" />

#### 在Vue3中，构造函数已被替换为 `createApp` ，而不是 `new Vue` 。

以前版本：

```vue
<body>
    <div id="app">{{message}}</div>
    <script>
        var app = new Vue({
            el:"#app",//V
            data: {
                message:"hello vue!"
            }//M
        })//VM
    </script>
</body>
```

Vue3:

```vue
<html>
    <head>
        <title>vue start</title>
        <!-- 通过CDN使用vue -->
        <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    </head>
    <body>
        <!-- view插入值 -->
        <div id="app">{{message}}</div>
        <script>
            //根组件
            var app = Vue.createApp({
                data(){
                    return{
                        message:"hello vue!"
                    };
                }
            }).mount("#app")//挂载点mount()，该方法接收“容器”参数，只接受一个参数,可以是一个实际的 DOM 元素或是一个 CSS 选择器字符串
        </script>
    </body>
</html>
```

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231108162531755.png" alt="image-20231108162531755" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231108162453231.png" alt="image-20231108162453231" style="zoom:80%;" />

```vue
<!-- v-for="item in list" ：使用Vue的循环指令 v-for 来遍历一个名为 list 的数组，将数组中的每个元素赋值给变量 item 。-->
<!-- {{item}} ：使用双括号语法 {{}} 将变量 item 的值插入到列表项中，实现动态渲染。 -->
<div id="app">
    <ul>
        <li v-for="item in list">{{item}}</li>
    </ul>
</div>
<script>
    var app = Vue.createApp({
        data(){
            return{
                list:[
                    "web component",
                    "组件生命周期",
                    "模板语法",
                    "计算属性"
                ]
            };
        }
    }).mount("#app")
</script>
```

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231108164849057.png" alt="image-20231108164849057" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231108165120110.png" alt="image-20231108165120110" style="zoom:80%;" />

>  `var app = Vue.createApp()`  和  `var app = new Vue()`  都是用于创建 Vue 实例的方式，它们之间的区别在于使用的 Vue 版本。
>
>  `var app = Vue.createApp()`  是 Vue 3 的创建实例方式。在 Vue 3 中，Vue 的核心库已经进行了重写，采用了更加模块化的架构。 `Vue.createApp()`  返回一个应用实例，你可以在其上注册组件、指令、插件等，并使用新的 Composition API 来编写逻辑。这种方式更加灵活和现代化，提供了更多的功能和扩展性。
>
> 而  `var app = new Vue()`  是 Vue 2 的创建实例方式。在 Vue 2 中，Vue 的核心库采用了不同的架构和 API 设计

#### 在Vue3中，组件的声明方式。

Vue.component方法全局组件。 

```vue
//全局组件：
<div id="app"> 
    <ul> 
        <item v-for="i in list" :data="i"></item> 
    </ul> 
</div>
<script>
    Vue.component("item",{ 
        props:["data"], 
        template:"<li>{{data}}</li>" 
    })                                                                                                          
    var app = Vue.createApp({ 
        data(){ 
            return{ 
                list:[ 
                    "web component", 
                    "组件生命周期", 
                    "模板语法", 
                    "计算属性" 
                ] 
            }; 
        } 
    }).mount("#app")
</script>
```

```vue
//局部组件
<head>
    <title>vue start</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
    <div id="app"> 
        <ul> 
            <!-- 创建组件实例 -->
            <custom-item v-for="i in list" :data="i" ></custom-item> 
        </ul> 
    </div>
    <script>
        const app = Vue.createApp({
            data() {
                return {
                    list: [
                        "web component",
                        "组件生命周期",
                        "模板语法",
                        "计算属性"
                    ]
                };
            }
        });

        app.component("custom-item", {
            props: ["data"],custom-item
            template: "<li>{{data}}</li>"
        });//组件声明

        app.mount("#app");//创建Vue实例并将其挂载到指定的DOM元素上。
    </script>
</body>
自定义组件的命名：自定义组件的名称应该是以字母开头的小写字母加连字符的形式。在你的代码中，自定义组件的名称是 item ，它不符合这个规则，改为custom-item。 

组件的声明要在vue实例创建的后面，组件声明是xxx.component()，xxx是创建的vue根组件名字。
在Vue 3中，需要先声明组件，再确定挂载点.mount()，组件各部分的顺利很重要。

custom-item是一个自定义组件，通过v-for指令循环创建多个组件实例，每个实例的data属性都绑定了list数组中的一个元素。这样可以根据list数组的内容动态生成多个custom-item 件实例，并且将数据传递给每个实例进行渲染。

通过调用 app.component 方法来声明一个名为 custom-item 的组件。组件通过 props 属性接收 data 作为参数，并使用 template 属性定义组件的模板，其中 {{data}} 会被动态渲染为列表项的内容。这样就创建了一个名为 custom-item 的组件，可以在Vue应用程序中使用它。
```

全局组件和局部组件的区别：

1、使用范围不同，全局组件可以在页面中任何位置使用，局部组件只能在定义它的el中使用，能再不其他位置使用，否则就无法生效。

2、定义组件的方法不同，全局组件可以使用“Vue.component(tagName,options)”定义，局部组件可以通过Vue实例中component属性定义。

Vue中的组件可以扩展HTML元素，用于封装可复用的代码，但是全局组件不需要挂载，但是不是很常用，尽量少在全局上使用组件，这样的话会影响浏览器的性能，而局部组件必须要手动挂载，不然会没有效果

在自定义组件时由于有些元素允许包含的元素有限制，所以大家在使用的时候要注意：例如<select>，在这种情况下，可以使用 is 特性进行了扩展的原生 HTML 元素<img src="https://img.php.cn/upload/image/960/186/380/1671593670487674.png" alt="3.png" style="zoom:80%;" />

但是我们可以使用is属性来解决这个问题

<img src="https://img.php.cn/upload/image/991/195/147/1671593675797727.png" alt="4.png" style="zoom:80%;" />

也可以使用模板引擎

<img src="https://img.php.cn/upload/image/305/533/417/1671593701223555.png" alt="5.png" style="zoom:80%;" />





#### 生命周期

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231108194708079.png" alt="image-20231108194708079" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231108203923993.png" alt="image-20231108203923993" style="zoom:80%;" />

```vue
<script>
var app = Vue.createApp({ 
    data(){ 
        return{ 
            list:[ 
                "web component", 
                "组件生命周期", 
                "模板语法", 
                "计算属性" 
            ] 
        }; 
    },
    methods: {

    },
    beforeCreate() {
        console.log("beforeCreate")
    },
    created() {
        console.log("Created")
    },
    beforeMount() {
        console.log("beforeMount")
    },
    mounted() {
        console.log("mounted")
    },
    beforeUpdate() {
        console.log("beforeUpdate")
    },
    updated() {
        console.log("updated")
    },
    beforeDestroy() {
        console.log("beforeDestroy")
    },
    destroyed() {
        console.log("Destroy")
    },
})
</script>
```

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231108211410069.png" alt="image-20231108211410069" style="zoom:80%;" />

## 问答题

1. 什么是MVVM？`M` `V` `VM`三者之间是什么关系？

   >  MVVM 是 Model，View，ViewModel 的缩写。MVVM 是一种软件架构设计模式，简化用户界面的事件驱动编程方式。
   >
   > Model 是数据层，用于存储数据和对数据进行增删改查。 View 是视图层，也就是UI界面，用于将数据模型转化成UI展现出来，ViewModel 是一个同步 View 和 Model 的对象。VM是M和V之间的调度者，Model和View之间通过VM实现函数映射关系。VM(M)=V
   >在MVVM架构下，View 和 Model没有直接的联系，而是通过 ViewModel 进行交互，Model 和 View 之间的交互是双向的，因此 View 的把变化会同步到 Model中，而Model 数据的变化也反应到 View 上。

2. 如何指定 `Vue` 根元素的挂载点？

   > Vue2通过el绑定元素
   > Vue3通过`mount()` 方法绑定元素，只接受一个参数，即要挂载的元素或选择器。它用于将Vue应用程序实例挂载到指定的DOM元素上。如果要挂载到一个具有特定ID的元素上，可以使用选择器字符串作为参数，例如 `mount('#app')` 。

3. 如何声明`Model`里的数据？`View`是根据什么渲染的？

   > 将Model中的数据声明为Vue实例的 `data` 对象的属性：
   >
   > ```js
   > var viewModel = new Vue({
   >   data: {
   >     message:"hello vue!",
   >     // ...
   >   }
   > });
   > ```
   >
   > View根据Model中的数据进行渲染。它使用数据绑定或指令将View元素与Model中的相应属性连接起来。当Model中的数据发生变化时，View会自动更新以反映这些变化。这种方式实现了一种声明式的方法，其中View的渲染是由Model中的数据驱动的。

4. `Vue` 中如何让视图绑定`Model`里的数据？（请从绑定属性和绑定字符串两个方面回答）

   > 在Vue中，可以使用指令来实现视图与数据模型之间的绑定。以下是两个常用的指令：  
   >
   > 1. `v-model`  指令（绑定属性）：用于将一个Vue实例中的数据绑定到HTML元素的属性上。
   >
   >    ```html
   >    username:<input v-model="formdata.username">
   >    ```
   >
   >    上面的代码中， v-bind:src  将  `imageUrl`  绑定到  `img`  元素的  `src`  属性上。  
   >
   > 2. `{{ }}`  插值语法（绑定字符串）：用于将一个Vue实例中的数据绑定到HTML元素的文本内容中。例如，可以使用  `{{ }}`  将一个数据模型中的  `message`  属性绑定到一个  `div`  元素的文本内容中，实现动态显示文本的效果。
   >
   >    ```html
   >    <div id="app">{{message}}</div> 
   >    ```
   >
   >    上面的代码中， `{{ message }}`  将  `message`  属性的值插入到  `div`  元素的文本内容中。   这两个指令都可以实现视图与数据模型之间的绑定，实现动态渲染视图的效果。

5. `Vue` 中如何绑定视图元素的事件？

   > 在Vue中，你可以使用 `v-on` 指令或 `@` 缩写来绑定视图元素的事件。以下是在Vue中绑定事件的方法：   
   >
   > 1. 使用 `v-on` 指令：    你可以使用 `v-on` 指令将事件绑定到特定的元素上。语法为 v-on:事件名="处理函数" ，其中 `事件名` 是要绑定的事件名称， `处理函数` 是在事件触发时要执行的方法。例如，要在点击按钮时触发一个方法，可以这样写：
   >
   >    ```html
   >    <button v-on:click="handleClick">点击我</button>
   >    ```
   >
   >    上面的代码中， v-on:click 将 `handleClick` 方法绑定到按钮的点击事件上。   
   >
   > 2. 使用 `@` 缩写：    Vue还提供了一个更简洁的语法糖，使用 `@` 符号作为 `v-on` 的缩写。通过使用 `@` 符号，可以更快地绑定事件。例如，使用 `@` 缩写来绑定点击事件：
   >
   >    ```html
   >    <button @click="btnAdd">Add</button>
   >    ```
   >
   >    上面的代码与前面的示例相同，都是将 `handleClick` 方法绑定到按钮的点击事件上。   通过使用 `v-on` 指令或 `@` 缩写，你可以方便地在Vue中绑定视图元素的事件，并在事件触发时执行相应的方法。
   >
   > 3.  `v-model` 绑定属性：用于将一个Vue实例中的数据双向绑定到HTML元素的属性上。
   >
   >    ```html
   >    username:<input v-model="formdata.username">
   >    ```
   >
   > 并在vue声明中写入method方法：
   >
   > ```js
   > var app = Vue.createApp({
   >     data(){
   >         return{
   >             list:[
   >                 "web component",
   >                 "组件生命周期",
   >                 "模板语法",
   >                 "计算属性"
   >             ]
   >         };
   >     },
   >     methods:{
   >         btnAdd:function (){
   >             this.list.push("new item")
   >         }
   >     }
   > }).mount("#app")
   > ```

6. `View`和`Model`是如何互相影响的？

   > 在MVVM（Model-View-ViewModel）架构中，View（视图）和Model（模型）是通过ViewModel（视图模型）来进行互相影响的。   
   >
   > 1. View影响Model：    
   >    - 当用户与View进行交互时，例如在输入框中输入文本、点击按钮等，View会触发相应的事件。    
   >    -  View通过绑定到ViewModel的命令或事件处理程序，将用户的操作传递给ViewModel。    
   >    -  ViewModel接收到View的操作后，可以更新Model中的数据。例如，将输入框中的文本赋值给Model中的属性。   
   > 2. Model影响View：    
   >    - 当Model中的数据发生变化时，例如从后端获取新数据、数据属性发生变化等，ViewModel会监听这些变化。   
   >    - ViewModel接收到Model的变化后，可以更新与之关联的View。    
   >    - ViewModel通过数据绑定机制将Model中的数据更新到View上，使得View能够动态地显示最新的数据。   
   >
   > 通过ViewModel的中介作用，View和Model之间实现了双向的数据绑定和同步。当View的状态发生变化时，ViewModel会更新Model的数据。同样地，当Model的数据发生变化时，ViewModel会通知View进行相应的更新，以保持数据的一致性和显示的同步性。这种双向的数据绑定使得View和Model能够实时地相互影响，提供了更好的用户体验和开发效率。

7. 什么是 Vue 组件？如何声明？如何使用？

   > Vue组件是Vue框架中的可复用代码块，用于封装一部分特定的功能和界面。组件可以包含HTML模板、CSS样式和JavaScript逻辑，使得代码的组织更加模块化和可维护。   
   >
   > 在Vue中声明组件有两种方式：全局注册和局部注册。   
   >
   > 1. 全局注册组件:在Vue实例之前，可以使用 `Vue.component()` 方法全局注册组件。这样，该组件就可以在整个应用程序中使用。例如，下面是一个名为 `MyComponent` 的全局组件的声明和使用示例：
   >
   >    ```js
   >    Vue.component('my-component', {
   >         template: '<div>This is my component</div>'
   >    })
   >    ```
   >
   >    在上面的代码中，我们通过 `Vue.component()` 方法声明了一个名为 `my-component` 的全局组件，并指定了组件的模板。     然后，我们可以在Vue实例中使用该组件：
   >
   >    ```html
   >    <my-component></my-component>
   >    ```
   >
   >    这样，组件的模板内容就会被渲染到页面上。  
   >
   > 2. 局部注册组件:除了全局注册，还可以在Vue实例的 `components` 选项中局部注册组件。这样，组件只能在该Vue实例及其子组件中使用。例如，下面是一个名为 `MyComponent` 的局部组件的声明和使用示例：
   >
   >    ```js
   >    var app = new Vue({
   >         el: '#app',
   >         components: {
   >           'my-component': {
   >             template: '<div>This is my component</div>'
   >           }
   >         }
   >       });
   >    ```
   >
   >    在上面的代码中，我们在Vue实例的 `components` 选项中声明了一个名为 `my-component` 的局部组件，并指定了组件的模板。     然后，我们可以在Vue实例的模板中使用该组件：
   >
   >    ```html
   >    <div id="app">
   >         <my-component></my-component>
   >       </div>
   >    ```
   >
   >    这样，组件的模板内容就会被渲染到Vue实例的模板中。   通过全局或局部注册组件，我们可以在Vue应用程序中声明和使用组件，实现代码的模块化和可复用性。

8. 什么是组件的生命周期？Vue 组件的生命周期有哪些？分别在什么时候调用？

   > Vue组件的生命周期是指组件从创建、挂载、更新到销毁的整个过程中，系统自动调用的一系列钩子函数。这些钩子函数允许我们在特定的生命周期阶段执行自定义的逻辑。   
   >
   > Vue组件的生命周期包括以下阶段和对应的钩子函数：   
   >
   > 1. 创建阶段：    
   >    - `beforeCreate` ：在实例初始化之后、数据观测之前被调用。此时，组件实例尚未创建，无法访问到组件的数据和方法。   
   >    - `created` ：在实例创建完成后被调用。此时，组件实例已经创建，可以访问到组件的数据和方法。  
   >
   > 2. 挂载阶段：    
   >
   >    - `beforeMount` ：在组件挂载到DOM之前被调用。此时，模板已经编译完成，但尚未渲染到页面上。   
   >
   >    - `mounted` ：在组件挂载到DOM后被调用。此时，组件已经渲染到页面上，可以进行DOM操作和异步请求。  
   >
   > 3. 更新阶段：    
   >    - `beforeUpdate` ：在组件更新之前被调用。此时，组件的数据已经发生变化，但尚未重新渲染到页面上。   
   >    - `updated` ：在组件更新完成后被调用。此时，组件的数据已经重新渲染到页面上，可以进行DOM操作和异步请求。   
   > 4. 销毁阶段：    
   >    - `beforeUnmount`  (Vue 3) /  `beforeDestroy`  (Vue 2)：在组件销毁之前被调用。此时，组件实例仍然可用。    
   >    - `unmounted`  (Vue 3) /  `destroyed`  (Vue 2)：在组件销毁后被调用。此时，组件实例已经被销毁，无法再访问到组件的数据和方法。  
   >
   >  在这些生命周期钩子函数中，我们可以执行一些特定的操作，如初始化数据、调用API、订阅事件、清理资源等。通过钩子函数，我们可以在组件的不同生命周期阶段添加自定义的行为，以满足业务需求或优化性能。

## 代码题

1. 请使用 `Vue` 在 `data` 内声明 `str:"Hello Vue"`，在视图中显示`Hello Vue`

   ```vue
   <html>
       <head>
           <title>vue start</title>
           <!-- 通过CDN使用vue -->
           <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
       </head>
       <body>
           <!-- view插入值 -->
           <div id="app">{{str}}</div>
           <script>
               //根组件
               var app = Vue.createApp({
                   data(){
                       return{
                           str:"Hello vue!"
                       };
                   }
               }).mount("#app")//挂载点mount()
           </script>
       </body>
   </html>
   ```

   

2. 请实现计数器：视图上有一个`div`和一个`button`，如果点击`botton`则`div`中的数字加1

   ```vue
   <div id="count">
       <button @click="increment">
           Count is:{{count}}
       </button>
   </div>
   <script>
       var count = Vue.createApp({
           data() {
               return {
                   count: 0
               }
           },
           methods: {
               increment() {
                   this.count++
               }
           },
           mounted() {
               console.log(`The initial count is ${this.count}.`)
           }
       }).mount("#count")
   </script>
   ```

   

3. 请声明组件`item`，并通过`v-for`命令实现创建多个`item`

   ```vue
   <div id="app">
       <ul>
          <item v-for="i in list" :data="i" ></item>
       </ul>
   </div>
   <script>
        Vue.component("item",{ 
                props:["data"], 
                template:"<li>{{data}}</li>" 
            })
       var app = Vue.createApp({
            el:"#app",
                data:{ 
                    list:[ 
                        "web component", 
                        "组件生命周期", 
                        "模板语法", 
                        "计算属性" 
                    ]  
                },
       })
   </script>
   ```

   

4. 请实现在组件创建的打印`created`，在组件销毁的时候打印`destroyed`

   ```js
   Vue.component("custom-item",{ 
       props:["data"], 
       template:"<li>{{data}}</li>" 
   })
   var app = new Vue({ 
       el:"#app",
       data:{ 
           list:[ 
               "web component", 
               "组件生命周期", 
           ]  
       },
       methods: {
   
       },
       created() {
           console.log("Created")
       },
       destroyed() {
           console.log("Destroy")
       },
   })
   ```
   
   

