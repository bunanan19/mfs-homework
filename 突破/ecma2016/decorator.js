function decorator(target){
    return function(){console.log(target)} 
}
@decorator
class Point{
    constructor(x,y){
        this._x = x;
        this._y = y;
    }
    norm(){
        return Math.sqrt(this._x**2+ this._y**2)
    }
}