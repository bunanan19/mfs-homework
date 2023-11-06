# Symbol

ES5的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的 方法（mixin模式），新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好 了，这样就从根本上防止属性名的冲突。这就是ES6引入Symbol的原因。 

ES6引入了一种新的原始数据类型Symbol，表示独一无二的值。它是JavaScript语言的第七种数据类型，前六种是：Undefined、 Null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。 Symbol值通过 Symbol 函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增 的Symbol类型。凡是属性名属于Symbol类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

```js
let s = Symbol();
typeof s
// "symbol"
```

上面代码中，变量 s 就是一个独一无二的值。 typeof 运算符的结果，表明变量 s 是Symbol数据类型，而不是字符串之类 的其他类型。 

注意， **Symbol 函数前不能使用 new 命令**，否则会报错。**这是因为生成的Symbol是一个原始类型的值，不是对象。**也就是 说，由于Symbol值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。 Symbol 函数可以接受一个字符串作为参数，表示对Symbol实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。

```js
var s1 = Symbol('foo');
var s2 = Symbol('bar');
s1 // Symbol(foo)
s2 // Symbol(bar)
s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"
```

上面代码中， s1 和 s2 是两个Symbol值。**如果不加参数，它们在控制台的输出都是 Symbol() ，不利于区分。有了参数以 后，就等于为它们加上了描述，输出的时候就能够分清，到底是哪一个值。**

注意， Symbol 函数的参数只是表示对当前Symbol值的描述，因此相同参数的 Symbol 函数的返回值是不相等的。

```js
// 没有参数的情况
var s1 = Symbol();
var s2 = Symbol();
s1 === s2 // false
// 有参数的情况
var s1 = Symbol("foo");
var s2 = Symbol("foo");
s1 === s2 // false
```

上面代码中， s1 和 s2 都是 Symbol 函数的返回值，而且**参数相同，但是它们是不相等的**。 **Symbol值不能与其他类型的值进行运算，会报错。**

```js
var sym = Symbol('My symbol');
"your symbol is " + sym
// TypeError: can't convert symbol to string
`your symbol is ${sym}`
// TypeError: can't convert symbol to string
```

但是，Symbol值可以显式转为字符串。

```js
var sym = Symbol('My symbol');
String(sym) // 'Symbol(My symbol)'
sym.toString() // 'Symbol(My symbol)'
```

另外，**Symbol值也可以转为布尔值，但是不能转为数值。**

```js
var sym = Symbol();
Boolean(sym) // true
!sym // false
if (sym) {
	// ...
}
Number(sym) // TypeError
sym + 2 // TypeError
```

## 作为属性名的Symbol

由于每一个Symbol值都是不相等的，这意味着Symbol值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。 这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。

```js
var mySymbol = Symbol();
// 第一种写法
var a = {};
a[mySymbol] = 'Hello!';
// 第二种写法
var a = {
[mySymbol]: 'Hello!'
};
// 第三种写法
var a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });
// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```

上面代码通过方括号结构和 Object.defineProperty ，将对象的属性名指定为一个Symbol值。 **注意，Symbol值作为对象属性名时，不能用点运算符**。

```js
var mySymbol = Symbol();
var a = {};
a.mySymbol = 'Hello!';
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"
```

上面代码中，**因为点运算符后面总是字符串**，所以不会读取 mySymbol 作为标识名所指代的那个值，导致 a 的属性名实际上 是一个字符串，而不是一个Symbol值。 同理，在对象的内部，使用Symbol值定义属性时，Symbol值必须放在方括号之中。

```js
let s = Symbol();
let obj = {
	[s]: function (arg) { ... }
};
obj[s](123);
```

上面代码中，如果 s 不放在方括号中，该属性的键名就是字符串 s ，而不是 s 所代表的那个Symbol值。 采用增强的对象写法，上面代码的 obj 对象可以写得更简洁一些。

```js
let obj = {
	[s](arg) { ... }
};
```

Symbol类型还可以用于定义一组常量，保证这组常量的值都是不相等的。

```js
log.levels = {
    DEBUG: Symbol('debug'),
    INFO: Symbol('info'),
    WARN: Symbol('warn')
};
log(log.levels.DEBUG, 'debug message');
log(log.levels.INFO, 'info message');
```

下面是另外一个例子。

```js
const COLOR_RED = Symbol();
const COLOR_GREEN = Symbol();
function getComplement(color) {
	switch (color) {
        case COLOR_RED:
        return COLOR_GREEN;
        case COLOR_GREEN:
        return COLOR_RED;
        default:
        throw new Error('Undefined color');
	}
}
```

**常量使用Symbol值最大的好处，就是其他任何值都不可能有相同的值了，因此可以保证上面的 switch 语句会按设计的方式工 作。** 还有一点需要注意，Symbol值作为属性名时，该属性还是**公开属性**，不是私有属性。

## 实例：消除魔术字符串

魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。风格良好的代码，应该尽量消 除魔术字符串，该由含义清晰的变量代替。

```js
function getArea(shape, options) {
    var area = 0;
    switch (shape) {
        case 'Triangle': // 魔术字符串
        area = .5 * options.width * options.height;
        break;
        /* ... more code ... */
    }
    return area;
}
getArea('Triangle', { width: 100, height: 100 }); // 魔术字符串
```

