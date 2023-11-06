# Class

## Class基本语法

## 概述

JavaScript语言的传统方法是通过构造函数，定义并生成新对象。下面是一个例子。

```js
function Point(x,y){
this.x = x;
this.y = y;
}
Point.prototype.toString = function () {
return '(' + this.x + ', ' + this.y + ')';
};
```

上面这种写法跟传统的面向对象语言（比如C++和Java）差异很大，很容易让新学习这门语言的程序员感到困惑。 ES6提供了更接近传统语言的写法，引入了Class（类）这个概念，作为对象的模板。通过 class 关键字，可以定义类。基本 上，ES6的class可以看作只是一个语法糖，它的绝大部分功能，ES5都可以做到，新的 class 写法只是让对象原型的写法更加 清晰、更像面向对象编程的语法而已。上面的代码用ES6的“类”改写，就是下面这样。

```js
//定义类
class Point {
constructor(x, y) {
this.x = x;
this.y = y;
}
toString() {
return '(' + this.x + ', ' + this.y + ')';
}
}
```

上面代码定义了一个“类”，可以看到里面有一个 constructor 方法，这就是构造方法，而 this 关键字则代表实例对象。也 就是说，ES5的构造函数 Point ，对应ES6的 Point 类的构造方法。 Point类除了构造方法，还定义了一个 toString 方法。注意，定义“类”的方法的时候，前面不需要加上 function 这个关键 字，直接把函数定义放进去了就可以了。另外，方法之间不需要逗号分隔，加了会报错。 ES6的类，完全可以看作构造函数的另一种写法。

```js
class Point{
// ...
}
typeof Point // "function"
Point === Point.prototype.constructor // true
```

上面代码表明，类的数据类型就是函数，类本身就指向构造函数。 构造函数的 prototype 属性，在ES6的“类”上面继续存在。事实上，类的所有方法都定义在类的 prototype 属性上面。

```js
class Point {
constructor(){
// ...
}
toString(){
// ...
}
toValue(){
// ...
}
}
// 等同于
Point.prototype = {
toString(){},
toValue(){}
};
```

在类的实例上面调用方法，其实就是调用原型上的方法。

```js
class B {}
let b = new B();
b.constructor === B.prototype.constructor // true
```

上面代码中， b 是B类的实例，它的 constructor 方法就是B类原型的 constructor 方法。 由于类的方法都定义在 prototype 对象上面，所以类的新方法可以添加在 prototype 对象上面。 Object.assign 方法可以 很方便地一次向类添加多个方法。

```js
class Point {
constructor(){
// ...
}
}
Object.assign(Point.prototype, {
toString(){},
toValue(){}
});
```

prototype 对象的 constructor 属性，直接指向“类”的本身，这与ES5的行为是一致的。

```js
Point.prototype.constructor === Point // true
```

另外，类的内部所有定义的方法，都是不可枚举的（non-enumerable）。

```js
class Point {
constructor(x, y) {
// ...
}
toString() {
// ...
}
}
Object.keys(Point.prototype)
// []
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
```

上面代码中， toString 方法是 Point 类内部定义的方法，它是不可枚举的。这一点与ES5的行为不一致。

```js
var Point = function (x, y){
// ...
};
Point.prototype.toString = function() {
// ...
};
Object.keys(Point.prototype)
// ["toString"]
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
```

上面代码采用ES5的写法， toString 方法就是可枚举的。 类的属性名，可以采用表达式。

```js
let methodName = "getArea";
class Square{
constructor(length) {
// ...
}
[methodName]() {
// ...
}
}
```

上面代码中，Square类的方法名getArea，是从表达式得到的。

## constructor方法

constructor 方法是类的默认方法，通过 new 命令生成对象实例时，自动调用该方法。一个类必须有 constructor 方法， 如果没有显式定义，一个空的 constructor 方法会被默认添加。

constructor 方法默认返回实例对象（即 this ），完全可以指定返回另外一个对象。

```js
class Foo {
constructor() {
return Object.create(null);
}
}
new Foo() instanceof Foo
// false
```

上面代码中， constructor 函数返回一个全新的对象，结果导致实例对象不是 Foo 类的实例。

## 类的实例对象

生成类的实例对象的写法，与ES5完全一样，也是使用 new 命令。如果忘记加上 new ，像函数那样调用 Class ，将会报 错。

```js
// 报错
var point = Point(2, 3);
// 正确
var point = new Point(2, 3);
```

与ES5一样，实例的属性除非显式定义在其本身（即定义在 this 对象上），否则都是定义在原型上（即定义 在 class 上）。

```js
//定义类
class Point {
constructor(x, y) {
this.x = x;
this.y = y;
}
toString() {
return '(' + this.x + ', ' + this.y + ')';
}
}
var point = new Point(2, 3);
point.toString() // (2, 3)
point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true
```

上面代码中， x 和 y 都是实例对象 point 自身的属性（因为定义在 this 变量上），所以 hasOwnProperty 方法返 回 true ，而 toString 是原型对象的属性（因为定义在 Point 类上），所以 hasOwnProperty 方法返回 false 。这些 都与ES5的行为保持一致。 与ES5一样，类的所有实例共享一个原型对象。

```js
var p1 = new Point(2,3);
var p2 = new Point(3,2);
p1.__proto__ === p2.__proto__
//true
```

上面代码中， p1 和 p2 都是Point的实例，它们的原型都是Point，所以 __proto__ 属性是相等的。 这也意味着，可以通过实例的 __proto__ 属性为Class添加方法。

```js
var p1 = new Point(2,3);
var p2 = new Point(3,2);
p1.__proto__.printName = function () { return 'Oops' };
p1.printName() // "Oops"
p2.printName() // "Oops"
var p3 = new Point(4,2);
p3.printName() // "Oops"
```

上面代码在 p1 的原型上添加了一个 printName 方法，由于 p1 的原型就是 p2 的原型，因此 p2 也可以调用这个方法。 而且，此后新建的实例 p3 也可以调用这个方法。这意味着，使用实例的 __proto__ 属性改写原型，必须相当谨慎，不推荐 使用，因为这会改变Class的原始定义，影响到所有实例。

## name属性

由于本质上，ES6的Class只是ES5的构造函数的一层包装，所以函数的许多特性都被Class继承，包括 name 属性。

```js
class Point {}
Point.name // "Point"
```

name 属性总是返回紧跟在 class 关键字后面的类名。

## Class表达式

与函数一样，Class也可以使用表达式的形式定义。

```js
const MyClass = class Me {
getClassName() {
return Me.name;
}
};
```

上面代码使用表达式定义了一个类。需要注意的是，这个类的名字是 MyClass 而不是 Me ， Me 只在Class的内部代码可用， 指代当前类。

```js
let inst = new MyClass();
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defined
```

上面代码表示， Me 只在Class内部有定义。 如果Class内部没用到的话，可以省略 Me ，也就是可以写成下面的形式

```js
const MyClass = class { /* ... */ };
```

采用Class表达式，可以写出立即执行的Class。

```js
let person = new class {
constructor(name) {
this.name = name;
}
sayName() {
console.log(this.name);
}
}('张三');
person.sayName(); // "张三"
```

上面代码中，person是一个立即执行的Class的实例。

## 不存在变量提升

Class不存在变量提升（hoist），这一点与ES5完全不同。

```js
new Foo(); // ReferenceError
class Foo {}
```

上面代码中， Foo 类使用在前，定义在后，这样会报错，因为ES6不会把变量声明提升到代码头部。这种规定的原因与下文要 提到的继承有关，必须保证子类在父类之后定义。

```js
{
let Foo = class {};
class Bar extends Foo {
}
}
```

上面的代码不会报错，因为 class 继承 Foo 的时候， Foo 已经有定义了。但是，如果存在Class的提升，上面代码就会报 错，因为 class 会被提升到代码头部，而 let 命令是不提升的，所以导致 class 继承 Foo 的时候， Foo 还没有定义。

## 严格模式 

类和模块的内部，默认就是严格模式，所以不需要使用 use strict 指定运行模式。只要你的代码写在类或模块之中，就只有 严格模式可用。

考虑到未来所有的代码，其实都是运行在模块之中，所以ES6实际上把整个语言升级到了严格模式。

##  Class的继承 

基本用法 Class之间可以通过 extends 关键字实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多。

```js
class ColorPoint extends Point {}
```

上面代码定义了一个 ColorPoint 类，该类通过 extends 关键字，继承了 Point 类的所有属性和方法。但是由于没有部署 任何代码，所以这两个类完全一样，等于复制了一个 Point 类。下面，我们在 ColorPoint 内部加上代码。

```js
class ColorPoint extends Point {
constructor(x, y, color) {
super(x, y); // 调用父类的constructor(x, y)
this.color = color;
}
toString() {
return this.color + ' ' + super.toString(); // 调用父类的toString()
}
}
```

