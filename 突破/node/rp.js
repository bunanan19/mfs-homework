let rp = require('request-promise')

async function main(){
    let arr = []
    for(let i= 1; i<=10; i++){
        arr.push(i)
    }
    let reqs = arr.map(i=>`http://api.mafengshe.com/news?pageSize=10&page=${i}`).map(i=>rp.get(i))
    // let res = await rp.get('http://www.baidu.com')
    let res =  await Promise.all(reqs)
    res.map(i=>JSON.parse(i)).map(i=>i.result.data.list).reduce((prev,curr)=>[...prev,...curr])
    console.log(res)
}
main()