上面代码中，字符串“Triangle”就是一个魔术字符串。它多次出现，与代码形成“强耦合”，不利于将来的修改和维护。 常用的消除魔术字符串的方法，就是把它写成一个变量。

```js
var shapeType = {
	triangle: 'Triangle'
};
function getArea(shape, options) {
    var area = 0;
    switch (shape) {
        case shapeType.triangle:
        area = .5 * options.width * options.height;
        break;
    }
    return area;
}
getArea(shapeType.triangle, { width: 100, height: 100 });
```

上面代码中，我们把“Triangle”写成 shapeType 对象的 triangle 属性，这样就消除了强耦合。 如果仔细分析，可以发现 shapeType.triangle 等于哪个值并不重要，只要确保不会跟其他 shapeType 属性的值冲突即可。 因此，这里就很适合改用Symbol值。

```js
const shapeType = {
	triangle: Symbol()
};
```

上面代码中，除了将 shapeType.triangle 的值设为一个Symbol，其他地方都不用修改。

## 属性名的遍历

Symbol作为属性名，该属性不会出现在 for...in 、 for...of 循环中，也不会 被 Object.keys() 、 Object.getOwnPropertyNames() 返回。但是，它也不是私有属性，有一 个 Object.getOwnPropertySymbols 方法，可以获取指定对象的所有Symbol属性名。 Object.getOwnPropertySymbols 方法返回一个数组，成员是当前对象的所有用作属性名的Symbol值。

```js
var obj = {};
var a = Symbol('a');
var b = Symbol.for('b');
obj[a] = 'Hello';
obj[b] = 'World';
var objectSymbols = Object.getOwnPropertySymbols(obj);
objectSymbols
// [Symbol(a), Symbol(b)]
```

下面是另一个例子， Object.getOwnPropertySymbols 方法与 for...in 循环、 Object.getOwnPropertyNames 方法进行对 比的例子。

```js
var obj = {};
var foo = Symbol("foo");
Object.defineProperty(obj, foo, {
    value: "foobar",
});
for (var i in obj) {
	console.log(i); // 无输出
}
Object.getOwnPropertyNames(obj)
// []
Object.getOwnPropertySymbols(obj)
// [Symbol(foo)]
```

上面代码中，使用 Object.getOwnPropertyNames 方法得不到 Symbol 属性名，需要使 用 Object.getOwnPropertySymbols 方法。 另一个新的API， **Reflect.ownKeys 方法可以返回所有类型的键名，包括常规键名和Symbol键名。**

```js
let obj = {
[Symbol('my_key')]: 1,
enum: 2,
nonEnum: 3
};
Reflect.ownKeys(obj)
// [Symbol(my_key), 'enum', 'nonEnum']
```

由于以Symbol值作为名称的属性，不会被常规方法遍历得到。**我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法。**

```js
var size = Symbol('size');
class Collection {
    constructor() {
    	this[size] = 0;
	}
	add(item) {
        this[this[size]] = item;
        this[size]++;
    }
    static sizeOf(instance) {
    	return instance[size];
    }
}
var x = new Collection();
Collection.sizeOf(x) // 0
x.add('foo');
Collection.sizeOf(x) // 1 在add方法中size自加
Object.keys(x) // ['0'] 在add方法里添加的属性，值为调用时传入的参数‘foo’
Object.getOwnPropertyNames(x) // ['0'] add方法中添加的属性，但是查询不到size属性
Object.getOwnPropertySymbols(x) // [Symbol(size)]
Reflect.ownKeys(x) // ['0', Symbol(size)]
```

上面代码中，对象x的size属性是一个Symbol值，所以 Object.keys(x) 、 Object.getOwnPropertyNames(x) 都无法获取它。 这就造成了一种非私有的内部方法的效果。

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231106143721241.png" alt="image-20231106143721241" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231106143759494.png" alt="image-20231106143759494" style="zoom:80%;" /><img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231106144014238.png" alt="image-20231106144014238" style="zoom:80%;" />

## Symbol.for()，Symbol.keyFor()

有时，我们希望重新使用同一个Symbol值， Symbol.for 方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有 以该参数作为名称的Symbol值。如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值。

```js
var s1 = Symbol.for('foo');
var s2 = Symbol.for('foo');
s1 === s2 // true
```

上面代码中，s1和s2都是Symbol值，但是它们都是同样参数的 Symbol.for 方法生成的，所以实际上是同一个值。 Symbol.for() 与 Symbol() 这两种写法，都会生成新的Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。 Symbol.for() 不会每次调用就返回一个新的Symbol类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。比如，**如果你调用 Symbol.for("cat") 30次，每次都会返回同一个Symbol值，但是调用 Symbol("cat") 30 次，会返回30个不同的Symbol值。**

```js
Symbol.for("bar") === Symbol.for("bar")
// true
Symbol("bar") === Symbol("bar")
// false
```

上面代码中，由于 **Symbol() 写法没有登记机制**，所以每次调用都会返回一个不同的值。**Symbol.keyFor方法返回一个已登记的Symbol类型值的key。**

```js
var s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"
var s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```

上面代码中，变量 s2 属于未登记的Symbol值，所以返回 undefined 。 需要注意的是， Symbol.for 为Symbol值登记的名字，是全局环境的，可以在不同的iframe或service worker中取到同一个值。

