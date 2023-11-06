function* gen(){
    yield "1"
    yield "2"
    yield "3"
    return "4"
}

function *fib(){
    let [prev, curr] = [0, 1]
    yield prev
    while(true){
        [prev, curr] = [curr, prev + curr]
        yield curr
    }
}
var f = fib();
f.next()//?

var i = 0;
for( let v of fib()){
    if(i++>3)
    break;
    console.log(v)
}//?遍历

let [x, y, z] = fib()//?解构

function *fib(){
    let [prev, curr] = [0, 1]
    yield prev
    while(true){
        [prev, curr] = [curr, prev + curr]
        let t = yield curr
        if(t =="end"){
            break
        }
    }
    return "gen end"//return  语句用于指定生成器函数的最终返回值。 
}
var fi =fib()
fi.next()//?
fi.next('end')//{value: "gen end", done: true}
fi.next()//?

function *number(){
    yield 1;
    yield 2;
    return 3;
    yield 4;
}
[...number()]//[1,2]

let obj ={
    [Symbol.iterator]: function(){
        return {
            next(){
                return {
                    value: 1,
                    done:false
                }
            }
        }
    }
}

// for(let i of obj){
//     console.log(i)
// }

let [a,b,c] = obj
console.log(a,b,c)