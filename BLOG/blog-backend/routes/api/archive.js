const router = require('koa-router')()
const {sequelize,Article} = require('../../model')

const monthToNumber = {  
  'January': 1,  
  'February': 2,  
  'March': 3,  
  'April': 4,  
  'May': 5,  
  'June': 6,  
  'July': 7,  
  'August': 8,  
  'September': 9,  
  'October': 10,  
  'November': 11,  
  'December': 12  
};  
  
function convertToNumber(month) {  
  return monthToNumber[month];  
}  

router.prefix('/archive')
router.get('/', async ctx => {
  let res = await sequelize.query(`
    SELECT 
      DATE_FORMAT(createdAt,'%Y-%M') as date,count(*) as articleNum
    FROM 
      articles 
    GROUP BY 
      DATE_FORMAT(createdAt,'%Y-%M')
    `,{type: sequelize.QueryTypes.SELETE})
  ctx.body = {
    err:0,
    info:null,
    data:res[0].map(i => {
      let arr = i.date.split('-')
      i.year = +arr[0] 
      i.month = +convertToNumber(arr[1])
      return i
    })
  }
})
module.exports = router