```js
iframe = document.createElement('iframe');
iframe.src = String(window.location);
document.body.appendChild(iframe);
iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo')
// true
```

上面代码中，iframe窗口生成的Symbol值，可以在主页面得到。

## 内置的Symbol值

除了定义自己使用的Symbol值以外，ES6还提供了11个内置的Symbol值，指向语言内部使用的方法。

## Symbol.hasInstance

对象的 Symbol.hasInstance 属性，指向一个内部方法。当其他对象使用 instanceof 运算符，判断是否为该对象的实例 时，会调用这个方法。比如， foo instanceof Foo 在语言内部，实际调用的是 Foo[Symbol.hasInstance](foo) 。

```js
class MyClass {
	[Symbol.hasInstance](foo) {
		return foo instanceof Array;
	}
}
[1, 2, 3] instanceof MyClass() // true
```

## Symbol.isConcatSpreadable

对象的 Symbol.isConcatSpreadable 属性等于一个布尔值，表示该对象使用 Array.prototype.concat() 时，是否可以展 开。

```js
let arr1 = ['c', 'd'];
['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']
```

上面代码说明，数组的 Symbol.isConcatSpreadable 属性默认为 true ，表示可以展开。<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231106145755907.png" alt="image-20231106145755907" style="zoom:80%;" /> 类似数组的对象也可以展开，但它的 Symbol.isConcatSpreadable 属性默认为 false ，必须手动打开。

```js
let obj = {length: 2, 0: 'c', 1: 'd'};
['a', 'b'].concat(obj, 'e') // ['a', 'b', obj, 'e']
obj[Symbol.isConcatSpreadable] = true;
['a', 'b'].concat(obj, 'e') // ['a', 'b', 'c', 'd', 'e']
```

对于一个类来说， Symbol.isConcatSpreadable 属性必须写成一个返回布尔值的方法。

```js
class A1 extends Array {
    [Symbol.isConcatSpreadable]() {
    	return true;
    }
}
class A2 extends Array {
    [Symbol.isConcatSpreadable]() {
    	return false;
    }
}
let a1 = new A1();
a1[0] = 3;
a1[1] = 4;
let a2 = new A2();
a2[0] = 5;
a2[1] = 6;
[1, 2].concat(a1).concat(a2)
// [1, 2, 3, 4, [5, 6]]

```

上面代码中，类 A1 是可扩展的，类 A2 是不可扩展的，所以使用 concat 时有不一样的结果。

## Symbol.species

对象的 Symbol.species 属性，指向一个方法。该对象作为构造函数创造实例时，会调用这个方法。即如 果 this.constructor[Symbol.species] 存在，就会使用这个属性作为构造函数，来创造新的实例对象。 Symbol.species 属性默认的读取器如下。

```js
static get [Symbol.species]() {
return this;
}
```

## Symbol.match

对象的 Symbol.match 属性，指向一个函数。当执行 str.match(myObject) 时，如果该属性存在，会调用它，返回该方法的 返回值。

```js
String.prototype.match(regexp)
// 等同于
regexp[Symbol.match](this)
class MyMatcher {
	[Symbol.match](string) {
		return 'hello world'.indexOf(string);
	}
}
'e'.match(new MyMatcher()) // 1
```

## Symbol.replace

对象的 Symbol.replace 属性，指向一个方法，当该对象被 String.prototype.replace 方法调用时，会返回该方法的返回 值。

```js
String.prototype.replace(searchValue, replaceValue)
// 等同于
searchValue[Symbol.replace](this, replaceValue)
```

## Symbol.search

对象的 Symbol.search 属性，指向一个方法，当该对象被 String.prototype.search 方法调用时，会返回该方法的返回 值。

```js
String.prototype.search(regexp)
// 等同于
regexp[Symbol.search](this)
class MySearch {
    constructor(value) {
        this.value = value;
    }
	[Symbol.search](string) {
		return string.indexOf(this.value);
	}
}
'foobar'.search(new MySearch('foo')) // 0
```

## Symbol.split

对象的 Symbol.split 属性，指向一个方法，当该对象被 String.prototype.split 方法调用时，会返回该方法的返回值

```js
String.prototype.split(separator, limit)
// 等同于
separator[Symbol.split](this, limit)
```

## Symbol.iterator

对象的 Symbol.iterator 属性，指向该对象的默认遍历器方法。

```js
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};
[...myIterable] // [1, 2, 3]
```

对象进行 for...of 循环时，会调用 Symbol.iterator 方法，返回该对象的默认遍历器，详细介绍参见《Iterator和for...of循 环》一章。

```js
class Collection {
    *[Symbol.iterator]() {
        let i = 0;
        while(this[i] !== undefined) {
            yield this[i];
            ++i;
        }
    }
}
let myCollection = new Collection();
myCollection[0] = 1;
myCollection[1] = 2;
for(let value of myCollection) {
	console.log(value);
}
// 1
// 2

```

## Symbol.toPrimitive

对象的 Symbol.toPrimitive 属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始 类型值。

 Symbol.toPrimitive 被调用时，会接受一个字符串参数，表示当前运算的模式，一共有三种模式。

+ Number：该场合需要转成数值 
+ String：该场合需要转成字符串 
+ Default：该场合可以转成数值，也可以转成字符串

