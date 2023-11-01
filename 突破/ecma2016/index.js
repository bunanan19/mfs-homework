let set = new Set([1,2,3,4,1,1,1])
let arr = [...set]//将set转化为数组，set是可迭代的

for(let i of set){
    console.log(i)
}

let map =new Map()
map.set("key","value")
map.set("key1","value1")
map.set("key2","value2")

map.forEach(i=>{console.log(i)})//value  value1 value2打印出的是键值

map.forEach(([key,value])=>{console.log([key,value])})//解构赋值语法，直接将数组中的键值赋值value字符串给key和value。由于值为字符串，所以得到三个 v 和a的打印

for(let [key,value] of map){
    console.log(key,value)
}//使用了for...of循环和解构赋值语法来遍历map中的键值对。，并将当前键值对的数组[key, value]解构为key和value两个变量，并赋值给key、value。 

map.forEach((key,value)=>{console.log(key,value)})//使用key和value两个参数来访问Map中的键和值

let wmap =new WeakMap()
wmap.set(1,"value")//weakmap的键不能随便设置
wmap.set(2,"value1")
wmap.set(3,"value2")