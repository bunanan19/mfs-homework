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

   > 

2. HTML5 history 和 Hash 都能实现切换 url 而不刷新页面，它们有何异同？

   > `window.history.pushState(null,null,"/aaa")`url会变成当前域名下的aaa路径
   >
   > 

3. 自己实现的 VLink 的原理是什么？

   > 

4. vue-router 中 `<router-view></router-view>` 标签有何作用？

   > 

5. vue-router 中如何使用动态路由匹配？

   > 

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