```js
let obj = {
    [Symbol.toPrimitive](hint) {
        switch (hint) {
            case 'number':
            return 123;
            case 'string':
            return 'str';
            case 'default':
            return 'default';
            default:
            throw new Error();
    	}
	}
};
2 * obj // 246
3 + obj // '3default'
obj === 'default' // true
String(obj) // 'str'
```

## Symbol.toStringTag

对象的 Symbol.toStringTag 属性，指向一个方法。在该对象上面调用 Object.prototype.toString 方法时，如果这个属性 存在，它的返回值会出现在 toString 方法返回的字符串之中，表示对象的类型。也就是说，这个属性可以用来定制 [object Object] 或 [object Array] 中object后面的那个字符串。

```js
({[Symbol.toStringTag]: 'Foo'}.toString())
// "[object Foo]"
class Collection {
    get [Symbol.toStringTag]() {
        return 'xxx';
    }
}
var x = new Collection();
Object.prototype.toString.call(x) // "[object xxx]"
```

ES6新增内置对象的 Symbol.toStringTag 属性值如下。

+ JSON[Symbol.toStringTag] ：'JSON' 
+ Math[Symbol.toStringTag] ：'Math' 
+ Module对象 M[Symbol.toStringTag] ：'Module' 
+ ArrayBuffer.prototype[Symbol.toStringTag] ：'ArrayBuffer' 
+ DataView.prototype[Symbol.toStringTag] ：'DataView' 
+ Map.prototype[Symbol.toStringTag] ：'Map' 
+ Promise.prototype[Symbol.toStringTag] ：'Promise' 
+ Set.prototype[Symbol.toStringTag] ：'Set'
+  %TypedArray%.prototype[Symbol.toStringTag] ：'Uint8Array'等 
+ WeakMap.prototype[Symbol.toStringTag] ：'WeakMap' 
+ WeakSet.prototype[Symbol.toStringTag] ：'WeakSet' 
+ %MapIteratorPrototype%[Symbol.toStringTag] ：'Map Iterator'
+  %SetIteratorPrototype%[Symbol.toStringTag] ：'Set Iterator' 
+ %StringIteratorPrototype%[Symbol.toStringTag] ：'String Iterator' 
+ Symbol.prototype[Symbol.toStringTag] ：'Symbol' 
+ Generator.prototype[Symbol.toStringTag] ：'Generator' 
+ GeneratorFunction.prototype[Symbol.toStringTag] ：'GeneratorFunction'

## Symbol.unscopables

对象的 Symbol.unscopables 属性，指向一个对象。该对象指定了使用 with 关键字时，哪些属性会被 with 环境排除

```js
Array.prototype[Symbol.unscopables]
// {
// copyWithin: true,
// entries: true,
// fill: true,
// find: true,
// findIndex: true,
// keys: true
// }
Object.keys(Array.prototype[Symbol.unscopables])
// ['copyWithin', 'entries', 'fill', 'find', 'findIndex', 'keys']
```

上面代码说明，数组有6个属性，会被with命令排除。

```js
// 没有unscopables时
class MyClass {
	foo() { return 1; }
}
var foo = function () { return 2; };
with (MyClass.prototype) {
	foo(); // 1
}
// 有unscopables时
class MyClass {
    foo() { return 1; }
    get [Symbol.unscopables]() {
    	return { foo: true };
    }
}
var foo = function () { return 2; };
with (MyClass.prototype) {
	foo(); // 2
}
```

# Iterator和for...of循环

## Iterator（遍历器）的概念

JavaScript原有的表示“集合”的数据结构，主要是数组（Array）和对象（Object），ES6又添加了Map和Set。这样就有了四种数 据集合，用户还可以组合使用它们，定义自己的数据结构，比如数组的成员是Map，Map的成员是对象。这样就需要一种统一 的接口机制，来处理所有不同的数据结构。 

遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。 

Iterator的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排 列；三是ES6创造了一种新的遍历命令 for...of 循环，Iterator接口主要供 for...of 消费。 

Iterator的遍历过程是这样的。 

（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。 

（2）第一次调用指针对象的 next 方法，可以将指针指向数据结构的第一个成员。 

（3）第二次调用指针对象的 next 方法，指针就指向数据结构的第二个成员。 

（4）不断调用指针对象的 next 方法，直到它指向数据结构的结束位置。 

每一次调用 next 方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含 value 和 done 两个属性的对 象。其中， value 属性是当前成员的值， done 属性是一个布尔值，表示遍历是否结束。 下面是一个模拟 next 方法返回值的例子。

```js
var it = makeIterator(['a', 'b']);
it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }
function makeIterator(array) {
var nextIndex = 0;
return {
next: function() {
return nextIndex < array.length ?
{value: array[nextIndex++], done: false} :
{value: undefined, done: true};
}
};
}
```

上面代码定义了一个 makeIterator 函数，它是一个遍历器生成函数，作用就是返回一个遍历器对象。对数组 ['a', 'b'] 执行这个函数，就会返回该数组的遍历器对象（即指针对象） it 。

 指针对象的 next 方法，用来移动指针。开始时，指针指向数组的开始位置。然后，每次调用 next 方法，指针就会指向数 组的下一个成员。第一次调用，指向 a ；第二次调用，指向 b 。 

