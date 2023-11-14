# 深入响应式系统

Vue 最标志性的功能就是其低侵入性的响应式系统。组件状态都是由响应式的 JavaScript 对象组成的。当更改它们时，视图会随即自动更新。这让状态管理更加简单直观，但理解它是如何工作的也是很重要的，这可以帮助我们避免一些常见的陷阱。在本节中，我们将深入研究 Vue 响应性系统的一些底层细节。

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231112210522169.png" alt="image-20231112210522169" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113142203105.png" alt="image-20231113142203105" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113142455635.png" alt="image-20231113142455635" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113142927587.png" alt="image-20231113142927587" style="zoom:80%;" />

## 什么是响应性

这个术语在今天的各种编程讨论中经常出现，但人们说它的时候究竟是想表达什么意思呢？本质上，响应性是一种可以使我们声明式地处理变化的编程范式。一个经常被拿来当作典型例子的用例即是 Excel 表格：

|      | A    | B    | C    |
| ---- | ---- | ---- | ---- |
| 0    | 1    |      |      |
| 1    | 2    |      |      |
| 2    | 3    |      |      |

这里单元格 A2 中的值是通过公式 `= A0 + A1` 来定义的 (你可以在 A2 上点击来查看或编辑该公式)，因此最终得到的值为 3，正如所料。但如果你试着更改 A0 或 A1，你会注意到 A2 也随即自动更新了。

而 JavaScript 默认并不是这样的。如果我们用 JavaScript 写类似的逻辑：

```js
let A0 = 1
let A1 = 2
let A2 = A0 + A1

console.log(A2) // 3

A0 = 2
console.log(A2) // 仍然是 3
```

当我们更改 `A0` 后，`A2` 不会自动更新。

那么我们如何在 JavaScript 中做到这一点呢？首先，为了能重新运行计算的代码来更新 `A2`，我们需要将其包装为一个函数：

```js
let A2

function update() {
  A2 = A0 + A1
}
```

然后，我们需要定义几个术语：

- 这个 `update()` 函数会产生一个**副作用**，或者就简称为**作用** (effect)，因为它会更改程序里的状态。
- `A0` 和 `A1` 被视为这个作用的**依赖** (dependency)，因为它们的值被用来执行这个作用。因此这次作用也可以说是一个它依赖的**订阅者** (subscriber)。

我们需要一个魔法函数，能够在 `A0` 或 `A1` (这两个**依赖**) 变化时调用 `update()` (产生**作用**)。

```
whenDepsChange(update)
```

这个 `whenDepsChange()` 函数有如下的任务：

1. 当一个变量被读取时进行追踪。例如我们执行了表达式 `A0 + A1` 的计算，则 `A0` 和 `A1` 都被读取到了。
2. 如果一个变量在当前运行的副作用中被读取了，就将该副作用设为此变量的一个订阅者。例如由于 `A0` 和 `A1` 在 `update()` 执行时被访问到了，则 `update()` 需要在第一次调用之后成为 `A0` 和 `A1` 的订阅者。
3. 探测一个变量的变化。例如当我们给 `A0` 赋了一个新的值后，应该通知其所有订阅了的副作用重新执行。

## Vue 中的响应性是如何工作的

我们无法直接追踪对上述示例中局部变量的读写，原生 JavaScript 没有提供任何机制能做到这一点。**但是**，我们是可以追踪**对象属性**的读写的。

在 JavaScript 中有两种劫持 property 访问的方式：[getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) / [setters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) 和 [Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)。Vue 2 使用 getter / setters 完全是出于支持旧版本浏览器的限制。而在 Vue 3 中则使用了 Proxy 来创建响应式对象，仅将 getter / setter 用于 ref。下面的伪代码将会说明它们是如何工作的：

```js
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key)
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      trigger(target, key)
    }
  })
}

function ref(value) {
  const refObject = {
    get value() {
      track(refObject, 'value')
      return value
    },
    set value(newValue) {
      value = newValue
      trigger(refObject, 'value')
    }
  }
  return refObject
}
```

*TIP:这里和下面的代码片段皆旨在以最简单的形式解释核心概念，因此省略了许多细节和边界情况。*

