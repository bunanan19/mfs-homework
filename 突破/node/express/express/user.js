var express = require('express');
var router = express.Router();

var users=[{
  id:1,
  name:'bala',
  password:123456,
  email:'112@qq.com'
},
{
  id:2,
  name:'ababa',
  password:111111,
  email:'111@qq.com'
}]
// 请求用户数据 
router.get('/user/:id',(req,res,next)=>{
  let user=users.find(u=>u.id===parseInt(req.params.id))
  if(!user) return res.status(404).json({msg:'User Not Found'})
  console.log(user)
  res.send(user)
  res.end()
})
// 上传用户信息
router.post('/login',(req,res,next)=>{
  let mes=req.body
  console.log(mes)
  let user=users.find(u=>u.name===mes.name&&u.password===mes.password)
  if(!user) return res.status(404).json({msg:'User Not Found'})
  res.send({name:mes.name,msg:'登录成功'})
  res.end()
})

//需要提供全部信息
router.put('/update',(req,res,next)=>{
  let mes=req.body
  let use=users.find(u=>u.id===mes.id)
  if(!use) return res.status(404).json({msg:'Not Found'})
  users[mes.id-1]=mes
  res.send({msg:'修改成功'})
  res.end()
})
//删除用户
router.delete('/delete',(req,res,next)=>{
  let mes=req.body
  let user=users.find(u=>u.id===mes.id)
  if(!user) return res.status(404).json({msg:'Not Found'})
  users.splice(user.id-1,1)
  console.log(users)
  res.send({msg:'删除成功'})
  res.end()
})

//只需要提供部分信息
router.patch('/update2',(req,res,next)=>{
  let mes=req.body
  let user=users.find(u=>u.id===mes.id)
  if(!user) return res.status(404).json({msg:'Not Found'})
  users[mes.id-1]=user
  console.log(users)
  res.send({name:mea.name,mas:'修改成功'})
  res.end()
})

module.exports = router;