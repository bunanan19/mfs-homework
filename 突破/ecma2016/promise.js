var p = new Promise(function(resolve,reject){
    setTimeout(()=>{
        resolve("finish")//传入参数finish，成功后会原封不动作为参数传给then方法后的函数 
    },1000)
})//pending状态

p.then(data=>{
    console.log(data)//promise成功,执行该行
},err=>{
    console.log(err)//promise失败，执行该行
})

//用函数封装：
var num = 0;
function timeout(ms){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            // resolve("finished")
            num ++;
            /*if(num ==2){
                reject("err")
            }*/
            reject("run")
        },ms)
    })   
}
/*timeout(2000).then(data=>{
    console.log(data)
},err=>{
    console.log(err)
})*/

//promise.then的链式调用
timeout(2000).then(data=>{
    console.log(data)
    return timeout(2020)//可以返回一个promise，这样下一个链式的then调用会延迟2020毫秒执行
}).then(data=>{
    console.log(data + " then finished")
})//虽是异步执行，但是写法上更易读，扁平
.then(null,(err)=>{
    console.log(err)
})//promise的异常处理，只需要在最后捕获异常，而callback需要每次回调都编写错误判断
.catch(err=>{
    console.log(err)
})//Promise.catch 方法是 .then(null, rejection) 的别名，用于指定发生错误时的回调函数,这种写法比前者更易读

//等效的callback的效果：
function callback(ms,cb){
    setTimeout(()=>{
        // cb("cd-finish")
        cb("err")
    },ms)
}
callback(2000,(err,data)=>{
    if(err){
        //callback的错误处理,若在cb("err"),在cb传入err，err布尔值为true，就错误处理，callback函数，打印出err后return，执行结束
        console.log(err + " callback-err")
        return 
    }
    console.log(data)
    callback(2000,(err,data)=>{
        if(err){
            //错误处理
            console.log(err + " callback-err")
            return
        }
        console.log("callback finished")
    })
})//回调机制使缩进太多，不易读不易维护。且callback的错误处理繁琐重复，不便捷，promise对象错误处理更高效

//promise实现多并发，.all的api
Promise.all([timeout(1000),timeout(2000),timeout(3000)])
.then(data=>console.log(data))//所有异步执行完再then打印，3秒后打印
.catch(err=>{
    console.log(err)
    throw new Error("err")
})//错误处理
//等价于：
/* timeout(2000).then(data=>{
    console.log(data)
})
timeout(2000).then(data=>{
    console.log(data)
})
timeout(2000).then(data=>{
    console.log(data)
})*/
Promise.race([timeout(1000),timeout(2000),timeout(3000)]).then(data=>console.log(data))
//只要其中有一个实例率先改变状态，p 的状态就跟着改变。那个率先改变的Promise实例的返回值，就传递给p的回调函数。执行then方法中的函数


console.log("end of program")//在promise的finish被打印出来前打印