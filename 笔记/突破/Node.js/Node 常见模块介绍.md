## 问答题

1. Node.js 中什么是事件？如何定义事件？如何触发事件？

   > Node.js的大部分核心API都是围绕**异步事件驱动架构**构建的，在该架构中，某些类型的触发器触发命名事件，使监听器被调用。所有触发事件的对象都是EventEmitter类的实例。`EventEmitter`  类提供了一个  `on()`  方法，可以用来注册事件监听器。当事件发生时，会调用监听器的  `emit()`  方法。
   >
   > ```js
   > let EventEmitter = require('events');
   > class MyEmitter extends EventEmitter {}
   > 
   > let myEmitter = new MyEmitter();
   > 
   > myEmitter.on('click', (a,b) => {
   >   console.log('触发了一个事件！',a,b);  
   > });
   > myEmitter.emit('click','1','3'); 
   > ```

2. Node.js 中如何读写文件？请分别给出示例代码

   > 读取文件可以使用  `fs.readFile()`  方法。
   >
   > ```js
   > const fs = require('fs');
   > fs.readFile('./test.txt', (err, data) => {
   >   if (err) {
   >     console.log(err);
   >   } else {
   >     console.log(data.toString());
   >   }
   > });
   > ```
   >
   > 写入文件可以使用  `fs.writeFile()`  方法。
   >
   > ```js
   > const fs = require('fs');
   > fs.writeFile('./test.txt', 'Hello World!', (err) => {
   >   if (err) {
   >     console.log(err);
   >   } else {
   >     console.log('File written successfully');
   >   }
   > });
   > ```

