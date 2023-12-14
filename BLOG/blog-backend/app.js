const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session')//cookie缓存
// const redisStore = require('koa-redis')

const index = require('./routes/index')
const users = require('./routes/users')
const apiRouter = require('./routes/api/index')

// error handler
onerror(app)

app.keys = ['blog']

// 使用 koa-bodyparser 中间件解析请求体数据
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(session({//使用session中间件，用于处理会话管理
  key: 'blog:koa:session',//设置会话的键，用于在客户端存储会话标识符的 cookie 名称。 
  maxAge: 24 * 60 * 60 * 1000,//设置会话的最大存储时间，24小时
  httpOnly: true,//设置会话 cookie 为仅通过 HTTP 访问，防止客户端脚本访问会话 cookie。 
  // store: redisStore({
  //   all: '127.0.0.1:3000'//配置 Redis 的连接地址和端口。使用本地的Redis服务器，地址为127.0.0.1端口为3000
  // })
},app))
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(async (ctx,next)=>{
  ctx.set({
    "Access-Control-Allow-Origin": "http://localhost:8000",//当请求的credentials mode为'include'时，CORS策略不允许返回的'Access-Control-Allow-Origin'头为'*,应该将其设置为具体的源
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": "true"
  })
  if(ctx.method.toUpperCase() == 'OPTIONS'){
    ctx.body = '接受成功'
  } else {
    await next()
  }
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(apiRouter.routes(), apiRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
