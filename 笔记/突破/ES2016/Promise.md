# promise

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231031131529010.png" alt="image-20231031131529010" style="zoom:80%;" />

## Promise的含义 

Promise是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实 现，ES6将其写进了语言标准，统一了用法，原生提供了 Promise 对象。 

所谓 Promise ，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上 说，Promise是一个对象，从它可以获取异步操作的消息。Promise提供统一的API，各种异步操作都可以用同样的方法进行处 理。

 Promise 对象有以下两个特点。 

（1）对象的状态不受外界影响。 Promise 对象代表一个异步操作，有三种状态： Pending （进行中）、 Resolved （已完 成，又称Fulfilled）和 Rejected （已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这 个状态。这也是 Promise 这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。 

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。 Promise 对象的状态改变，只有两种可能： 从 Pending 变为 Resolved 和从 Pending 变为 Rejected 。只要这两种情况发生，状态就凝固了，不会再变了，会一直保 持这个结果。就算改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不 同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。 

有了 Promise 对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外， Promise 对象提 供统一的接口，使得控制异步操作更加容易。

 Promise 也有一些缺点。首先，无法取消 Promise ，一旦新建它就会**立即执行**，无法中途取消。其次，如果不设置回调函 数， Promise 内部抛出的错误，不会反应到外部。第三，当处于 Pending 状态时，无法得知目前进展到哪一个阶段（刚刚 开始还是即将完成）。 

如果某些事件不断地反复发生，一般来说，使用stream模式是比部署 Promise 更好的选择。 

> 当Promise对象的状态从pending（待定）改变为resolved（已解决），以下是处理程序（回调函数）所执行的操作：   
>
> 1. 执行处理程序（回调函数）：当Promise对象的状态变为resolved时，会触发处理程序的执行。处理程序是在调用Promise对象的 `then` 方法时传入的回调函数。   
> 2. 传递解决值：当Promise对象的状态变为resolved时，解决值（即resolve函数的参数）会作为参数传递给处理程序。处理程序可以通过该参数来访问和处理Promise对象的解决值。   
> 3. 异步执行：处理程序的执行是异步的，它会在当前事件循环的末尾或下一个事件循环中执行。这是因为Promise的状态变化和处理程序的执行是通过微任务队列来调度的，而微任务会在当前任务的末尾执行。   
> 4. 链式调用：处理程序的返回值会被用作下一个Promise对象的解决值，从而实现链式调用。如果处理程序返回一个新的Promise对象，那么下一个Promise对象的状态将取决于这个新Promise对象的状态。 

## 基本用法 

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231031153435097.png" alt="image-20231031153435097" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231031155646695.png" alt="image-20231031155646695" style="zoom:80%;" />

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231031160134199.png" alt="image-20231031160134199" style="zoom:80%;" />

ES6规定，Promise对象是一个构造函数，用来生成Promise实例。 下面代码创造了一个Promise实例。

```js
var promise = new Promise(function(resolve, reject) {
// ... some code
if (/* 异步操作成功 */){
resolve(value);
} else {
reject(error);
}
});
```

Promise构造函数接受一个函数作为参数，该函数的两个参数分别是 resolve 和 reject 。它们是两个函数，由JavaScript引擎 提供，不用自己部署。

 resolve 函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从Pending变为Resolved），在异步操作成功时调 用，并将异步操作的结果，作为参数传递出去； reject 函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 Pending变为Rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

 Promise实例生成以后，可以用then方法分别指定Resolved状态和Reject状态的回调函数。 

```js
promise.then(function(value) { 
    // success 
}, function(error) { 
    // failure
});
```

 then 方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为Resolved时调用，第二个回调函数是 Promise对象的状态变为Reject时调用。其中，第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作 为参数。 下面是一个Promise对象的简单例子。

```js
function timeout(ms) {
return new Promise((resolve, reject) => {
setTimeout(resolve, ms, 'done');
});
}
timeout(100).then((value) => {
console.log(value);
});
```

上面代码中， timeout 方法返回一个Promise实例，表示一段时间以后才会发生的结果。过了指定的时间（ ms 参数）以 后，Promise实例的状态变为Resolved，就会触发 then 方法绑定的回调函数。 Promise新建后就会立即执行。

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231031153711669.png" alt="image-20231031153711669" style="zoom:80%;" />

```js
let promise = new Promise(function(resolve, reject) {
console.log('Promise');
resolve();
});
promise.then(function() {
console.log('Resolved.');
});
console.log('Hi!');
// Promise
// Hi!
// Resolved
```

上面代码中，Promise新建后立即执行，所以首先输出的是“Promise”。然后， then 方法指定的回调函数，将在当前脚本所有 同步任务执行完才会执行，所以“Resolved”最后输出。 下面是异步加载图片的例子。

```js
function loadImageAsync(url) {
	return new Promise(function(resolve, reject) {
		var image = new Image();
		image.onload = function() {
			resolve(image);
		};
		image.onerror = function() {
			reject(new Error('Could not load image at ' + url));
		};
		image.src = url;
	});
}
```

下面是一个用Promise对象实现的Ajax操作的例子。

```js
var getJSON = function(url) {
	var promise = new Promise(function(resolve, reject){
		var client = new XMLHttpRequest();
		client.open("GET", url);
		client.onreadystatechange = handler;
		client.responseType = "json";
		client.setRequestHeader("Accept", "application/json");
		client.send();
		function handler() {
			if (this.readyState !== 4) {
				return;
			}
			if (this.status === 200) {
				resolve(this.response);
			} else {
				reject(new Error(this.statusText));
			}
		};
	});
	return promise;
};
getJSON("/posts.json").then(function(json) {
	console.log('Contents: ' + json);
	}, function(error) {
		console.error('出错了', error);
});
```