next 方法返回一个对象，表示当前数据成员的信息。这个对象具有 value 和 done 两个属性， value 属性返回当前位置 的成员， done 属性是一个布尔值，表示遍历是否结束，即是否还有必要再一次调用 next 方法。

 总之，调用指针对象的 next 方法，就可以遍历事先给定的数据结构。

 对于遍历器对象来说， done: false 和 value: undefined 属性都是可以省略的，因此上面的 makeIterator 函数可以简写 成下面的形式。

```js
function makeIterator(array) {
var nextIndex = 0;
return {
next: function() {
return nextIndex < array.length ?
{value: array[nextIndex++]} :
{done: true};
}
};
}
```

由于Iterator只是把接口规格加到数据结构之上，所以，遍历器与它所遍历的那个数据结构，实际上是分开的，完全可以写出没 有对应数据结构的遍历器对象，或者说用遍历器对象模拟出数据结构。下面是一个无限运行的遍历器对象的例子。

```js
var it = idMaker();
it.next().value // '0'
it.next().value // '1'
it.next().value // '2'
// ...
function idMaker() {
var index = 0;
return {
next: function() {
return {value: index++, done: false};
}
};
}
```

上面的例子中，遍历器生成函数 idMaker ，返回一个遍历器对象（即指针对象）。但是并没有对应的数据结构，或者说，遍 历器对象自己描述了一个数据结构出来。

 在ES6中，有些数据结构原生具备Iterator接口（比如数组），即不用任何处理，就可以被 for...of 循环遍历，有些就不行 （比如对象）。原因在于，这些数据结构原生部署了 Symbol.iterator 属性（详见下文），另外一些数据结构没有。凡是部 署了 Symbol.iterator 属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。 如果使用TypeScript的写法，遍历器接口（Iterable）、指针对象（Iterator）和next方法返回值的规格可以描述如下。

```js
interface Iterable {
[Symbol.iterator]() : Iterator,
}
interface Iterator {
next(value?: any) : IterationResult,
}
interface IterationResult {
value: any,
done: boolean,
}
```

## 数据结构的默认Iterator接口

Iterator接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即 for...of 循环（详见下文）。当使 用 for...of 循环遍历某种数据结构时，该循环会自动去寻找Iterator接口。 

ES6规定，默认的Iterator接口部署在数据结构的 Symbol.iterator 属性，或者说，一个数据结构只要具 有 Symbol.iterator 属性，就可以认为是“可遍历的”（iterable）。调用 Symbol.iterator 方法，就会得到当前数据结构默认 的遍历器生成函数。 Symbol.iterator 本身是一个表达式，返回Symbol对象的 iterator 属性，这是一个预定义好的、类型 为Symbol的特殊值，所以要放在方括号内（请参考Symbol一章）。 

在ES6中，有三类数据结构原生具备Iterator接口：数组、某些类似数组的对象、Set和Map结构。

```js
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();
iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }
```

上面代码中，变量 arr 是一个数组，原生就具有遍历器接口，部署在 arr 的 Symbol.iterator 属性上面。所以，调用这个 属性，就得到遍历器对象。 

上面提到，原生就部署Iterator接口的数据结构有三类，对于这三类数据结构，不用自己写遍历器生成函数， for...of 循环会 自动遍历它们。除此之外，其他数据结构（主要是对象）的Iterator接口，都需要自己在 Symbol.iterator 属性上面部署，这 样才会被 for...of 循环遍历。

 对象（Object）之所以没有默认部署Iterator接口，是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动 指定。本质上，遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器接口，就等于部署一种线性转换。不过，严 格地说，对象部署遍历器接口并不是很必要，因为这时对象实际上被当作Map结构使用，ES5没有Map结构，而ES6原生提供 了。

 一个对象如果要有可被 for...of 循环调用的Iterator接口，就必须在 Symbol.iterator 的属性上部署遍历器生成方法（原型 链上的对象具有该方法也可）。

```js
class RangeIterator {
constructor(start, stop) {
this.value = start;
this.stop = stop;
}
[Symbol.iterator]() { return this; }
next() {
var value = this.value;
if (value < this.stop) {
this.value++;
return {done: false, value: value};
} else {
return {done: true, value: undefined};
}
}
}
function range(start, stop) {
return new RangeIterator(start, stop);
}
for (var value of range(0, 3)) {
console.log(value);
}
```

上面代码是一个类部署Iterator接口的写法。 Symbol.iterator 属性对应一个函数，执行后返回当前对象的遍历器对象。 下面是通过遍历器实现指针结构的例子。

```js
function Obj(value) {
this.value = value;
this.next = null;
}
Obj.prototype[Symbol.iterator] = function() {
var iterator = {
next: next
};
var current = this;
function next() {
if (current) {
var value = current.value;
var done = current.next === null;
current = current.next;
return {
done: done,
value: value
};
} else {
return {
done: true
};
}
}
return iterator;
}
var one = new Obj(1);
var two = new Obj(2);
var three = new Obj(3);
one.next = two;
two.next = three;
for (var i of one){
console.log(i);
}
// 1
// 2
// 3
```

上面代码首先在构造函数的原型链上部署 Symbol.iterator 方法，调用该方法会返回遍历器对象 iterator ，调用该对象 的 next 方法，在返回一个值的同时，自动将内部指针移到下一个实例。 下面是另一个为对象添加Iterator接口的例子。

