const router = require('koa-router')()

router.prefix('/users')
router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})
// 用于存储用户数据的变量
let users = [
  {name:'a12345',password:'111111'},
  {name:'lili',password:'123456'},
  {name:'sisi',password:'123222'},];

// 注册接口
router.post('/register', async (ctx) => {
    // 获取请求体中的用户名、密码
    const username = ctx.request.body.username;
    const password = ctx.request.body.password;
    // ctx.body ={username, password}

    // 检查用户名是否已存在
    const existing = users.find(i => i.name === username);
    if (existing) {
      ctx.status = 400;
      ctx.body = { message: '用户名已存在', name: username };
      return;
    }
    // 创建新用户对象并添加到用户列表中
    const newUser = {name: username, password: password };
    users.push(newUser);
    ctx.body = { message: '注册成功' , new: newUser};
});

module.exports = router
