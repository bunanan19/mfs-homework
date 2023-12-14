const router = require('koa-router')()
const {sequelize, User} = require('../../model')

router.prefix('/user')

router.get('/', async ctx => {
  let users = await User.findAll()
  ctx.body = {
    err: 1,
    info: 'username has already used',
    data: users
  }
})
router.get('/:id', async ctx => {
  
})
router.post('/', async ctx => {
  const{username,password,email} = ctx.request.body
  let user
  try{
    user = await User.create({username,password,email})
  }
  catch(err){
    ctx.body = {
      err: 1,
      info: 'username has already used',
      data: null
    }
    return
  }
  user = JSON.parse(JSON.stringify(user))
  delete user.password
  ctx.body = {
    err: 0,
    info: null,
    body: user
  }
})
module.exports = router