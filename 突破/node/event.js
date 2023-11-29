let EventEmitter = require('events');

class MyEmitter extends EventEmitter {
    readDB(){
        console.log('readDB')
    }
}

let myEmitter = new MyEmitter();

myEmitter.on('click', (a,b) => {
  console.log('触发了一个事件！',a,b);
  myEmitter.readDB()
  this.readDB()//报错this.readDB is not a function，因为箭头函数的this由定义箭头函数时所处的作用域决定，this 指向 window 对象，因此 readDB() 方法不存在，因此会报错。 
});
myEmitter.emit('click','1','3');

myEmitter.on('check', function(a,b) {
  console.log('check',a,b);
  this.readDB()//this关键字指向当前执行的上下文对象。此处，this指向myEmitter对象。因此 readDB() 方法可以正常执行。
});
myEmitter.emit('check','1','3');