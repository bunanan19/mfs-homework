## 箭头函数

箭头函数默认是匿名函数

箭头函数是ES6的新特性，箭头函数本质上也是一个匿名函数。箭头函数表达式的语法比函数表达式更简洁，并且没有自己的this，arguments，super或new.target。箭头函数表达式更适用于那些本来需要匿名函数的地方，并且它不能用作构造函数。
创造箭头函数的初衷就是为了简化函数的定义，以及规避this指向带来的问题。
<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231030134015808.png" alt="image-20231030134015808" style="zoom:80%;" />

**箭头函数的特点（和普通函数的区别）**

1. this指向：

+ 普通函数this指向：
  **指向它的调用者，如果没有调用者则默认指向window**
+ 箭头函数指向：
  箭头函数本身并无this，箭头函数的this由定义箭头函数时所处的作用域决定，即箭头函数的this永远指向定义箭头函数时所在的作用域的this（也可以说是上层作用域，强调的是作用域！）。箭头函数的this只和定义时的作用域this有关，和调用者无关，和调用环境无关，也永远不会改变（因此不能使用call\apply\bind改变箭头函数的this指向）。
  MDN的解释：箭头函数不会创建自己的this，所以它没有自己的this，它只会从自己的作用域链的上一层继承this。

2. 箭头函数不能当构造函数，用的话会抛出一个错误（因此也不能使用new关键字）

   ```js
   var Fun = (name, age) => { this.name = name; this.age = age; };
   var foo = new Foo('张三', 20); // TypeError: Foo is not a constructor
   ```

   我们先了解一下构造函数的new都做了些什么？简单来说，分为四步：

​		① JS内部首先会先生成一个对象；

​		② 再把函数中的this指向该对象；

​		③ 然后执行构造函数中的语句；

​		④ 最终返回该对象实例。

​		但是！！因为箭头函数没有自己的this，它的this其实是继承了外层执行环境中的this，且this指向		永远不会随在哪里调用、被谁调用而改变，所以箭头函数不能作为构造函数使用，或者说构造函		数不能定义成箭头函数，否则用new调用时会报

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231030134344850.png" alt="image-20231030134344850" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231030134407538.png" alt="image-20231030134407538" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231030134437453.png" alt="image-20231030134437453" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231030135318329.png" alt="image-20231030135318329" style="zoom:80%;" />

# set 

set又叫集合，它是⼀个十分重要的数据结构。它行为与数据结构列表数据结构相似，不同之处在于区别在于set不包含重复的值。

**set（集合）是一组无重复无序的数据**，就像数学中集合的概念。它没有标准的括号包裹，[]表示list，()表示tuple，{}表示dict。但是我们可以用带值的大括号来定义。set数据结构最大的作用就是去除重复的元素，如下图所示

set和array很相似，但是**set里面的元素必须是唯一的**，不能有重复，而数组允许元素有相同的，重复的。如果声明时，有重复元素，Set api会自动帮我们去重。除此之外，**set里的元素没有顺序**。有的时候set里最后得到的数组元素顺利和我们声明时填充的顺序不一致，和具体的实现有关系，有的set是通过hash去实现的，

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231030164811211.png" alt="image-20231030164811211" style="zoom:80%;" />

**2、使用场景**

set数据结构在很多情况下⾮常有⽤，例如你可能想检查列表中是否包含重复的元素，你有两个选择，第⼀个需要使⽤for循环，就像这样：

```python
some_list = ['a', 'b', 'c', 'b', 'd', 'm', 'n', 'n']
duplicates = [] 

for value in some_list: 
if some_list.count(value) > 1: 
if value not in duplicates:
duplicates.append(value)

print(duplicates)
### 输出: ['b', 'n']
```

但还有⼀种更简单更优雅的解决⽅案，那就是使⽤集合(sets)，直接这样做：

```python
some_list = ['a', 'b', 'c', 'b', 'd', 'm', 'n', 'n']

duplicates = set([x for x in some_list if some_list.count(x) > 1]) print(duplicates)

### 输出: set(['b', 'n'])
```

**（1）交集**你可以对⽐两个集合的交集（两个集合中都有的数据），如下：

```python
valid = set(['yellow', 'red', 'blue', 'green', 'black']) input_set = set(['red', 'brown'])
 
print(input_set.intersection(valid))
 
### 输出: set(['red'])
```

**（2）差集**你可以⽤差集(difference)找出⽆效的数据，相当于⽤⼀个集合减去另⼀个集合的数据，例如：

