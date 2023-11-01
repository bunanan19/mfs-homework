setTimeout(function() {
    console.log(1)
 }, 0);
 //定时器异步，插入事件队列，在下一个事件循环中执行，
 //下面代码都是再同一个事件循环里面，
 //当下面的事件执行完，代码执行完，0毫秒后便执行定时器事件循环，打印1，
 //所以1是最后一个被打印的
 new Promise(function executor(resolve) {
    console.log(2);//promise是定义完时立刻执行，状态为pending
    for( var i=0 ; i<10000 ; i++ ) {
       i == 9999 && resolve();//并不直接调用.then方法，而是修改内部状态为resolve，将参数传递（此处无参）
    }//
    console.log(3);//立即执行，打印出数字3。 
 }).then(function() {
    console.log(4);
 });//当Promise对象被解决时，会将 then 方法中的回调函数添加到微任务队列中。
 //处理程序的执行是异步的，它会在当前事件循环的末尾或下一个事件循环中执行。
 //Promise的状态变化和处理程序的执行是通过微任务队列来调度的，而微任务会在当前任务的末尾执行或者当前事件循环的任务执行完毕后立即执行。
 console.log(5);