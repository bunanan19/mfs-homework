var obj = {
    a :1,
    fun : function(){
        console.log(this.a)//动态绑定，被调用时确定绑定值
    }
}

var a = 2

var obj2 = {
    a : 3
}

obj.fun()//此时fun被作为obj对象方法被调用，this指向obj

var fun = obj.fun;
fun()//此时fun被作为window对象方法被调用，this指向window,但是在node执行环境下，打印出的结果为undefined，因为node的全局对象和浏览器不一样

obj2.fun = obj.fun
obj2.fun()////此时fun被作为obj2对象方法被调用，this指向obj2

(obj.fun = obj.fun)()//在浏览器中返回2，this指向全局

//箭头函数写法：
var obj = {
    a :1,
    fun : () =>{
        console.log(this.a)//静态绑定，浏览器中绑定值值为全局，实际背后的操作就是将this对象换成全局对象
    }//此处babel编译后为fun: function fun(){cosole.log(undefined.a)},因为是在node环境下编译的，所以为undefined，应该为全局对象.a
    //在window中等价的代码为fun：function(){cosole.log(window.a)},实现this静态绑定
}

//普通函数的静态绑定
var obj = {
    a :1,
    fun : function(){
        console.log(this.a)
    }.bind(window)//bind方法实现改变this指向window
    //(bind()方法和call，apply方法的区别是，bind方法不会立即调用只是改变this指向，另外两种不仅改变this指向还立即调用)
}

var id = 2;
function foo() {
   return () => {
      console.log('id:', this.id);
   };
}

foo.call({id: 1})()