```python
valid = set(['yellow', 'red', 'blue', 'green', 'black']) input_set = set(['red', 'brown'])
 
print(input_set.difference(valid))
 
### 输出: set(['brown'])
```

**（3）用符号**

```python
a_set = {'red', 'blue', 'green'} 
print(type(a_set))
### 输出: <type 'set'>
```

**注：**Set 不会发生类型转换，类似于===，但还是有部分区别，Set 认为NaN等于自身，而=== 认为NaN不等于自身。 

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231030170627014.png" alt="image-20231030170627014" style="zoom:80%;" />

**二、转换类型**

Set不是数组，那用什么方法转换为数组呢？ ----- **Array.from()**

<img src="https://img2018.cnblogs.com/blog/1316387/201910/1316387-20191025153102431-2084606690.png" alt="img" style="zoom:80%;" />

**三、方法**

​		.add(value)：添加某个值，返回 Set 结构本身。

　　.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。

　　.has(value)：返回一个布尔值，表示该值是否为Set的成员。

　　.clear()：清除所有成员，没有返回值。

来个例子吧：

<img src="https://img2018.cnblogs.com/blog/1316387/201910/1316387-20191025155210560-666750226.png" alt="img" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231030174757103.png" alt="image-20231030174757103" style="zoom:80%;" />

将set转化为数组：<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231030175950342.png" alt="image-20231030175950342" style="zoom:80%;" />

set可迭代：<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231030180211828.png" alt="image-20231030180211828" style="zoom:80%;" />

**.keys()**：遍历键名、  **.values()**：遍历键值、 **.entries()**：遍历键值对、  **.forEach()**：遍历每个成员 

注：Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以`keys`和`values`方法，都是返回键值

　　entries返回的键、值都相同。

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231030170811579.png" alt="image-20231030170811579" style="zoom:80%;" />

**四、应用：**

<img src="https://img2018.cnblogs.com/blog/1316387/201910/1316387-20191025160604666-923558704.png" alt="img" style="zoom:80%;" />

# map

1.Map概述
  （1）Map 是一种把键对象和值对象映射的集合，它的每一个元素都包含一对键对象和值对象。
  （2）Map没有继承于Collection接口 从Map集合中检索元素时，
       	只要给出键对象，就会返回对应的值对象。 
  （3）Map是接口。

​	(6)WeakHashMap        

​	弱键(weak key)Map，Map中使用的对象也被允许释放: 这是为解决特殊问题设计的。如果没有map之外的引用指向某个“键”，则此“键”可以被垃圾收集器回收。    

​	（7）IdentifyHashMap        

​	使用==代替equals()对“键”作比较的hash map    

​	（8）ArrayMap         

​	ArrayMap是一个映射的数据结构，它设计上更多的是考虑内存的优化，内部是使用两个数组进行数据存储， 一个数组记录key的hash值，另外一个数组记录Value值，它和SparseArray一样，也会对key使用二分法进行从小到大排序，在添加、删除、查找数据的时候都是先使用二分查找法得到相应的index，然后通过index来进行添加、查找、删除等操作，所以，应用场景和SparseArray的一样，如果在数据量比较大的情况下，那么它的性能将退化至少50%。
 （9）SparseArray

 SparseArray比HashMap更省内存，在某些条件下性能更好，主要是因为它避免了对key的自动装箱（int转为Integer类型），它内部则是通过两个数组来进行数据存储的，一个存储key，另外一个存储	value，为了优化性能，它内部对数据还采取了压缩的方式来表示稀疏数组的数据，从而节约内存空	间。

   3.Map的基本操作
     Object put(Object key, Object value)： 向集合中加入元素   
     Object remove(Object key)： 删除与KEY相关的元素   

​		 void putAll(Map t)：  将来自特定映像的所有元素添加给该映像   
 		void clear()：从映像中删除所有映射   


  4.Map使用     这里以最常用的HashMap为例
     添加数据:
        Map hashMap = new HashMap<>();
        for (int i = 0; i < maxCount; i++) {
          hashMap.put(i, String.valueOf(i));
        }
     遍历entrySet方式
       for (Map.Entry entry : hashMap.entrySet()) {
         Integer key=entry.getKey();
         String  value=entry.getValue();
        }
     entrySet迭代器遍历方式:

       Iterator> entries = hashMap.entrySet().iterator();
       while (entries.hasNext()) {
          Map.Entry entry = entries.next();
          Integer key=entry.getKey();
          String  value=entry.getValue();
        }


    键找值遍历:
      for (Integer key : hashMap.keySet()) {
          String value = hashMap.get(key);
       }
   keySet迭代器遍历:
      Iterator iterator=hashMap.keySet().iterator();
      while (iterator.hasNext()) {
          Integer key=iterator.next();
          String  value=hashMap.get(key);
      }

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231030203846260.png" alt="image-20231030203846260" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231030204401966.png" alt="image-20231030204401966" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231030204541738.png" alt="image-20231030204541738" style="zoom:80%;" />

