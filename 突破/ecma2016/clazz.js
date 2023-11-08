//es5的class类声明方法
function Point(x,y){
    this.x = x;
    this.y = y;
}
var point = new Point(1,2)

console.log(point)
console.log(point.__proto__)

//es6class声明方法
/*
 * 私有方法：私有方法本身是可以访问类内部的所有属性(即私有属性和公有属性)，但是私有方法是不可以在类的外部被调用。 
 */
let _bar = Symbol("bar")//让私有方法不可见
class Point{
    _x
    _y
    z = 0
    constructor(x,y){
        this._x = x;
        this._y = y;
    }
    get x(){
        console.log("get x val: "+this._x)
        return this._x
    }
    set x(val){
        console.log("set x val: "+val)
        this._x = val;
    }
    get y(){
        console.log("get y val: "+this._y)
        return this._y
    }
    set y(val){
        console.log("set y val: "+val)
        this._y = val;
    }
    //generator函数
    *number(){
        yield this._x;
        yield this._y;
    }
    //异步函数
    async number2(){
        console.log(await this._x);
	    console.log(await this._y);
    }
    get norm(){
        return this.dis(0,0)
    }
    dis(x,y){
        return this._bar(new Point(x,y))
    }
    //私有方法声明前面加上_，但是此私有方法在prototype里面可见：
    /*_bar(point){
        return Math.sqrt((this.x-point.x)*(this.x-point.x)+(this.y-point.y)*(this.y-point.y))
    }*/
    //通过使用symbol的特性，使bar私有方法不可见，不可以被遍历到
    [_bar](point){
        return Math.sqrt((this.x - point.x) ** 2 + (this.y - point.y) ** 2)
    }
    static xiangxian(point){
        if(point.x>0&&point.y>0){
            return 1
        }
        if(point.x>0&&point.y<0){
            return 4
        }
        if(point.x<0&&point.y>0){
            return 2
        }
        if(point.x<0&&point.y<0){
            return 3
        }
    }
}
let point = new Point(1,2)
console.log(point)
console.log(point.__proto__ === Point.prototype)//true
console.log(point.dis(0,0))

let ita = point.number2()

console.log(point.x)
console.log(point.y)
console.log(point.y=10)
console.log(point.x=3)

let it = point.number()
console.log(it.next())

Point.xiangxian(new Point(3,-3))
