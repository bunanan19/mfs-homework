function* gen(){
    yield 1
    yield 2
    return 3;
 }

 let it = gen()

 console.log(it.next())
 console.log(it.next())
 console.log(it.next())

 //babel编译后的等价es5代码：
 /*function gen() {
    return regeneratorRuntime.wrap(function gen$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return 1;
  
          case 2:
            _context.next = 4;
            return 2;
  
          case 4:
            return _context.abrupt("return", 3);
  
          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _marked, this);
  }
  
  var it = gen();
  
  console.log(it.next());
  console.log(it.next());
  console.log(it.next());*/

  //iterator手动实现
  function makeIt(){
    var i = 0;
    var arr = [1,2,3]
    return {
        next(){
            return i < arr.length?
            {value:arr[i++] ,done:false}:
            {value:arr[i++] ,done:true}
        }
    }
  }
  let itm =makeIt()
  itm.next()

  let arr = [1,2,3]
  let ita = arr[Symbol.iterator]()
  console.log(ita.next())//{value: 1, done: false}
  console.log(ita.next())//{value: 2, done: false}
  console.log(ita.next())//{value: 3, done: false}
  console.log(ita.next())//{value: undefined, done: true}

  let str = "abc"
  let its = str[Symbol.iterator]()
  console.log(its.next())//{value: 'a', done: false}
  console.log(its.next())//{value: 'b', done: false}
  console.log(its.next())//{value: 'c', done: false}
  console.log(its.next())//{value: undefined, done: true}

  let set = new Set([2,4,1,2])
  let ite = set[Symbol.iterator]()
  console.log(ite.next())//{value: '2', done: false}
  console.log(ite.next())//{value: '4', done: false}
  console.log(ite.next())//{value: '1', done: false}
  console.log(ite.next())//{value: undefined, done: true}

  let [a,b,c] = set//解构，若等号右边值带有iterator方法才可以结构成功，否则为undefined

  for( let i of str){//通过iterator遍历
    console.log(i)
  }
  //for……of遍历方法背后的执行逻辑
  let itb = str[Symbol.iterator]()
  let t = itb.next()
  while(!t.done){
    let i = t.value
    console.log(i)
    //...代码
    t =itb.next()
  }
  
  //为obj手动添加迭代器，使其能使用for……of遍历方法
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
//另一种简便方法
/*let obj ={
    [Symbol.iterator]: Array.prototype[Symbol.iterator].bind(arr)
}

for(let i of obj){
    console.log(i)
}*/

let [d,e,f] = obj
console.log(d,e,f)

