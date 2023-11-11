#### 子组件父组件通信：

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231109222351435.png" alt="image-20231109222351435" style="zoom:80%;" />





```vue
<div id="app">
    <parent></parent>
</div>
<script>
    // 父组件
    Vue.component("parent",{
        data:function(){
            return{a:1}
        },
        template:`
                  <div class='parent'>
                    <child></child>
                  </div>
                  `
    })
    // 子组件
    Vue.component("child",{
        data:function(){
            return{a:1}
        },
        template:"<div class='child'>child</div>"
    })
    var app = new Vue({
        el:"#app",
        data:{

        }
    })
</script>
```

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231109224839348.png" alt="image-20231109224839348" style="zoom:80%;" />

加上style样式后：

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231109225106844.png" alt="image-20231109225106844" style="zoom:80%;" />



## 问答题

1. Component 中的 data 应该怎样初始化？`Vue`作者为什么要这样设计？

   > 组件的 `data` 选项必须是一个函数。这是因为组件可以被多次复用，如果 data 是一个对象的话，那么每个组件实例将共享同一个对象作为其 data。这会导致一个组件实例的数据变化会影响到其他复用了同一组件的实例。   
   >
   > 通过将 data 定义为一个函数，每个组件实例都会调用该函数来返回一个全新的数据对象，从而确保每个组件实例都有自己独立的数据副本。这样设计的好处是，每个组件实例都可以独立地操作和修改它们自己的数据，而不会相互干扰。   这种设计方式也符合 Vue 的响应式系统的要求，使得 Vue 能够追踪到每个组件实例的数据变化，并在需要时更新相应的视图。   因此，为了确保组件数据的独立性和响应式，Vue 的作者设计了将 data 定义为一个返回数据对象的函数。父子组件是如何通信的？

2. 如何声明 prop ？如何对 prop 进行验证？

   > 在组件的  `props`  选项中，使用对象的形式来声明 props。其中键是 prop 的名称，值是 prop 的类型或其他设置,可以实现对prop的验证。
   >
   > ```js
   > Vue.component('my-component', {
   >      props: {
   >        message: String, // 声明一个名为 message 的 prop，类型为 String
   >        count: {
   >          type: Number, // 声明一个名为 count 的 prop，类型为 Number
   >          default: 0 ， // 设置默认值为 0
   >          required: true, // 必需的 prop
   >          validator(val){
   >                             return val<10
   >                         }//规定message的范围，小于10,一旦大于10，会警告
   >        }
   >      },
   >    });
   > ```

3. 如何自定义事件？父组件如何绑定子组件事件？

   > 在 Vue 中，可以通过自定义事件来实现父组件与子组件之间的通信。父组件可以绑定子组件触发的事件，并在事件触发时执行相应的逻辑。   以下是自定义事件的基本步骤：   
   >
   > 1. 在子组件中定义事件：在子组件中，使用事件和  `$emit`  方法触发一个自定义事件，传递给父组件
   >
   >    ```js
   >    Vue.component('child', {
   >         methods: {
   >           btnClick() {
   >             this.$emit('click', data); // 触发自定义事件并传递数据
   >           }
   >         },
   >         // ...
   >       });
   >    ```
   >
   > 2. 在父组件中绑定子组件事件:在父组件中，使用  `v-on`  或简化的  `@`  符号来监听子组件触发的自定义事件，并执行相应的方法。
   >
   >    ```html
   >    <parent>
   >         <child @click="handleEvent"></child>
   >       </parent>
   >    ```

4. 什么是 slot？如何使用？

   > Slot（插槽）用于插入用户自定义内容。
   >
   > ```html
   > <div id="app">
   >     <container :a="5">
   >         <div slot="content1">content1</div>
   >         <div slot="content2">content2</div>
   >     </container>
   > </div>
   > <script>
   >     Vue.component("container",{
   >         props:["a"],
   >         template:`
   >             <div class="main">
   >                 <header>header</header>
   >                 <slot name="content1"></slot>
   >                 <div class="sep"></div>
   >                 <slot name="content2"></slot>
   >                 <footer>footer</footer>
   >             </div>
   >             `
   >     })
   > </script>
   > ```
   >
   > 
   >
   > 使用 Slot 的步骤如下：   1. 在组件的模板中定义 Slot：    在组件的模板中，使用  `<slot>`  标签来定义一个或多个插槽。插槽可以带有名称，以便在使用组件时进行具体的内容插入。
   >
   > ```
   > html<template>
   >      <div>
   >        <h2>组件标题</h2>
   >        <slot></slot> <!-- 默认插槽 -->
   >        <slot name="content"></slot> <!-- 带名称的插槽 -->
   >      </div>
   >    </template>
   > ```
   >
   > 2. 在使用组件时插入内容：    在使用组件的地方，可以在组件标签中插入实际的内容。这些内容将替换掉组件模板中定义的插槽。
   >
   > ```
   > html<my-component>
   >      <p>这是默认插槽的内容</p>
   >      <template v-slot:content>
   >        <p>这是带名称的插槽的内容</p>
   >      </template>
   >    </my-component>
   > ```
   >
   > 在上面的例子中， `<p>这是默认插槽的内容</p>`  将替换掉组件模板中的默认插槽  `<slot></slot>` ，而  `<p>这是带名称的插槽的内容</p>`  将替换掉组件模板中名称为 "content" 的插槽  `<slot name="content"></slot>` 。   使用插槽可以使组件更具灵活性，允许在组件外部自定义内容，并将其传递给组件进行渲染。这样可以实现更高度的组件复用和定制化。

6. 如何异步加载组件？

   > ```html
   > <div id="app">
   >     <container :a="5">
   >         <div slot="content1">content1</div>
   >         <div slot="content2">content2</div>
   >     </container>
   > </div>
   > <script>
   > 	Vue.component("container",function(resolve,reject){
   >         setTimeout(()=>{
   >             resolve({
   >                 template:`
   >                 <div class="main">
   >                     <header>header</header>
   >                     <slot name="content1"></slot>
   >                     <div class="sep"></div>
   >                     <slot name="content2"></slot>
   >                     <footer>footer</footer>
   >                 </div>
   >                 `
   >             })
   >         },3000)//使用定时器模拟异步
   >     })
   > 	var app = new Vue({
   >         el:"#app",
   >         data:{
   > 
   >         }
   >     })
   > </script>
   > ```
   >
   > 

## 代码题

1. 请实现如下效果，注意第一行的计数器在父组件中，两个`Button`为两个 Component
   ![img](http://static.mafengshe.com/work/vue/component-partent-child.gif)

   > 

2. 请使用 slot 实现页头页脚固定，中间的 content 为调用组件时在组件内部声明的内容

   > 