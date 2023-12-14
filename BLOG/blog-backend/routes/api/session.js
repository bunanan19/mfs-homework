const router = require('koa-router')()
const {sequelize, User} = require('../../model')

router.prefix('/session')

router.get('/',async ctx=>{
  let user = await User.findOne({where:{id:ctx.session.userId}})
  ctx.body = {
    err: 0,
    info: null,
    data: user
  }
})

router.post('/', async ctx => {
  const{username,password} = ctx.request.body
  let user = await User.findOne({where:{username}})
  if(!user){
    ctx.body = {
      err: 10004,
      info: '该用户不存在',
      data: user
    }
    return
  }
  if(password!=user.password){
    ctx.body = {
      err: 10005,
      info: '密码错误',
      data: null
    }
    return
  } else {
    ctx.session.userId = user.id
    ctx.session.username = user.username
    ctx.body = {
      err: 0,
      info: null,
      data: user
    }
  }
})

router.delete('/', async ctx => {
  ctx.session = null;
  ctx.body = {
    err: 0,
    info: null,
    data: null
  }
})

module.exports = router