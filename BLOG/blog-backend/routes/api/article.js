const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const { Op } = require("sequelize");

const router = require('koa-router')()
const {sequelize,Article,Tag,User} = require('../../model')
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);
// const clean = DOMPurify.sanitize();

router.prefix('/article')

router.get('/', async (ctx, next) => {

  // 解构语法获取并解析查询参数，并设置默认值，当查询参数为空，变量为默认值
  let {sort =[], offset = 0, pageSize = 10, filter={}} = ctx.request.query;
  //将字符串转为number
  offset = offset ? parseInt(offset) : 0;  
  pageSize = pageSize ? parseInt(pageSize) : null; 
  // 处理sort参数  
  if (sort === 'null' || sort === null ) {  
    sort = [['createdAt', 'DESC']]; // 默认按创建时间降序排序  
  } else {  
    try {  
      // 解析sort参数为一个数组  
      sort = JSON.parse(sort);  
      if (!Array.isArray(sort)) {  
        sort = [sort]; // 如果解析结果不是数组，将其转换为数组  
      }  
    } catch (error) {  
      sort = [['createdAt', 'DESC']]; // 解析失败时使用默认排序方式  
    }  
  }  
  // 处理filter参数
  if (filter === 'null' || filter === null ) {  
    filter = {}; // 默认按创建时间降序排序  
  } else {  
    try {  
      // 解析sort参数为一个数组  
      filter = JSON.parse(filter);  
      if (!Array.isArray(filter)) {  
        filter = [filter]; // 如果解析结果不是数组，将其转换为数组  
      }  
    } catch (error) {  
      filter = {}; // 解析失败时使用默认排序方式  
    }  
  }  
  //URL 参数是以字符串的形式传递的，所以new Date('2023-10-01'),[Op.lt],[Op.gt]只会被当作普通的字符串处理，而不会被解析为JavaScript代码,Sequelize的操作符。
  //为了解决这个问题，需要在后端代码中解析这些特殊的参数，并将它们转换为 Sequelize 查询所需要的格式。
  
  // 解析 filter 中的日期字符串为 Date 对象 
  if (filter.createdAt && filter.createdAt.lt) {  
    filter.createdAt.lt = new Date(filter.createdAt.lt);  
  }  
  if (filter.createdAt && filter.createdAt.gt) {  
    filter.createdAt.gt = new Date(filter.createdAt.gt);  
  }  
    
  // 将 lt 和 gt 转换为 Sequelize 的操作符  
  const { Op } = require('sequelize');  
  if (filter.createdAt && filter.createdAt.lt) {  
    filter.createdAt[Op.lt] = filter.createdAt.lt;  
    delete filter.createdAt.lt;  
  }  
  if (filter.createdAt && filter.createdAt.gt) {  
    filter.createdAt[Op.gt] = filter.createdAt.gt;  
    delete filter.createdAt.gt;  
  }  

  //查询数据库
  let articles = await Article.findAll({
    order: [sort],  
    offset: offset,  
    limit: pageSize,  
    where: filter,
    include:[{model:Tag},{model:User, attributes: ['username']}]
  })

  let total = await Article.count()
  let nextOffset = (offset + pageSize) >= total? null: offset + pageSize

  ctx.body = {
    err: 0,
    info: null,
    //分页器
    pagination: {
      count: articles.length,
      total,
      offset,
      nextOffset,
      pageSize,
    },
    data: articles.map(i => {
      i.content = DOMPurify.sanitize(i.content)
      return i
    })
  }
})

router.get('/:id', async (ctx, next) => {
  if (ctx.request.path === '/all') {    
    // 返回所有文章    
    let articles = await Article.findAll({include:Tag});    
    ctx.body = {    
      err: 0,    
      info: null,    
      data: articles.map(i => {
        i.content = DOMPurify.sanitize(i.content)
        return i
      }),    
    };    
  } else {
    let article = await Article.findOne({
      where:{id:ctx.params.id},
      include:[{model:Tag}]
    })

    if(article){
      article.clickTimes++
      await article.save()
      article.content = DOMPurify.sanitize(article.content)
      ctx.body = {
        err: 0,
        info: null,
        data: article
      }
    } else {
      ctx.body = {
        err: 10001,
        info:'article is not found',
        data: null
      }
    }
  }
})

router.post('/', async (ctx, next) => {
  let {title,tag,content} = ctx.request.body
  let {userId} = ctx.session
  let author = userId
  let article = await Article.create({title,tag,content,author})
  ctx.body = {
    err: 0,
    info: null,
    data: article
  }
})

router.put('/:id', async (ctx, next) => {
  let article = await Article.findOne({where:{id:ctx.params.id}})
  if(article){
    let {title,content,tag} = ctx.request.body
    article.title = title
    article.content = content
    article.tag = tag
    await article.save()

    ctx.body = {
      err: 0,
      info: null,
      data: article
    }
  } else {
    ctx.body = {
      err: 10001,
      info:'article is not found',
      data: null
    }
  }
})

router.delete('/:id', async (ctx, next) => {
  let article = await Article.findOne({where:{id:ctx.params.id}})
  if(article){
    await article.destroy() 
  } 
  ctx.body = {
      err: 0,
      info:'删除成功'
  }
})

module.exports = router