#### Map

`Object`本质上是键值对的集合（Hash结构），但`Object`只能将字符串当做键，这就给`Object`带来了很大的限制。

```js
let data = {}
let s = {
     name : '东方不败'
 }
data[s] = '西方求败'

// 如果键传入非字符串的值，会自动为字符串
console.log(data);  // {[object Object]: '西方求败'}
console.log(data['[object Object]']);  // 西方求败
```

为了解决这个问题，`es6`提供了`Map`数据结构。它类似于对象，也是键值对集合，但键`不局限于字符串`，各种类型的值都可以当做键。

- Object结构：`字符串键:值`
- Map结构：`值键:值`

```js
let data2 = new Map()
let s2 = {
     name : "艺术概论"
}
data2.set(s2,'中国工艺美术史')

console.log(data2.get(s2));  // 中国工艺美术史
console.log(data2);  // key: {name: '艺术概论'} , value : "中国工艺美术史"
```

上面案例使用`Map`的`set`方法，将`s2`当做`data2`的键，使用`get`方法取值。

Map的一些常用方法

| 方法     | 说明                                                |
| -------- | --------------------------------------------------- |
| set()    | 为Map对象添加一个指定键（key）和值（value）的新元素 |
| get()    | 用来获取Map对象中指定的元素                         |
| has()    | 返回boolean值，用来表明Map中是否存在该元素          |
| delete() | 删除对应元素                                        |
| size     | 返回Map的成员数                                     |
| clear()  | 清除Map所有成员，没有返回值                         |

```js
let data2 = new Map()
let s2 = {
   name : "艺术概论"
 }
data2.set(s2,'中国工艺美术史')

data2.size; // 1
data2.has(s2);  // treu
data2.delete(s2); // true
data2.has(s2); // false
data2.clear(); // undefined
```

#### Map参数

`Map`可以接收数组作为参数，数组的成员是`单个单个`的键值对的数组

```js
let map = new Map([
     ['name','东方不败'],
     ['title','西方求败']
])

console.log(map.size);  // 2
console.log(map);  // {"name" => "东方不败"}， {"title" => "西方求败"}
console.log(map.has('name')); // true
console.log(map.get('name')); // 东方不败
```

注意：如果有多个相同的键，后面的键值会覆盖前面的键值

不仅是数组，任何具有`Iterator`接口、且每个成员都是一个`双元素的数组`的数据结构，都可以当做`Map`构造函数的参数，`Set`和`Map`也可以用来生成新的`Map`

**Set作为参数**

```js
let set = new Set([['a',1],['b',2]])
let m = new Map(set)
console.log(m); // {'a' => 1, 'b' => 2}
console.log(m.get('a')); // 1
```

**Map作为参数**

```js
let map2 = new Map([['text','世界现代设计史'],['name','王受之']])
let m2 = new Map(map2)
console.log(m2); // {'text' => '世界现代设计史', 'name' => '王受之'}
console.log(m2.get('text')); // 世界现代设计史
console.log(m2.get('hello')); // 读取不存在的键会返回undefined
```

`Map`只有对同一个对象的引用才视为同一个键

```js
let map3 = new Map()
map3.set(['a',100])
console.log(map3.get(['a'])); // undefined
```

**因为数组不是引用类型，生成多个数组，它们的内存地址是不一样的，其实就是基础数据类型和引用数据类型的应用，这里的两个`['a']`看似是一样的，其实它们根本就是两个不同的值，`Map`只有对同一个对象的引用才视为同一个键，没有读取到所以返回`undefined`。请看下面的例子**

```js
let map4 = new Map()
let b = ['b']
let b2 = ['b']
map4.set(b)
console.log(map4.get(b2)); // undefined
```

`Map`的值其实是跟内存地址绑定的，内存地址不同，那么键就不同（即使名字一模一样），在这里`Map`就解决了同名属性冲突的问题，当我们使用别人的库时，使用对象名当做键，就不同担心自己的属性与别人的属性相同了。