上面代码中， getJSON 是对XMLHttpRequest对象的封装，用于发出一个针对JSON数据的HTTP请求，并且返回一个Promise对 象。需要注意的是，在 getJSON 内部， resolve 函数和 reject 函数调用时，都带有参数。 

如果调用 resolve 函数和 reject 函数时带有参数，那么它们的参数会被传递给回调函数。 reject 函数的参数通常是Error 对象的实例，表示抛出的错误； resolve 函数的参数除了正常的值以外，还可能是另一个Promise实例，表示异步操作的结果 有可能是一个值，也有可能是另一个异步操作，比如像下面这样。

```js
var p1 = new Promise(function(resolve, reject){
	// ...
});
var p2 = new Promise(function(resolve, reject){
	// ...
	resolve(p1);
})
```

上面代码中， p1 和 p2 都是Promise的实例，但是 p2 的 resolve 方法将 p1 作为参数，即一个异步操作的结果是返回另 一个异步操作。 注意，这时 p1 的状态就会传递给 p2 ，也就是说， p1 的状态决定了 p2 的状态。如果 p1 的状态是 Pending ，那 么 p2 的回调函数就会等待 p1 的状态改变；如果 p1 的状态已经是 Resolved 或者 Rejected ，那么 p2 的回调函数将 会立刻执行。

```js
var p1 = new Promise(function (resolve, reject) {
	setTimeout(() => reject(new Error('fail')), 3000)
})
var p2 = new Promise(function (resolve, reject) {
	setTimeout(() => resolve(p1), 1000)
})
p2.then(result => console.log(result))
p2.catch(error => console.log(error))
// Error: fail
```

上面代码中， p1 是一个Promise，3秒之后变为 rejected 。 p2 的状态由 p1 决定，1秒之后， p2 调用 resolve 方 法，但是此时 p1 的状态还没有改变，因此 p2 的状态也不会变。又过了2秒， p1 变为 rejected ， p2 也跟着变 为 rejected 。

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231031222240867.png" alt="image-20231031222240867" style="zoom:80%;" />

## Promise.prototype.then() 

Promise实例具有 then 方法，也就是说， then 方法是定义在原型对象Promise.prototype上的。它的作用是为Promise实例添加 状态改变时的回调函数。前面说过， then 方法的第一个参数是Resolved状态的回调函数，第二个参数（可选）是Rejected状态 的回调函数。 then 方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即 then 方法后面 再调用另一个 then 方法。

```js
getJSON("/posts.json").then(function(json) {
	return json.post;
}).then(function(post) {
// ...
});
```

上面的代码使用 then 方法，依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调 函数。 采用链式的 then ，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个Promise对象（即 有异步操作），这时后一个回调函数，就会等待该Promise对象的状态发生变化，才会被调用。

```js
getJSON("/post/1.json").then(function(post) {
	return getJSON(post.commentURL);
}).then(function funcA(comments) {
	console.log("Resolved: ", comments);
}, function funcB(err){
	console.log("Rejected: ", err);
});
```

上面代码中，第一个 then 方法指定的回调函数，返回的是另一个Promise对象。这时，第二个 then 方法指定的回调函数， 就会等待这个新的Promise对象状态发生变化。如果变为Resolved，就调用 funcA ，如果状态变为Rejected，就调用 funcB 。 如果采用箭头函数，上面的代码可以写得更简洁。

```js
getJSON("/post/1.json").then(
	post => getJSON(post.commentURL)
).then(
	comments => console.log("Resolved: ", comments),
	err => console.log("Rejected: ", err)
);
```

## Promise.prototype.catch()

Promise.prototype.catch 方法是 .then(null, rejection) 的别名，用于指定发生错误时的回调函数

```js
getJSON("/posts.json").then(function(posts) {
// ...
}).catch(function(error) {
// 处理 getJSON 和 前一个回调函数运行时发生的错误
	console.log('发生错误！', error);
});
```

上面代码中， getJSON 方法返回一个Promise对象，如果该对象状态变为 Resolved ，则会调用 then 方法指定的回调函 数；如果异步操作抛出错误，状态就会变为 Rejected ，就会调用 catch 方法指定的回调函数，处理这个错误。另 外， then 方法指定的回调函数，如果运行中抛出错误，也会被 catch 方法捕获。

```js
p.then((val) => console.log("fulfilled:", val))
.catch((err) => console.log("rejected:", err));
// 等同于
p.then((val) => console.log(fulfilled:", val))
.then(null, (err) => console.log("rejected:", err));
```

下面是一个例子。

```js
var promise = new Promise(function(resolve, reject) {
	throw new Error('test');
});
promise.catch(function(error) {
	console.log(error);
});
// Error: test
```

上面代码中， promise 抛出一个错误，就被 catch 方法指定的回调函数捕获。注意，上面的写法与下面两种写法是等价 的。

```js
// 写法一
var promise = new Promise(function(resolve, reject) {
	try {
		throw new Error('test');
	} catch(e) {
		reject(e);
	}
});
promise.catch(function(error) {
	console.log(error);
});
// 写法二
var promise = new Promise(function(resolve, reject) {
	reject(new Error('test'));
});
promise.catch(function(error) {
	console.log(error);
});
```

比较上面两种写法，可以发现 reject 方法的作用，等同于抛出错误。 如果Promise状态已经变成 Resolved ，再抛出错误是无效的。

```js
var promise = new Promise(function(resolve, reject) {
	resolve('ok');
	throw new Error('test');
});
promise
.then(function(value) { console.log(value) })
.catch(function(error) { console.log(error) });
// ok

```

上面代码中，Promise在 resolve 语句后面，再抛出错误，不会被捕获，等于没有抛出。 Promise对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个 catch 语句捕获

```js
getJSON("/post/1.json").then(function(post) {
	return getJSON(post.commentURL);
}).then(function(comments) {
// some code
}).catch(function(error) {
// 处理前面三个Promise产生的错误
});
```