上面代码中， constructor 方法和 toString 方法之中，都出现了 super 关键字，它在这里表示父类的构造函数，用来新 建父类的 this 对象。 子类必须在 constructor 方法中调用 super 方法，否则新建实例时会报错。这是因为子类没有自己的 this 对象，而是继 承父类的 this 对象，然后对其进行加工。如果不调用 super 方法，子类就得不到 this 对象。

```js
class Point { /* ... */ }
class ColorPoint extends Point {
constructor() {
}
}
let cp = new ColorPoint(); // ReferenceError
```

上面代码中， ColorPoint 继承了父类 Point ，但是它的构造函数没有调用 super 方法，导致新建实例时报错。 ES5的继承，实质是先创造子类的实例对象 this ，然后再将父类的方法添加到 this 上面（ Parent.apply(this) ）。ES6 的继承机制完全不同，实质是先创造父类的实例对象 this （所以必须先调用 super 方法），然后再用子类的构造函数修 改 this 。 如果子类没有定义 constructor 方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类 都有 constructor 方法。

```js
constructor(...args) {
super(...args);
}
```

另一个需要注意的地方是，在子类的构造函数中，只有调用 super 之后，才可以使用 this 关键字，否则会报错。这是因为 子类实例的构建，是基于对父类实例加工，只有 super 方法才能返回父类实例。

```js
class Point {
constructor(x, y) {
this.x = x;
this.y = y;
}
}
class ColorPoint extends Point {
constructor(x, y, color) {
this.color = color; // ReferenceError
super(x, y);
this.color = color; // 正确
}
}
```

上面代码中，子类的 constructor 方法没有调用 super 之前，就使用 this 关键字，结果报错，而放在 super 方法之后 就是正确的。 下面是生成子类实例的代码。

```js
let cp = new ColorPoint(25, 8, 'green');
cp instanceof ColorPoint // true
cp instanceof Point // true
```

上面代码中，实例对象 cp 同时是 ColorPoint 和 Point 两个类的实例，这与ES5的行为完全一致。 

## 类的prototype属性和__proto__属性

 大多数浏览器的ES5实现之中，每一个对象都有 __proto__ 属性，指向对应的构造函数的prototype属性。Class作为构造函数的 语法糖，同时有prototype属性和 __proto__ 属性，因此同时存在两条继承链。 

（1）子类的 __proto__ 属性，表示构造函数的继承，总是指向父类。 

（2）子类 prototype 属性的 __proto__ 属性，表示方法的继承，总是指向父类的 prototype 属性。

```js
class A {
}
class B extends A {
}
B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
```

上面代码中，子类 B 的 __proto__ 属性指向父类 A ，子类 B 的 prototype 属性的 __proto__ 属性指向父 类 A 的 prototype 属性。 这样的结果是因为，类的继承是按照下面的模式实现的。

```js
class A {
}
class B {
}
// B的实例继承A的实例
Object.setPrototypeOf(B.prototype, A.prototype);
// B继承A的静态属性
Object.setPrototypeOf(B, A);
```

《对象的扩展》一章给出过 Object.setPrototypeOf 方法的实现。

```js
Object.setPrototypeOf = function (obj, proto) {
obj.__proto__ = proto;
return obj;
}
```

因此，就得到了上面的结果。

```js
Object.setPrototypeOf(B.prototype, A.prototype);
// 等同于
B.prototype.__proto__ = A.prototype;
Object.setPrototypeOf(B, A);
// 等同于
B.__proto__ = A;
```

这两条继承链，可以这样理解：作为一个对象，子类（ B ）的原型（ __proto__ 属性）是父类（ A ）；作为一个构造函 数，子类（ B ）的原型（ prototype 属性）是父类的实例。

```js
B.prototype = new A();
// 等同于
B.prototype.__proto__ = A.prototype;
```

## Extends 的继承目标 

extends 关键字后面可以跟多种类型的值

```js
class B extends A {}
```

上面代码的 A ，只要是一个有 prototype 属性的函数，就能被 B 继承。由于函数都有 prototype 属性，因此 A 可以是 任意函数。 下面，讨论三种特殊情况。 第一种特殊情况，子类继承Object类

```js
class A extends Object {
}
A.__proto__ === Object // true
A.prototype.__proto__ === Object.prototype // true
```

这种情况下， A 其实就是构造函数 Object 的复制， A 的实例就是 Object 的实例。 第二种特殊情况，不存在任何继承。

```js
class A {
}
A.__proto__ === Function.prototype // true
A.prototype.__proto__ === Object.prototype // true
```

这种情况下，A作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承 Funciton.prototype 。但 是， A 调用后返回一个空对象（即 Object 实例），所以 A.prototype.__proto__ 指向构造函数（ Object ） 的 prototype 属性。 第三种特殊情况，子类继承 null 。

```js
class A extends null {
}
A.__proto__ === Function.prototype // true
A.prototype.__proto__ === undefined // true
```

这种情况与第二种情况非常像。 A 也是一个普通函数，所以直接继承 Funciton.prototype 。但是，A调用后返回的对象不 继承任何方法，所以它的 __proto__ 指向 Function.prototype ，即实质上执行了下面的代码。

```js
class C extends null {
constructor() { return Object.create(null); }
}
```

## Object.getPrototypeOf()

Object.getPrototypeOf 方法可以用来从子类上获取父类。

```js
Object.getPrototypeOf(ColorPoint) === Point// true
```

因此，可以使用这个方法判断，一个类是否继承了另一个类。

## super关键字 

super 这个关键字，有两种用法，含义不同。 

（1）作为函数调用时（即 super(...args) ）， super 代表父类的构造函数。 

（2）作为对象调用时（即 super.prop 或 super.method() ）， super 代表父类。注意，此时 super 即可以引用父类实 例的属性和方法，也可以引用父类的静态方法。

```js
class B extends A {
get m() {
return this._p * super._p;
}
set m() {
throw new Error('该属性只读');
}
}
```

上面代码中，子类通过 super 关键字，调用父类实例的 _p 属性。 由于，对象总是继承其他对象的，所以可以在任意一个对象中，使用 super 关键字。

```js
var obj = {
toString() {
return "MyObject: " + super.toString();
}
};
obj.toString(); // MyObject: [object Object]
```

## 实例的__proto__属性 

子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。也就是说，子类的原型的原型，是父类的原型。

```js
var p1 = new Point(2, 3);
var p2 = new ColorPoint(2, 3, 'red');
p2.__proto__ === p1.__proto__ // false
p2.__proto__.__proto__ === p1.__proto__ // true
```

上面代码中， ColorPoint 继承了 Point ，导致前者原型的原型是后者的原型。 因此，通过子类实例的 __proto__.__proto__ 属性，可以修改父类实例的行为。

```js
p2.__proto__.__proto__.printName = function () {
console.log('Ha');
};
p1.printName() // "Ha"
```

上面代码在 ColorPoint 的实例 p2 上向 Point 类添加方法，结果影响到了 Point 的实例 p1 。

## 原生构造函数的继承 

原生构造函数是指语言内置的构造函数，通常用来生成数据结构。ECMAScript的原生构造函数大致有下面这些。 

+ Boolean() 
+ Number() 
+ String() 
+ Array() 
+ Date()
+  Function() 
+ RegExp() 
+ Error()
+  Object() 以前，这些原生构造函数是无法继承的，比如，不能自己定义一个 Array 的子类。

```js
function MyArray() {
Array.apply(this, arguments);
}
MyArray.prototype = Object.create(Array.prototype, {
constructor: {
value: MyArray,
writable: true,
configurable: true,
enumerable: true
}
});
```

上面代码定义了一个继承Array的 MyArray 类。但是，这个类的行为与 Array 完全不一致。

```js
var colors = new MyArray();
colors[0] = "red";
colors.length // 0
colors.length = 0;
colors[0] // "red"
```

之所以会发生这种情况，是因为子类无法获得原生构造函数的内部属性，通过 Array.apply() 或者分配给原型对象都不行。 ES5是先新建子类的实例对象 this ，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构 造函数。比如，Array构造函数有一个内部属性 [[DefineOwnProperty]] ，用来定义新属性时，更新 length 属性，这个内部 属性无法在子类获取，导致子类的 length 属性行为不正常。 ES6允许继承原生构造函数定义子类，因为ES6是先新建父类的实例对象 this ，然后再用子类的构造函数修饰 this ，使得 父类的所有行为都可以继承。下面是一个继承 Array 的例子。

```js
class MyArray extends Array {
constructor(...args) {
super(...args);
}
}
var arr = new MyArray();
arr[0] = 12;
arr.length // 1
arr.length = 0;
arr[0] // undefined
```

上面代码定义了一个 MyArray 类，继承了 Array 构造函数，因此就可以从 MyArray 生成数组的实例。这意味着，ES6可以 自定义原生数据结构（比如Array、String等）的子类，这是ES5无法做到的。 上面这个例子也说明， extends 关键字不仅可以用来继承类，还可以用来继承原生的构造函数。因此可以在原生数据结构的 基础上，定义自己的数据结构。下面就是定义了一个带版本功能的数组。

