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

   > 答：**一个组件的 `data` 选项必须是一个函数**。每个实例可以维护一份被返回对象的独立的拷贝。
   >
   > 因为如果 Vue 没有这条规则，子组件的数据会受到父组件的影响，不利于编码。

2. 父子组件是如何通信的？

   > 

3. 如何声明 prop ？如何对 prop 进行验证？

   > 

4. 如何自定义事件？父组件如何绑定子组件事件？

   > 

5. 什么是 slot？如何使用？

   > 

6. 如何异步加载组件？

   > 

## 代码题

1. 请实现如下效果，注意第一行的计数器在父组件中，两个`Button`为两个 Component
   ![img](http://static.mafengshe.com/work/vue/component-partent-child.gif)

   > 

2. 请使用 slot 实现页头页脚固定，中间的 content 为调用组件时在组件内部声明的内容

   > 