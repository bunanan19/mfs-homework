## 问答题

1. 什么是 JSON 解析器？

   > JSON解析器用于将json格式的字符串转化为json对象

2. 实现 JSON 解析器的思路是什么？

   > 使用递归，根据不同的进入标志字符使用不同的解析器（如字符串解析器、数字解析器等）进行解析，直到遇到结束标志字符进行后续的解析

## 代码题

1. 请实现 JSON 解析器，可以处理如下情况
   - JSON 中存在空格，换行符等空白字符
   - 额外支持 value 为正则表达式，如`{"exp":/^hello/}`

   要实现一个能够处理 JSON 字符串的解析器，我们可以使用 JavaScript 的内置 `JSON.parse` 方法。但是，这个方法不支持处理 JSON 字符串中的正则表达式。为了解决这个问题，我们需要自定义一个解析函数。

   首先，让我们实现一个基本的 JSON 解析器：

   ```javascript
   function parseJSON(jsonString) {  
       try {  
           let obj = JSON.parse(jsonString);  
           return obj;  
       } catch (error) {  
           console.error("Error parsing JSON:", error);  
           return null;  
       }  
   }
   ```

   然后，我们需要在处理字符串时，对正则表达式进行特殊处理。我们可以使用 JavaScript 的 `RegExp` 对象来实现这一点。

   ```javascript
   function parseJSONWithRegex(jsonString) {  
       try {  
           let obj = JSON.parse(jsonString);  
           for (let key in obj) {  
               if (obj.hasOwnProperty(key)) {  
                   if (typeof obj[key] === "string") {  
                       try {  
                           obj[key] = new RegExp(obj[key]);  
                       } catch (regexError) {  
                           console.error(`Error creating regex from "${obj[key]}":`, regexError);  
                       }  
                   }  
               }  
           }  
           return obj;  
       } catch (error) {  
           console.error("Error parsing JSON:", error);  
           return null;  
       }  
   }
   ```

   这个 `parseJSONWithRegex` 函数会尝试将字符串形式的正则表达式转换为 `RegExp` 对象。如果字符串无法转换为正则表达式，它会打印一个错误消息。注意，这个函数只处理字符串形式的正则表达式。对于其他数据类型的正则表达式，您可能需要进一步修改此函数以适应您的需求。

1. 请实现自己的 JS 对象转 JSON 函数，其行为与系统提供的 JSON.stringify() 一致

   创建一个与 `JSON.stringify()` 方法表现一致的函数是一个挑战，因为 `JSON.stringify()` 函数在处理对象时包含了许多复杂的逻辑，包括处理循环引用、转换 JavaScript 日期对象、处理 undefined 值等等。然而，下面的函数可以处理基本的对象和数组，并且可以处理嵌套的情况：

   ```js
   function myJSONStringify(obj) {  
       if (obj === null) {  
           return 'null';  
       }  
       if (typeof obj === 'undefined') {  
           return 'undefined';  
       }  
       if (typeof obj !== 'object') {  
           if (typeof obj === 'number') {  
               return obj.toString();  
           }  
           if (typeof obj === 'string') {  
               return '"' + obj + '"';  
           }  
           if (typeof obj === 'boolean') {  
               return obj.toString();  
           }  
           return obj;  
       }  
       let result = [];  
       for (let key in obj) {  
           if (obj.hasOwnProperty(key)) {  
               result.push(typeof obj[key] === 'object' ? myJSONStringify(obj[key]) : '"' + obj[key] + '"');  
           }  
       }  
       return '{' + result.join(',') + '}';  
   }
   ```

   这个函数首先检查传入的对象。如果传入的值是 `null`，它返回字符串 `'null'`。如果传入的值是 `undefined`，它返回字符串 `'undefined'`。如果传入的值不是对象，那么它会根据值的类型返回相应的字符串。例如，如果值是一个数字，它会返回该数字的字符串表示。如果值是一个字符串，它会在字符串周围加上引号。如果值是一个布尔值，它会返回该布尔值的字符串表示。

   如果传入的值是一个对象，那么这个函数会遍历对象的每个属性，并对每个属性值进行同样的处理。如果属性值是一个对象，那么它会对这个子对象进行递归处理。最后，这个函数会将这些处理过的属性值组合成一个以逗号分隔的字符串，并在最前面和最后面加上大括号，形成一个 JSON 格式的字符串。