```js
class VersionedArray extends Array {
constructor() {
super();
this.history = [[]];
}
commit() {
this.history.push(this.slice());
}
revert() {
this.splice(0, this.length, ...this.history[this.history.length - 1]);
}
}
var x = new VersionedArray();
x.push(1);
x.push(2);
x // [1, 2]
x.history // [[]]
x.commit();
x.history // [[], [1, 2]]
x.push(3);
x // [1, 2, 3]
x.revert();
x // [1, 2]
```

上面代码中， VersionedArray 结构会通过 commit 方法，将自己的当前状态存入 history 属性，然后通过 revert 方 法，可以撤销当前版本，回到上一个版本。除此之外， VersionedArray 依然是一个数组，所有原生的数组方法都可以在它上 面调用。 下面是一个自定义 Error 子类的例子。

```js
class ExtendableError extends Error {
constructor(message) {
super();
this.message = message;
this.stack = (new Error()).stack;
this.name = this.constructor.name;
}
}
class MyError extends ExtendableError {
constructor(m) {
super(m);
}
}
var myerror = new MyError('ll');
myerror.message // "ll"
myerror instanceof Error // true
myerror.name // "MyError"
myerror.stack
// Error
// at MyError.ExtendableError
// ...
```

注意，继承 Object 的子类，有一个行为差异。

```js
class NewObj extends Object{
constructor(){
super(...arguments);
}
}
var o = new NewObj({attr: true});
console.log(o.attr === true); // false
```

上面代码中， NewObj 继承了 Object ，但是无法通过 super 方法向父类 Object 传参。这是因为ES6改变了 Object 构 造函数的行为，一旦发现 Object 方法不是通过 new Object() 这种形式调用，ES6规定 Object 构造函数会忽略参数。

## Class的取值函数（getter）和存值函数（setter） 

与ES5一样，在Class内部可以使用 get 和 set 关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

```js
class MyClass {
constructor() {
// ...
}
get prop() {
return 'getter';
}
set prop(value) {
console.log('setter: '+value);
}
}
let inst = new MyClass();
inst.prop = 123;
// setter: 123
inst.prop
// 'getter'
```

上面代码中， prop 属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了。 存值函数和取值函数是设置在属性的descriptor对象上的。

```js
class CustomHTMLElement {
constructor(element) {
this.element = element;
}
get html() {
return this.element.innerHTML;
}
set html(value) {
this.element.innerHTML = value;
}
}
var descriptor = Object.getOwnPropertyDescriptor(
CustomHTMLElement.prototype, "html");
"get" in descriptor // true
"set" in descriptor // true
```

上面代码中，存值函数和取值函数是定义在 html 属性的描述对象上面，这与ES5完全一致。 

## Class的Generator方法 

如果某个方法之前加上星号（ * ），就表示该方法是一个Generator函数。

```js
class Foo {
constructor(...args) {
this.args = args;
}
* [Symbol.iterator]() {
for (let arg of this.args) {
yield arg;
}
}
}
for (let x of new Foo('hello', 'world')) {
console.log(x);
}
// hello
// world
```

上面代码中，Foo类的Symbol.iterator方法前有一个星号，表示该方法是一个Generator函数。Symbol.iterator方法返回一个Foo类的 默认遍历器，for...of循环会自动调用这个遍历器。

## Class的静态方法 

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上 static 关键字，就表示该方法不 会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

```js
class Foo {
static classMethod() {
return 'hello';
}
}
Foo.classMethod() // 'hello'
var foo = new Foo();
foo.classMethod()
// TypeError: undefined is not a function
```

上面代码中， Foo 类的 classMethod 方法前有 static 关键字，表明该方法是一个静态方法，可以直接在 Foo 类上调用 （ Foo.classMethod() ），而不是在 Foo 类的实例上调用。如果在实例上调用静态方法，会抛出一个错误，表示不存在该 方法。 父类的静态方法，可以被子类继承。

```js
class Foo {
static classMethod() {
return 'hello';
}
}
class Bar extends Foo {
}
Bar.classMethod(); // 'hello'
```

上面代码中，父类 Foo 有一个静态方法，子类 Bar 可以调用这个方法。 静态方法也是可以从 super 对象上调用的。

```js
class Foo {
static classMethod() {
return 'hello';
}
}
class Bar extends Foo {
static classMethod() {
return super.classMethod() + ', too';
}
}
Bar.classMethod();
```

## Class的静态属性和实例属性

 静态属性指的是Class本身的属性，即 Class.propname ，而不是定义在实例对象（ this ）上的属性

```js
class Foo {
}
Foo.prop = 1;
Foo.prop // 1
```

上面的写法为 Foo 类定义了一个静态属性 prop 。 目前，只有这种写法可行，因为ES6明确规定，Class内部只有静态方法，没有静态属性。

```js
// 以下两种写法都无效，
// 但不会报错
class Foo {
// 写法一
prop: 2
// 写法二
static prop: 2
}
Foo.prop // undefined
```

ES7有一个静态属性的提案，目前Babel转码器支持。 这个提案对实例属性和静态属性，都规定了新的写法。 

（1）类的实例属性

类的实例属性可以用等式，写入类的定义之中

```js
class MyClass {
myProp = 42;
constructor() {
console.log(this.myProp); // 42
}
}
```

上面代码中， myProp 就是 MyClass 的实例属性。在 MyClass 的实例上，可以读取这个属性。 以前，我们定义实例属性，只能写在类的 constructor 方法里面。

```js
class ReactCounter extends React.Component {
constructor(props) {
super(props);
this.state = {
count: 0
};
}
}
```

上面代码中，构造方法 constructor 里面，定义了 this.state 属性。 有了新的写法以后，可以不在 constructor 方法里面定义。

```js
class ReactCounter extends React.Component {
state = {
count: 0
};
}
```

这种写法比以前更清晰。 为了可读性的目的，对于那些在 constructor 里面已经定义的实例属性，新写法允许直接列出。

```js
class ReactCounter extends React.Component {
constructor(props) {
super(props);
this.state = {
count: 0
};
}
state;
}
```

（2）类的静态属性 类的静态属性只要在上面的实例属性写法前面，加上 static 关键字就可以了。

```js
class MyClass {
static myStaticProp = 42;
constructor() {
console.log(MyClass.myProp); // 42
}
}
```

同样的，这个新写法大大方便了静态属性的表达。

```js
// 老写法
class Foo {
}
Foo.prop = 1;
// 新写法
class Foo {
static prop = 1;
}
```

上面代码中，老写法的静态属性定义在类的外部。整个类生成以后，再生成静态属性。这样让人很容易忽略这个静态属性，也 不符合相关代码应该放在一起的代码组织原则。另外，新写法是显式声明（declarative），而不是赋值处理，语义更好。 

## new.target属性

 new 是从构造函数生成实例的命令。ES6为 new 命令引入了一个 new.target 属性，（在构造函数中）返回 new 命令作用 于的那个构造函数。如果构造函数不是通过 new 命令调用的， new.target 会返回 undefined ，因此这个属性可以用来确 定构造函数是怎么调用的。

```js
function Person(name) {
if (new.target !== undefined) {
this.name = name;
} else {
throw new Error('必须使用new生成实例');
}
}
// 另一种写法
function Person(name) {
if (new.target === Person) {
this.name = name;
} else {
throw new Error('必须使用new生成实例');
}
}
var person = new Person('张三'); // 正确
var notAPerson = Person.call(person, '张三'); // 报错
```

上面代码确保构造函数只能通过 new 命令调用。 Class内部调用 new.target ，返回当前Class。

```js
class Rectangle {
constructor(length, width) {
console.log(new.target === Rectangle);
this.length = length;
this.width = width;
}
}
var obj = new Rectangle(3, 4); // 输出 true
```

需要注意的是，子类继承父类时， new.target 会返回子类。

```js
class Rectangle {
constructor(length, width) {
console.log(new.target === Rectangle);
// ...
}
}
class Square extends Rectangle {
constructor(length) {
super(length, length);
}
}
var obj = new Square(3); // 输出 false
```

上面代码中， new.target 会返回子类。 利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。

```js
class Shape {
constructor() {
if (new.target === Shape) {
throw new Error('本类不能实例化');
}
}
}
class Rectangle extends Shape {
constructor(length, width) {
super();
// ...
}
}
var x = new Shape(); // 报错
var y = new Rectangle(3, 4); // 正确
```

上面代码中， Shape 类不能被实例化，只能用于继承。 注意，在函数外部，使用 new.target 会报错。 

## Mixin模式的实现 

Mixin模式指的是，将多个类的接口“混入”（mix in）另一个类。它在ES6的实现如下。

