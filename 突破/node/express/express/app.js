//引入模块：
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();//创建了一个新的 Express 应用程序实例

// view引擎设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//使用 logger 中间件记录日志：
app.use(logger('dev'));
//使用 express.json() 中间件解析 JSON 数据
app.use(express.json());
//使用 express.urlencoded() 中间件解析 URL 编码的数据
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());//解析 cookie
app.use(express.static(path.join(__dirname, 'public')));//设置静态文件目录：

app.use('/', indexRouter);//使用 indexRouter 路由处理首页请求：
app.use('/users', usersRouter);//处理用户页请求： 

// 使用 catch 中间件捕获 404 错误并转发到 error 中间件处理
app.use(function(req, res, next) {
  next(createError(404));
});

// error 处理器
app.use(function(err, req, res, next) {
  //设置局部变量，仅在开发环境中提供错误信息 
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //渲染错误页面
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;//导出对象app
