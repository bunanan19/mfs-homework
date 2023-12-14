const fs = require('fs')
const router = require('koa-router')()
const User = require('../../model/user')
const Permission = require('../../model/permission')
// const articleRouter = require('./article')
// const lastestArticleRouter = require('./lastestArticle')

router.prefix('/api')
// router.use(async (ctx, next) =>{
//   ctx.set({
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
//     "Access-Control-Alow-Headers": "Content-Type"
//   })
//   if(ctx.method == 'OPTIONS'){
//     ctx.body = ''
//   } else {
//     await next()
//   }
// })

//权限管理
// router.use(async (ctx,next)=>{
//   const{method,url} = ctx.request
//   const userId = ctx.session.userId || 1
//   let user = await User.findOne({where:{id:userId}})
//   let permission = await user.getPermissions()
//   // console.log(permission)
//   if(permission.some(i=>i.method==method && new RegExp(i.path).test(url))){
//     await next()
//   }else{
//     ctx.body = {
//       err: 1,
//       info: 'no permission',
//       data: null
//     }
//   }
// })

fs.readdirSync(__dirname).filter(i=>i != 'index.js').forEach(i => {
  let module = require(`./${i}`)
  router.use(module.routes(),module.allowedMethods())
})

// router.use(articleRouter.routes(),articleRouter.allowedMethods())
// router.use(lastestArticleRouter.routes(),lastestArticleRouter.allowedMethods())

module.exports = router