```js
function mix(...mixins) {
class Mix {}
for (let mixin of mixins) {
copyProperties(Mix, mixin);
copyProperties(Mix.prototype, mixin.prototype);
}
return Mix;
}
function copyProperties(target, source) {
for (let key of Reflect.ownKeys(source)) {
if ( key !== "constructor"
&& key !== "prototype"
&& key !== "name"
) {
let desc = Object.getOwnPropertyDescriptor(source, key);
Object.defineProperty(target, key, desc);
}
}
}
```

上面代码的 mix 函数，可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。

```js
class DistributedEdit extends mix(Loggable, Serializable) {
// ...
}
```

## 修饰器

## 类的修饰

修饰器（Decorator）是一个函数，用来修改类的行为。这是ES7的一个提案，目前Babel转码器已经支持。 修饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，修饰器能在编译阶段运行代码。

```js
function testable(target) {
target.isTestable = true;
}
@testable
class MyTestableClass {}
console.log(MyTestableClass.isTestable) // true
```

上面代码中， @testable 就是一个修饰器。它修改了 MyTestableClass 这个类的行为，为它加上了静态属 性 isTestable 。 基本上，修饰器的行为就是下面这样。

```js
@decorator
class A {}
// 等同于
class A {}
A = decorator(A) || A;
```

也就是说，修饰器本质就是编译时执行的函数。 修饰器函数的第一个参数，就是所要修饰的目标类。

```js
function testable(target) {
// ...
}
```

上面代码中， testable 函数的参数 target ，就是会被修饰的类。 如果觉得一个参数不够用，可以在修饰器外面再封装一层函数

```js
function testable(isTestable) {
return function(target) {
target.isTestable = isTestable;
}
}
@testable(true)
class MyTestableClass {}
MyTestableClass.isTestable // true
@testable(false)
class MyClass {}
MyClass.isTestable // false
```

上面代码中，修饰器 testable 可以接受参数，这就等于可以修改修饰器的行为。 前面的例子是为类添加一个静态属性，如果想添加实例属性，可以通过目标类的 prototype 对象操作。

```js
function testable(target) {
target.prototype.isTestable = true;
}
@testable
class MyTestableClass {}
let obj = new MyTestableClass();
obj.isTestable // true
```

上面代码中，修饰器函数 testable 是在目标类的 prototype 对象上添加属性，因此就可以在实例上调用。 下面是另外一个例子。

```js
// mixins.js
export function mixins(...list) {
return function (target) {
Object.assign(target.prototype, ...list)
}
}
// main.js
import { mixins } from './mixins'
const Foo = {
foo() { console.log('foo') }
};
@mixins(Foo)
class MyClass {}
let obj = new MyClass();
obj.foo() // 'foo
```

上面代码通过修饰器 mixins ，把 Foo 类的方法添加到了 MyClass 的实例上面。可以用 Object.assign() 模拟这个功 能

```js
const Foo = {
foo() { console.log('foo') }
};
class MyClass {}
Object.assign(MyClass.prototype, Foo);
let obj = new MyClass();
obj.foo() // 'foo
```

## 方法的修饰 

修饰器不仅可以修饰类，还可以修饰类的属性。

```js
class Person {
@readonly
name() { return `${this.first} ${this.last}` }
}
```

上面代码中，修饰器 readonly 用来修饰“类”的 name 方法。 此时，修饰器函数一共可以接受三个参数，第一个参数是所要修饰的目标对象，第二个参数是所要修饰的属性名，第三个参数 是该属性的描述对象。

```js
function readonly(target, name, descriptor){
// descriptor对象原来的值如下
// {
// value: specifiedFunction,
// enumerable: false,
// configurable: true,
// writable: true
// };
descriptor.writable = false;
return descriptor;
}
readonly(Person.prototype, 'name', descriptor);
// 类似于
Object.defineProperty(Person.prototype, 'name', descriptor);
```

上面代码说明，修饰器（readonly）会修改属性的描述对象（descriptor），然后被修改的描述对象再用来定义属性。 下面是另一个例子，修改属性描述对象的 enumerable 属性，使得该属性不可遍历。

```js
class Person {
@nonenumerable
get kidCount() { return this.children.length; }
}
function nonenumerable(target, name, descriptor) {
descriptor.enumerable = false;
return descriptor;
}
```

下面的 @log 修饰器，可以起到输出日志的作用。

```js
class Math {
@log
add(a, b) {
return a + b;
}
}
function log(target, name, descriptor) {
var oldValue = descriptor.value;
descriptor.value = function() {
console.log(`Calling "${name}" with`, arguments);
return oldValue.apply(null, arguments);
};
return descriptor;
}
const math = new Math();
// passed parameters should get logged now
math.add(2, 4);
```

上面代码中， @log 修饰器的作用就是在执行原始的操作之前，执行一次 console.log ，从而达到输出日志的目的。 修饰器有注释的作用。

```js
@testable
class Person {
@readonly
@nonenumerable
name() { return `${this.first} ${this.last}` }
}
```

从上面代码中，我们一眼就能看出， Person 类是可测试的，而 name 方法是只读和不可枚举的。 如果同一个方法有多个修饰器，会像剥洋葱一样，先从外到内进入，然后由内向外执行

```js
function dec(id){
console.log('evaluated', id);
return (target, property, descriptor) => console.log('executed', id);
}
class Example {
@dec(1)
@dec(2)
method(){}
}
// evaluated 1
// evaluated 2
// executed 2
// executed 1
```

上面代码中，外层修饰器 @dec(1) 先进入，但是内层修饰器 @dec(2) 先执行。 除了注释，修饰器还能用来类型检查。所以，对于类来说，这项功能相当有用。从长期来看，它将是JavaScript代码静态分析的 重要工具

## 为什么修饰器不能用于函数？ 

修饰器只能用于类和类的方法，不能用于函数，因为存在函数提升。

```js
var counter = 0;
var add = function () {
counter++;
};
@add
function foo() {
}
```

上面的代码，意图是执行后 counter 等于1，但是实际上结果是 counter 等于0。因为函数提升，使得实际执行的代码是下 面这样。

```js
var counter;
var add;
@add
function foo() {
}
counter = 0;
add = function () {
counter++;
};
```

下面是另一个例子。

```js
var readOnly = require("some-decorator");
@readOnly
function foo() {
}
```

上面代码也有问题，因为实际执行是下面这样

```js
var readOnly;
@readOnly
function foo() {
}
readOnly = require("some-decorator");
```

总之，由于存在函数提升，使得修饰器不能用于函数。类是不会提升的，所以就没有这方面的问题。 

## core-decorators.js 

core-decorators.js是一个第三方模块，提供了几个常见的修饰器，通过它可以更好地理解修饰器。 （1）@autobind autobind 修饰器使得方法中的 this 对象，绑定原始对象。

```js
import { autobind } from 'core-decorators';
class Person {
@autobind
getPerson() {
return this;
}
}
let person = new Person();
let getPerson = person.getPerson;
getPerson() === person;
// true
```

（2）@readonly readonly 修饰器使得属性或方法不可写。

```js
import { readonly } from 'core-decorators';
class Meal {
@readonly
entree = 'steak';
}
var dinner = new Meal();
dinner.entree = 'salmon';
// Cannot assign to read only property 'entree' of [object Object]
```

（3）@override override 修饰器检查子类的方法，是否正确覆盖了父类的同名方法，如果不正确会报错。

```js
import { override } from 'core-decorators';
class Parent {
speak(first, second) {}
}
class Child extends Parent {
@override
speak() {}
// SyntaxError: Child#speak() does not properly override Parent#speak(first, second)
}
// or
class Child extends Parent {
@override
speaks() {}
// SyntaxError: No descriptor matching Child#speaks() was found on the prototype chain.
//
// Did you mean "speak"?
}
```

（4）@deprecate (别名@deprecated) deprecate 或 deprecated 修饰器在控制台显示一条警告，表示该方法将废除。

```js
import { deprecate } from 'core-decorators';
class Person {
@deprecate
facepalm() {}
@deprecate('We stopped facepalming')
facepalmHard() {}
@deprecate('We stopped facepalming', { url: 'http://knowyourmeme.com/memes/facepalm' })
facepalmHarder() {}
}
let person = new Person();
person.facepalm();
// DEPRECATION Person#facepalm: This function will be removed in future versions.
person.facepalmHard();
// DEPRECATION Person#facepalmHard: We stopped facepalming
person.facepalmHarder();
// DEPRECATION Person#facepalmHarder: We stopped facepalming
//
// See http://knowyourmeme.com/memes/facepalm for more details.
//
```

（5）@suppressWarnings suppressWarnings 修饰器抑制 decorated 修饰器导致的 console.warn() 调用。但是，异步代码发出的调用除外。

```js
import { suppressWarnings } from 'core-decorators';
class Person {
@deprecated
facepalm() {}
@suppressWarnings
facepalmWithoutWarning() {
this.facepalm();
}
}
let person = new Person();
person.facepalmWithoutWarning();
// no warning is logged
```