```js
let obj = {
data: [ 'hello', 'world' ],
[Symbol.iterator]() {
const self = this;
let index = 0;
return {
next() {
if (index < self.data.length) {
return {
value: self.data[index++],
done: false
};
} else {
return { value: undefined, done: true };
}
}
};
}
};

```

对于类似数组的对象（存在数值键名和length属性），部署Iterator接口，有一个简便方法，就是 Symbol.iterator 方法直接引 用数组的Iterator接口。

```js
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
// 或者
NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];
[...document.querySelectorAll('div')] // 可以执行了
```

下面是类似数组的对象调用数组的 Symbol.iterator 方法的例子。

```js
let iterable = {
0: 'a',
1: 'b',
2: 'c',
length: 3,
[Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
console.log(item); // 'a', 'b', 'c'
}
```

注意，普通对象部署数组的 Symbol.iterator 方法，并无效果。

```js
let iterable = {
a: 'a',
b: 'b',
c: 'c',
length: 3,
[Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
console.log(item); // undefined, undefined, undefined
}
```

如果 Symbol.iterator 方法对应的不是遍历器生成函数（即会返回一个遍历器对象），解释引擎将会报错。

```js
var obj = {};
obj[Symbol.iterator] = () => 1;
[...obj] // TypeError: [] is not a function
```

上面代码中，变量obj的Symbol.iterator方法对应的不是遍历器生成函数，因此报错。 有了遍历器接口，数据结构就可以用 for...of 循环遍历（详见下文），也可以使用 while 循环遍历。

```js
var $iterator = ITERABLE[Symbol.iterator]();
var $result = $iterator.next();
while (!$result.done) {
var x = $result.value;
// ...
$result = $iterator.next();
}
```

上面代码中， ITERABLE 代表某种可遍历的数据结构， $iterator 是它的遍历器对象。遍历器对象每次移动指针（ next 方 法），都检查一下返回值的 done 属性，如果遍历还没结束，就移动遍历器对象的指针到下一步（ next 方法），不断循 环。

## 调用Iterator接口的场合

有一些场合会默认调用Iterator接口（即 Symbol.iterator 方法），除了下文会介绍的 for...of 循环，还有几个别的场合。

（1）解构赋值

对数组和Set结构进行解构赋值时，会默认调用 Symbol.iterator 方法。

```js
let set = new Set().add('a').add('b').add('c');
let [x,y] = set;
// x='a'; y='b'
let [first, ...rest] = set;
// first='a'; rest=['b','c']
```

（2）扩展运算符

扩展运算符（...）也会调用默认的iterator接口。

```js
// 例一
var str = 'hello';
[...str] // ['h','e','l','l','o']
// 例二
let arr = ['b', 'c'];
['a', ...arr, 'd']
// ['a', 'b', 'c', 'd']
```

上面代码的扩展运算符内部就调用Iterator接口。 实际上，这提供了一种简便机制，可以将任何部署了Iterator接口的数据结构，转为数组。也就是说，只要某个数据结构部署了 Iterator接口，就可以对它使用扩展运算符，将其转为数组。

```js
let arr = [...iterable];
```

（3）yield*

yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。

```js
let generator = function* () {
yield 1;
yield* [2,3,4];
yield 5;
};
var iterator = generator();
iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: 3, done: false }
iterator.next() // { value: 4, done: false }
iterator.next() // { value: 5, done: false }
iterator.next() // { value: undefined, done: true }
```

（4）其他场合

由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。下面是一些例子。

+ for...of 
+ Array.from() 
+ Map(), Set(), WeakMap(), WeakSet()（比如 new Map([['a',1],['b',2]]) ） 
+ Promise.all() 
+ Promise.race()

## 字符串的Iterator接口

字符串是一个类似数组的对象，也原生具有Iterator接口。

```js
var someString = "hi";
typeof someString[Symbol.iterator]
// "function"
var iterator = someString[Symbol.iterator]();
iterator.next() // { value: "h", done: false }
iterator.next() // { value: "i", done: false }
iterator.next() // { value: undefined, done: true }
```

上面代码中，调用 Symbol.iterator 方法返回一个遍历器对象，在这个遍历器上可以调用next方法，实现对于字符串的遍历。 可以覆盖原生的 Symbol.iterator 方法，达到修改遍历器行为的目的。

```js
var str = new String("hi");
[...str] // ["h", "i"]
str[Symbol.iterator] = function() {
return {
next: function() {
if (this._first) {
this._first = false;
return { value: "bye", done: false };
} else {
return { done: true };
}
},
_first: true
};
};
[...str] // ["bye"]
str // "hi"
```

上面代码中，字符串str的 Symbol.iterator 方法被修改了，所以扩展运算符（ ... ）返回的值变成了 bye ，而字符串本身 还是 hi 。

## Iterator接口与Generator函数

Symbol.iterator 方法的最简单实现，还是使用下一章要介绍的Generator函数。

```js
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
yield 1;
yield 2;
yield 3;
};
[...myIterable] // [1, 2, 3]
// 或者采用下面的简洁写法
let obj = {
* [Symbol.iterator]() {
yield 'hello';
yield 'world';
}
};
for (let x of obj) {
console.log(x);
}
// hello
// world
```