上面代码中，一共有三个Promise对象：一个由 getJSON 产生，两个由 then 产生。它们之中任何一个抛出的错误，都会被最 后一个 catch 捕获。 一般来说，不要在 then 方法里面定义Reject状态的回调函数（即 then 的第二个参数），总是使用 catch 方法。

```js
// bad
promise
.then(function(data) {
// success
}, function(err) {
// error
});
// good
promise
.then(function(data) { //cb
// success
})
.catch(function(err) {
// error
});
```

上面代码中，第二种写法要好于第一种写法，理由是第二种写法可以捕获前面 then 方法执行中的错误，也更接近同步的写法 （ try/catch ）。因此，建议总是使用 catch 方法，而不使用 then 方法的第二个参数。 跟传统的 try/catch 代码块不同的是，如果没有使用 catch 方法指定错误处理的回调函数，Promise对象抛出的错误不会传 递到外层代码，即不会有任何反应。

```js
var someAsyncThing = function() {
	return new Promise(function(resolve, reject) {
		// 下面一行会报错，因为x没有声明
		resolve(x + 2);
	});
};
someAsyncThing().then(function() {
	console.log('everything is great');
});
```

上面代码中， someAsyncThing 函数产生的Promise对象会报错，但是由于没有指定 catch 方法，这个错误不会被捕获，也不 会传递到外层代码，导致运行后没有任何输出。注意，Chrome浏览器不遵守这条规定，它会抛出错误“ReferenceError: x is not defined”。

```js
var promise = new Promise(function(resolve, reject) {
	resolve("ok");
	setTimeout(function() { throw new Error('test') }, 0)
});
promise.then(function(value) { console.log(value) });
// ok
// Uncaught Error: test
```

上面代码中，Promise指定在下一轮“事件循环”再抛出错误，结果由于没有指定使用 try...catch 语句，就冒泡到最外层，成 了未捕获的错误。因为此时，Promise的函数体已经运行结束了，所以这个错误是在Promise函数体外抛出的。 Node.js有一个 unhandledRejection 事件，专门监听未捕获的 reject 错误。

```js
process.on('unhandledRejection', function (err, p) {
	console.error(err.stack)
});
```

上面代码中， unhandledRejection 事件的监听函数有两个参数，第一个是错误对象，第二个是报错的Promise实例，它可以用 来了解发生错误的环境信息。。 需要注意的是， catch 方法返回的还是一个Promise对象，因此后面还可以接着调用 then 方法。

```js
var someAsyncThing = function() {
	return new Promise(function(resolve, reject) {
// 下面一行会报错，因为x没有声明
	resolve(x + 2);
});
};
someAsyncThing()
.catch(function(error) {
	console.log('oh no', error);
})
.then(function() {
	console.log('carry on');
});
// oh no [ReferenceError: x is not defined]
// carry on
```

上面代码运行完 catch 方法指定的回调函数，会接着运行后面那个 then 方法指定的回调函数。如果没有报错，则会跳 过 catch 方法。

```js
Promise.resolve()
.catch(function(error) {
	console.log('oh no', error);
})
.then(function() {
	console.log('carry on');
});
// carry on
```

上面的代码因为没有报错，跳过了 catch 方法，直接执行后面的 then 方法。此时，要是 then 方法里面报错，就与前面 的 catch 无关了。 catch 方法之中，还能再抛出错误。

```js
var someAsyncThing = function() {
	return new Promise(function(resolve, reject) {
// 下面一行会报错，因为x没有声明
		resolve(x + 2);
	});
};
someAsyncThing().then(function() {
	return someOtherAsyncThing();
}).catch(function(error) {
	console.log('oh no', error);
	// 下面一行会报错，因为y没有声明
	y + 2;
}).then(function() {
	console.log('carry on');
});
// oh no [ReferenceError: x is not defined]
```

上面代码中， catch 方法抛出一个错误，因为后面没有别的 catch 方法了，导致这个错误不会被捕获，也不会传递到外 层。如果改写一下，结果就不一样了。

```js
someAsyncThing().then(function() {
	return someOtherAsyncThing();
}).catch(function(error) {
	console.log('oh no', error);
	// 下面一行会报错，因为y没有声明
	y + 2;
}).catch(function(error) {
	console.log('carry on', error);
});
// oh no [ReferenceError: x is not defined]
// carry on [ReferenceError: y is not defined]
```

上面代码中，第二个 catch 方法用来捕获，前一个 catch 方法抛出的错误。

## Promise.all()

Promise.all 方法用于将多个Promise实例，包装成一个新的Promise实例。

```js
var p = Promise.all([p1, p2, p3]);
```

上面代码中， Promise.all 方法接受一个数组作为参数， p1 、 p2 、 p3 都是Promise对象的实例，如果不是，就会先调 用下面讲到的 Promise.resolve 方法，将参数转为Promise实例，再进一步处理。（ Promise.all 方法的参数可以不是数 组，但必须具有Iterator接口，且返回的每个成员都是Promise实例。） p 的状态由 p1 、 p2 、 p3 决定，分成两种情况。 （1）只有 p1 、 p2 、 p3 的状态都变成 fulfilled ， p 的状态才会变成 fulfilled ，此时 p1 、 p2 、 p3 的返 回值组成一个数组，传递给 p 的回调函数。 （2）只要 p1 、 p2 、 p3 之中有一个被 rejected ， p 的状态就变成 rejected ，此时第一个被 reject 的实例的返 回值，会传递给 p 的回调函数。 下面是一个具体的例子。

```js
// 生成一个Promise对象的数组
var promises = [2, 3, 5, 7, 11, 13].map(function (id) {
	return getJSON("/post/" + id + ".json");
});
Promise.all(promises).then(function (posts) {
// ...
}).catch(function(reason){
// ...
});
```

