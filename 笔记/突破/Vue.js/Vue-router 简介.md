## 客户端 vs. 服务端路由

服务端路由指的是服务器根据用户访问的 URL 路径返回不同的响应结果。当我们在一个传统的服务端渲染的 web 应用中点击一个链接时，浏览器会从服务端获得全新的 HTML，然后重新加载整个页面。

然而，在[单页面应用](https://developer.mozilla.org/en-US/docs/Glossary/SPA)中，客户端的 JavaScript 可以拦截页面的跳转请求，动态获取新的数据，然后在无需重新加载的情况下更新当前页面。这样通常可以带来更顺滑的用户体验，尤其是在更偏向“应用”的场景下，因为这类场景下用户通常会在很长的一段时间中做出多次交互。

在这类单页应用中，“路由”是在客户端执行的。一个客户端路由器的职责就是利用诸如 [History API](https://developer.mozilla.org/en-US/docs/Web/API/History) 或是 [`hashchange` 事件](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event)这样的浏览器 API 来管理应用当前应该渲染的视图。

## [路由router][https://router.vuejs.org/zh/guide/]

用 Vue + Vue Router 创建单页应用非常简单：通过 Vue.js，我们已经用组件组成了我们的应用。当加入 Vue Router 时，我们需要做的就是将我们的组件映射到路由上，让 Vue Router 知道在哪里渲染它们。下面是一个基本的例子：

## HTML

```html
<script src="https://unpkg.com/vue@3"></script>
<script src="https://unpkg.com/vue-router@4"></script>

<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!--使用 router-link 组件进行导航 -->
    <!--通过传递 `to` 来指定链接 -->
    <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
    <router-link to="/">Go to Home</router-link>
    <router-link to="/about">Go to About</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
```

### `router-link`

请注意，我们没有使用常规的 `a` 标签，而是使用一个自定义组件 `router-link` 来创建链接。这使得 Vue Router 可以在不重新加载页面的情况下更改 URL，处理 URL 的生成以及编码。我们将在后面看到如何从这些功能中获益。

### `router-view`

`router-view` 将显示与 url 对应的组件。你可以把它放在任何地方，以适应你的布局。

## JavaScript

```js
// 1. 定义路由组件.
// 也可以从其他文件导入
const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

// 5. 创建并挂载根实例
const app = Vue.createApp({})
//确保 _use_ 路由实例使
//整个应用支持路由。
app.use(router)

app.mount('#app')

// 现在，应用已经启动了！
```

通过调用 `app.use(router)`，我们会触发第一次导航且可以在任意组件中以 `this.$router` 的形式访问它，并且以 `this.$route` 的形式访问当前路由：

```js
// Home.vue
export default {
  computed: {
    username() {
      // 我们很快就会看到 `params` 是什么
      return this.$route.params.username
    },
  },
  methods: {
    goToDashboard() {
      if (isAuthenticated) {
        this.$router.push('/dashboard')
      } else {
        this.$router.push('/login')
      }
    },
  },
}
```

要在 `setup` 函数中访问路由，请调用 `useRouter` 或 `useRoute` 函数。我们将在 [Composition API](https://router.vuejs.org/zh/guide/advanced/composition-api.html#在-setup-中访问路由和当前路由) 中了解更多信息。

在整个文档中，我们会经常使用 `router` 实例，请记住，`this.$router` 与直接使用通过 `createRouter` 创建的 `router` 实例完全相同。我们使用 `this.$router` 的原因是，我们不想在每个需要操作路由的组件中都导入路由。



## 问答题

1. 单页面应用为什么要实现页面**切换**而**不刷新**页面？如何实现？

   > 单页面应用（SPA）之所以要实现页面切换而不刷新页面，是为了提供更流畅的用户体验和更快的页面加载速度。在传统的多页面应用中，每次切换页面都需要重新加载整个页面，包括重新请求资源和重新渲染页面，这会导致页面闪烁和加载延迟。而在SPA中，页面切换是通过JavaScript动态加载和渲染组件，不需要重新加载整个页面，只需要更新部分内容，从而实现快速响应和平滑的页面切换效果。
   >
   > 要实现SPA的页面切换，可以使用前端框架（例如Vue.js、React等）结合路由管理器（例如Vue Router、React Router等）来处理页面的切换逻辑。以下是一般的实现步骤：
   >
   > 1. 定义路由：在路由管理器中定义各个页面对应的路由路径和对应的组件。
   >
   > 2. 创建组件：为每个页面创建对应的组件，组件中包含页面的内容和逻辑。
   >
   > 3. 配置路由：在路由管理器中配置路由映射，将路由路径与对应的组件关联起来。
   >
   > 4. 渲染视图：在主页面中添加一个占位符，用于渲染当前路由对应的组件。
   >
   > 5. 处理链接点击：为页面中的链接添加点击事件处理程序，通过路由管理器进行页面切换。
   >
   > 6. 页面切换：当用户点击链接时，路由管理器会根据点击的链接路径，动态加载对应的组件，并将其渲染到主页面的占位符中，实现页面切换效果。
   >
   > 通过这种方式，SPA可以在不刷新整个页面的情况下，实现页面之间的切换和更新，提供更流畅的用户体验和更快的页面加载速度。

2. HTML5 history 和 Hash 都能实现切换 url 而不刷新页面，它们有何异同？

   > `window.history.pushState(null,null,"/aaa")`url会变成当前域名下的aaa路径
   >
   > hash会在浏览器地址后面增加#号，而history可以自定义地址。
   >
   > 1）表现不同
   > 最明显的就是hash会在浏览器地址后面增加#号，而history可以自定义地址。
   > 2）原理不同
   > hash模式的实现原理是通过监听hashChange事件来实现的。history模式是通过调用 history.pushState方法(或者replaceState) 并且 监听popstate事件来实现的。history.pushState会追加历史记录，并更换地址栏地址信息，但是页面不会刷新，需要手动调用地址变化之后的处理函数，并在处理函数内部决定跳转逻辑；监听popstate事件是为了响应浏览器的前进后退功能。
   >
   > 
   >
   > HTML5 history 和 Hash 都可以实现切换 URL 而不刷新页面，但它们有以下几点区别：
   >
   > * **历史记录**：HTML5 history 会在浏览器的历史记录中记录页面的访问记录，而 Hash 不会。这意味着，当你使用 HTML5 history 时，你可以通过浏览器的后退和前进按钮来导航到之前访问过的页面。而当你使用 Hash 时，你只能通过重新输入 URL 来导航到之前访问过的页面。
   > * **性能**：HTML5 history 的性能比 Hash 更好。这是因为 HTML5 history 会在浏览器的地址栏中显示页面的完整 URL，而 Hash 只会显示页面的锚点。这意味着，当你使用 HTML5 history 时，浏览器需要重新加载页面的整个内容，而当你使用 Hash 时，浏览器只需要重新加载页面的锚点。
   > * **兼容性**：HTML5 history 在所有现代浏览器中都支持，而 Hash 在一些旧版本的浏览器中可能不支持。
   >
   > 总体来说，HTML5 history 是更优的选择。如果你需要在页面之间导航，并且希望能够使用浏览器的后退和前进按钮，那么你应该使用 HTML5 history。如果你只需要在页面之间导航，并且不关心性能和兼容性，那么你也可以使用 Hash。

3. 自己实现的 VLink 的原理是什么？

   > 定义一个VLink组件，组件模板中的a标签被点击时会阻止默认事件，而是获取到当前标签的路径`let path = this.href`，将页面的url通过`window.history.pushState(null, null, path)`改变到对应的url，此外通过`this.$root.currentRoute = path`改变根组件的currentRoute,这是VLink组件的逻辑
   >
   > ```vue
   > <template>
   >     <a @click="onClick" :href="href" >
   >         <slot></slot>
   >     </a>
   > </template>
   > 
   > <script>
   >     export default {    
   >         props: {
   >             href: {
   >                 type: String,
   >                 required: true
   >             }
   >         },
   >         methods: {
   >             onClick(e) {
   >                 e.preventDefault();
   >                 let path = this.href
   >                 this.$root.currentRoute = path//this.$root获得根组件
   >                 window.history.pushState(null, null, path)
   >             }
   >         }
   >     }
   > </script>
   > ```
   >
   > 其他组件在导航的部分引用VLink组件，实现点击页面切换而不刷新：
   >
   > ```vue
   > <template>
   >     <div>
   >         <v-link href="/">home</v-link>
   >         <v-link herf="/about">about</v-link>
   >         <p>This Is Page Home</p>
   >     </div>
   > </template>
   > 
   > <script>
   >     import VLink from './VLink.vue'
   >     export default {
   >         comments: {
   >             VLink
   >         }
   >     }
   > </script>
   > ```
   >
   > 在最后的入口文件main.js文件中，引入其他页面的组件，将各组件的路径和组件写在routes中，当导航链接被点击时，当前页面的url改变但不刷新，并且根组件中的currentRoute改变，computed中的ViewComponent ()随着重新计算返回值，最后通过根组件的render(h)渲染函数重新渲染页面，实现动态切换页面，而不刷新页面
   >
   > ```js
   > import Vue from 'vue'
   > import NotFound from './components/NotFound'
   > import Home from './components/Home'
   > import About from './components/About'
   > 
   > Vue.config.productionTip = false
   > const routes = {
   >     '/': Home,
   >     '/about': About,
   >     '/user/:id':User,
   > }
   > 
   > new Vue({
   >   el: '#app',
   >   data: {
   >     currentRoute: window.location.pathname
   >   },
   >   computed: {
   >     ViewComponent () {
   >       return routes[this.currentRoute] || NotFound
   >     }
   >   },
   >   render (h) { return h(this.ViewComponent)}
   > })
   > ```

4. vue-router 中 `<router-view></router-view>` 标签有何作用？

   > `<router-view></router-view>`  标签是 Vue Router 的路由出口，路由匹配到的组件将渲染在这里，相当于占位符。当路由发生变化时， `<router-view>`  标签会自动更新其内容，以显示当前路由对应的组件。

5. vue-router 中如何使用动态路由匹配？

   > 在 Vue Router 中，使用 router-link 组件进行导航，可以使用  `<router-link>`  标签的  `to`  属性来实现动态路由匹配。
   >
   > 代码：
   >
   > ```js
   > import Vue from 'vue'
   > import VueRouter from 'vue-router';
   > Vue.config.productionTip = false
   > Vue.use(VueRouter)
   > import VueRouter from 'vue-router';
   > import NotFound from './components/NotFound'
   > import Home from './components/Home'
   > import About from './components/About'
   > import User from './components/User'
   > 
   > const routes = [
   >     {path: '/', component: Home},
   >     {path: '/about', component: About},
   >     {name: "user", path:'/user/:id',component:User},
   >     {path: '*',component: NotFound}
   >   ]
   >   
   >   export const router = new VueRouter({
   >     mode: 'history',
   >     routes
   >   })
   >   
   > new Vue({
   >   el: '#app',
   >   router,
   >   template: `
   >   <div>
   >     <router-link to="/">home</router-link>
   >     <router-link to="/about">about</router-link>
   >     <router-link to="/user/:id">user</router-link>
   >     <router-view></router-view>
   >     <button @click='btnClick'>click me</button>
   >   </div>`,
   >   methods: {
   >     btnClick () {
   >       router.push({name:'user',params:{id:122},})
   >     }
   >   }
   > })
   > ```
   >
   > 
   >
   > 在 Vue Router 中，我们可以在路径中使用一个动态字段来实现，我们称之为 *路径参数* ：
   >
   > ```js
   > const User = {
   >   template: '<div>User</div>',
   > }
   > 
   > // 这些都会传递给 `createRouter`
   > const routes = [
   >   // 动态字段以冒号开始
   >   { path: '/users/:id', component: User },
   > ]
   > ```
   >
   > 现在像 `/users/johnny` 和 `/users/jolyne` 这样的 URL 都会映射到同一个路由。
   >
   > *路径参数* 用冒号 `:` 表示。当一个路由被匹配时，它的 *params* 的值将在每个组件中以 `this.$route.params` 的形式暴露出来。因此，我们可以通过更新 `User` 的模板来呈现当前的用户 ID：
   >
   > ```js
   > const User = {
   >   template: '<div>User {{ $route.params.id }}</div>',
   > }
   > ```
   >
   > 你可以在同一个路由中设置有多个 *路径参数*，它们会映射到 `$route.params` 上的相应字段。
   >
   > - 使用：路径参数 用冒号 : 表示。当一个路由被匹配时，它的 params 的值将在每个组件中以 this.$route.params 的形式暴露出来。
   >
   >   ```
   >   const User = {
   >   template: '<div>User {{ $route.params.id }}</div>',
   >   }
   >   ```

## 代码题

1. 请自己动手实现一个简单的 Vue 路由（需要实现 VLink）并使用自己实现的 VLink 实现以下功能
   1. 有 Home 、 About 和 404 NOTFOUND 三个页面
   2. 三个页面共用一个导航条，导航条上有两个元素：Home 、 About。点击元素跳转到对应页面
   3. 当用户访问不存在的页面时，显示 404 NOTFOUND
   
   
   
   
   
2. 请使用 Vue-router 实现以下功能
   1. 有 Home 、 About 和 404 NOTFOUND 三个页面
   2. 三个页面共用一个导航条，导航条上有两个元素：Home 、 About。点击元素跳转到对应页面
   3. 当用户访问不存在的页面时，显示 404 NOTFOUND
   
   
   
   

## 算法题

1. [[20\]Valid Parentheses](https://leetcode.com/problems/valid-parentheses)

   **括号合法性**

   将给出一个字符串，其中只包括字符`'('`, `')'`, `'{'`, `'}'`, `'['` 和 `']'`，你需要判断输入是否是合法的

   括号必须要被争取的闭合，如`"()"` 和 `"()[]{}"` 是合法的，但是 `"(]"` 和 `"([)]"` 不是。

1. [[16\]3Sum Closest](https://leetcode.com/problems/3sum-closest/#/description)

   **三数最接近和**

   给出包含 n 个整数的数组 S，请找出三个在 S 中的数，使得它们的和最为接近给定的目标数。请返回三数之和，你可以假设所有的输入都有切只有一个解。

   ```
   如 S = {-1 2 1 -4}, target = 1.
   
   最接近目标数的答案是2。(-1 + 2 + 1 = 2)
   ```