var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/signup",function(req,res,next){
  res.header({"Access-Control-Allow-Origin":"http://www.a.com:3000"})
  // 检查用户名是否存在
  var username = req.body.username;
  if (username === 'mafengshe') {
    res.send({ errno: 1, errmsg: '用户名已经存在', data: {} });
  } else {
    res.send({ errno: 0, errmsg: '', data: {} });
  }
});

module.exports = router;