上面代码中， promises 是包含6个Promise实例的数组，只有这6个实例的状态都变成 fulfilled ，或者其中有一个变 为 rejected ，才会调用 Promise.all 方法后面的回调函数。 下面是另一个例子。

```js
const databasePromise = connectDatabase();
const booksPromise = databaseProimse
.then(findAllBooks);
const userPromise = databasePromise
.then(getCurrentUser);
Promise.all([
booksPromise,
userPromise
])
.then(([books, user]) => pickTopRecommentations(books, user));
```

上面代码中， booksPromise 和 userPromise 是两个异步操作，只有等到它们的结果都返回了，才会触 发 pickTopRecommentations 这个回调函数。

## Promise.race()

### 多任务竞争

任务之间是竞争关系，使用Promise.race()也可以很简单的实现。

如果一个页面，需要从多个接口下载文件，但假如只要其中一个任务执行成功获取其结果即可，其它任务便可丢弃。

Promise.race 方法同样是将多个Promise实例，包装成一个新的Promise实例。

```js
var p = Promise.race([p1,p2,p3]);
```

上面代码中，只要 p1 、 p2 、 p3 之中有一个实例率先改变状态， p 的状态就跟着改变。那个率先改变的Promise实例的 返回值，就传递给 p 的回调函数。 Promise.race 方法的参数与 Promise.all 方法一样，如果不是Promise实例，就会先调用下面讲到的 Promise.resolve 方 法，将参数转为Promise实例，再进一步处理。 下面是一个例子，如果指定时间内没有获得结果，就将Promise的状态变为 reject ，否则变为 resolve 。

```js
var p = Promise.race([
	fetch('/resource-that-may-take-a-while'),
	new Promise(function (resolve, reject) {
		setTimeout(() => reject(new Error('request timeout')), 5000)
	})
])
p.then(response => console.log(response))
p.catch(error => console.log(error))
```

上面代码中，如果5秒之内 fetch 方法无法返回结果，变量 p 的状态就会变为 rejected ，从而触发 catch 方法指定的回 调函数。

## Promise.resolve()

有时需要将现有对象转为Promise对象， Promise.resolve 方法就起到这个作用。

```js
var jsPromise = Promise.resolve($.ajax('/whatever.json'));
```

上面代码将jQuery生成的 deferred 对象，转为一个新的Promise对象。 Promise.resolve 等价于下面的写法。