3. 流是什么？如何使用流读取文件？

   > 流（stream）在 Node.js 中是处理流数据的抽象接口（abstract interface）。 `stream` 模块提供了基础的 API 。
   >
   > 流可以是可读的、可写的，或是可读写的。所有的流都是 [`EventEmitter`](https://www.nodeapp.cn/events.html#events_class_eventemitter) 的实例
   >
   > 使用流读取文件，需要使用  `fs`  模块的  `createReadStream`  方法创建一个可读流，然后监听  `data`  事件来读取流中的数据
   >
   > ```js
   > const fs = require('fs');
   > 
   > const readStream = fs.createReadStream('./test.txt');
   > let data=''
   > readStream.on('data', (chunk) => {
   >   data += chunk;
   >   console.log('接收到一块数据:', data);
   > });
   > 
   > readStream.on('end', () => {
   >   console.log('文件读取完成.');
   > });
   > 
   > readStream.on('error', (err) => {
   >   console.error('文件读取失败:', err);
   > });
   > ```

4. Node.js 中如何获取环境变量？

   > `process.env`

## 代码题

1. 请自行查阅资料学习`fs.ReadStream`，并使用它读取任意文件并将其中内容打印

   > `fs.ReadStream`  是 Node.js 中用于读取文件的流对象。它可以从文件中读取数据，并将数据传递给回调函数。   要使用  `fs.ReadStream` ，首先需要创建一个  `fs.ReadStream`  对象。可以使用  `fs.createReadStream()`  方法来创建  `fs.ReadStream`  对象。该方法需要一个文件路径作为参数。   以下是一个简单的例子：
   >
   > ```js
   > const fs = require('fs');
   > 
   > const readStream = fs.createReadStream('./test.txt');
   > let data=''
   > readStream.on('data', function(chunk) {
   >    console.log('文件打开');
   >    data += chunk;
   > });
   > readStream.on('end', () => {
   >   console.log('文件读取完成');
   >   console.log(data);//打印文件内容
   > }); 
   > readerStream.on('close',function(){
   >    console.log('文件关闭');
   > });
   > ```

2. 请使用 http server 配合流处理，完成form表单的文件上传功能（浏览器提交的文件需要保存到服务器端自己定义的目录下）

   >  `npm install multiparty`安装`multiparty`  库， `multiparty`  是一个用于处理  `multipart/form-data`  类型表单数据的库。它可以解析表单数据，并将文件保存到服务器的指定目录中。 
   >
   > ```js
   > const http = require('http');
   > const fs = require('fs');
   > const multiparty = require('multiparty');
   > 
   > const hostname = '127.0.0.1'
   > const port = 8080
   > 
   > const server = http.createServer((req, res) => {
   >   if (req.method === 'POST' && req.url === '/upload') {
   >      if(req.headers['content-type'].indexOf('multipart/form-data')!==-1){//判断请求头中的content-type是否为multipart/form-data类型。如果是，则使用multiparty 的 Form 对象来解析表单数据和文件。
   >          
   >          var form=new multiparty.Form()
   >          
   >          form.encodeing='utf-8'// 设置表单的编码方式为 UTF-8
   >          
   >          form.uploadDir='./upload/'//设置文件上传的目录为  ./upload/ ，即当前目录下的upload文件夹。
   >          
   >          form.maxFileSize=2*1024*1024 //设置上传文件的最大大小为 2MB。
   >          form.parse(req,(err,fields,files)=>{
   >             console.log(files.files);
   >              
   >             for(var i in files.files){//遍历文件对象，获取每个文件的信息。提取文件名和文件路径，并将文件从临时路径移动到指定的上传目录。 
   >                let file=files.files[i]
   >                let filename=file.originalFilename
   >                let newPath=form.uploadDir+filename
   >                
   >                fs.renameSync(file.path,newPath)//使用fs.renameSync()方法将文件保存到指定目录中
   >             }
   >          })
   >       }
   >       res.end('done')
   >    }
   > });
   > 
   > server.listen(port, hostname, () => {
   >   console.log('Server listening on port 8080');
   > });
   > ```
   >
   > `npm install formidable` 下载`formidable`
   >
   > ```js
   > const http = require('http');
   > const fs = require('fs');
   > const formidable = require('formidable');
   > 
   > const hostname = '127.0.0.1'
   > const port = 8080
   > 
   > const server = http.createServer((req, res) => {
   >   //检查请求的方法是否为  POST ，且 URL 是否为  /upload 
   >   if (req.method === 'POST' && req.url === '/upload') {
   >     //formidable.IncomingForm()对象，用于处理表单数据的解析。 
   >     const form = new formidable.IncomingForm();
   >     //使用form.parse()方法解析请求，提取表单字段和文件。
   >     form.parse(req, (err, fields, files) => {
   >       if (err) {
   >         res.status(500).end();
   >         return;
   >       }//如果解析过程中出现错误，则发送 500 状态码的响应并结束响应。
   >         
   > 	  //遍历files对象，获取每个文件的信息，并对每个文件进行上传。
   >       for(var i in files){
   >           let file = files.file[i];
   >           let filename = file.name;
   >           let filepath = `./upload/${filename}`;
   >            //fs.writeFile()方法将文件保存到指定路径
   >           fs.writeFile(filepath, file.data, (err) => {
   >             if (err) {
   >               res.status(500).end();
   >               return;
   >             }
   >             res.status(200).end();
   >           });
   >       }
   >     });
   >   } else {
   >     res.status(404).end();
   >   }
   > });
   > 
   > server.listen(port,hostname, () => {
   >   console.log('Server listening on port 8080');
   > });
   > ```

3. Node.js 中 http 模块既有 server 端，又有 client 端，请实现一个简单的server：对于任何请求返回`hello`。而后使用 client 端请求你自己的server，并打印出结果

   > 以下是实现一个简单的 HTTP 服务器的代码：
   >
   > ```js
   > const http = require('http');
   > 
   > const hostname = '127.0.0.1'
   > const port = 3000
   > 
   > const server = http.createServer((req, res) => {
   >   res.statusCode = 200
   >   res.setHeader('Content-Type': 'text/plain');
   >   res.end('Hello!');
   > });
   > 
   > server.listen(3000, hostname,() => {
   >       console.log(`Server running at http://${hostname}:${port}/`)
   > });
   > 
   > http.get('http://127.0.0.1:3000', (res) => {
   >   console.log(res.statusCode);
   >   console.log(res.headers);
   >   console.log(res.body);
   > });
   > ```

## 算法题

1. [[29\]Divide Two Integers](https://leetcode.com/problems/divide-two-integers)

   **两个整数相除**

   请实现两个整数相除，但是不能使用加法，除法和求余操作

   如果溢出，请返回 MAX_INT

   hint: MAX_INT = 2147483647

2. [[30\]Substring with Concatenation of All Words](https://leetcode.com/problems/substring-with-concatenation-of-all-words)

   **子字符串是系列单词**

   给出一个字符串`s`，还有一些列的相同长度的单词`words`。请找出所有的`s`满足条件的子字符串的起始位置。条件是：子字符串是所有的`words`里的单词的组合，中间不允许存在其他字符。

   如给出

   `s`:`"barfoothefoobarman"`

   `words`:`["foo", "bar"]`

   你需要返回索引 `[0,9]`

   