以上代码解释了我们在基础章节部分讨论过的一些 [`reactive()` 的局限性](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#limitations-of-reactive)：

- 当你将一个响应式对象的属性赋值或解构到一个本地变量时，访问或赋值该变量是非响应式的，因为它将不再触发源对象上的 get / set 代理。注意这种“断开”只影响变量绑定——如果变量指向一个对象之类的非原始值，那么对该对象的修改仍然是响应式的。
- 从 `reactive()` 返回的代理尽管行为上表现得像原始对象，但我们通过使用 `===` 运算符还是能够比较出它们的不同。

在 `track()` 内部，我们会检查当前是否有正在运行的副作用。如果有，我们会查找到一个存储了所有追踪了该属性的订阅者的 Set，然后将当前这个副作用作为新订阅者添加到该 Set 中。

```js
// 这会在一个副作用就要运行之前被设置
// 我们会在后面处理它
let activeEffect

function track(target, key) {
  if (activeEffect) {
    const effects = getSubscribersForProperty(target, key)
    effects.add(activeEffect)
  }
}
```

副作用订阅将被存储在一个全局的 `WeakMap<target, Map<key, Set<effect>>>` 数据结构中。如果在第一次追踪时没有找到对相应属性订阅的副作用集合，它将会在这里新建。这就是 `getSubscribersForProperty()` 函数所做的事。为了简化描述，我们跳过了它其中的细节。

在 `trigger()` 之中，我们会再查找到该属性的所有订阅副作用。但这一次我们需要执行它们：

```js
function trigger(target, key) {
  const effects = getSubscribersForProperty(target, key)
  effects.forEach((effect) => effect())
}
```

现在让我们回到 `whenDepsChange()` 函数中：

```js
function whenDepsChange(update) {
  const effect = () => {
    activeEffect = effect
    update()
    activeEffect = null
  }
  effect()
}
```

它将原本的 `update` 函数包装在了一个副作用函数中。在运行实际的更新之前，这个外部函数会将自己设为当前活跃的副作用。这使得在更新期间的 `track()` 调用都能定位到这个当前活跃的副作用。

此时，我们已经创建了一个能自动跟踪其依赖的副作用，它会在任意依赖被改动时重新运行。我们称其为**响应式副作用**。

Vue 提供了一个 API 来让你创建响应式副作用 [`watchEffect()`](https://cn.vuejs.org/api/reactivity-core.html#watcheffect)。事实上，你会发现它的使用方式和我们上面示例中说的魔法函数 `whenDepsChange()` 非常相似。我们可以用真正的 Vue API 改写上面的例子：

```js
import { ref, watchEffect } from 'vue'

const A0 = ref(0)
const A1 = ref(1)
const A2 = ref()

watchEffect(() => {
  // 追踪 A0 和 A1
  A2.value = A0.value + A1.value
})

// 将触发副作用
A0.value = 2
```

使用一个响应式副作用来更改一个 ref 并不是最优解，事实上使用计算属性会更直观简洁：

```js
import { ref, computed } from 'vue'

const A0 = ref(0)
const A1 = ref(1)
const A2 = computed(() => A0.value + A1.value)

A0.value = 2
```

在内部，`computed` 会使用响应式副作用来管理失效与重新计算的过程。

那么，常见的响应式副作用的用例是什么呢？自然是更新 DOM！我们可以像下面这样实现一个简单的“响应式渲染”：

```js
import { ref, watchEffect } from 'vue'

const count = ref(0)

watchEffect(() => {
  document.body.innerHTML = `计数：${count.value}`
})

// 更新 DOM
count.value++
```

实际上，这与 Vue 组件保持状态和 DOM 同步的方式非常接近——每个组件实例创建一个响应式副作用来渲染和更新 DOM。当然，Vue 组件使用了比 `innerHTML` 更高效的方式来更新 DOM。这会在[渲染机制](https://cn.vuejs.org/guide/extras/rendering-mechanism.html)一章中详细介绍。

## 运行时 vs. 编译时响应性

Vue 的响应式系统基本是基于运行时的。追踪和触发都是在浏览器中运行时进行的。运行时响应性的优点是，它可以在没有构建步骤的情况下工作，而且边界情况较少。另一方面，这使得它受到了 JavaScript 语法的制约，导致需要使用一些例如 Vue ref 这样的值的容器。

一些框架，如 [Svelte](https://svelte.dev/)，选择通过编译时实现响应性来克服这种限制。它对代码进行分析和转换，以模拟响应性。该编译步骤允许框架改变 JavaScript 本身的语义——例如，隐式地注入执行依赖性分析的代码，以及围绕对本地定义的变量的访问进行作用触发。这样做的缺点是，该转换需要一个构建步骤，而改变 JavaScript 的语义实质上是在创造一种新语言，看起来像 JavaScript 但编译出来的东西是另外一回事。

Vue 团队确实曾通过一个名为[响应性语法糖](https://cn.vuejs.org/guide/extras/reactivity-transform.html)的实验性功能来探索这个方向，但最后由于[这个原因](https://github.com/vuejs/rfcs/discussions/369#discussioncomment-5059028)，我们认为它不适合这个项目。

## 响应性调试

Vue 的响应性系统可以自动跟踪依赖关系，但在某些情况下，我们可能希望确切地知道正在跟踪什么，或者是什么导致了组件重新渲染。

### 组件调试钩子

我们可以在一个组件渲染时使用 `onRenderTracked` 生命周期钩子来调试查看哪些依赖正在被使用，或是用 `onRenderTriggered` 来确定哪个依赖正在触发更新。这些钩子都会收到一个调试事件，其中包含了触发相关事件的依赖的信息。推荐在回调中放置一个 `debugger` 语句，使你可以在开发者工具中交互式地查看依赖：

```html
<script setup>
import { onRenderTracked, onRenderTriggered } from 'vue'

onRenderTracked((event) => {
  debugger
})

onRenderTriggered((event) => {
  debugger
})
</script>
```

*TIP:组件调试钩子仅会在开发模式下工作*

调试事件对象有如下的类型定义：

```js
type DebuggerEvent = {
  effect: ReactiveEffect
  target: object
  type:
    | TrackOpTypes /* 'get' | 'has' | 'iterate' */
    | TriggerOpTypes /* 'set' | 'add' | 'delete' | 'clear' */
  key: any
  newValue?: any
  oldValue?: any
  oldTarget?: Map<any, any> | Set<any>
}
```

### 计算属性调试

我们可以向 `computed()` 传入第二个参数，是一个包含了 `onTrack` 和 `onTrigger` 两个回调函数的对象：

- `onTrack` 将在响应属性或引用作为依赖项被跟踪时被调用。
- `onTrigger` 将在侦听器回调被依赖项的变更触发时被调用。

这两个回调都会作为组件调试的钩子，接受[相同格式](https://cn.vuejs.org/guide/extras/reactivity-in-depth.html#debugger-event)的调试事件：

```js
const plusOne = computed(() => count.value + 1, {
  onTrack(e) {
    // 当 count.value 被追踪为依赖时触发
    debugger
  },
  onTrigger(e) {
    // 当 count.value 被更改时触发
    debugger
  }
})

// 访问 plusOne，会触发 onTrack
console.log(plusOne.value)

// 更改 count.value，应该会触发 onTrigger
count.value++
```

*TIP:计算属性的 `onTrack` 和 `onTrigger` 选项仅会在开发模式下工作。*

### 侦听器调试

和 `computed()` 类似，侦听器也支持 `onTrack` 和 `onTrigger` 选项：

```js
watch(source, callback, {
  onTrack(e) {
    debugger
  },
  onTrigger(e) {
    debugger
  }
})

watchEffect(callback, {
  onTrack(e) {
    debugger
  },
  onTrigger(e) {
    debugger
  }
})
```

TIP:侦听器的 `onTrack` 和 `onTrigger` 选项仅会在开发模式下工作。

## 与外部状态系统集成

Vue 的响应性系统是通过深度转换普通 JavaScript 对象为响应式代理来实现的。这种深度转换在一些情况下是不必要的，在和一些外部状态管理系统集成时，甚至是需要避免的 (例如，当一个外部的解决方案也用了 Proxy 时)。

将 Vue 的响应性系统与外部状态管理方案集成的大致思路是：将外部状态放在一个 [`shallowRef`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowref) 中。一个浅层的 ref 中只有它的 `.value` 属性本身被访问时才是有响应性的，而不关心它内部的值。当外部状态改变时，替换此 ref 的 `.value` 才会触发更新。

### 不可变数据

如果你正在实现一个撤销/重做的功能，你可能想要对用户编辑时应用的状态进行快照记录。然而，如果状态树很大的话，Vue 的可变响应性系统没法很好地处理这种情况，因为在每次更新时都序列化整个状态对象对 CPU 和内存开销来说都是非常昂贵的。

[不可变数据结构](https://en.wikipedia.org/wiki/Persistent_data_structure)通过永不更改状态对象来解决这个问题。与 Vue 不同的是，它会创建一个新对象，保留旧的对象未发生改变的一部分。在 JavaScript 中有多种不同的方式来使用不可变数据，但我们推荐使用 [Immer](https://immerjs.github.io/immer/) 搭配 Vue，因为它使你可以在保持原有直观、可变的语法的同时，使用不可变数据。

我们可以通过一个简单的组合式函数来集成 Immer：

```js
import produce from 'immer'
import { shallowRef } from 'vue'

export function useImmer(baseState) {
  const state = shallowRef(baseState)
  const update = (updater) => {
    state.value = produce(state.value, updater)
  }

  return [state, update]
}
```

[在演练场中尝试一下](https://play.vuejs.org/#eNplU8Fu2zAM/RXOlzpAYu82zEu67lhgpw3bJcrBs5VYqywJkpxmMPzvoyjZNRodbJF84iOppzH7ZkxxHXhWZXvXWGE8OO4H88iU6I22HkYYHH/ue25hgrPVPTwUpQh28dc9MAXAVKOV83AUnvduC4Npa8+fg3GCw3I8PwbwGD64vPCSV8Cy77y2Cn4PnGXbFGu1wpC36EPHRO67c78cD6fgVfgOiOB9gnMtXczA1GnDFFPnQTVeaAVeXy6SSsyFavltE/OvKs+pGTg8zsxkHwl9KgIBtvbhzkl0yIWU+zIOFEeJBgKNxORoAewHSX/cSQHX3VnbA8vyMXa3pfqxb0i1CRXZWZb6w1U1snYOT40JvQ4+NVI0Lxi865NliTisMRHChOVSNaUUscCSKtyXq7LRdP6fDNvYPw3G85vftbzRtg6TrUAKxXe+s3q4dF/mQdC5bJtFTe362qB4tELVURKWAthhNc87+OhSw2V33htXleWgzMulaHQfFfj0ufhYfCpb4XySJHc9Zv7a63aQqKh0+xNRR8kiZ1K2sYhqeBI1xVHPi+xdV0upX3/w8yJ8fCiIYIrfCLPIaZH4n9rxnx7nlQQVH4YLHpTLW8YV8A0W1Ye4PO7sZiU/ylFca4mSP8yl5yvv/O4sZcSmw8/iW8bXdSTcjDiFgUz/AcH6WZQ=)

### 状态机

[状态机](https://en.wikipedia.org/wiki/Finite-state_machine)是一种数据模型，用于描述应用可能处于的所有可能状态，以及从一种状态转换到另一种状态的所有可能方式。虽然对于简单的组件来说，这可能有些小题大做了，但它的确可以使得复杂的状态流更加健壮和易于管理。

[XState](https://xstate.js.org/) 是 JavaScript 中一个比较常用的状态机实现方案。这里是集成它的一个例子：

```js
import { createMachine, interpret } from 'xstate'
import { shallowRef } from 'vue'

export function useMachine(options) {
  const machine = createMachine(options)
  const state = shallowRef(machine.initialState)
  const service = interpret(machine)
    .onTransition((newState) => (state.value = newState))
    .start()
  const send = (event) => service.send(event)

  return [state, send]
}
```

[在演练场中尝试一下](https://play.vuejs.org/#eNp1U81unDAQfpWRL7DSFqqqUiXEJumhyqVVpDa3ugcKZtcJjC1syEqId8/YBu/uIRcEM9/P/DGz71pn0yhYwUpTD1JbMMKO+o6j7LUaLMwwGvGrqk8SBSzQDqqHJMv7EMleTMIRgGOt0Fj4a2xlxZ5EsPkHhytuOjucbApIrDoeO5HsfQCllVVHUYlVbeW0xr2OKcCzHCwkKQAK3fP56fHx5w/irSyqbfFMgA+h0cKBHZYey45jmYfeqWv6sKLXHbnTF0D5f7RWITzUnaxfD5y5ztIkSCY7zjwKYJ5DyVlf2fokTMrZ5sbZDu6Bs6e25QwK94b0svgKyjwYkEyZR2e2Z2H8n/pK04wV0oL8KEjWJwxncTicnb23C3F2slabIs9H1K/HrFZ9HrIPX7Mv37LPuTC5xEacSfa+V83YEW+bBfleFkuW8QbqQZDEuso9rcOKQQ/CxosIHnQLkWJOVdept9+ijSA6NEJwFGePaUekAdFwr65EaRcxu9BbOKq1JDqnmzIi9oL0RRDu4p1u/ayH9schrhlimGTtOLGnjeJRAJnC56FCQ3SFaYriLWjA4Q7SsPOp6kYnEXMbldKDTW/ssCFgKiaB1kusBWT+rkLYjQiAKhkHvP2j3IqWd5iMQ+M=)

### RxJS

[RxJS](https://rxjs.dev/) 是一个用于处理异步事件流的库。[VueUse](https://vueuse.org/) 库提供了 [`@vueuse/rxjs`](https://vueuse.org/rxjs/readme.html) 扩展来支持连接 RxJS 流与 Vue 的响应性系统。

## 与信号 (signal) 的联系

很多其他框架已经引入了与 Vue 组合式 API 中的 ref 类似的响应性基础类型，并称之为“信号”：

- [Solid 信号](https://www.solidjs.com/docs/latest/api#createsignal)
- [Angular 信号](https://github.com/angular/angular/discussions/49090)
- [Preact 信号](https://preactjs.com/guide/v10/signals/)
- [Qwik 信号](https://qwik.builder.io/docs/components/state/#usesignal)

从根本上说，信号是与 Vue 中的 ref 相同的响应性基础类型。它是一个在访问时跟踪依赖、在变更时触发副作用的值容器。这种基于响应性基础类型的范式在前端领域并不是一个特别新的概念：它可以追溯到十多年前的 [Knockout observables](https://knockoutjs.com/documentation/observables.html) 和 [Meteor Tracker](https://docs.meteor.com/api/tracker.html) 等实现。Vue 的选项式 API 和 React 的状态管理库 [MobX](https://mobx.js.org/) 也是基于同样的原则，只不过将基础类型这部分隐藏在了对象属性背后。

虽然这并不是信号的必要特征，但如今这个概念经常与细粒度订阅和更新的渲染模型一起讨论。由于使用了虚拟 DOM，Vue 目前[依靠编译器来实现类似的优化](https://cn.vuejs.org/guide/extras/rendering-mechanism.html#compiler-informed-virtual-dom)。然而，我们也在探索一种新的受 Solid 启发的编译策略 (Vapor Mode)，它不依赖于虚拟 DOM，而是更多地利用 Vue 的内置响应性系统。

### API 设计权衡

Preact 和 Qwik 的信号设计与 Vue 的 [shallowRef](https://cn.vuejs.org/api/reactivity-advanced.html#shallowref) 非常相似：三者都通过 `.value` 属性提供了一个更改接口。我们将重点讨论 Solid 和 Angular 的信号。

#### Solid Signals

Solid 的 `createSignal()` API 设计强调了读/写隔离。信号通过一个只读的 getter 和另一个单独的 setter 暴露：

```js
const [count, setCount] = createSignal(0)

count() // 访问值
setCount(1) // 更新值
```

注意到 `count` 信号在没有 setter 的情况也能传递。这就保证了除非 setter 也被明确暴露，否则状态永远不会被改变。这种更冗长的语法带来的安全保证的合理性取决于项目的要求和个人品味——但如果你喜欢这种 API 风格，可以轻易地在 Vue 中复制它：

```js
import { shallowRef, triggerRef } from 'vue'

export function createSignal(value, options) {
  const r = shallowRef(value)
  const get = () => r.value
  const set = (v) => {
    r.value = typeof v === 'function' ? v(r.value) : v
    if (options?.equals === false) triggerRef(r)
  }
  return [get, set]
}
```

[在演练场中尝试一下](https://play.vuejs.org/#eNpdUk1TgzAQ/Ss7uQAjgr12oNXxH+ix9IAYaDQkMV/qMPx3N6G0Uy9Msu/tvn2PTORJqcI7SrakMp1myoKh1qldI9iopLYwQadpa+krG0TLYYZeyxGSojSSs/d7E8vFh0ka0YhOCmPh0EknbB4mPYfTEeqbIelD1oiqXPRQCS+WjoojAW8A1Wmzm1A39KYZzHNVYiUib85aKeCx46z7rBuySqQe6h14uINN1pDIBWACVUcqbGwtl17EqvIiR3LyzwcmcXFuTi3n8vuF9jlYzYaBajxfMsDcomv6E/m9E51luN2NV99yR3OQKkAmgykss+SkMZerxMLEZFZ4oBYJGAA600VEryAaD6CPaJwJKwnr9ldR2WMedV1Dsi6WwB58emZlsAV/zqmH9LzfvqBfruUmNvZ4QN7VearjenP4aHwmWsABt4x/+tiImcx/z27Jqw==)

#### Angular 信号

Angular 正在经历一些底层的变化，它放弃了脏检查，并引入了自己的响应性基础类型实现。Angular 的信号 API 看起来像这样：

```js
const count = signal(0)

count() // 访问值
count.set(1) //设置值
count.update((v) => v + 1) // 通过前值更新

// 对具有相同身份的深层对象进行更改
const state = signal({ count: 0 })
state.mutate((o) => {
  o.count++
})
```

同样，我们可以轻易地在 Vue 中复制这个 API：

```js
import { shallowRef, triggerRef } from 'vue'

export function signal(initialValue) {
  const r = shallowRef(initialValue)
  const s = () => r.value
  s.set = (value) => {
    r.value = value
  }
  s.update = (updater) => {
    r.value = updater(r.value)
  }
  s.mutate = (mutator) => {
    mutator(r.value)
    triggerRef(r)
  }
  return s
}
```

[在演练场中尝试一下](https://play.vuejs.org/#eNp9UslOwzAQ/ZVRLiRQEsqxpBUIvoADp0goTd3U4DiWl4AU5d8ZL3E3iZtn5r1Z3vOYvAiRD4Ykq6RUjaRCgyLaiE3FaSd6qWEERVteswU0fSeMJjuYYC/7Dm7youatYbW895D8S91UvOJNz5VGuOEa1oGePmRzYdebLSNYmRumaQbrjSfg8xYeEVsWfh/cBANNOsFqTTACKA/LzavrTtUKxjEyp6kssDZj3vygAPJjL1Bbo3XP4blhtPleV4nrlBuxw1npYLca4A6WWZU4PADljSQd4drRC8//rxfKaW+f+ZJg4oJbFvG8ZJFcaYreHL041Iz1P+9kvwAtadsS6d7Rm1rB55VRaLAzhvy6NnvDG01x1WAN5VTTmn3UzJAMRrudd0pa++LEc9wRpRDlHZT5YGu2pOzhWHAJWxvnakxOHufFxqx/4MxzcEinIYP+eV5ntOe5Rx94IYjopxOZUhnIEr+4xPMrjuG1LPFftkTj5DNJGhwYBZ4BJz3DV56FmJLpD1DrKXU=)

与 Vue 的 ref 相比，Solid 和 Angular 基于 getter 的 API 风格在 Vue 组件中使用时提供了一些有趣的权衡：

- `()` 比 `.value` 略微省事，但更新值却更冗长；
- 没有 ref 解包：总是需要通过 `()` 来访问值。这使得值的访问在任何地方都是一致的。这也意味着你可以将原始信号作为组件的参数传递下去。

这些 API 风格是否适合你，在某种程度上是主观的。我们在这里的目标是展示这些不同的 API 设计之间的基本相似性和取舍。我们还想说明 Vue 是灵活的：你并没有真正被限定在现有的 API 中。如有必要，你可以创建你自己的响应性基础 API，以满足更多的具体需求。

# 渲染机制

Vue 是如何将一份模板转换为真实的 DOM 节点的，又是如何高效地更新这些节点的呢？我们接下来就将尝试通过深入研究 Vue 的内部渲染机制来解释这些问题。

## 虚拟 DOM

你可能已经听说过“虚拟 DOM”的概念了，Vue 的渲染系统正是基于这个概念构建的。

虚拟 DOM (Virtual DOM，简称 VDOM) 是一种编程概念，意为将目标所需的 UI 通过数据结构“虚拟”地表示出来，保存在内存中，然后将真实的 DOM 与之保持同步。这个概念是由 [React](https://reactjs.org/) 率先开拓，随后被许多不同的框架采用，当然也包括 Vue。

与其说虚拟 DOM 是一种具体的技术，不如说是一种模式，所以并没有一个标准的实现。我们可以用一个简单的例子来说明：

```js
const vnode = {
  type: 'div',
  props: {
    id: 'hello'
  },
  children: [
    /* 更多 vnode */
  ]
}
```

这里所说的 `vnode` 即一个纯 JavaScript 的对象 (一个“虚拟节点”)，它代表着一个 `<div>` 元素。它包含我们创建实际元素所需的所有信息。它还包含更多的子节点，这使它成为虚拟 DOM 树的根节点。

一个运行时渲染器将会遍历整个虚拟 DOM 树，并据此构建真实的 DOM 树。这个过程被称为**挂载** (mount)。

如果我们有两份虚拟 DOM 树，渲染器将会有比较地遍历它们，找出它们之间的区别，并应用这其中的变化到真实的 DOM 上。这个过程被称为**更新** (patch)，又被称为“比对”(diffing) 或“协调”(reconciliation)。

虚拟 DOM 带来的主要收益是它让开发者能够灵活、声明式地创建、检查和组合所需 UI 的结构，同时只需把具体的 DOM 操作留给渲染器去处理。

## 渲染管线

从高层面的视角看，Vue 组件挂载时会发生如下几件事：

1. **编译**：Vue 模板被编译为**渲染函数**：即用来返回虚拟 DOM 树的函数。这一步骤可以通过构建步骤提前完成，也可以通过使用运行时编译器即时完成。
2. **挂载**：运行时渲染器调用渲染函数，遍历返回的虚拟 DOM 树，并基于它创建实际的 DOM 节点。这一步会作为[响应式副作用](https://cn.vuejs.org/guide/extras/reactivity-in-depth.html)执行，因此它会追踪其中所用到的所有响应式依赖。
3. **更新**：当一个依赖发生变化后，副作用会重新运行，这时候会创建一个更新后的虚拟 DOM 树。运行时渲染器遍历这棵新树，将它与旧树进行比较，然后将必要的更新应用到真实 DOM 上去。

![render pipeline](https://cn.vuejs.org/assets/render-pipeline.03805016.png)

## 模板 vs. 渲染函数

Vue 模板会被预编译成虚拟 DOM 渲染函数。Vue 也提供了 API 使我们可以不使用模板编译，直接手写渲染函数。在处理高度动态的逻辑时，渲染函数相比于模板更加灵活，因为你可以完全地使用 JavaScript 来构造你想要的 vnode。

那么为什么 Vue 默认推荐使用模板呢？有以下几点原因：

1. 模板更贴近实际的 HTML。这使得我们能够更方便地重用一些已有的 HTML 代码片段，能够带来更好的可访问性体验、能更方便地使用 CSS 应用样式，并且更容易使设计师理解和修改。
2. 由于其确定的语法，更容易对模板做静态分析。这使得 Vue 的模板编译器能够应用许多编译时优化来提升虚拟 DOM 的性能表现 (下面我们将展开讨论)。

在实践中，模板对大多数的应用场景都是够用且高效的。渲染函数一般只会在需要处理高度动态渲染逻辑的可重用组件中使用。想了解渲染函数的更多使用细节可以去到[渲染函数 & JSX](https://cn.vuejs.org/guide/extras/render-function.html) 章节继续阅读。

## 带编译时信息的虚拟 DOM

虚拟 DOM 在 React 和大多数其他实现中都是纯运行时的：更新算法无法预知新的虚拟 DOM 树会是怎样，因此它总是需要遍历整棵树、比较每个 vnode 上 props 的区别来确保正确性。另外，即使一棵树的某个部分从未改变，还是会在每次重渲染时创建新的 vnode，带来了大量不必要的内存压力。这也是虚拟 DOM 最受诟病的地方之一：这种有点暴力的更新过程通过牺牲效率来换取声明式的写法和最终的正确性。

但实际上我们并不需要这样。在 Vue 中，框架同时控制着编译器和运行时。这使得我们可以为紧密耦合的模板渲染器应用许多编译时优化。编译器可以静态分析模板并在生成的代码中留下标记，使得运行时尽可能地走捷径。与此同时，我们仍旧保留了边界情况时用户想要使用底层渲染函数的能力。我们称这种混合解决方案为**带编译时信息的虚拟 DOM**。

下面，我们将讨论一些 Vue 编译器用来提高虚拟 DOM 运行时性能的主要优化：

### 静态提升

在模板中常常有部分内容是不带任何动态绑定的：

template

```html
<div>
  <div>foo</div> <!-- 需提升 -->
  <div>bar</div> <!-- 需提升 -->
  <div>{{ dynamic }}</div>
</div>
```

[在模板编译预览中查看](https://template-explorer.vuejs.org/#eyJzcmMiOiI8ZGl2PlxuICA8ZGl2PmZvbzwvZGl2PiA8IS0tIGhvaXN0ZWQgLS0+XG4gIDxkaXY+YmFyPC9kaXY+IDwhLS0gaG9pc3RlZCAtLT5cbiAgPGRpdj57eyBkeW5hbWljIH19PC9kaXY+XG48L2Rpdj5cbiIsIm9wdGlvbnMiOnsiaG9pc3RTdGF0aWMiOnRydWV9fQ==)

`foo` 和 `bar` 这两个 div 是完全静态的，没有必要在重新渲染时再次创建和比对它们。Vue 编译器自动地会提升这部分 vnode 创建函数到这个模板的渲染函数之外，并在每次渲染时都使用这份相同的 vnode，渲染器知道新旧 vnode 在这部分是完全相同的，所以会完全跳过对它们的差异比对。

此外，当有足够多连续的静态元素时，它们还会再被压缩为一个“静态 vnode”，其中包含的是这些节点相应的纯 HTML 字符串。([示例](https://template-explorer.vuejs.org/#eyJzcmMiOiI8ZGl2PlxuICA8ZGl2IGNsYXNzPVwiZm9vXCI+Zm9vPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJmb29cIj5mb288L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImZvb1wiPmZvbzwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiZm9vXCI+Zm9vPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJmb29cIj5mb288L2Rpdj5cbiAgPGRpdj57eyBkeW5hbWljIH19PC9kaXY+XG48L2Rpdj4iLCJzc3IiOmZhbHNlLCJvcHRpb25zIjp7ImhvaXN0U3RhdGljIjp0cnVlfX0=))。这些静态节点会直接通过 `innerHTML` 来挂载。同时还会在初次挂载后缓存相应的 DOM 节点。如果这部分内容在应用中其他地方被重用，那么将会使用原生的 `cloneNode()` 方法来克隆新的 DOM 节点，这会非常高效。

### 更新类型标记

对于单个有动态绑定的元素来说，我们可以在编译时推断出大量信息：

```html
<!-- 仅含 class 绑定 -->
<div :class="{ active }"></div>

<!-- 仅含 id 和 value 绑定 -->
<input :id="id" :value="value">

<!-- 仅含文本子节点 -->
<div>{{ dynamic }}</div>
```

[在模板编译预览中查看](https://template-explorer.vuejs.org/#eyJzcmMiOiI8ZGl2IDpjbGFzcz1cInsgYWN0aXZlIH1cIj48L2Rpdj5cblxuPGlucHV0IDppZD1cImlkXCIgOnZhbHVlPVwidmFsdWVcIj5cblxuPGRpdj57eyBkeW5hbWljIH19PC9kaXY+Iiwib3B0aW9ucyI6e319)

在为这些元素生成渲染函数时，Vue 在 vnode 创建调用中直接编码了每个元素所需的更新类型：

```js
createElementVNode("div", {
  class: _normalizeClass({ active: _ctx.active })
}, null, 2 /* CLASS */)
```

最后这个参数 `2` 就是一个[更新类型标记 (patch flag)](https://github.com/vuejs/core/blob/main/packages/shared/src/patchFlags.ts)。一个元素可以有多个更新类型标记，会被合并成一个数字。运行时渲染器也将会使用[位运算](https://en.wikipedia.org/wiki/Bitwise_operation)来检查这些标记，确定相应的更新操作：

```js
if (vnode.patchFlag & PatchFlags.CLASS /* 2 */) {
  // 更新节点的 CSS class
}
```

位运算检查是非常快的。通过这样的更新类型标记，Vue 能够在更新带有动态绑定的元素时做最少的操作。

Vue 也为 vnode 的子节点标记了类型。举例来说，包含多个根节点的模板被表示为一个片段 (fragment)，大多数情况下，我们可以确定其顺序是永远不变的，所以这部分信息就可以提供给运行时作为一个更新类型标记。

```js
export function render() {
  return (_openBlock(), _createElementBlock(_Fragment, null, [
    /* children */
  ], 64 /* STABLE_FRAGMENT */))
}
```

运行时会完全跳过对这个根片段中子元素顺序的重新协调过程。

### 树结构打平

再来看看上面这个例子中生成的代码，你会发现所返回的虚拟 DOM 树是经一个特殊的 `createElementBlock()` 调用创建的：

```js
export function render() {
  return (_openBlock(), _createElementBlock(_Fragment, null, [
    /* children */
  ], 64 /* STABLE_FRAGMENT */))
}
```

这里我们引入一个概念“区块”，内部结构是稳定的一个部分可被称之为一个区块。在这个用例中，整个模板只有一个区块，因为这里没有用到任何结构性指令 (比如 `v-if` 或者 `v-for`)。

每一个块都会追踪其所有带更新类型标记的后代节点 (不只是直接子节点)，举例来说：

```html
<div> <!-- root block -->
  <div>...</div>         <!-- 不会追踪 -->
  <div :id="id"></div>   <!-- 要追踪 -->
  <div>                  <!-- 不会追踪 -->
    <div>{{ bar }}</div> <!-- 要追踪 -->
  </div>
</div>
```

编译的结果会被打平为一个数组，仅包含所有动态的后代节点：

```html
div (block root)
- div 带有 :id 绑定
- div 带有 {{ bar }} 绑定
```

当这个组件需要重渲染时，只需要遍历这个打平的树而非整棵树。这也就是我们所说的**树结构打平**，这大大减少了我们在虚拟 DOM 协调时需要遍历的节点数量。模板中任何的静态部分都会被高效地略过。

`v-if` 和 `v-for` 指令会创建新的区块节点：

```html
<div> <!-- 根区块 -->
  <div>
    <div v-if> <!-- if 区块 -->
      ...
    <div>
  </div>
</div>
```

一个子区块会在父区块的动态子节点数组中被追踪，这为他们的父区块保留了一个稳定的结构。

### 对 SSR 激活的影响[

更新类型标记和树结构打平都大大提升了 Vue [SSR 激活](https://cn.vuejs.org/guide/scaling-up/ssr.html#client-hydration)的性能表现：

- 单个元素的激活可以基于相应 vnode 的更新类型标记走更快的捷径。
- 在激活时只有区块节点和其动态子节点需要被遍历，这在模板层面上实现更高效的部分激活。

# [渲染函数 & JSX](https://cn.vuejs.org/guide/extras/render-function.html#render-functions-jsx)

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113153802368.png" alt="image-20231113153802368" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113153850703.png" alt="image-20231113153850703" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113153930067.png" alt="image-20231113153930067" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113154033301.png" alt="image-20231113154033301" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113154056385.png" alt="image-20231113154056385" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113154114329.png" alt="image-20231113154114329" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113154203402.png" alt="image-20231113154203402" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113154225415.png" alt="image-20231113154225415" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113154244905.png" alt="image-20231113154244905" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113154412164.png" alt="image-20231113154412164" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113154514655.png" alt="image-20231113154514655" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113154535860.png" alt="image-20231113154535860" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113154559340.png" alt="image-20231113154559340" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113154632512.png" alt="image-20231113154632512" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113154650659.png" alt="image-20231113154650659" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113154748530.png" alt="image-20231113154748530" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113154822662.png" alt="image-20231113154822662" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113154925342.png" alt="image-20231113154925342" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113155011060.png" alt="image-20231113155011060" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113155041487.png" alt="image-20231113155041487" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113155108018.png" alt="image-20231113155108018" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113154854296.png" alt="image-20231113154854296" style="zoom:80%;" />

# [Vue 与 Web Components](https://cn.vuejs.org/guide/extras/web-components.html#vue-and-web-components)

# [动画技巧](https://cn.vuejs.org/guide/extras/animation.html#animation-techniques)

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113144157002.png" alt="image-20231113144157002" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113144258874.png" alt="image-20231113144258874" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113144617736.png" alt="image-20231113144617736" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113144759159.png" alt="image-20231113144759159" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113144719064.png" alt="image-20231113144719064" style="zoom:80%;" />

css中可以通过transition，animation，transform添加动画

Vue 提供了 [`<Transition>`](https://cn.vuejs.org/guide/built-ins/transition.html) 和 [`<TransitionGroup>`](https://cn.vuejs.org/guide/built-ins/transition-group.html) 组件来处理元素进入、离开和列表顺序变化的过渡效果。但除此之外，还有许多其他制作网页动画的方式在 Vue 应用中也适用。这里我们会探讨一些额外的技巧。

## 基于 CSS class 的动画

对于那些不是正在进入或离开 DOM 的元素，我们可以通过给它们动态添加 CSS class 来触发动画：

```js
const disabled = ref(false)

function warnDisabled() {
  disabled.value = true
  setTimeout(() => {
    disabled.value = false
  }, 1500)
}
```

```html
<div :class="{ shake: disabled }">
  <button @click="warnDisabled">Click me</button>
  <span v-if="disabled">This feature is disabled!</span>
</div>
```

```css
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
```

## 状态驱动的动画

有些过渡效果可以通过动态插值来实现，比如在交互时动态地给元素绑定样式。看下面这个例子：

```js
const x = ref(0)
function onMousemove(e) {
  x.value = e.clientX
}
```

```html
<div
  @mousemove="onMousemove"
  :style="{ backgroundColor: `hsl(${x}, 80%, 50%)` }"
  class="movearea"
>
  <p>Move your mouse across this div...</p>
  <p>x: {{ x }}</p>
</div>
```

```css
.movearea {
  transition: 0.3s background-color ease;
}
```



除了颜色外，你还可以使用样式绑定 CSS transform、宽度或高度。你甚至可以通过运用弹性物理模拟为 SVG 添加动画，毕竟它们也只是 attribute 的数据绑定：

## 基于侦听器的动画

通过发挥一些创意，我们可以基于一些数字状态，配合侦听器给任何东西加上动画。例如，我们可以将数字本身变成动画：

```js
import { ref, reactive, watch } from 'vue'
import gsap from 'gsap'
const number = ref(0)
const tweened = reactive({
  number: 0
})
watch(number, (n) => {
  gsap.to(tweened, { duration: 0.5, number: Number(n) || 0 })
})
```

```html
Type a number: <input v-model.number="number" />
<p>{{ tweened.number.toFixed(0) }}</p>
```

# 自定义指令

## 介绍

除了 Vue 内置的一系列指令 (比如 `v-model` 或 `v-show`) 之外，Vue 还允许你注册自定义的指令 (Custom Directives)。

我们已经介绍了两种在 Vue 中重用代码的方式：[组件](https://cn.vuejs.org/guide/essentials/component-basics.html)和[组合式函数](https://cn.vuejs.org/guide/reusability/composables.html)。组件是主要的构建模块，而组合式函数则侧重于有状态的逻辑。另一方面，自定义指令主要是为了重用涉及普通元素的底层 DOM 访问的逻辑。

一个自定义指令由一个包含类似组件生命周期钩子的对象来定义。钩子函数会接收到指令所绑定元素作为其参数。下面是一个自定义指令的例子，当一个 input 元素被 Vue 插入到 DOM 中后，它会被自动聚焦：

```vue
<script setup>
// 在模板中启用 v-focus
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <input v-focus />
</template>
```

假设你还未点击页面中的其他地方，那么上面这个 input 元素应该会被自动聚焦。该指令比 `autofocus` attribute 更有用，因为它不仅仅可以在页面加载完成后生效，还可以在 Vue 动态插入元素后生效。

在 `<script setup>` 中，任何以 `v` 开头的驼峰式命名的变量都可以被用作一个自定义指令。在上面的例子中，`vFocus` 即可以在模板中以 `v-focus` 的形式使用。

在没有使用 `<script setup>` 的情况下，自定义指令需要通过 `directives` 选项注册：

```js
export default {
  setup() {
    /*...*/
  },
  directives: {
    // 在模板中启用 v-focus
    focus: {
      /* ... */
    }
  }
}
```

将一个自定义指令全局注册到应用层级也是一种常见的做法：

```js
const app = createApp({})

// 使 v-focus 在所有组件中都可用
app.directive('focus', {
  /* ... */
})
```

只有当所需功能只能通过直接的 DOM 操作来实现时，才应该使用自定义指令。其他情况下应该尽可能地使用 `v-bind` 这样的内置指令来声明式地使用模板，这样更高效，也对服务端渲染更友好。

## 指令钩子

一个指令的定义对象可以提供几种钩子函数 (都是可选的)：

```js
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {}
}
```

### 钩子参数

指令的钩子会传递以下几种参数：

- `el`：指令绑定到的元素。这可以用于直接操作 DOM。
- `binding`：一个对象，包含以下属性。
  - `value`：传递给指令的值。例如在 `v-my-directive="1 + 1"` 中，值是 `2`。
  - `oldValue`：之前的值，仅在 `beforeUpdate` 和 `updated` 中可用。无论值是否更改，它都可用。
  - `arg`：传递给指令的参数 (如果有的话)。例如在 `v-my-directive:foo` 中，参数是 `"foo"`。
  - `modifiers`：一个包含修饰符的对象 (如果有的话)。例如在 `v-my-directive.foo.bar` 中，修饰符对象是 `{ foo: true, bar: true }`。
  - `instance`：使用该指令的组件实例。
  - `dir`：指令的定义对象。
- `vnode`：代表绑定元素的底层 VNode。
- `prevNode`：代表之前的渲染中指令所绑定元素的 VNode。仅在 `beforeUpdate` 和 `updated` 钩子中可用。

举例来说，像下面这样使用指令：

```html
<div v-example:foo.bar="baz">
```

`binding` 参数会是一个这样的对象：

```js
{
  arg: 'foo',
  modifiers: { bar: true },
  value: /* `baz` 的值 */,
  oldValue: /* 上一次更新时 `baz` 的值 */
}
```

和内置指令类似，自定义指令的参数也可以是动态的。举例来说：

```html
<div v-example:[arg]="value"></div>
```

这里指令的参数会基于组件的 `arg` 数据属性响应式地更新。

除了 `el` 外，其他参数都是只读的，不要更改它们。若你需要在不同的钩子间共享信息，推荐通过元素的 [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) attribute 实现。

## 简化形式

对于自定义指令来说，一个很常见的情况是仅仅需要在 `mounted` 和 `updated` 上实现相同的行为，除此之外并不需要其他钩子。这种情况下我们可以直接用一个函数来定义指令，如下所示：

```
<div v-color="color"></div>
```

```js
app.directive('color', (el, binding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  el.style.color = binding.value
})
```

## 对象字面量

如果你的指令需要多个值，你可以向它传递一个 JavaScript 对象字面量。别忘了，指令也可以接收任何合法的 JavaScript 表达式。

```html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

```js
app.directive('demo', (el, binding) => {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text) // => "hello!"
})
```

## 在组件上使用

当在组件上使用自定义指令时，它会始终应用于组件的根节点，和[透传 attributes](https://cn.vuejs.org/guide/components/attrs.html) 类似。

```
<MyComponent v-demo="test" />
```

```html
<!-- MyComponent 的模板 -->

<div> <!-- v-demo 指令会被应用在此处 -->
  <span>My component content</span>
</div>
```

需要注意的是组件可能含有多个根节点。当应用到一个多根组件时，指令将会被忽略且抛出一个警告。和 attribute 不同，指令不能通过 `v-bind="$attrs"` 来传递给一个不同的元素。总的来说，**不**推荐在组件上使用自定义指令。

# 混合

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113161218891.png" alt="image-20231113161218891" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113161339967.png" alt="image-20231113161339967" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113161525954.png" alt="image-20231113161525954" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113161650752.png" alt="image-20231113161650752" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231113162355874.png" alt="image-20231113162355874" style="zoom:80%;" />



# 路由

## 客户端 vs. 服务端路由

服务端路由指的是服务器根据用户访问的 URL 路径返回不同的响应结果。当我们在一个传统的服务端渲染的 web 应用中点击一个链接时，浏览器会从服务端获得全新的 HTML，然后重新加载整个页面。

然而，在[单页面应用](https://developer.mozilla.org/en-US/docs/Glossary/SPA)中，客户端的 JavaScript 可以拦截页面的跳转请求，动态获取新的数据，然后在无需重新加载的情况下更新当前页面。这样通常可以带来更顺滑的用户体验，尤其是在更偏向“应用”的场景下，因为这类场景下用户通常会在很长的一段时间中做出多次交互。

在这类单页应用中，“路由”是在客户端执行的。一个客户端路由器的职责就是利用诸如 [History API](https://developer.mozilla.org/en-US/docs/Web/API/History) 或是 [`hashchange` 事件](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event)这样的浏览器 API 来管理应用当前应该渲染的视图。

## 官方路由

在 Vue School 上观看免费的视频课程

Vue 很适合用来构建单页面应用。对于大多数此类应用，都推荐使用官方支持的[路由库](https://github.com/vuejs/router)。要了解更多细节，请查看 [Vue Router 的文档](https://router.vuejs.org/zh/)。

## 从头开始实现一个简单的路由

如果你只需要一个简单的页面路由，而不想为此引入一整个路由库，你可以通过[动态组件](https://cn.vuejs.org/guide/essentials/component-basics.html#dynamic-components)的方式，监听浏览器 [`hashchange` 事件](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event)或使用 [History API](https://developer.mozilla.org/en-US/docs/Web/API/History) 来更新当前组件。

下面是一个简单的例子：

```HTML
<script setup>
import { ref, computed } from 'vue'
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'
const routes = {
  '/': Home,
  '/about': About
}
const currentPath = ref(window.location.hash)
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})
const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>
<template>
  <a href="#/">Home</a> |
  <a href="#/about">About</a> |
  <a href="#/non-existent-path">Broken Link</a>
  <component :is="currentView" />
</template>
```

**推荐的前后端同步的框架axios**

# [状态管理](https://cn.vuejs.org/guide/scaling-up/state-management.html#state-management)

# [测试](https://cn.vuejs.org/guide/scaling-up/testing.html#testing)

# [服务端渲染 (SSR)](https://cn.vuejs.org/guide/scaling-up/ssr.html#server-side-rendering-ssr)



1. Vue 是通过什么方式检测 data 变化？

   > 在 Vue 中，通过使用getter 和 setter 以及watcher函数的监听来实现当 data 对象中的属性发生变化时，Vue 会自动追踪这些变化，并在需要更新相关的 DOM 元素时进行重新渲染。每个组件实例都对应一个watcher实例，它会在组件渲染的过程中把“接触过” 的数据的property记录为依赖，之后当依赖项的setter触发时，会通知watcher，从而使它相关联的组件重新渲染。
   >
   > Vue 会遍历vue对象所有的 property，并使用 Object.defineProperty 把这些 property 全部转为 getter/setter。在访问修改data中的属性时，vue劫持data属性变化触发的getter setter函数，watcher监听到后，激发组件渲染函数渲染虚拟dom，虚拟DOM和实际DOM对比，将差异重新渲染到实际DOM上。

2. 以下过渡类名各是在什么时候添加的？

   1. `v-enter`：定义进入过渡的开始状态，在元素被插入时生效，在下一个帧移除
   2. `v-enter-active`：定义过渡的状态，在元素整个过度过程中作用，在元素被插入时生效，在进入动画完成之后移除
   3. `v-enter-to`:定义进入过渡的结束状态，在元素被插入一帧后生效在动画完成之后移除
   4. `v-leave`:定义离开过渡的开始状态，在离开过渡被触发时生效，下一个帧移除
   5. `v-leave-active`:定义过渡的状态，在元素整个过度过程中作用，在离开过渡被触发后立即生效，在离开动画完成之后移除
   6. `v-leave-to`:定义离开过渡的结束状态，在离开过渡被触发一帧后生效在动画完成之后移除

3. render 函数有什么用？Vue 是如何编译 template ？

   > Vue中的 `render` 函数用于定义组件应该渲染的虚拟DOM结构和内容。它是使用JavaScript代码直接描述组件UI的一种方式，与使用模板的方式相对应。   
   >
   > 关于Vue如何编译模板，主要包括以下几个步骤：   
   >
   > 1. 解析：模板代码被解析并转换为抽象语法树（AST）表示形式。   
   >
   > 2. 优化：对AST进行优化，识别可以缓存的静态子树，以提升性能。   
   >
   > 3. 代码生成：使用优化后的AST生成JavaScript的渲染函数。这些函数负责创建虚拟DOM节点并渲染组件的UI。   
   >
   >    在运行时，Vue使用这些生成的渲染函数基于组件的数据和状态来创建和更新实际的DOM。   
   >
   >    值得注意的是，Vue还提供了模板编译器，可以在构建时预先编译模板，从而在运行时消除模板编译的需求，从而获得更好的性能。
   >
   > render：渲染函数，能够结合js语法来生成虚拟dom。
   > 编译：Vue 模板被编译为渲染函数：即用来返回虚拟 DOM 树的函数。这一步骤可以通过构建步骤提前完成，也可以通过使用运行时编译器即时完成。
   > 挂载：运行时渲染器调用渲染函数，遍历返回的虚拟 DOM 树，并基于它创建实际的 DOM 节点。这一步会作为响应式副作用执行，因此它会追踪其中所用到的所有响应式依赖。
   > 更新：当一个依赖发生变化后，副作用会重新运行，这时候会创建一个更新后的虚拟 DOM 树。运行时渲染器遍历这棵新树，将它与旧树进行比较，然后将必要的更新应用到真实 DOM 上去
   >
   > ```
   > render函数是操作的虚拟DOM。Vue是通过template来创建HTML的，但是有时特诉情况下，这种模式无法满足需求，此时就需要用render函数来创建HTML。render函数的实质就是生成template模板。
   > 
   > 因为vue中的模板template无法被浏览器解析并渲染，所以需要将template转化为一个js函数，这样浏览器就可以执行这一个函数并渲染出对应的HTML元素。模板编译分为3个阶段：解析，优化，生成，最终生成可执行render函数。
   > （1）解析阶段：使用大量的正则表达式对template字符串进行解析，将标签、指令、属性等转换为抽象语法树AST；
   > （2）优化阶段：遍历AST，找到其中的一些静态节点并进行标记，方便在页面重渲染时进行diff，直接跳过这一些静态节点，优化runtime的性能；
   > （3）生成阶段：将最终的AST转化为render函数字符串。
   > ```

4. 指令(directive)是如何声明？如何使用？

   > ```js
   > // 使 v-focus 在所有组件中都可用
   > Vue.directive('focus', {
   >   //当绑定元素插入DOM中
   >     inserted:function(el){
   >         //聚焦元素
   >         el.focus()
   >     }
   > })
   > ```
   >
   > 在Vue中，指令可以通过在模板中使用特殊的属性来声明和使用。指令通常以 `v-` 开头，后面跟着指令的名称。例如， `v-bind` 用于绑定数据， `v-on` 用于监听事件。   自定义指令的使用方式如下：
   >
   > ```html
   > <input v-focus>
   > ```
   >
   > 
   >
   > 下面是一个自定义指令的示例，它会将绑定元素的背景色设置为红色：
   >
   > ```javascript
   > Vue.directive('red-background', {
   >   bind: function(el) {
   >     el.style.backgroundColor = 'red';
   >   }
   > });
   > ```
   >
   > 在模板中使用这个自定义指令时，可以通过在元素上使用 `v-red-background` 来绑定指令：
   >
   > ```html
   > <div v-red-background>Custom Directive Example</div>
   > ```
   >
   > 这样，当这个元素被渲染时，它的背景色就会被设置为红色。   除了 `bind` 钩子函数，你还可以使用其他钩子函数来定义自定义指令的行为，例如 `inserted` 、 `update` 和 `unbind` 等。 

5. 如下代码会打印什么？

   ```javascript
   var mixin = {
      created: function () {
         console.log('混合对象的钩子被调用')
      }
   }
   new Vue({
      mixins: [mixin],
      created: function () {
         console.log('组件钩子被调用')
      }
   })
   ```

   > 混合对象的钩子被调用
   >
   > 组件钩子被调用
   >
   > 

## 代码题

1. 请实现全局混合，当组件创建(created)的时候打印 `created`

   > ```js
   > Vue.mixin({
   >   created: function() {
   >     console.log('created');
   >   }
   > });
   > 
   > new Vue({
   >   el: '#app',
   >   // ...
   > });
   > ```
   >
   > 

2. 请手动将如下 template 转化为与之等价的 `render` 函数

   ```html
   <div>
      <h1>I'm a template!</h1>
      <p v-if="message">
         {{ message }}
      </p>
      <p v-else>
         No message.
      </p>
   </div>
   ```

   ```html
   Vue.component('anchored-heading',{
   	render:funciton(createElement){
   		createElement('h1','I\'m a template!''),
           if(this.message){
               return createElement('p',this.message)
           }else {
               return createElement(p,'No message')
           }
   	}
   })
   ```

   ```js
   Vue.component('same-template', {
               data() {
                   return {
                       message: ''
                   }
               },
               render: function (createElement) {
                   var h1 = createElement('h1', "I'm a template!")
                   var p
                   if (this.message) {
                       p = createElement('p', this.message)
                   } else {
                       p = createElement('p', "No message")
                   }
                   return createElement('div', [h1, p])
               }
           })
   ```

   

3. 请完成如下渐变效果
   ![img](http://static.mafengshe.com/work/vue/transation.gif)

```html
```



## 算法题

1. [[9\]Palindrome Number](https://leetcode.com/problems/palindrome-number/)

   回文数判断

   你需要判断一个数是否是回文的。

   一些提示：

   - 负数是回文的吗？
   - 如果你把数转化为字符串，请注意额外的空格
   - 如果你直接逆序 integer，请注意有可能整数会溢出

2. [[6\]ZigZag Conversion](https://leetcode.com/problems/zigzag-conversion)

   曲折转换

   把字符串 `"PAYPALISHIRING"` 写成曲折形式将看起来像下面这样

   ```
   P   A   H   N
   A P L S I I G
   Y   I   R
   ```

   然后我们按行读取结果就是`"PAHNAPLSIIGYIR"`

   你需要完成`convert`函数，convert(“PAYPALISHIRING”, 3) 应该返回 “PAHNAPLSIIGYIR”.