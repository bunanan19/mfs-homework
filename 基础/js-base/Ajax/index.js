var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/json',function(req,res){
  res.json([ 
    {num: 1, title: '标题0', clickTimes: 0, replyTimes: 0}, 
    {num: 2, title: '标题0', clickTimes: 0, replyTimes: 0}, 
    {num: 3, title: '标题0', clickTimes: 0, replyTimes: 0}, 
    {num: 4, title: '标题0', clickTimes: 0, replyTimes: 0}, 
    {num: 5, title: '标题0', clickTimes: 0, replyTimes: 0}, 
    {num: 6, title: '标题0', clickTimes: 0, replyTimes: 0}, 
    {num: 7, title: '标题0', clickTimes: 0, replyTimes: 0},
    {num: 8, title: '标题0', clickTimes: 0, replyTimes: 0},
    {num: 9, title: '标题0', clickTimes: 0, replyTimes: 0},
    {num: 10, title: '标题0', clickTimes: 0, replyTimes: 0},
    {num: 11, title: '标题0', clickTimes: 0, replyTimes: 0},
    {num: 12, title: '标题0', clickTimes: 0, replyTimes: 0},
    {num: 13, title: '标题0', clickTimes: 0, replyTimes: 0},
    {num: 14, title: '标题0', clickTimes: 0, replyTimes: 0},
    {num: 15, title: '标题0', clickTimes: 0, replyTimes: 0},
    {num: 16, title: '标题0', clickTimes: 0, replyTimes: 0},
    {num: 17, title: '标题0', clickTimes: 0, replyTimes: 0},
    {num: 18, title: '标题0', clickTimes: 0, replyTimes: 0},
    {num: 19, title: '标题0', clickTimes: 0, replyTimes: 0},
    {num: 20, title: '标题0', clickTimes: 0, replyTimes: 0},
    {num: 21, title: '标题0', clickTimes: 0, replyTimes: 0},
    {num: 22, title: '标题0', clickTimes: 0, replyTimes: 0},
  ])
})

module.exports = router;
