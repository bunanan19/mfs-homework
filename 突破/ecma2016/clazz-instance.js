class Point{
    constructor(x,y){
        this._x = x;
        this._y = y;
    }
    norm(){
        return Math.sqrt(this._x**2+ this._y**2)
    }
}
class Point3D extends Point{
    constructor(x,y,z){
        super(x,y);
        this._z = z;
    }
    norm(){
        return Math.sqrt(this._x*this._x+ this._y*this._y+this._z*this._z)
    }
}
let p3d = new Point3D(1,2,3)

console.log(p3d)//Point3D {_x: 1, _y: 2, _z: 3}

console.log(p3d instanceof Point3D)//true
console.log(p3d instanceof Point)//true

console.log(p3d.norm)//3.7416573867739413