```js
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

Promise.resolve 方法的参数分成四种情况。 （1）参数是一个Promise实例 如果参数是Promise实例，那么 Promise.resolve 将不做任何修改、原封不动地返回这个实例。 （2）参数是一个 thenable 对象 thenable 对象指的是具有 then 方法的对象，比如下面这个对象。

```js
let thenable = {
	then: function(resolve, reject) {
		resolve(42);
	}
};
```

Promise.resolve 方法会将这个对象转为Promise对象，然后就立即执行 thenable 对象的 then 方法。

```js
let thenable = {
	then: function(resolve, reject) {
		resolve(42);
	}
};
let p1 = Promise.resolve(thenable);
p1.then(function(value) {
	console.log(value); // 42
});
```

上面代码中， thenable 对象的 then 方法执行后，对象 p1 的状态就变为 resolved ，从而立即执行最后那个 then 方 法指定的回调函数，输出42。 （3）参数不是具有 then 方法的对象，或根本就不是对象 如果参数是一个原始值，或者是一个不具有 then 方法的对象，则 Promise.resolve 方法返回一个新的Promise对象，状态 为 Resolved 。

```js
var p = Promise.resolve('Hello');
p.then(function (s){
	console.log(s)
});
// Hello
```

上面代码生成一个新的Promise对象的实例 p 。由于字符串 Hello 不属于异步操作（判断方法是它不是具有then方法的对 象），返回Promise实例的状态从一生成就是 Resolved ，所以回调函数会立即执行。 Promise.resolve 方法的参数，会同时 传给回调函数。 （4）不带有任何参数 Promise.resolve 方法允许调用时不带参数，直接返回一个 Resolved 状态的Promise对象。 所以，如果希望得到一个Promise对象，比较方便的方法就是直接调用 Promise.resolve 方法。

```js
var p = Promise.resolve();
p.then(function () {
// ...
});
```

上面代码的变量 p 就是一个Promise对象。

## Promise.reject()

Promise.reject(reason) 方法也会返回一个新的Promise实例，该实例的状态为 rejected 。它的参数用法 与 Promise.resolve 方法完全一致。

```js
var p = Promise.reject('出错了');
// 等同于
var p = new Promise((resolve, reject) => reject('出错了'))
p.then(null, function (s){
	console.log(s)
});
// 出错了
```

上面代码生成一个Promise对象的实例 p ，状态为 rejected ，回调函数会立即执行。

## 两个有用的附加方法

ES6的Promise API提供的方法不是很多，有些有用的方法可以自己部署。下面介绍如何部署两个不在ES6之中、但很有用的方 法。 done() Promise对象的回调链，不管以 then 方法或 catch 方法结尾，要是最后一个方法抛出错误，都有可能无法捕捉到（因为 Promise内部的错误不会冒泡到全局）。因此，我们可以提供一个 done 方法，总是处于回调链的尾端，保证抛出任何可能出现 的错误。

```js
asyncFunc()
.then(f1)
.catch(r1)
.then(f2)
.done();
```

它的实现代码相当简单。

```js
Promise.prototype.done = function (onFulfilled, onRejected) {
	this.then(onFulfilled, onRejected)
	.catch(function (reason) {
	// 抛出一个全局错误
		setTimeout(() => { throw reason }, 0);
	});
};
```

从上面代码可见， done 方法的使用，可以像 then 方法那样用，提供 Fulfilled 和 Rejected 状态的回调函数，也可以 不提供任何参数。但不管怎样， done 都会捕捉到任何可能出现的错误，并向全局抛出。

## finally()

finally 方法用于指定不管Promise对象最后状态如何，都会执行的操作。它与 done 方法的最大区别，它接受一个普通的回 调函数作为参数，该函数不管怎样都必须执行。 下面是一个例子，服务器使用Promise处理请求，然后使用 finally 方法关掉服务器。

```js
server.listen(0)
.then(function () {
	// run test
})
.finally(server.stop);
```

它的实现也很简单。

```js
Promise.prototype.finally = function (callback) {
	let P = this.constructor;
	return this.then(
		value => P.resolve(callback()).then(() => value),
		reason => P.resolve(callback()).then(() => { throw reason })
	);
};
```

上面代码中，不管前面的Promise是 fulfilled 还是 rejected ，都会执行回调函数 callback 。

## 1. done

如果你使用过 Promise 类库的话，你可能见过 done 方法，Promise 类库提过`Promise.prototype.done` ，用 done 方法来替代 then 方法。在 Promise 规范和 Promise+ 规范中并没有对 Promise.prototype.done 做任何的规范，那为什么会出现这个方法了。一切都源于那些 **“消失的错误”** 。

### 消失的错误

我们先回忆一下 Promise 的特点。“**对象的状态不受外界影响**”，“**一旦状态改变，就不会再变，任何时候都可以得到这个结果**”。也回忆一下 Promise 的缺点“**无法取消** **`Promise`** **，一旦新建它就会立即执行，无法中途取消**”，“**当处于** **`Pending`** **状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）** ”，“**如果不设置回调函数，** `Promise` **内部抛出的错误，不会反应到外部**”。

看到最后一条缺点你可能明白了，Promise 不管以`then`方法或`catch`方法结尾，要是最后一个方法抛出错误，都有可能无法捕捉到（因为Promise内部的错误不会冒泡到全局）。我们来看一个例子：

```
function JSONPromise(value) {
    return new Promise(function (resolve) {
        resolve(JSON.parse(value));
    });
}
// 运行示例
const string = "一个不合法的json字符串";
JSONPromise(string).then(function (object) {
    console.log(object);
}).catch(function(error){
    // => JSON.parse抛出异常时
    console.error(error);
});
```

由于 string 这个字符串是一个不合法的 JSON 字符串，所以会解析抛出一个错误，然后被`catch` 捕捉到。正常情况你写了`catch` 方法正常捕获，但是如果没有写或者漏写了，一旦发生异常，想要查找源头就是一个非常棘手的问题。

```
function JSONPromise(value) {
    return new Promise(function (resolve) {
        resolve(JSON.parse(value));
    });
}
// 运行示例
const string = "一个不合法的json字符串";
JSONPromise(string).then(function (object) {
    console.log(object);
});
```

这里可能例子比较简单，在实际的研发过程中 Promise 的使用肯定是比这个例子复杂得多，而且代码的异常也可能是多种多样的。但是，由于  Promise 的 try-catch 机制，这个问题可能就会在 Promise 的内部消化掉，也就是所谓的消失的错误。当然有的同学会说我每次调用进行 `catch` 处理不就好了，这样无疑是最好的。但是并不是每一个人都像你这样优秀😁。如果在实现的过程中出现了这个例子中的错误的话，那么进行错误排除的工作也会变得困难。

消失的错误还有一个专业名词unhandled rejection，意思就是 Rejected 时没有找到相应处理的意思。在很多 Promise 类库中对unhandled rejection都会有相应的处理。例如：

- [ypromise](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fyahoo%2Fypromise) 在检测到 unhandled rejection 错误的时候，会在控制台上提示相应的信息。【Promise rejected but no error handlers were registered to it】
- [Bluebird](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fpetkaantonov%2Fbluebird) 在比较明显的人为错误，即ReferenceError等错误的时候，会直接显示到控制台上。【Possibly unhandled ReferenceError. xxx】
- 原生（Native）的 Promise 实现为了应对同样问题，提供了GC-based unhandled rejection tracking功能。该功能是在 promise 对象被垃圾回收器回收的时候，如果是 unhandled rejection 的话，则进行错误显示的一种机制。[Firefox](https://link.juejin.cn/?target=https%3A%2F%2Ftwitter.com%2Fdomenic%2Fstatus%2F461154989856264192) 或 [Chrome](https://link.juejin.cn/?target=https%3A%2F%2Fcode.google.com%2Fp%2Fv8%2Fissues%2Fdetail%3Fid%3D3093) 的原生Promise都进行了部分实现。

### 原理实现

它的实现代码相当简单。

```
Promise.prototype.done = function (onFulfilled, onRejected) {
  this.then(onFulfilled, onRejected)
    .catch(function (reason) {
      // 抛出一个全局错误
      setTimeout(() => { throw reason }, 0);
    });
};
```

从上面代码可见，`done`方法的使用，可以像`then`方法那样用，提供`Fulfilled`和`Rejected`状态的回调函数，也可以不提供任何参数。但不管怎样，`done`都会捕捉到任何可能出现的错误，并向全局抛出。如果严格一点，也可以这样写：

```
"use strict";
if (typeof Promise.prototype.done === "undefined") {
    Promise.prototype.done = function (onFulfilled, onRejected) {
        this.then(onFulfilled, onRejected).catch(function (error) {
            setTimeout(function () {
                throw error;
            }, 0);
        });
    };
}
```

### 小结

**`done`** **并不返回 Promise 对象**，所以在`done` 之后并不能在使用`catch` 。done 的错误是直接抛出去的，并不会进行 Promise 的错误处理。Promise具有强大的错误处理机制，而`done`则会在函数中跳过错误处理，直接抛出异常。

讲完 done 方法你已经了解到为什么会有 done 的出现，如果自己实现一个，接下来在来看看 finally 方法。

## 2. finally

`finally`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。它与`done`方法的最大区别，它接受一个普通的回调函数作为参数，该函数不管怎样都必须执行。

```
server.listen(0)
  .then(function () {
    // run test
  })
  .finally(server.stop);