## 使用修饰器实现自动发布事件 

我们可以使用修饰器，使得对象的方法被调用时，自动发出一个事件。

```js
import postal from "postal/lib/postal.lodash";
export default function publish(topic, channel) {
return function(target, name, descriptor) {
const fn = descriptor.value;
descriptor.value = function() {
let value = fn.apply(this, arguments);
postal.channel(channel || target.channel || "/").publish(topic, value);
};
};
}
```

上面代码定义了一个名为 publish 的修饰器，它通过改写 descriptor.value ，使得原方法被调用时，会自动发出一个事 件。它使用的事件“发布/订阅”库是Postal.js。 它的用法如下。

```js
import publish from "path/to/decorators/publish";
class FooComponent {
@publish("foo.some.message", "component")
someMethod() {
return {
my: "data"
};
}
@publish("foo.some.other")
anotherMethod() {
// ...
}
}
```

以后，只要调用 someMethod 或者 anotherMethod ，就会自动发出一个事件。

```js
let foo = new FooComponent();
foo.someMethod() // 在"component"频道发布"foo.some.message"事件，附带的数据是{ my: "data" }
foo.anotherMethod() // 在"/"频道发布"foo.some.other"事件，不附带数据
```

## Mixin

在修饰器的基础上，可以实现 Mixin 模式。所谓 Mixin 模式，就是对象继承的一种替代方案，中文译为“混入”（mix in）， 意为在一个对象之中混入另外一个对象的方法。 请看下面的例子。

```js
const Foo = {
foo() { console.log('foo') }
};
class MyClass {}
Object.assign(MyClass.prototype, Foo);
let obj = new MyClass();
obj.foo() // 'foo'
```

上面代码之中，对象 Foo 有一个 foo 方法，通过 Object.assign 方法，可以将 foo 方法“混入” MyClass 类，导 致 MyClass 的实例 obj 对象都具有 foo 方法。这就是“混入”模式的一个简单实现。 下面，我们部署一个通用脚本 mixins.js ，将mixin写成一个修饰器。

```js
export function mixins(...list) {
return function (target) {
Object.assign(target.prototype, ...list);
};
}
```

然后，就可以使用上面这个修饰器，为类“混入”各种方法。

```js
import { mixins } from './mixins';
const Foo = {
foo() { console.log('foo') }
};
@mixins(Foo)
class MyClass {}
let obj = new MyClass();
obj.foo() // "foo"
```

通过mixins这个修饰器，实现了在MyClass类上面“混入”Foo对象的 foo 方法。 不过，上面的方法会改写 MyClass 类的 prototype 对象，如果不喜欢这一点，也可以通过类的继承实现mixin。

```js
class MyClass extends MyBaseClass {
/* ... */
}
```

上面代码中， MyClass 继承了 MyBaseClass 。如果我们想在 MyClass 里面“混入”一个 foo 方法，一个办法是 在 MyClass 和 MyBaseClass 之间插入一个混入类，这个类具有 foo 方法，并且继承了 MyBaseClass 的所有方法，然 后 MyClass 再继承这个类。

```js
let MyMixin = (superclass) => class extends superclass {
foo() {
console.log('foo from MyMixin');
}
};
```

上面代码中， MyMixin 是一个混入类生成器，接受 superclass 作为参数，然后返回一个继承 superclass 的子类，该子类 包含一个 foo 方法。 接着，目标类再去继承这个混入类，就达到了“混入” foo 方法的目的。

```js
class MyClass extends MyMixin(MyBaseClass) {
/* ... */
}
let c = new MyClass();
c.foo(); // "foo from MyMixin"
```

如果需要“混入”多个方法，就生成多个混入类。

```js
class MyClass extends Mixin1(Mixin2(MyBaseClass)) {
/* ... */
}
```

这种写法的一个好处，是可以调用 super ，因此可以避免在“混入”过程中覆盖父类的同名方法。

```js
let Mixin1 = (superclass) => class extends superclass {
foo() {
console.log('foo from Mixin1');
if (super.foo) super.foo();
}
};
let Mixin2 = (superclass) => class extends superclass {
foo() {
console.log('foo from Mixin2');
if (super.foo) super.foo();
}
};
class S {
foo() {
console.log('foo from S');
}
}
class C extends Mixin1(Mixin2(S)) {
foo() {
console.log('foo from C');
super.foo();
}
}
```

上面代码中，每一次 混入 发生时，都调用了父类的 super.foo 方法，导致父类的同名方法没有被覆盖，行为被保留了下 来。

```js
new C().foo()
// foo from C
// foo from Mixin1
// foo from Mixin2
// foo from S
```

## Trait

Trait也是一种修饰器，效果与Mixin类似，但是提供更多功能，比如防止同名方法的冲突、排除混入某些方法、为混入的方法起 别名等等。 下面采用traits-decorator这个第三方模块作为例子。这个模块提供的traits修饰器，不仅可以接受对象，还可以接受ES6类作为参 数。

```js
import { traits } from 'traits-decorator';
class TFoo {
foo() { console.log('foo') }
}
const TBar = {
bar() { console.log('bar') }
};
@traits(TFoo, TBar)
class MyClass { }
let obj = new MyClass();
obj.foo() // foo
obj.bar() // bar
```

上面代码中，通过traits修饰器，在 MyClass 类上面“混入”了 TFoo 类的 foo 方法和 TBar 对象的 bar 方法。 Trait不允许“混入”同名方法。

```js
import { traits } from 'traits-decorator';
class TFoo {
foo() { console.log('foo') }
}
const TBar = {
bar() { console.log('bar') },
foo() { console.log('foo') }
};
@traits(TFoo, TBar)
class MyClass { }
// 报错
// throw new Error('Method named: ' + methodName + ' is defined twice.');
// ^
// Error: Method named: foo is defined twice.
```

上面代码中，TFoo和TBar都有foo方法，结果traits修饰器报错。 一种解决方法是排除TBar的foo方法。

```js
import { traits, excludes } from 'traits-decorator';
class TFoo {
foo() { console.log('foo') }
}
const TBar = {
bar() { console.log('bar') },
foo() { console.log('foo') }
};
@traits(TFoo, TBar::excludes('foo'))
class MyClass { }
let obj = new MyClass();
obj.foo() // foo
obj.bar() // bar
```

上面代码使用绑定运算符（::）在TBar上排除foo方法，混入时就不会报错了。 另一种方法是为TBar的foo方法起一个别名。

```js
import { traits, alias } from 'traits-decorator';
class TFoo {
foo() { console.log('foo') }
}
const TBar = {
bar() { console.log('bar') },
foo() { console.log('foo') }
};
@traits(TFoo, TBar::alias({foo: 'aliasFoo'}))
class MyClass { }
let obj = new MyClass();
obj.foo() // foo
obj.aliasFoo() // foo
obj.bar() // bar
```

上面代码为TBar的foo方法起了别名aliasFoo，于是MyClass也可以混入TBar的foo方法了。 alias和excludes方法，可以结合起来使用。

```js
@traits(TExample::excludes('foo','bar')::alias({baz:'exampleBaz'}))
class MyClass {}
```

上面代码排除了TExample的foo方法和bar方法，为baz方法起了别名exampleBaz。 as方法则为上面的代码提供了另一种写法。

```js
@traits(TExample::as({excludes:['foo', 'bar'], alias: {baz: 'exampleBaz'}}))
class MyClass {}
```

## Babel转码器的支持

目前，Babel转码器已经支持Decorator。 首先，安装 babel-core 和 babel-plugin-transform-decorators 。由于后者包括在 babel-preset-stage-0 之中，所以改 为安装 babel-preset-stage-0 亦可。

```js
$ npm install babel-core babel-plugin-transform-decorators
```

然后，设置配置文件 .babelrc 。

```js
{
"plugins": ["transform-decorators"]
}

```

这时，Babel就可以对Decorator转码了。 脚本中打开的命令如下。

```js
babel.transform("code", {plugins: ["transform-decorators"]})
```

