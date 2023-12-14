const router = require('koa-router')()
const {sequelize,Article,Tag} = require('../../model')

router.prefix('/tag')

router.get('/', async ctx => {
  let tags = await Tag.findAll();
  ctx.body = {
    err: 0,
    info: null,
    data: tags
  }
})
router.get('/:id/article', async ctx => {
  let {id} = ctx.params
  // let {sort =[], offset = 0, pageSize = 10, filter={}} = ctx.request.query;
  // offset = offset ? parseInt(offset) : 0;  
  // pageSize = pageSize ? parseInt(pageSize) : null;  
  // if (sort === 'null' || sort === null ) {  
  //   sort = [['createdAt', 'DESC']]; 
  // } else {  
  //   try {  
  //     sort = JSON.parse(sort);  
  //     if (!Array.isArray(sort)) {  
  //       sort = [sort]; 
  //     }  
  //   } catch (error) {  
  //     sort = [['createdAt', 'DESC']]; 
  //   }  
  // }  
  // // 处理filter参数
  // filter = filter? JSON.parse(filter) : {};  
  // if (filter.createdAt && filter.createdAt.lt) {  
  //   filter.createdAt.lt = new Date(filter.createdAt.lt);  
  // }  
  // if (filter.createdAt && filter.createdAt.gt) {  
  //   filter.createdAt.gt = new Date(filter.createdAt.gt);  
  // }  
  // // 将 lt 和 gt 转换为 Sequelize 的操作符  
  // const { Op } = require('sequelize');  
  // if (filter.createdAt && filter.createdAt.lt) {  
  //   filter.createdAt[Op.lt] = filter.createdAt.lt;  
  //   delete filter.createdAt.lt;  
  // }  
  // if (filter.createdAt && filter.createdAt.gt) {  
  //   filter.createdAt[Op.gt] = filter.createdAt.gt;  
  //   delete filter.createdAt.gt;  
  // }  
  
  let tag = await Tag.findOne({where:{id},include: [{model:Article}]});
  if (!tag) {  
    // 没有找到匹配的标签，返回错误信息或执行其他操作  
    ctx.body = { err: 1, info: 'Tag not found', data: null };  
    return;  
  }   
  
  // let total = (await tag.getArticles()).length
  // let nextOffset = (offset + pageSize) >= total? null: offset + pageSize

  // let articles = await tag.getArticles({  
  //   order: [sort],  
  //   offset: offset,  
  //   limit: pageSize,  
  //   where: filter, 
  //   include: [{model:Tag}]
  // });  
  // tag.articles = articles;  
  
  let articles = tag.articles
  
  ctx.body = {
    err: 0,
    info: null,
    pagination: {
      count: articles.length,
      total: articles.length,
      offset:0,
      nextOffset:10,
      pageSize:10,
    },
    data: articles
  }
})
router.post('/', async ctx => {
  let {name,desc} = ctx.request.body
  let tag
  try{
    tag = await Tag.create({name,desc})
  }catch(e){
    ctx.body={
      err:10002,
      info: 'tag is already exists',
      data: null
    }
    return
  }
  ctx.body = {
    err:0,
    info:null,
    data:tag
  }
})
module.exports = router