```

### Why not `.then(f, f)`?

其实本质上 finally（func）与 then（func，func）类似，但是在一些关键方面有所不同：

- 内联创建函数时，您可以传递一次，而不必被强制声明两次或为其创建变量
- 由于没有可靠的方法来确定 Promise 是否已兑现，因此 finally 回调将不会收到任何参数。正是这种用例适用于您不关心拒绝原因或实现价值，因此不需要提供它的情况。
- 与 Promise.resolve(2).then(() => {}, () => {}) （将使用未定义的解析）不同，Promise.resolve(2).finally(() => {}) 将用2.解决
- 同样，与Promise.reject(3).then(() => {}, () => {})（将使用未定义的解析）不同，Promise.reject(3).finally(() => {})将被拒绝3。

### 原理实现

它的实现也很简单。

```
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```

上面代码中，不管前面的Promise是`fulfilled`还是`rejected`，都会执行回调函数`callback`。

### 小结

**finally 方法本质是一个 then 方法**，所以在实现方法中要调用 then 方法入参是一个函数，需要在 then 方法中执行这个函数

使用 Promise.resolve 会等入参的函数执行完再返回结果，并将上一个 then 的 value 返回 reject 方法中需要抛出错误信息。

## 3. done、finally 方法到底谁最后执行？

在讨论这个问题之前，我们先把 Promise.prototype.finally 转换为 ES5 是什么样的。

```
"use strict";
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(value => P.resolve(callback()).then(() => value), reason => P.resolve(callback()).then(() => {
    throw reason;
  }));
};
```

在线转换：[es6console.com/](https://link.juejin.cn/?target=https%3A%2F%2Fes6console.com%2F)，[babeljs.io/repl](https://link.juejin.cn/?target=https%3A%2F%2Fbabeljs.io%2Frepl)

你是不是明白了什么，要这么写的原因是在于，`finally`其实并不一定是这个`promise`链的最后一环，相对而言，其实`done`才是。因为`finally`可能之后还有`then`和`catch`等等，所以其必须要返回一个`promise`对象。是不是瞬间秒懂。



## 应用

**加载图片 **我们可以将图片的加载写成一个 Promise ，一旦加载完成， Promise 的状态就发生变化。

```js
const preloadImage = function (path) {
	return new Promise(function (resolve, reject) {
		var image = new Image();
		image.onload = resolve;
		image.onerror = reject;
		image.src = path;
	});
};
```

### Generator函数与Promise的结合

使用Generator函数管理流程，遇到异步操作的时候，通常返回一个 Promise 对象

```js
function getFoo () {
	return new Promise(function (resolve, reject){
		resolve('foo');
	});
}
var g = function* () {
	try {
		var foo = yield getFoo();
		console.log(foo);
	} catch (e) {
		console.log(e);
	}
};
function run (generator) {
	var it = generator();
		function go(result) {
			if (result.done) return result.value;
			return result.value.then(function (value) {
				return go(it.next(value));
			}, function (error) {
				return go(it.throw(error));
			});
		}
		go(it.next());
	}