如果`Map`的键是一个简单数据类型的值，如：`number、string、boolean`，只要这两个值严格相等，`Map`就视为同一个键，例如：`0`和`-0`就是同一个键，而布尔值`true`和字符串`true`就是不同的键，此外`null`和`undefined`也是不同的键。`NaN`视为同一个键。

```js
let n = new Map()

n.set(0,100)
console.log(n.get(-0)); // 100

n.set(5,123)
console.log(n.get('5'));  // undefined,一个是num一个是字符串

n.set(true,100)
console.log(n.get(1)); // undefined，一个是Boolean一个是num

n.set(NaN,123)
console.log(n.get(NaN)); // 123

n.set(null,100)
console.log(n.get(null)); // 100
console.log(n.get(undefined)); // undefined

```

#### Map遍历方法

`Map`提供三个遍历器生成函数和一个遍历方法

| 方法                    | 说明                   |
| ----------------------- | ---------------------- |
| Map.prototype.keys()    | 返回键名的遍历器。     |
| Map.prototype.values()  | 返回键值的遍历器。     |
| Map.prototype.entries() | 返回所有成员的遍历器。 |
| Map.prototype.forEach() | 遍历 Map 的所有成员。  |

**定义数据**

```js
let m3 = new Map([
       ['a',100],
       ['b',200],
       ['c',300]
])
```

**keys**

```js
/* keys */
for(let k of m3.keys()){
   console.log(k);  // a  b  c
}
```

**values**

```js
/* values */
for(let k of m3.values()){
   console.log(k); // 100  200  300
}
```

**entries**

```js
for(let k of m3.entries()){
    console.log(k); // ['a', 100]  ['b', 200]  ['c', 300]
    console.log(k[0],k[1]); // a 100     b 200    c 300
}

// 或

for(let [k,v] of m3.entries()){
   console.log(k,v); // a 100     b 200    c 300
}
```

**forEach**

```js
m3.forEach(el => console.log(el))  // 100  200  300
m3.forEach((val,index) => console.log(val,index))  // 100 'a'   200 'b'   300 'c' 
```

#### Map数据结构转换

##### Map转数组

