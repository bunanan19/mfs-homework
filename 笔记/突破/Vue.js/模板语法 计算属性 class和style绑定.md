

## 问答题

1. 什么是模板？它和真实的DOM有什么关系？
2. 如何使用**插值**语法绑定变量到文本？
3. 如何绑定属性？（请写出缩写和非缩写形式）
4. 如何绑定事件？（请写出缩写和非缩写形式）
5. `v-if` `v-for` 各有什么用？
6. 什么是过滤器（filter），如何声明？如何使用？
7. 什么是计算属性？如何声明？如何使用？
8. 如何绑定 class和style 属性？绑定的对象为`Array`时如何解析？绑定对象为`object`时如何解析？

## 代码题

1. 请使用属性绑定实现一个 `<img>`的`src`属性每隔1s自动变换，以实现图片自动切换。
2. 请自行查阅文档实现：当用户提交表单时，防止页面刷新，并在组件内部使用`ajax`方式提交表单。
3. 请实现 filter `uppercase` 实现将输入字符串转化为大写形式,并在模板中使用这个 filter
4. 假设 Component 中有 `data:{firstName: 'Foo', lastName: 'Bar'}`，请实现模板中 `<div>{{fullname}}</div>` 的 `fullname` 会当 `firstName`，`lastName` 任意一个改变时而改变
5. 假设 Component 中有 `data:{isActive: true}`，请实现模板中某个 `div` class `active`根据 `isActive` 变化而变化。