run(g);
```

上面代码的Generator函数 g 之中，有一个异步操作 getFoo ，它返回的就是一个 Promise 对象。函数 run 用来处理这 个 Promise 对象，并调用下一个 next 方法。

### async函数

async函数与Promise、Generator函数一样，是用来取代回调函数、解决异步操作的一种方法。它本质上是Generator函数的语法 糖。async函数并不属于ES6，而是被列入了ES7，但是traceur、Babel.js、regenerator等转码器已经支持这个功能，转码后立刻就 能使用。 async函数的详细介绍，请看《异步操作》一章。





## 问答题

1. Promsie 对象有几种状态？他们之间是怎么转换的？

   >Promise对象有三种状态：pending（待定）、resolved（已完成）和rejected（已拒绝）。  
   >
   >1. pending（待定）：Promise对象的初始状态是pending。这意味着Promise对象既不是已完成也不是已拒绝。在这个状态下，Promise对象可以转换为resolved或rejected状态。  
   >
   >2. resolved（已完成）：当Promise对象成功地完成操作时，它的状态变为resolved。在这个状态下，Promise对象的解决值可用，并且可以通过 `.then()` 方法中的回调函数进行访问和处理。   
   >
   >3. rejected（已拒绝）：当Promise对象无法完成操作时，它的状态变为rejected。在这个状态下，Promise对象的拒绝原因可用，并且可以通过 `.catch()` 方法或 `.then()` 方法中的第二个回调函数进行访问和处理。   
   >
   >   
   >
   >   Promise对象的状态转换是单向的，一旦从pending转换为resolved或rejected，它就会停留在该状态，无法再次改变。在状态转换后，可以通过 `.then()` 方法中的回调函数或 `.catch()` 方法来处理Promise对象的结果。状态转换的方式如下：   
   >
   >   - 从pending到resolved：调用Promise对象的 `resolve()` 函数，并传递解决值作为参数。这将使Promise对象的状态从pending转换为resolved。   
   >   - 从pending到rejected：调用Promise对象的 `reject()` 函数，并传递拒绝原因作为参数。这将使Promise对象的状态从pending转换为rejected。  
   >
   >

2. 下面代码的输出结果是什么？（**饿了么面试题**）

   ```javascript
   setTimeout(function() {
      console.log(1)
   }, 0);
   new Promise(function executor(resolve) {
      console.log(2);
      for( var i=0 ; i<10000 ; i++ ) {
         i == 9999 && resolve();
      }
      console.log(3);
   }).then(function() {
      console.log(4);
   });
   console.log(5);
   ```

   > <img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231031130408045.png" alt="image-20231031130408045" style="zoom:80%;" />
   >
   > 首先延时器函数会将函数插入事件队列，在下一次事件循环中执行，即使延时为0毫秒，仍然是当前事件循环结束后0毫秒才会执行，所以1是最后被打印的。
   >
   > 然后对于创建的 Promise 对象，一旦创建完成便立即执行传入的函数。打印出数字2，然后执行for循环，调用resolve函数。但是resolve并不会立即执行.then，而是修改内部状态为resolve，传递参数（此处无参），将 `then` 方法中的回调函数添加到微任务队列中。然后接着执行任务打印出 3。
   >
   > 然后执行当前事件循环最后一行代码打印5 。
   >
   > 随后执行微任务队列里的.then方法，打印4 。
   >
   > 最近进入下一个事件循环，执行延时器打印1 。
   >
   > 在JavaScript中，微任务比宏任务优先级更高。Promise对象的 `then` 方法中的回调函数是微任务，而 `setTimeout` 函数是宏任务。因此，当Promise对象被解决时，会将 `then` 方法中的回调函数添加到微任务队列中，而 `setTimeout` 函数的回调函数会被添加到宏任务队列中。在下一次事件循环中，JavaScript引擎会先执行所有的微任务，然后再执行宏任务。因此，即使 `setTimeout` 函数的延时为0毫秒， `then` 方法中的回调函数仍然会先执行。

   ```js
   setTimeout(function() {
      console.log(1)
   }, 0);
   new Promise(function executor(resolve) {
      console.log(2);
      setTimeout(()=>{
          resolve();
      },1000)//延时器调用resolve，将在下一个事件循环中执行
      console.log(3);
   }).then(function() {
      console.log(4);
   });
   console.log(5);
   ```

   <img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231031210446537.png" alt="image-20231031210446537" style="zoom:80%;" />

   事件队列，先进先出：

   <img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231031211722780.png" alt="image-20231031211722780" style="zoom:80%;" />

3. 什么是 Promise 对象？引入 Promise 对象是为了解决什么？

   > 所谓 Promise ，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上 说，Promise是一个对象，从它可以获取异步操作的消息。Promise提供统一的API，各种异步操作都可以用同样的方法进行处 理。
   >
   > 有了 Promise 对象，就可以将异步操作以同步操作的流程表达出来，避免了回调地狱（callback hell）和层层嵌套的问题。此外， Promise 对象提供统一的接口，使得控制异步操作更加容易。
   >
   > 引入Promise对象的目的是为了解决回调函数的缺点和异步代码的可读性和可维护性问题。在传统的回调函数中，异步操作的结果通常通过回调函数来处理，导致代码嵌套层级增多，可读性差，难以处理错误和异常情况，以及难以进行代码重用和组合。   
   >
   > Promise对象通过提供一种更结构化和可组合的方式来处理异步操作的结果，使得代码更易于理解和维护。它通过链式调用的方式，将异步操作的结果传递给后续的处理函数，使得代码更加直观和线性。同时，Promise对象还提供了丰富的错误处理机制，可以捕获和处理异步操作中的异常情况。

4. `var p = new Promise()` 中 `p` 对象有哪些方法？各有什么功能？

   > 1. `.then()` ：该方法用于添加处理Promise对象解决（resolve）或拒绝（reject）情况的回调函数。它接受两个参数： `onResolved` 和 `onRejected` ，分别是Promise对象解决时和拒绝时的回调函数。返回一个新的Promise对象，可以通过链式调用 `.then()` 方法来处理Promise对象的结果。   
   > 2. `.catch(onRejected)` ：该方法用于添加处理Promise对象拒绝（rejected）情况的回调函数。它接受一个参数 `onRejected` ，是Promise对象拒绝时的回调函数。返回一个新的Promise对象，可以通过链式调用 `.catch()` 方法来处理Promise对象的拒绝情况。   
   > 3. `.all([p1,p2,p3])` ：Promise.all 方法用于将多个Promise实例，包装成一个新的Promise实例。Promise的all方法提供了并行执行异步操作的能力，在all中所有异步操作结束后才执行回调。
   > 4. `.race()`:在all中的回调函数中，等到所有的Promise都执行完，再来执行回调函数，race则不同它等到其中第一个Promise改变状态就开始执行回调函数。

5. `Promise.all` 和 `Promise.race` 的区别是什么？

   > 1. `Promise.all` ： `Promise.all`  方法接受一个 Promise 数组作为输入，并返回一个新的 Promise。返回的 Promise 将在所有输入的 Promise 都被解决（resolve）时被解决。如果任何一个输入的 Promise 被拒绝（rejected），返回的 Promise 将立即被拒绝，并带有第一个被拒绝的 Promise 的原因。  
   >
   > 2.  `Promise.race` ： `Promise.race`  方法接受一个 Promise 数组作为输入，并返回一个新的 Promise。返回的 Promise 将在数组中时间意义上第一个解决（resolved）或拒绝（rejected）的 Promise 完成时解决。无论是解决还是拒绝，只要数组中有一个 Promise 先完成，返回的 Promise 就会立即完成。   
   >
   >    简而言之， `Promise.all`  等待所有的 Promise 都被解决，而  `Promise.race`  只要有一个 Promise 先完成就立即解决。

6. Promise 中抛出未处理的异常会怎么样？会阻碍后面的代码执行吗？Chrome 和 Node.js 环境下有什么不同？

   > 在Promise中，如果抛出未处理的异常，会导致Promise对象被拒绝（rejected）。这意味着如果在Promise链中的任何一个Promise中发生未捕获的异常，它将会传播到Promise链的末尾，最终导致整个Promise链被拒绝。   
   >
   > 未处理的异常不会直接阻碍后面的代码执行。当Promise被拒绝时，可以使用 `.catch()` 方法或在 `.then()` 方法的第二个参数中提供的回调函数来处理拒绝的情况。这样可以避免未处理的异常中断代码的执行，并且可以对异常进行适当的处理和错误处理。   
   >
   > 在Chrome和Node.js环境下，对未处理的异常的处理方式有一些不同：  
   >
   > - Chrome环境：在Chrome浏览器中，默认情况下，会在控制台中打印错误信息。会报错， 但是不会立即终止，不影响执行。 
   > - Node.js环境：在Node.js中，默认情况下，未处理的异常不会对执行有影响。

7. `catch` 方法中再抛出异常会怎么样，需要怎样捕捉？

   > 如果在 `catch` 方法中再次抛出异常，它将会被传递到下一个可用的错误处理机制，而不会被当前的 `catch` 块捕获。这意味着异常会继续传播到更外层的错误处理机制。   
   >
   > 为了捕捉和处理在 `catch` 方法中再次抛出的异常，可以使用以下方式：     
   >
   > 1. 使用 `.catch()` 方法链式调用：在 `catch` 方法中返回一个新的Promise对象，并在该Promise对象上使用 `.catch()` 方法来捕获和处理异常。这样可以在Promise链中的任何地方捕获和处理异常。   
   > 2. `.done()`方法，Promise对象的回调链，不管以 then 方法或 catch 方法结尾，要是最后一个方法抛出错误，都有可能无法捕捉到（因为 Promise内部的错误不会冒泡到全局）。因此，我们可以提供一个 done 方法，总是处于回调链的尾端，保证抛出任何可能出现的错误。

8. `then`的**链式调用**每次返回的是同一个 Promise 对象吗？请写一小段代码证明你的观点

   > 不是，每次返回一个新的Promise对象
   >
   > ```js
   > var p = new Promise((resolve, reject) => {
   >   resolve("Initial");
   > });
   > 
   > var p1 = p.then((value) => {
   >   console.log(value); // 输出 "Initial"
   >   return value + " p 1";
   > }).then((value) => {
   >   console.log(value); // 输出 "Initial p 1"
   >   return value + " p 2";
   > });
   > 
   > console.log(p === p1); // 输出 false
   > ```
   >
   > 在上面的代码中，我们创建了一个Promise对象 `p` ，然后通过 `then` 方法进行链式调用。在每个 `then` 方法中，我们返回一个新的值，以便在下一个 `then` 方法中使用。   
   >
   > 通过比较 `p` 和 `p1` 的引用，我们发现它们是不相等的。这表明每次 `then` 方法的链式调用返回的是新建的Promise对象。   
   >
   > 这是因为Promise的 `then` 方法返回一个新的Promise对象，该对象在上一个Promise对象解决后被解决，并且可以通过链式调用来连接多个 `then` 方法。这样的设计使得我们可以方便地对异步操作进行连续的处理和操作。

## 代码题

1. 请使用 `Promise` 重构之前作业：*新闻瀑布流* 中的 **图片加载** 和 **加载更多** 部分，比较 `Promise` 写法与之前的写法的区别

   > 之前的写法可能是使用回调函数来处理加载更多的异步操作，类似于以下示例：
   >
   > ```
   > javascriptfunction loadMore(callback) {
   >   // 异步加载更多的逻辑
   >   // ...
   >   if (success) {
   >     callback(null, data);
   >   } else {
   >     callback(new Error('Load more error'));
   >   }
   > }
   > 
   > loadMore(function(error, data) {
   >   if (error) {
   >     console.log('Error:', error);
   >   } else {
   >     console.log('Data loaded:', data);
   >   }
   > });
   > ```
   >
   > 使用 `Promise` 重构后的写法如下：
   >
   > ```
   > javascriptfunction loadMore() {
   >   return new Promise(function(resolve, reject) {
   >     // 异步加载更多的逻辑
   >     // ...
   >     if (success) {
   >       resolve(data);
   >     } else {
   >       reject(new Error('Load more error'));
   >     }
   >   });
   > }
   > 
   > loadMore()
   >   .then(function(data) {
   >     console.log('Data loaded:', data);
   >   })
   >   .catch(function(error) {
   >     console.log('Error:', error);
   >   });
   > ```

2. 请自行封装 `ajaxGet(url)` 函数，其返回值为 Promise ，其中 data 为获取的数据（内部使用 XMLHttpRequest）

   > ```js
   > function ajaxGet(url) {
   >   return new Promise(function(resolve, reject) {
   >     var xhr = new XMLHttpRequest();
   >     xhr.open('GET', url);
   >     xhr.onload = function() {
   >       if (xhr.status === 200) {
   >         resolve(xhr.responseText);
   >       } else {
   >         reject(new Error('Request failed. Status: ' + xhr.status));
   >       }
   >     };
   >     xhr.onerror = function() {
   >       reject(new Error('Request failed'));
   >     };
   >     xhr.send();
   >   });
   > }
   > ajaxGet('https://example.com/api/data')
   >   .then(function(data) {
   >     console.log('Data:', data);
   >   })
   >   .catch(function(error) {
   >     console.log('Error:', error);
   >   });
   > ```
   >
   > 

3. 请利用自己实现的 `ajaxGet(url)` 函数，实现**串行**（一个接一个的）发送10个请求，来获取下面 api 的前10页数据

   > 

4. 请利用自己实现的 `ajaxGet(url)` 函数，实现**并行**（同时）发送10个请求，来获取下面 api 的前10页数据

GET http://learning-api.mafengshe.com/news （后端已经添加跨域返回头），该地址支持如下几个参数

|    参数    | 含义                                     |
| :--------: | :--------------------------------------- |
| `pageSize` | 默认值 30（最大200），每一页的新闻条目数 |
|   `page`   | 默认 1，请求的页码                       |

> 