# DOM 实战

## 表单验证

```html
<!-- HTML结构 -->
<form id="signin" action="#" target="_blank">
    <p id="sigin-error" style="color:red"></p>
    <p>
        用户名: <input type="text" id="username" name="username">
    </p>
    <p>
        口令: <input type="password" id="password" name="password">
    </p>
    <p>
        重复口令: <input type="password" id="password-2">
    </p>
    <p>
        <button type="submit">提交</button> <button type="reset">重置</button>
    </p>
</form>
```

利用JavaScript检查用户注册信息是否正确，在以下情况不满足时报错并阻止提交表单：

- 用户名必须是3-10位英文字母或数字；
- 口令必须是6-20位；
- 两次输入口令必须一致。

## 翻页效果

效果如[码蜂社作业管理系统](https://work.mafengshe.com/?class=1)，前端实现根据用户点击实现翻页。

基本原理：前端根据数据，动态更改列表的DOM结构。



## 代码题

1. 完成根据以下 HTML 完成表单验证

   其中验证要求如下：

   - 用户名：以字母开头，6-16个英文字符，数字或下划线

   - 口令：8-20个字符，英文字符，数字，下划线或特殊符号

   - 重复口令：必须和口令一致

     ```html
     <form id="signup" action="#" target="_blank" onsubmit="return onSignupFormSubmit()">
     <p id="signup-error" style="color:red"></p>
     <p>
      用户名:
      <input id="username" type="text" name="username">
     </p>
     <p>
      口令:
      <input type="password" id="password" name="password">
     </p>
     <p>
      重复口令:
      <input type="password" id="password-2">
     </p>
     <p>
      <button type="submit">提交</button>
      <button type="reset">重置</button>
     </p>
     </form>
     ```

1. 完成 [码蜂社作业管理系统](https://work.mafengshe.com/?page=1&class=1) 的翻页效果，要求前端渲染实现。

   不要求完成完整作业管理系统的 UI，与视频中一致即可。

   其中分页链接需要实现动态生成。