上面代码中， Symbol.iterator 方法几乎不用部署任何代码，只要用yield命令给出每一步的返回值即可。

## 遍历器对象的return()，throw()

遍历器对象除了具有 next 方法，还可以具有 return 方法和 throw 方法。如果你自己写遍历器对象生成函数，那 么 next 方法是必须部署的， return 方法和 throw 方法是否部署是可选的。 return 方法的使用场合是，如果 for...of 循环提前退出（通常是因为出错，或者有 break 语句或 continue 语句）， 就会调用 return 方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署 return 方法。

```js
function readLinesSync(file) {
return {
next() {
if (file.isAtEndOfFile()) {
file.close();
return { done: true };
}
},
return() {
file.close();
return { done: true };
},
};
}
```

上面代码中，函数 readLinesSync 接受一个文件对象作为参数，返回一个遍历器对象，其中除了 next 方法，还部署 了 return 方法。下面，我们让文件的遍历提前返回，这样就会触发执行 return 方法。

```js
for (let line of readLinesSync(fileName)) {
console.log(x);
break;
}
```

注意， return 方法必须返回一个对象，这是Generator规格决定的。 throw 方法主要是配合Generator函数使用，一般的遍历器对象用不到这个方法。请参阅《Generator函数》一章

## for...of循环

ES6借鉴C++、Java、C#和Python语言，引入了 for...of 循环，作为遍历所有数据结构的统一的方法。一个数据结构只要部署 了 Symbol.iterator 属性，就被视为具有iterator接口，就可以用 for...of 循环遍历它的成员。也就是说， for...of 循环 内部调用的是数据结构的 Symbol.iterator 方法。 for...of循环可以使用的范围包括数组、Set和Map结构、某些类似数组的对象（比如arguments对象、DOM NodeList对象）、后文 的Generator对象，以及字符串。

## 数组

数组原生具备iterator接口， for...of 循环本质上就是调用这个接口产生的遍历器，可以用下面的代码证明。

```js
const arr = ['red', 'green', 'blue'];
let iterator = arr[Symbol.iterator]();
for(let v of arr) {
console.log(v); // red green blue
}
for(let v of iterator) {
console.log(v); // red green blue
}
```

上面代码的 for...of 循环的两种写法是等价的。 for...of 循环可以代替数组实例的 forEach 方法。

```js
const arr = ['red', 'green', 'blue'];
arr.forEach(function (element, index) {
console.log(element); // red green blue
console.log(index); // 0 1 2
});
```

JavaScript原有的 for...in 循环，只能获得对象的键名，不能直接获取键值。ES6提供 for...of 循环，允许遍历获得键值。

```js
var arr = ['a', 'b', 'c', 'd'];
for (let a in arr) {
console.log(a); // 0 1 2 3
}
for (let a of arr) {
console.log(a); // a b c d
}
```

上面代码表明， for...in 循环读取键名， for...of 循环读取键值。如果要通过 for...of 循环，获取数组的索引，可以 借助数组实例的 entries 方法和 keys 方法，参见《数组的扩展》章节。 for...of 循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。这一点跟 for...in 循环也不一样。

```js
let arr = [3, 5, 7];
arr.foo = 'hello';
for (let i in arr) {
console.log(i); // "0", "1", "2", "foo"
}
for (let i of arr) {
console.log(i); // "3", "5", "7"
}
```

上面代码中， for...of 循环不会返回数组 arr 的 foo 属性。

## Set和Map结构

Set和Map结构也原生具有Iterator接口，可以直接使用 for...of 循环。

```js
var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
for (var e of engines) {
console.log(e);
}
// Gecko
// Trident
// Webkit
var es6 = new Map();
es6.set("edition", 6);
es6.set("committee", "TC39");
es6.set("standard", "ECMA-262");
for (var [name, value] of es6) {
console.log(name + ": " + value);
}
// edition: 6
// committee: TC39
// standard: ECMA-262
```

上面代码演示了如何遍历Set结构和Map结构。值得注意的地方有两个，首先，遍历的顺序是按照各个成员被添加进数据结构的 顺序。其次，Set结构遍历时，返回的是一个值，而Map结构遍历时，返回的是一个数组，该数组的两个成员分别为当前Map成 员的键名和键值。

```js
let map = new Map().set('a', 1).set('b', 2);
for (let pair of map) {
console.log(pair);
}
// ['a', 1]
// ['b', 2]
for (let [key, value] of map) {
console.log(key + ' : ' + value);
}
// a : 1
// b : 2
```

## 计算生成的数据结构

有些数据结构是在现有数据结构的基础上，计算生成的。比如，ES6的数组、Set、Map都部署了以下三个方法，调用后都返回 遍历器对象。

+ entries() 返回一个遍历器对象，用来遍历 [键名, 键值] 组成的数组。对于数组，键名就是索引值；对于Set，键名与 键值相同。Map结构的iterator接口，默认就是调用entries方法。 
+ keys() 返回一个遍历器对象，用来遍历所有的键名。 
+ values() 返回一个遍历器对象，用来遍历所有的键值。

这三个方法调用后生成的遍历器对象，所遍历的都是计算生成的数据结构。

