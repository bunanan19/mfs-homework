let fs = require('fs')

fs.readFile('./module.js',(err,data)=>{
    console.log(data.toString())
})//回调函数

console.log(fs.readFileSync('./module.js').toString())//同步

fs.writeFile('./test.txt','hello fs',(err)=>{
    if(err)
        console.log(err)
})



// const fs = require('fs');
// async function main() {
//     await fs.mkdir('./a/b');
//     await fs.writeFile('./a/b/test.txt', 'hello fs-extra', (err) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('File written successfully');
//         }
//     });
//     let res = await fs.readFile('./a/b/test.txt');
//     console.log(res.toString());
// }
// main();