使用[扩展运算符](https://so.csdn.net/so/search?q=扩展运算符&spm=1001.2101.3001.7020)将`Map`结构转换为数组

```js
let a = new Map([
      ['a',1],
      ['b',2],
      ['c',3]
])

console.log([...a.keys()]);  // ['a','b','c']
console.log([...a.values()]); // [1,2,3]
console.log([...a.entries()]); // ['a', 1]  ['b', 2]  ['c', 3]
console.log([...a]); // ['a', 1]  ['b', 2]  ['c', 3]
```

```js
let back = [...a].filter((val,index) => val[1] == 2 )
console.log(back); // ['b',2]
```

**数组转map**

```js
let a2 = new Map([
       ['name','东方不败'],
       [{num : 3},['abc']]
])
console.log(a2); // 0: {"name" => "东方不败"}    1: {Object => Array(1)}
```

##### Map转对象

```js
let a3 = new Map()
.set('a',100)
.set('b',200)

/* 通过函数传入map */
function mapToObj(mapVal){
// 在内部创建一个空对象
let obj = {}
// 遍历map结构，给空对象赋值
for([k,v] of mapVal){
      obj[k] = v
  }
    return obj
}
let mObj = mapToObj(a3)
console.log(mObj); // {a: 100, b: 200}
```

如果有非字符串键名，会被转换成字符串再创建对象键名

##### 对象转Map

```js
       let obj = {'a':123,'b':456}
       let mObj2 = new Map(Object.entries(obj))
       console.log(mObj2);  // {'a' => 123, 'b' => 456}
```

##### Map转JSON

Map转JSON需要区分两种情况
1、Map键名都是字符串
2、Map键名有非字符串的情况

**1、Map键名都是字符串**
可以写一个通用函数，用来将Map转为JSON

```js
let j = new Map()
.set('name','东方')
.set('text','不败')

// mapToObj为上面创建的Map转对象的函数
let shiftStrJson = (mapVal) => JSON.stringify(mapToObj(mapVal))
console.log(shiftStrJson(j)); // '{"name":"东方","text":"不败"}'
```

**2、Map键名有非字符串的情况**

```js
function shiftMaptoArrayJson(mapVal){
     return JSON.stringify([...mapVal])
}
let j2 = new Map()
.set('name','东方')
.set('text','不败')
let shiftStrJson2 = shiftMaptoArrayJson(j2)
console.log(shiftStrJson2);  // '[["name","东方"],["text","不败"]]'
```

##### JSON转Map

JSON转Map需要区分两种情况
1、Map键名都是字符串
2、Map键名有非字符串的情况

**1、键名都是字符串**

```js
let strObj = '{"name":"东方","text":"不败"}'
let strMap = new Map(Object.entries(JSON.parse(strObj)))
console.log(strMap); // {'name' => '东方', 'text' => '不败'}
```

**2、键名有非字符串情况**

```js
let strObj2 = '[["name","东方"],["text","不败"]]'
let strMap2 = new Map(JSON.parse(strObj2))
console.log(strMap2); // {'name' => '东方', 'text' => '不败'}
```

# WeakMap WeakSet

和Map类型的另外一个数据结构称之为`WeakMap`，也是以`键值对`的形式存在的。

>  在 JavaScript 里，map API 可以通过使其四个 API 方法共用两个数组(一个存放键,一个存放值)来实现。给这种 map 设置值时会同时将键和值添加到这两个数组的末尾。从而使得键和值的索引在两个数组中相对应。当从该 map 取值的时候，需要遍历所有的键，然后使用索引从存储值的数组中检索出相应的值。
>
> 但这样的实现会有两个很大的缺点，首先赋值和搜索操作都是 O(n) 的时间复杂度( n 是键值对的个数)，因为这两个操作都需要遍历全部整个数组来进行匹配。另外一个缺点是可能会导致内存泄漏，因为数组会一直引用着每个键和值。这种引用使得垃圾回收算法不能回收处理他们，即使没有其他任何引用存在了。
>
> 相比之下，原生的 WeakMap 持有的是每个键对象的“弱引用”，这意味着在没有其他引用存在时垃圾回收能正确进行。原生 WeakMap 的结构是特殊且有效的，其用于映射的 key 只有在其没有被回收时才是有效的。
>
> 正由于这样的弱引用，WeakMap 的 key 是不可枚举的 (没有方法能给出所有的 key)。如果key 是可枚举的话，其列表将会受垃圾回收机制的影响，从而得到不确定的结果。因此，如果你想要这种类型对象的 key 值的列表，你应该使用 Map。
>
> 基本上，如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap。

 **那么和Map有什么区别呢？**

- 区别一：WeakMap的key只能使用对象，不接受其他的类型作为key；
- 区别二：WeakMap的key对对象的引用是弱引用，如果没有其他引用引用这个对象，那么GC可以回收该对象；
- 区别三：不能被遍历

```js
//Map数据结构允许我们使用对象类型作为key

//1.创建一个Map数据结构,方法一：
const obj1 = {
  name: "curry",
};
const obj2 = {
  name: "why",
};
const m = new WeakMap();

//给m添加元素,只能使用对象作为键名
m.set(obj1, "aaa");
m.set(obj2, "bbb");

console.log(m); //WeakMap { <items unknown> }  因为无法被遍历
```

```js
const obj1 = {
  name: "curry",
};
const obj2 = {
  name: "why",
};
//2.创建一个Map数据结构,方法二：
const n = new WeakMap([
  [obj1, 123],
  [obj2, "ccc"],
]);
console.log(n);
//WeakMap { <items unknown> }  因为无法被遍历
```

#### WeakMap常见的方法有四个：

- set(key, value)：在Map中添加key、value，并且返回整个Map对象；
- get(key)：根据key获取Map中的value；
- has(key)：判断是否包括某一个key，返回Boolean类型；
- delete(key)：根据key删除一个键值对，返回Boolean类型；

```js
const m = new WeakMap();
const obj1 = {
  name: "curry",
};
//给m添加元素
m.set(obj1, "李静昕妈妈");
//获取m中键名为obj1的值
console.log(m.get(obj1)); // 李静昕妈妈
//删除m中键名为obj1的值
console.log(m.delete(obj1)); //true

//查看m中是否包含键名obj1
console.log(m.has(obj1)); //false
```

### weakSet

#### 1.1 什么是weakSet

 weakSet和Set一样，类似于数组，但里面只能存放内容不相同的值

#### 1.2 和Set有什么区别

 **1、weakSet内部只能存放对象类型的数据，不能存放其他类型的数据，会报错**

```js
const ws = new WeakSet();
ws.add(1)
// TypeError: Invalid value used in weak set
ws.add(Symbol())
// TypeError: invalid value used in weak set
```

```js
const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}
```

上面的代码**数组a的元素会被自动添加**到ws中，注意：是数组的元素，不是数组本身，这就要求数组的元素也要是对象类型

```js
const b = [3, 4];
const ws = new WeakSet(b);
// Uncaught TypeError: Invalid value used in weak set(…)
```

2、weakSet里面的对象是弱引用

  在weakSet里引用了对象，垃圾回收机制不会考虑该对象的引用，若外面已经没有该对象的引用了，则垃圾回收机制会回收该对象，weakSet内部引用的该对象也会自动消失

  所以weakSet内部的对象不适合被引用，也不允许遍历，因为有可能遍历的过程，内部的对象被垃圾回收机制回收了

用处：

  1、在weakSet中存储一些临时的对象，当外部该对象的引用消失了，weakSet内部该对象的引用也自动消失了，不用担心内存泄漏

  2、存储一些DOM节点，这样就不用DOM节点从文档中移除时，产生内存泄漏

**1.3 weakSet的方法**

+ WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。

+ WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。

+ WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。

+ WeakSet没有size属性，因为没办法遍历获取长度

+ ```js
  const ws = new WeakSet();
  const obj = {};
  const foo = {};
   
  ws.add(window);
  ws.add(obj);
   
  ws.has(window); // true
  ws.has(foo);    // false
   
  ws.delete(window);
  ws.has(window);    // false
  ```

##  WeakSet 应用场景（防止内存泄漏，缓存问题）

一个很典型的应用场景： **储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏**。 友好一点来解释的话不如上代码

![carbon (3).png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6af8486dae5641cb9670a9ecd553529d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?) 假设我们需要给记录页面上的禁用标签，那么一个Set对象存放就可以了，这样写功能上没有问题，但如果写成这样，当点击事件发生后，button 的dom被移除，那么整份js中 disabledElements 这个对象因为是强引用，其中的值依然存在于内存中的，那么内存泄漏就造成了，于是我们可以换成 WeakSet 来存放

![carbon (4).png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c554e77ddb2d439fa5949c676d9ed441~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

效果是一样的，这里当 button 被移除，disabledElements 中的内容会因为是弱引用而直接变成空，也就是disabledElements被垃圾回收掉了其中的内存，避免了一个小小的内存泄漏的产生



## 问答题

1. 什么是箭头函数？它和 `function` 声明的函数有什么区别？

   > 普通函数有花括号和return，箭头函数允许没有花括号和return，可以直接写返回值表达式，此特性可以使柯里化函数的写法更加简便
   >
   > 箭头函数this是静态绑定，即当箭头函数被定义时，this便已经确定指向。（实际生产中，this太动态不易于维护解读，箭头函数可以让其丧失动态性绑定）

2. 下面代码输出的是什么？为什么？

   ```javascript
   var a = 2
   var obj = {
      a : 1,
      fun : function () {
         console.log(this.a)
      }
   }
   
   var obj2 ={
      a : 3
   }
   
   obj.fun()          // 1,this是动态绑定，this关键字的值是在函数被调用时动态确定的，它指向*调用该函数的对象*。函数fun是作为obj对象的方法被调用的。当一个函数作为对象的方法被调用时，函数内部的this指向调用该方法的对象。在这种情况下，fun方法是作为obj对象的方法被调用的，所以this指向obj 。 
   
   var fun = obj.fun;
   fun()              // 2，该函数在全局作用域下被调用，函数内部的this指向全局对象，this指向window。
   
   obj2.fun = obj.fun
   obj2.fun()         // 3，this指向obj2
   ```

   <img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231030132418392.png" alt="image-20231030132418392" style="zoom:80%;" />

3. 下面代码输出的是什么？为什么？

   ```javascript
   var a = 2
   var obj = {
      a : 1,
      fun : () => {
         console.log(this.a)
      }
   }
   
   var obj2 ={
      a : 3
   }
   
   obj.fun()          // 2，箭头函数静态绑定，在箭头函数定义时，便捕获并继承其外部作用域中的this值，即全局作用域window对象。
   
   var fun = obj.fun;
   fun()              // 2。同理
   
   obj2.fun = obj.fun
   obj2.fun()         // 2，同理
   ```

   <img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231030132537915.png" alt="image-20231030132537915" style="zoom:80%;" />

4. 箭头函数的`this`静态绑定是什么含义？和`this`的动态绑定有什么区别？请写出示例代码说明区别

   > 箭头函数的 `this` 静态绑定是指在箭头函数被定义时，它的 `this` 值就被确定了，并且无法通过调用方式来改变。箭头函数会捕获并继承其外部作用域中的 `this` 值。 
   >
   > 与之相反，普通函数的 `this` 是在函数被调用时动态绑定的。它的值取决于函数的调用方式，可以通过不同的方式来改变 `this` 的指向。   下面是一个示例代码，展示了箭头函数和普通函数在 `this` 绑定上的区别：
   >
   > ```js
   > // 普通函数示例
   > const obj1 = {
   >   name: 'Object 1',
   >   func: function() {
   >     console.log(this.name);
   >   }
   > };
   > 
   > const obj2 = {
   >   name: 'Object 2'
   > };
   > 
   > obj1.func(); // 输出：Object 1，此时this指向obj1对象
   > obj1.func.call(obj2); // 输出：Object 2，通过call方法改变this指向为obj2对象
   > 
   > // 箭头函数示例
   > const obj3 = {
   >   name: 'Object 3',
   >   func: () => {
   >     console.log(this.name);
   >   }
   > };
   > 
   > const obj4 = {
   >   name: 'Object 4'
   > };
   > var name = "bunana"
   > obj3.func(); // 输出：bunana，箭头函数的this指向外部作用域中的this，此时外部作用域是全局作用域，name属性值为"bunana"
   > obj3.func.call(obj4); // 输出：bunana，无法通过call方法改变箭头函数的this指向
   > obj4.func = obj3.func
   > obj4.func();//输出bunana，箭头函数指向window，外部name为bunana。
   > 
   > //箭头函数的this是根据函数定义时的上下文确定的，并且无法通过调用方式来改变。在这个例子中，箭头函数func定义在对象obj3内部，它的上下文是全局作用域，因为箭头函数没有自己的this绑定。 
   >  
   > //在全局作用域中，存在一个变量name被赋值为  "bunana" 。当调用  obj3.func()  时，箭头函数内部的  this  会捕获并继承外部作用域中的this值，即全局作用域中的this。由于全局作用域中不存在名为name的属性，所以会访问到全局作用域中的变量name，输出结果为  "bunana" 。 
   >  
   > //而在调用obj3.func.call(obj4)时，虽然使用了call方法，但是箭头函数的this仍然保持继承自外部作用域的特性，不会受到call法的影响。因此，输出结果仍然是全局作用域中的变量  name ，即"bunana" 。
   > ```
   >
   > 在示例中，普通函数 `func` 中的 `this` 是根据调用方式动态绑定的。通过调用对象的方式，可以改变函数中的 `this` 指向不同的对象。   而箭头函数 `func` 中的 `this` 是静态绑定的，它会捕获并继承外部作用域中的 `this` 值。无论如何调用箭头函数， `this` 都指向外部作用域中的 `this` ，无法通过 `call` 等方法来改变它的指向。

5. 下面代码输出是什么？结合第三题，试理解`this`静态绑定的绑定规则。

   ```javascript
   var id = 2;
   function foo() {
      return () => {
         console.log('id:', this.id);
      };
   }
   
   foo.call({id: 1})()//在这个例子中,foo函数被调用时使用了call方法，将 {id: 1} 作为上下文对象传递给 foo 函数。（然而，由于箭头函数的 this 绑定是静态的，它会捕获并继承外部作用域中的 this 值，this指向箭头函数声明时所在的作用域，而不是受到 call方法的影响。） 通过babel编译后发现箭头函数中的this被编译成了一个的变量，该变量指向函数中this。call方法改变了函数的this指向，所以该变量的指向也随之改变
   ```

   <img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231030132602015.png" alt="image-20231030132602015" style="zoom:80%;" />

   <img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231030221133564.png" alt="image-20231030221133564" style="zoom:80%;" />

6. 对于`function`声明的函数，如果想实现箭头函数的`this`静态绑定，需要怎么做？

   > 使用bind()方法，将this的指向改成指定的对象
   >
   > ```js
   > var obj = {
   >     a :1,
   >     fun : function(){
   >         console.log(this.a)
   >     }.bind(window)//bind方法实现改变this指向window
   > }
   > ```

7. 什么是柯里化(currying)，它有什么作用？

   > 柯里化（Currying）是一种**将接受多个参数的函数转化为一系列接受单个参数的函数的技术**，从而实现参数复用、延迟执行和函数组合等作用。通过柯里化，我们可以将一个多参数函数转化为一个接受一个参数的函数序列。  
   >
   >  柯里化的作用包括但不限于以下几个方面：   
   >
   > 1. 参数复用：通过柯里化，我们可以创建一个接受部分参数的函数，然后复用这个函数来创建更多的特定参数的函数。这样可以减少重复的代码，并提高代码的可读性和可维护性。   
   > 2. 延迟执行：柯里化可以将一个多参数函数转化为一系列只接受一个参数的函数，这些函数可以在需要的时候逐个调用。这种延迟执行的特性可以用于实现一些惰性计算的场景，提高性能和资源利用。   
   > 3.  函数组合：柯里化可以方便地进行函数组合，通过将一个函数的输出作为另一个函数的输入，可以轻松地组合多个函数形成更复杂的逻辑。  

8. 下面代码输出的是什么？为什么？

   ```javascript
   let fun1 = i => i*2
   let fun2 = i => {i*2}
   
   console.log(fun1(1))   // ?
   console.log(fun2(1))   // ?
   ```

   <img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231030132630346.png" alt="image-20231030132630346" style="zoom:80%;" />

   > 这是因为  `fun1`  是一个箭头函数，它只有一行代码  `i*2` ，并且省略了大括号  `{}` 。在箭头函数中，如果只有一行代码，并且没有使用大括号  `{}`  包裹函数体，那么该行代码的结果会被自动返回。因此， `fun1`  返回了  `i*2`  的结果，即  `2` 。  
   >
   >  而  `fun2`  是一个箭头函数，但是它使用了大括号  `{}`  包裹函数体。在这种情况下，箭头函数需要使用  `return`  关键字来显式地返回值。但是在  `fun2`  中，没有使用  `return`  关键字，因此函数体中的计算结果并没有被返回。所以， `fun2(1)`  的结果是  `undefined` 。 

9. 什么是 Set ，它和数组有什么异同？

   > Set是一组无序无重复的数据的集合。set和array很相似，但是**set里面的元素必须是唯一的**，不能有重复，而数组允许元素有相同的，重复的。如果声明set时，有重复元素，Set会自动去重。除此之外，**set里的元素没有顺序**。

10. 什么是 WeakSet / WeakMap？和 Set / Map 有什么异同？

    > ### WeakSet
    >
    > WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 区别如下。
    >
    > - **WeakSet 的成员只能是对象，而不能是其他类型的值**
    > - **WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用**
    >    也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。**WeakSet结构有助于防止内存泄漏**
    > - **WeakSet没有size属性和forEach方法**
    >    WeakSet 不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。
    >
    > ### WeakMap
    >
    > WeakMap结构与Map结构类似，也是用于生成键值对的集合。WeakMap与Map的区别有以下几点：
    >
    > - **WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名**
    > - **WeakMap的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内**
    >    也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。**总之，WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏。**
    > - **同 WeakSet 一样，WeakMap也没有遍历操作，即 (`keys()`、`values()`和`entries()`方法)**
    >    因为没有办法列出所有键名，某个键名是否存在完全不可预测，跟垃圾回收机制是否运行相关。这一刻可以取到键名，下一刻垃圾回收机制突然运行了，这个键名就没了，为了防止出现不确定性，就统一规定不能取到键名。
    > - 不支持clear方法。

## 代码题

1. 请把下列代码改写成箭头函数的写法

   ```javascript
   [1,2,3].map(function (x) {
      return x * x;
   });
   ```

   ```js
   [1,2,3].map(x => x*x )
   ```

   <img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231030224733035.png" alt="image-20231030224733035" style="zoom:80%;" />

2. 请将下面函数柯里化(currying)，需要写出箭头函数和非箭头函数两种答案

   ```javascript
    function cala(add, mul, origin) {
        return (origin + add) * mul
    }
   ```

   ```js
   //非箭头函数：
   function cala_currying(mul){
       return function(add){
           return function(origin){
               (origin + add)*mull;
           };
       };
   }
   //箭头函数：
   var cala_currying = mul => add => mul =>(origin + add)*mull
   ```

   

3. 请使用 Set 实现数组去重

   ```js
   function removeDuplicates (array){
       return [...new Set(array)];
   }
   const arr = [1, 2, 2, 3, 4, 4, 5];
   const newArray = removeDuplicates(arr);
   console.log(newArray);
   //[1, 2, 3, 4, 5]
   ```

4. 请实现打印 Map 中所有的键值对

   ```js
   function key_val(map){
       for (let [key, value] of map) {
       console.log(key, value);
     }
   }
   const myMap = new Map();
   myMap.set('name', 'bunana');
   myMap.set('age', 66);
   myMap.set('city', 'www');
   
   key_val(myMap);
   //name bunana
   //age 66
   //city www
   
   
   for (let [key, value] of map.entries()) {
       console.log(key, value);
     }
   ```

   