```js
let arr = ['a', 'b', 'c'];
for (let pair of arr.entries()) {
console.log(pair);
}
// [0, 'a']
// [1, 'b']
// [2, 'c']
```

## 类似数组的对象

类似数组的对象包括好几类。下面是 for...of 循环用于字符串、DOM NodeList对象、arguments对象的例子。

```js
// 字符串
let str = "hello";
for (let s of str) {
console.log(s); // h e l l o
}
// DOM NodeList对象
let paras = document.querySelectorAll("p");
for (let p of paras) {
p.classList.add("test");
}
// arguments对象
function printArgs() {
for (let x of arguments) {
console.log(x);
}
}
printArgs('a', 'b');
// 'a'
// 'b'
```

对于字符串来说， for...of 循环还有一个特点，就是会正确识别32位UTF-16字符。

```js
for (let x of 'a\uD83D\uDC0A') {
console.log(x);
}
// 'a'
// '\uD83D\uDC0A'
```

并不是所有类似数组的对象都具有iterator接口，一个简便的解决方法，就是使用Array.from方法将其转为数组。

```js
let arrayLike = { length: 2, 0: 'a', 1: 'b' };
// 报错
for (let x of arrayLike) {
console.log(x);
}
// 正确
for (let x of Array.from(arrayLike)) {
console.log(x);
}
```

## 对象

对于普通的对象， for...of 结构不能直接使用，会报错，必须部署了iterator接口后才能使用。但是，这样情况 下， for...in 循环依然可以用来遍历键名。

```js
var es6 = {
edition: 6,
committee: "TC39",
standard: "ECMA-262"
};
for (e in es6) {
console.log(e);
}
// edition
// committee
// standard
for (e of es6) {
console.log(e);
}
// TypeError: es6 is not iterable
```

上面代码表示，对于普通的对象， for...in 循环可以遍历键名， for...of 循环会报错。 一种解决方法是，使用 Object.keys 方法将对象的键名生成一个数组，然后遍历这个数组。

```js
for (var key of Object.keys(someObject)) {
console.log(key + ": " + someObject[key]);
}
```

在对象上部署iterator接口的代码，参见本章前面部分。一个方便的方法是将数组的 Symbol.iterator 属性，直接赋值给其他 对象的 Symbol.iterator 属性。比如，想要让 for...of 环遍历jQuery对象，只要加上下面这一行就可以了。

```js
jQuery.prototype[Symbol.iterator] =
Array.prototype[Symbol.iterator];
```

另一个方法是使用Generator函数将对象重新包装一下。

```js
function* entries(obj) {
for (let key of Object.keys(obj)) {
yield [key, obj[key]];
}
}
for (let [key, value] of entries(obj)) {
console.log(key, "->", value);
}
// a -> 1
// b -> 2
// c -> 3
```

## 与其他遍历语法的比较

以数组为例，JavaScript提供多种遍历语法。最原始的写法就是for循环。

```js
for (var index = 0; index < myArray.length; index++) {
console.log(myArray[index]);
}
```

这种写法比较麻烦，因此数组提供内置的forEach方法。

```js
myArray.forEach(function (value) {
console.log(value);
});
```

这种写法的问题在于，无法中途跳出 forEach 循环，break命令或return命令都不能奏效。 for...in 循环可以遍历数组的键名。

```js
for (var index in myArray) {
console.log(myArray[index]);
}
```

for...in循环有几个缺点。 

+ 数组的键名是数字，但是for...in循环是以字符串作为键名“0”、“1”、“2”等等。 

+ for...in循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。 
+ 某些情况下，for...in循环会以任意顺序遍历键名。 

总之， for...in 循环主要是为遍历对象而设计的，不适用于遍历数组。 for...of 循环相比上面几种做法，有一些显著的优点。

```js
for (let value of myArray) {
console.log(value);
}
```

+ 有着同for...in一样的简洁语法，但是没有for...in那些缺点。 
+ 不同用于forEach方法，它可以与break、continue和return配合使用。 
+ 提供了遍历所有数据结构的统一操作接口。 

下面是一个使用break语句，跳出 for...of 循环的例子。

```js
for (var n of fibonacci) {
if (n > 1000)
break;
console.log(n);
}
```

上面的例子，会输出斐波纳契数列小于等于1000的项。如果当前项大于1000，就会使用break语句跳出 for...of 循环。

## 问答题

1. Symbol 是什么？有哪些使用场景？

   > 

2. `Symbol("foo") == Symbol("foo")`输出什么？为什么？

   > 

3. `Symbol.iterator` 是什么？这里为什么要使用 `Symbol` 那？

   > 

4. 哪些对象（容器）内部实现了 iterator ？

   > 

5. 数组解构的核心本质是什么？哪些对象（容器）可以作为数组解构的右值？

   > 

## 代码题

1. 请实现与下面 generator 函数 等价的迭代器

   ```javascript
   function* gen(){
      yield 1
      yield 2
      return 3;
   }
   ```

   ```js
   ```

   

2. 请给对象 `let obj={}` 加上迭代器，实现可以无限打印 `a`

   > 

3. 请给对象 `obj` 加上迭代器，使其可以像数组一样使用 `for of` 循环

   ```javascript
   let obj = {
      [0] : "a",
      [1] : "b",
      [2] : "c",
      length : 3
   }
   ```

   ```js
   ```

   