Babel的官方网站提供一个[在线转码器][https://babeljs.io/repl/#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.21&spec=false&loose=false&code_lz=BQSgvAfA3gxg9gOwM5wDYFMB0rEHNgDkAhgSAL5A&debug=false&forceAllTransforms=false&modules=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Creact%2Cstage-0%2Cstage-1%2Cstage-2%2Cstage-3&prettier=false&targets=&version=7.23.2&externalPlugins=&assumptions=%7B%7D]，只要勾选Experimental，就能支持Decorator的在线转码。

## Module 

ES6的Class只是面向对象编程的语法糖，升级了ES5的构造函数的原型链继承的写法，并没有解决模块化问题。Module功能就是 为了解决这个问题而提出的。 

历史上，JavaScript一直没有模块（module）体系，无法将一个大程序拆分成互相依赖的小文件，再用简单的方法拼装起来。其 他语言都有这项功能，比如Ruby的 require 、Python的 import ，甚至就连CSS都有 @import ，但是JavaScript任何这方面 的支持都没有，这对开发大型的、复杂的项目形成了巨大障碍。 

在ES6之前，社区制定了一些模块加载方案，最主要的有CommonJS和AMD两种。前者用于服务器，后者用于浏览器。ES6在语 言规格的层面上，实现了模块功能，而且实现得相当简单，完全可以取代现有的CommonJS和AMD规范，成为浏览器和服务器 通用的模块解决方案。

 ES6模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS和AMD模 块，都只能在运行时确定这些东西。比如，CommonJS模块就是对象，输入时必须查找对象属性。

```js
// CommonJS模块
let { stat, exists, readFile } = require('fs');
// 等同于
let _fs = require('fs');
let stat = _fs.stat, exists = _fs.exists, readfile = _fs.readfile;
```

上面代码的实质是整体加载 fs 模块（即加载 fs 的所有方法），生成一个对象（ _fs ），然后再从这个对象上面读取3个 方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。 ES6模块不是对象，而是通过 export 命令显式指定输出的代码，输入时也采用静态命令的形式。

```js
// ES6模块
import { stat, exists, readFile } from 'fs';
```

上面代码的实质是从 fs 模块加载3个方法，其他方法不加载。这种加载称为“编译时加载”，即ES6可以在编译时就完成模块加 载，效率要比CommonJS模块的加载方式高。当然，这也导致了没法引用ES6模块本身，因为它不是对象。

 由于ES6模块是编译时加载，使得静态分析成为可能。有了它，就能进一步拓宽JavaScript的语法，比如引入宏（macro）和类型 检验（type system）这些只能靠静态分析实现的功能。

 除了静态加载带来的各种好处，ES6模块还有以下好处。 

+ 不再需要UMD模块格式了，将来服务器和浏览器都会支持ES6模块格式。目前，通过各种工具库，其实已经做到了这一 点。
+  将来浏览器的新API就能用模块格式提供，不再必要做成全局变量或者 navigator 对象的属性。 
+ 不再需要对象作为命名空间（比如 Math 对象），未来这些功能可以通过模块提供。

 ## 严格模式 

ES6的模块自动采用严格模式，不管你有没有在模块头部加上 "use strict"; 。

 严格模式主要有以下限制。

+ 变量必须声明后再使用
+  函数的参数不能有同名属性，否则报错 
+ 不能使用 with 语句 
+ 不能对只读属性赋值，否则报错 
+ 不能使用前缀0表示八进制数，否则报错 
+ 不能删除不可删除的属性，否则报错 
+ 不能删除变量 delete prop ，会报错，只能删除属性 delete global[prop] 
+ eval 不会在它的外层作用域引入变量 
+ eval 和 arguments 不能被重新赋值 
+ arguments 不会自动反映函数参数的变化 
+ 不能使用 arguments.callee 
+ 不能使用 arguments.caller 禁止 this 指向全局对象 
+ 不能使用 fn.caller 和 fn.arguments 获取函数调用的堆栈 
+ 增加了保留字（比如 protected 、 static 和 interface ） 

上面这些限制，模块都必须遵守。由于严格模式是ES5引入的，不属于ES6，所以请参阅相关ES5书籍，本书不再详细介绍了。

## export命令 

模块功能主要由两个命令构成： export 和 import 。 export 命令用于规定模块的对外接口， import 命令用于输入其他 模块提供的功能。 一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必 须使用 export 关键字输出该变量。下面是一个JS文件，里面使用 export 命令输出变量。

```js
// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;
```

上面代码是 profile.js 文件，保存了用户信息。ES6将其视为一个模块，里面用 export 命令对外部输出了三个变量。 export 的写法，除了像上面这样，还有另外一种。

```js
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;
export {firstName, lastName, year};
```

上面代码在 export 命令后面，使用大括号指定所要输出的一组变量。它与前一种写法（直接放置在 var 语句前）是等价 的，但是应该优先考虑使用这种写法。因为这样就可以在脚本尾部，一眼看清楚输出了哪些变量。 export命令除了输出变量，还可以输出函数或类（class）。

```js
export function multiply (x, y) {
return x * y;
};
```

上面代码对外输出一个函数 multiply 。 通常情况下， export 输出的变量就是本来的名字，但是可以使用 as 关键字重命名。

```js
function v1() { ... }
function v2() { ... }
export {
v1 as streamV1,
v2 as streamV2,
v2 as streamLatestVersion
};
```

上面代码使用 as 关键字，重命名了函数 v1 和 v2 的对外接口。重命名后， v2 可以用不同的名字输出两次。 需要特别注意的是， export 命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。

```js
// 报错
export 1;
// 报错
var m = 1;
export m;
```

上面两种写法都会报错，因为没有提供对外的接口。第一种写法直接输出1，第二种写法通过变量 m ，还是直接输出 1。 1 只是一个值，不是接口。正确的写法是下面这样。

```js
// 写法一
export var m = 1;
// 写法二
var m = 1;
export {m};
// 写法三
var n = 1;
export {n as m};
```

上面三种写法都是正确的，规定了对外的接口 m 。其他脚本可以通过这个接口，取到值 1 。它们的实质是，在接口名与模 块内部变量之间，建立了一一对应的关系。 同样的， function 和 class 的输出，也必须遵守这样的写法

```js
// 报错
function f() {}
export f;
// 正确
export function f() {};
// 正确
function f() {}
export {f};
```

另外， export 语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。

```js
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
```

上面代码输出变量 foo ，值为 bar ，500毫秒之后变成 baz 。 这一点与CommonJS规范完全不同。CommonJS模块输出的是值的缓存，不存在动态更新，详见下文《ES6模块加载的实质》一 节。 最后， export 命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，下一节 的 import 命令也是如此。这是因为处于条件代码块之中，就没法做静态优化了，违背了ES6模块的设计初衷。

```js
function foo() {
export default 'bar' // SyntaxError
}
foo()
```

上面代码中， export 语句放在函数之中，结果报错。

## import命令 

使用 export 命令定义了模块的对外接口以后，其他JS文件就可以通过 import 命令加载这个模块（文件）。

```js
// main.js
import {firstName, lastName, year} from './profile';
function setName(element) {
element.textContent = firstName + ' ' + lastName;
}
```

上面代码的 import 命令，就用于加载 profile.js 文件，并从中输入变量。 import 命令接受一个对象（用大括号表 示），里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块（ profile.js ）对外接口的名称相 同。 如果想为输入的变量重新取一个名字，import命令要使用 as 关键字，将输入的变量重命名。

```js
import { lastName as surname } from './profile';
```

注意， import 命令具有提升效果，会提升到整个模块的头部，首先执行。

```js
foo();
import { foo } from 'my_module';
```

上面的代码不会报错，因为 import 的执行早于 foo 的调用。 如果在一个模块之中，先输入后输出同一个模块， import 语句可以与 export 语句写在一起。

```js
export { es6 as default } from './someModule';
// 等同于
import { es6 } from './someModule';
export default es6;
```

上面代码中， export 和 import 语句可以结合在一起，写成一行。但是从可读性考虑，不建议采用这种写法，而应该采用 标准写法。 另外，ES7有一个提案，简化先输入后输出的写法，拿掉输出时的大括号。

```js
// 提案的写法
export v from 'mod';
// 现行的写法
export {v} from 'mod';
```

import 语句会执行所加载的模块，因此可以有下面的写法。

```js
import 'lodash';
```

上面代码仅仅执行 lodash 模块，但是不输入任何值。 

## 模块的整体加载 

除了指定加载某个输出值，还可以使用整体加载，即用星号（ * ）指定一个对象，所有输出值都加载在这个对象上面。 下面是一个 circle.js 文件，它输出两个方法 area 和 circumference 。

```js
// circle.js
export function area(radius) {
return Math.PI * radius * radius;
}
export function circumference(radius) {
return 2 * Math.PI * radius;
}
```

现在，加载这个模块。

```js
// main.js
import { area, circumference } from './circle';
console.log('圆面积：' + area(4));
console.log('圆周长：' + circumference(14));
```

上面写法是逐一指定要加载的方法，整体加载的写法如下。

```js
import * as circle from './circle';
console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```

## export default命令

 从前面的例子可以看出，使用 import 命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。但是，用户肯 定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。 为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到 export default 命令，为模块指定默认输出。

```js
// export-default.js
export default function () {
console.log('foo');
}
```

上面代码是一个模块文件 export-default.js ，它的默认输出是一个函数。 其他模块加载该模块时， import 命令可以为该匿名函数指定任意名字。

```js
// import-default.js
import customName from './export-default';
customName(); // 'foo'
```

上面代码的 import 命令，可以用任意名称指向 export-default.js 输出的方法，这时就不需要知道原模块输出的函数名。 需要注意的是，这时 import 命令后面，不使用大括号。 export default 命令用在非匿名函数前，也是可以的。

```js
// export-default.js
export default function foo() {
console.log('foo');
}
// 或者写成
function foo() {
console.log('foo');
}
export default foo;
```

上面代码中， foo 函数的函数名 foo ，在模块外部是无效的。加载的时候，视同匿名函数加载。 下面比较一下默认输出和正常输出。

```js
// 输出
export default function crc32() {
// ...
}
// 输入
import crc32 from 'crc32';
// 输出
export function crc32() {
// ...
};
// 输入
import {crc32} from 'crc32';
```

上面代码的两组写法，第一组是使用 export default 时，对应的 import 语句不需要使用大括号；第二组是不使用 export default 时，对应的 import 语句需要使用大括号。 export default 命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此 export deault 命令只能使用 一次。所以， import 命令后面才不用加大括号，因为只可能对应一个方法。 本质上， export default 就是输出一个叫做 default 的变量或方法，然后系统允许你为它取任意名字。所以，下面的写法 是有效的。

```js
// modules.js
function add(x, y) {
return x * y;
};
export {add as default};
// 等同于
// export default add;
// app.js
import { default as xxx } from 'modules';
// 等同于
// import xxx from 'modules';
```

正是因为 export default 命令其实只是输出一个叫做 default 的变量，所以它后面不能跟变量声明语句。

```js
// 正确
export var a = 1;
// 正确
var a = 1;
export default a;
// 错误
export default var a = 1;
```

上面代码中， export default a 的含义是将变量 a 的值赋给变量 default 。所以，最后一种写法会报错。 有了 export default 命令，输入模块时就非常直观了，以输入jQuery模块为例。

```js
import $ from 'jquery';
```

如果想在一条import语句中，同时输入默认方法和其他变量，可以写成下面这样

```js
import customName, { otherMethod } from './export-default';
```

如果要输出默认的值，只需将值跟在 export default 之后即可。

```js
export default 42;
```

export default 也可以用来输出类。

```js
// MyClass.js
export default class { ... }
// main.js
import MyClass from 'MyClass'
let o = new MyClass();
```

## 模块的继承 

模块之间也可以继承。 假设有一个 circleplus 模块，继承了 circle 模块

```js
// circleplus.js
export * from 'circle';
export var e = 2.71828182846;
export default function(x) {
return Math.exp(x);
}
```

上面代码中的 export * ，表示再输出 circle 模块的所有属性和方法。注意， export * 命令会忽略 circle 模块 的 default 方法。然后，上面代码又输出了自定义的 e 变量和默认方法。 这时，也可以将 circle 的属性或方法，改名后再输出。

```js
// circleplus.js
export { area as circleArea } from 'circle';
```

上面代码表示，只输出 circle 模块的 area 方法，且将其改名为 circleArea 。 加载上面模块的写法如下。

```js
// main.js
import * as math from 'circleplus';
import exp from 'circleplus';
console.log(exp(math.e));
```

上面代码中的 import exp 表示，将 circleplus 模块的默认方法加载为 exp 方法。

## ES6模块加载的实质 

ES6模块加载的机制，与CommonJS模块完全不同。CommonJS模块输出的是一个值的拷贝，而ES6模块输出的是值的引用。 CommonJS模块输出的是被输出值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。请看下面这个模 块文件 lib.js 的例子。

```js
// lib.js
var counter = 3;
function incCounter() {
counter++;
}
module.exports = {
counter: counter,
incCounter: incCounter,
};
```

上面代码输出内部变量 counter 和改写这个变量的内部方法 incCounter 。然后，在 main.js 里面加载这个模块。

```js
// main.js
var mod = require('./lib');
console.log(mod.counter); // 3
mod.incCounter();
console.log(mod.counter); // 3
```

上面代码说明， lib.js 模块加载以后，它的内部变化就影响不到输出的 mod.counter 了。这是因为 mod.counter 是一个 原始类型的值，会被缓存。除非写成一个函数，才能得到内部变动后的值。

```js
// lib.js
var counter = 3;
function incCounter() {
counter++;
}
module.exports = {
get counter() {
return counter
},
incCounter: incCounter,
};
```

上面代码中，输出的 counter 属性实际上是一个取值器函数。现在再执行 main.js ，就可以正确读取内部变量 counter 的 变动了。

```js
$ node main.js
3
4
```

ES6模块的运行机制与CommonJS不一样，它遇到模块加载命令 import 时，不会去执行模块，而是只生成一个动态的只读引 用。等到真的需要用到时，再到模块里面去取值，换句话说，ES6的输入有点像Unix系统的”符号连接“，原始值变 了， import 输入的值也会跟着变。因此，ES6模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。 还是举上面的例子

```js
// lib.js
export let counter = 3;
export function incCounter() {
counter++;
}
// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
```

上面代码说明，ES6模块输入的变量 counter 是活的，完全反应其所在模块 lib.js 内部的变化。 再举一个出现在 export 一节中的例子。

```js
// m1.js
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
// m2.js
import {foo} from './m1.js';
console.log(foo);
setTimeout(() => console.log(foo), 500);
```

上面代码中， m1.js 的变量 foo ，在刚加载时等于 bar ，过了500毫秒，又变为等于 baz 。 让我们看看， m2.js 能否正确读取这个变化。

```js
$ babel-node m2.js
bar
baz
```

上面代码表明，ES6模块不会缓存运行结果，而是动态地去被加载的模块取值，并且变量总是绑定其所在的模块。 由于ES6输入的模块变量，只是一个”符号连接“，所以这个变量是只读的，对它进行重新赋值会报错。

```js
// lib.js
export let obj = {};
// main.js
import { obj } from './lib';
obj.prop = 123; // OK
obj = {}; // TypeError
```

上面代码中， main.js 从 lib.js 输入变量 obj ，可以对 obj 添加属性，但是重新赋值就会报错。因为变量 obj 指向 的地址是只读的，不能重新赋值，这就好比 main.js 创造了一个名为 obj 的const变量。 最后， export 通过接口，输出的是同一个值。不同的脚本加载这个接口，得到的都是同样的实例。

```js
// mod.js
function C() {
this.sum = 0;
this.add = function () {
this.sum += 1;
};
this.show = function () {
console.log(this.sum);
}
}
export let c = new C();
```

上面的脚本 mod.js ，输出的是一个 C 的实例。不同的脚本加载这个模块，得到的都是同一个实例。

```js
// x.js
import {c} from './mod';
c.add();
// y.js
import {c} from './mod';
c.show();
// main.js
import './x';
import './y';
```

现在执行 main.js ，输出的是1。

```js
$ babel-node main.js
1
```

这就证明了 x.js 和 y.js 加载的都是 C 的同一个实例。

## 循环加载 

“循环加载”（circular dependency）指的是， a 脚本的执行依赖 b 脚本，而 b 脚本的执行又依赖 a 脚本。

```js
// a.js
var b = require('b');
// b.js
var a = require('a');
```

通常，“循环加载”表示存在强耦合，如果处理不好，还可能导致递归加载，使得程序无法执行，因此应该避免出现。 但是实际上，这是很难避免的，尤其是依赖关系复杂的大项目，很容易出现 a 依赖b， b 依赖 c ， c 又依赖 a 这样的 情况。

这意味着，模块加载机制必须考虑“循环加载”的情况。 对于JavaScript语言来说，目前最常见的两种模块格式CommonJS和ES6，处理“循环加载”的方法是不一样的，返回的结果也不一 样。 

## CommonJS模块的加载原理 

介绍ES6如何处理"循环加载"之前，先介绍目前最流行的CommonJS模块格式的加载原理。 CommonJS的一个模块，就是一个脚本文件。 require 命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对 象。

```js
{
id: '...',
exports: { ... },
loaded: true,
...
}
```

上面代码中，该对象的 id 属性是模块名， exports 属性是模块输出的各个接口， loaded 属性是一个布尔值，表示该模块 的脚本是否执行完毕。其他还有很多属性，这里都省略了。 

以后需要用到这个模块的时候，就会到 exports 属性上面取值。即使再次执行 require 命令，也不会再次执行该模块，而 是到缓存之中取值。也就是说，CommonJS模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一 次运行的结果，除非手动清除系统缓存。

## CommonJS模块的循环加载 

CommonJS模块的重要特性是加载时执行，即脚本代码在 require 的时候，就会全部执行。一旦出现某个模块被"循环加载"， 就只输出已经执行的部分，还未执行的部分不会输出。 让我们来看，Node官方文档里面的例子。脚本文件 a.js 代码如下。

```js
exports.done = false;
var b = require('./b.js');
console.log('在 a.js 之中，b.done = %j', b.done);
exports.done = true;
console.log('a.js 执行完毕');
```

上面代码之中， a.js 脚本先输出一个 done 变量，然后加载另一个脚本文件 b.js 。注意，此时 a.js 代码就停在这里， 等待 b.js 执行完毕，再往下执行。 再看 b.js 的代码

```js
exports.done = false;
var a = require('./a.js');
console.log('在 b.js 之中，a.done = %j', a.done);
exports.done = true;
console.log('b.js 执行完毕');
```

上面代码之中， b.js 执行到第二行，就会去加载 a.js ，这时，就发生了“循环加载”。系统会去 a.js 模块对应对象 的 exports 属性取值，可是因为 a.js 还没有执行完，从 exports 属性只能取回已经执行的部分，而不是最后的值。 a.js 已经执行的部分，只有一行。

```js
exports.done = false;
```

因此，对于 b.js 来说，它从 a.js 只输入一个变量 done ，值为 false 。 然后， b.js 接着往下执行，等到全部执行完毕，再把执行权交还给 a.js 。于是， a.js 接着往下执行，直到执行完毕。 我们写一个脚本 main.js ，验证这个过程。

```js
var a = require('./a.js');
var b = require('./b.js');
console.log('在 main.js 之中, a.done=%j, b.done=%j', a.done, b.done);
```

执行 main.js ，运行结果如下。

```js
$ node main.js
在 b.js 之中，a.done = false
b.js 执行完毕
在 a.js 之中，b.done = true
a.js 执行完毕
在 main.js 之中, a.done=true, b.done=true
```

上面的代码证明了两件事。一是，在 b.js 之中， a.js 没有执行完毕，只执行了第一行。二是， main.js 执行到第二行 时，不会再次执行 b.js ，而是输出缓存的 b.js 的执行结果，即它的第四行。

```js
exports.done = true;
```

总之，CommonJS输入的是被输出值的拷贝，不是引用。 另外，由于CommonJS模块遇到循环加载时，返回的是当前已经执行的部分的值，而不是代码全部执行后的值，两者可能会有 差异。所以，输入变量的时候，必须非常小心。

```js
var a = require('a'); // 安全的写法
var foo = require('a').foo; // 危险的写法
exports.good = function (arg) {
return a.foo('good', arg); // 使用的是 a.foo 的最新值
};
exports.bad = function (arg) {
return foo('bad', arg); // 使用的是一个部分加载时的值
};
```

上面代码中，如果发生循环加载， require('a').foo 的值很可能后面会被改写，改用 require('a') 会更保险一点。

## ES6模块的循环加载 

ES6处理“循环加载”与CommonJS有本质的不同。ES6模块是动态引用，遇到模块加载命令 import 时，不会去执行模块，只是 生成一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。 请看下面的例子（摘自 Dr. Axel Rauschmayer 的《Exploring ES6》）。

```js
// a.js
import {bar} from './b.js';
export function foo() {
bar();
console.log('执行完毕');
}
foo();
// b.js
import {foo} from './a.js';
export function bar() {
if (Math.random() > 0.5) {
foo();
}
}
```

按照CommonJS规范，上面的代码是没法执行的。 a 先加载 b ，然后 b 又加载 a ，这时 a 还没有任何执行结果，所以 输出结果为 null ，即对于 b.js 来说，变量 foo 的值等于 null ，后面的 foo() 就会报错。 但是，ES6可以执行上面的代码。

```js
$ babel-node a.js
执行完毕
```

a.js 之所以能够执行，原因就在于ES6加载的变量，都是动态引用其所在的模块。只要引用是存在的，代码就能执行。 我们再来看ES6模块加载器SystemJS给出的一个例子。

```js
// even.js
import { odd } from './odd'
export var counter = 0;
export function even(n) {
counter++;
return n == 0 || odd(n - 1);
}
// odd.js
import { even } from './even';
export function odd(n) {
return n != 0 && even(n - 1);
}
```

上面代码中， even.js 里面的函数 even 有一个参数 n ，只要不等于0，就会减去1，传入加载的 odd() 。 odd.js 也会 做类似操作。 运行上面这段代码，结果如下。

```js
$ babel-node
> import * as m from './even.js';
> m.even(10);
true
> m.counter
6
> m.even(20)
true
> m.counter
17
```

上面代码中，参数 n 从10变为0的过程中， even() 一共会执行6次，所以变量 counter 等于6。第二次调用 even() 时， 参数 n 从20变为0， even() 一共会执行11次，加上前面的6次，所以变量 counter 等于17。 这个例子要是改写成CommonJS，就根本无法执行，会报错。

```js
// even.js
var odd = require('./odd');
var counter = 0;
exports.counter = counter;
exports.even = function(n) {
counter++;
return n == 0 || odd(n - 1);
}
// odd.js
var even = require('./even').even;
module.exports = function(n) {
return n != 0 && even(n - 1);
}
```

上面代码中， even.js 加载 odd.js ，而 odd.js 又去加载 even.js ，形成“循环加载”。这时，执行引擎就会输 出 even.js 已经执行的部分（不存在任何结果），所以在 odd.js 之中，变量 even 等于 null ，等到后面调用 even(n1) 就会报错。

```js
$ node
> var m = require('./even');
> m.even(10)
TypeError: even is not a function
```

## 跨模块常量

上面说过， const 声明的常量只在当前代码块有效。如果想设置跨模块的常量（即跨多个文件），可以采用下面的写法。

```js
// constants.js 模块
export const A = 1;
export const B = 3;
export const C = 4;
// test1.js 模块
import * as constants from './constants';
console.log(constants.A); // 1
console.log(constants.B); // 3
// test2.js 模块
import {A, B} from './constants';
console.log(A); // 1
console.log(B); // 3
```

## ES6模块的转码 

浏览器目前还不支持ES6模块，为了现在就能使用，可以将转为ES5的写法。除了Babel可以用来转码之外，还有以下两个方法， 也可以用来转码。

## ES6 module transpiler 

ES6 module transpiler是square公司开源的一个转码器，可以将ES6模块转为CommonJS模块或AMD模块的写法，从而在浏览器中 使用。 首先，安装这个转玛器。

```js
$ npm install -g es6-module-transpiler
```

然后，使用 compile-modules convert 命令，将ES6模块文件转码。

```js
$ compile-modules convert file1.js file2.js
```

-o 参数可以指定转码后的文件名。

```js
$ compile-modules convert -o out.js file1.js
```

## SystemJS

另一种解决方法是使用SystemJS。它是一个垫片库（polyfill），可以在浏览器内加载ES6模块、AMD模块和CommonJS模块，将 其转为ES5格式。它在后台调用的是Google的Traceur转码器。 使用时，先在网页内载入system.js文件。

```js
<script src="system.js"></script>
```

然后，使用 System.import 方法加载模块文件。

```js
<script>
System.import('./app');
</script>
```

上面代码中的 ./app ，指的是当前目录下的app.js文件。它可以是ES6模块文件， System.import 会自动将其转码。 需要注意的是， System.import 使用异步加载，返回一个Promise对象，可以针对这个对象编程。下面是一个模块文件。

```js
// app/es6-file.js:
export class q {
constructor() {
this.es6 = 'hello';
}
}
```

然后，在网页内加载这个模块文件。

```js
<script>
System.import('app/es6-file').then(function(m) {
console.log(new m.q().es6); // hello
});
</script>
```

上面代码中， System.import 方法返回的是一个Promise对象，所以可以用then方法指定回调函数。

## 问答题

1. ES6 中的 class 其本质是 es5 声明类的方式的语法糖吗？请从原型链方面证明你的想法

   >
   >
   >

2. ES6 中的类构造函数如何声明？

   >
   >
   >

3. ES6 实现类 `private` 方法有几种形式？各是什么？

   > 

4. 如何声明类的`get`，`set`方法？何时会调用`get`、`set`方法？

   > 

5. 什么是类的静态方法？如何声明？如何调用？

   > 

6. ES6 中如何进行继承？子类的构造函数中如何调用父类的构造函数？

   > 

7. ES6 的模块中如何导入导出变量？

   > 

8. ES6 的模块 `export default` 和 `export` 有何异同？

   > 

9. 修饰器（Decorator）是什么？如何使用？

   > 

## 代码题

1. 请写出与下面 ES5 代码等价的 ES6 代码

   ```javascript
   function Point(x, y) {
      this.x = x;
      this.y = y;
   }
   
   Point.prototype.toString = function () {
      return '(' + this.x + ', ' + this.y + ')';
   };
   
   var p = new Point(1, 2);
   ```

2. 请实现`Circle`类，其表示平面上的一个圆，构造时需要传入 `x`,`y`,`r` 分别为圆在平面上的坐标 (x,y）和其半径 `r`，需要支持使用 `circle.area` 获取圆的面积

3. 假定我们的代码中需要4个类，分别是 `Animal`，`Dog`，`Cat`，`Human`。`Animal` 有方法 `eat`,`sleep`;`Dog`,`Cat`有方法`bark`；`Human`有方法`speak`；请使用 ES6 中的继承实现。