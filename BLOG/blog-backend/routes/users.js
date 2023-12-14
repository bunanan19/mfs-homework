const router = require('koa-router')()
const User = require('../model/user')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/login-success', async (ctx) => {
  let userid = ctx.session.userId//获取浏览器缓存
  let user = await User.findOne({id: userid})//查找用户
  if(user){//如果用户存在数据库中
    await ctx.render('login-success', {
      username: user.username
    })
  }else {//如果用户已经注销账号
    await ctx.render('login-fail', {
      message: '用户不存在'
    })
  }
})
//登录界面请求
router.get('/login', async (ctx) => {
  let userid = ctx.session.userId
  if(userid){//账户缓存存在，直接加载主页面
    ctx.redirect('/users/login-success')//ctx.redirect()重定向请求，请求到登录成功界面
  }else {//缓存不存在，渲染登陆界面
    await ctx.render('login') 
  }
})
//注册界面
router.get('/signup', async (ctx) => {
  await ctx.render('signup') 
})
//用户登录
router.post('/login', async (ctx) => {
  console.log(ctx.request.body) 
  let {username, password} = ctx.request.body //解构
  let user = await User.findOne({username})//在数据库中查找当前用户
  if (user) {//如果用户存在
    if (user.password === password) {//如果密码正确，登陆成功
      ctx.session.userId = user.id;//设置用户登录缓存
      ctx.redirect('/users/login-success')//ctx.redirect()重定向请求，请求到登录成功界面
      // await ctx.render('login-success', {
      //   username: user.username
      // })
    } else {//密码不正确
      await ctx.render('login-fail', {
        message: '密码错误'
      })
    }
  } else {//用户不存在
    await ctx.render('login-fail', {
      message: '用户不存在'
    })
  }
})
//用户注册
router.post('/signup', async (ctx) => {
  console.log(ctx.request.body) 
  let user = await User.create(ctx.request.body) 
  let exit = await User.findOne({username})
  if (!exit) {
    await ctx.render('signup-success', {
      username: user.username
    })
  } else {
    await ctx.render('signup-fail', {
      message: '用户已存在'
    })
  }
})
//用户登出
router.get('/signout', async (ctx) =>{
  ctx.session = null
  await ctx.render('signout-success')
})
module.exports = router
