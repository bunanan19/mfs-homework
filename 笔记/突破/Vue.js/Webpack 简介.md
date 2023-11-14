# [webpack中文文档][https://www.webpackjs.com/concepts/]

<img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231114163858203.png" alt="image-20231114163858203" style="zoom:80%;" />

安装vue-cli

`npm install -g vue-cli(全局安装)`

先创建一个vue-cli文件

`vue init webpack vue-webapck-project(初始化一个webpack文件)`文件设置一路回车即可

然后打开文件夹安装运行 `npm install`  ,`npm run dev`即可将文件运行在浏览器打开

安装webpack

`npm install -g webpack`

配置webpack``

创建目录`mkdir webpack-start`

在目录终端下运行`nmp init`加入packjson文件，对生成文件的描述一路回车

创建webpack.config.js文件，设置入口出口loader和插件，打包执行webpack，然后执行出口文件，node file，安装html-webpack-plugin







## 问答题

1. 什么是 Webpack ，它能完成哪些功能？

   > 本质上，**webpack** 是一个用于现代 JavaScript 应用程序的 *静态模块打包工具*。当 webpack 处理应用程序时，它会在内部从一个或多个入口点构建一个 [依赖图(dependency graph)](https://www.webpackjs.com/concepts/dependency-graph/)，然后将你项目中所需的每一个模块组合成一个或多个 *bundles*，它们均为静态资源，用于展示你的内容。
   >
   > 浏览器所打开的网页当代码编辑保存时会自动刷新
   >
   > 把资源打包
   >
   > 不需要写html标签，生成的文件将自动注入
   >
   > node只能将js文件视为模块进行导入导出，但是webpack可以将所有的资源文件视为模块进行导入导出

2. Webpack 有哪 4 个核心概念？这些概念的意义是什么？有何作用？

   > - [入口(entry)](https://www.webpackjs.com/concepts/#entry)
   > - [输出(output)](https://www.webpackjs.com/concepts/#output)
   > - [loader](https://www.webpackjs.com/concepts/#loaders)将模块变成js文件，使其可以被require引用
   > - [插件(plugin)](https://www.webpackjs.com/concepts/#plugins)

3. 请列举 5 个 Webpack 常用 loader，并简述他们的作用

   > 1. `babel-loader` ：用于将ES6+的JavaScript代码转换为浏览器可识别的旧版JavaScript代码。它允许你在项目中使用最新的JavaScript语法和功能，并通过Babel进行转译，以确保在不同的浏览器中都能正常运行。   2.  `css-loader` ：用于解析处理CSS文件，将CSS文件转换为JavaScript模块。它处理CSS中的导入语句、URL引用等，并将其转换为Webpack可以处理的格式。   3.  `style-loader` ：用于将CSS代码注入到HTML页面中的 `<style>` 标签中。它将经过处理的CSS模块通过JavaScript动态地插入到页面中，使样式生效。   4.  `file-loader` ：用于处理文件（例如图片、字体等），并将其复制到输出目录，并返回文件的URL。它可以处理各种类型的文件，并根据配置将它们复制到正确的位置。   5.  `url-loader` ：类似于 `file-loader` ，但更强大。它可以将文件转换为DataURL（Base64编码），并将其嵌入到JavaScript或CSS中，从而减少对外部文件的请求。这对于小文件（如图标）非常有用，可以减少网络请求的数量。  

4. 请列举 5 个 Webpack 常用 plugin，并简述他们的作用

   > 1. `HtmlWebpackPlugin` ：简化了创建HTML文件并为打包后的JavaScript文件提供服务的过程。它自动生成包含所需脚本标签的HTML文件，并可以处理模板文件、代码压缩等功能。   2.  `MiniCssExtractPlugin` ：将CSS代码从JavaScript包中提取到单独的CSS文件中的插件。它可以帮助你将CSS与JavaScript分离，以便更好地进行缓存和加载。   3.  `CleanWebpackPlugin` ：在每次构建之前清理输出文件夹的插件。它可以帮助你删除旧的构建文件，以确保输出文件夹始终保持干净。   4.  `DefinePlugin` ：允许在编译过程中创建全局常量的插件。它可以用于定义环境变量或其他全局配置，这些常量可以在代码中使用。   5.  `CopyWebpackPlugin` ：用于复制文件和文件夹的插件。它可以帮助你在构建过程中将特定的文件或文件夹复制到输出目录，例如将静态资源文件复制到最终的构建文件夹中。 

5. 如何实现 script 标签自动注入？

   > webpack插件，会将打包生成的出口文件自动注入index.html文件中
   >
   > 要实现script标签的自动注入，可以使用 `HtmlWebpackPlugin` 插件。该插件可以自动生成HTML文件，并自动将打包后的JavaScript文件注入到生成的HTML文件中。   首先，确保已经安装了 `HtmlWebpackPlugin` 插件。可以使用以下命令进行安装：
   >
   > ```
   > npm install html-webpack-plugin --save-dev
   > ```
   >
   > 然后，在Webpack的配置文件中引入 `HtmlWebpackPlugin` 插件，并将其添加到 `plugins` 数组中。以下是一个示例：
   >
   > ```
   > javascriptconst HtmlWebpackPlugin = require('html-webpack-plugin');
   > 
   > module.exports = {
   >   // 其他配置项...
   >   plugins: [
   >     new HtmlWebpackPlugin({
   >       template: './src/index.html', // 指定HTML模板文件
   >       filename: 'index.html', // 生成的HTML文件名
   >     }),
   >   ],
   > };
   > ```
   >
   > 在上述示例中，我们通过 `template` 选项指定了HTML模板文件的路径，该模板文件将作为生成的HTML文件的基础。通过 `filename` 选项指定生成的HTML文件的名称。   当运行Webpack构建时， `HtmlWebpackPlugin` 将自动根据指定的模板文件生成HTML文件，并将打包后的JavaScript文件自动注入到生成的HTML文件中的 `<body>` 标签底部。   这样，你就实现了script标签的自动注入。每次构建时，Webpack都会生成新的HTML文件，并自动更新其中的脚本标签以反映最新的打包文件。

6. Webpack 中如何 require 资源文件（图片，字体）？为什么可以 require ，其原理是什么？

   > 在Webpack中，你可以使用 `require` 来导入资源文件（如图片、字体等）。这是因为Webpack内置了相应的加载器（loader），它们可以处理不同类型的资源文件，并将它们转换为可以在JavaScript中使用的模块。   当你在代码中使用 `require` 导入资源文件时，Webpack会根据配置中的相应加载器来处理该文件。加载器会根据文件类型执行相应的转换操作，例如将图片转换为DataURL或将字体文件转换为对应的URL路径。   以下是一个示例，展示了如何在Webpack中使用 `require` 导入图片和字体文件：
   >
   > ```
   > javascript// 导入图片文件
   > const image = require('./image.png');
   > // 导入字体文件
   > const font = require('./font.ttf');
   > 
   > // 使用导入的资源文件
   > const imgElement = document.createElement('img');
   > imgElement.src = image;
   > 
   > const fontStyles = `
   >   @font-face {
   >     font-family: 'CustomFont';
   >     src: url('${font}') format('truetype');
   >   }
   > `;
   > ```
   >
   > 在上述示例中，我们使用 `require` 导入了图片文件和字体文件。然后，我们可以在代码中使用导入的资源文件，例如将图片设置为 `<img>` 元素的 `src` 属性，或在CSS中使用导入的字体文件。   Webpack的加载器会根据文件类型执行相应的转换操作，并将最终的资源路径或转换后的数据返回给 `require` 语句。这样，你就可以在代码中使用导入的资源文件了。   需要注意的是，对于某些资源文件类型，你可能需要安装并配置相应的加载器，以便Webpack能够正确地处理它们。例如，对于图片文件，你可以使用 `file-loader` 或 `url-loader` 加载器；对于字体文件，你可以使用 `file-loader` 或 `url-loader` 加载器，或者使用 `file-loader` 和 `@font-face` 来定义字体样式。

7. 如何安装 loader？

   > npm install css-loader --save-dev

8. Webpack 支持链式 loader 吗？如何配置？

   > 链式加载器允许你在Webpack配置中按顺序串联多个加载器，以便对模块应用一系列转换和处理操作。   要配置链式加载器，你可以在Webpack配置的module.rules数组中按顺序添加多个规则对象，每个规则对象包含一个或多个加载器。以下是一个示例：
   >
   > ```
   > javascriptmodule.exports = {
   >   // 其他配置项...
   >   module: {
   >     rules: [
   >       {
   >         test: /\.css$/,
   >         use: [
   >           'style-loader', // 链式加载器1
   >           'css-loader', // 链式加载器2
   >         ],
   >       },
   >       {
   >         test: /\.js$/,
   >         use: [
   >           'babel-loader', // 链式加载器3
   >           'eslint-loader', // 链式加载器4
   >         ],
   >       },
   >     ],
   >   },
   > };
   > ```
   >
   > 在上述示例中，我们定义了两个规则对象，分别用于处理CSS文件和JavaScript文件。每个规则对象都包含一个 `test` 属性，用于指定匹配的文件类型，以及一个 `use` 属性，用于指定要应用的加载器数组。   在CSS规则中，我们使用了 `style-loader` 和 `css-loader` ，这两个加载器将按顺序应用于匹配的CSS文件。 `style-loader` 将CSS代码注入到页面中的 `<style>` 标签中， `css-loader` 用于解析和处理CSS文件。   在JavaScript规则中，我们使用了 `babel-loader` 和 `eslint-loader` ，这两个加载器将按顺序应用于匹配的JavaScript文件。 `babel-loader` 用于将ES6+的JavaScript代码转换为浏览器可识别的旧版JavaScript代码， `eslint-loader` 用于在构建过程中进行代码质量检查。   通过配置链式加载器，你可以按顺序应用多个加载器，并在构建过程中对模块进行一系列的转换和处理操作，以满足项目的需求。

9. Webpack require 如何导入 node_modules 中的模块？如何导入自己写的模块？二者有何不同？

   > 在Webpack中，你可以使用 `require` 语句导入 `node_modules` 中的模块，以及导入自己编写的模块。下面是关于二者的区别和使用方法：   1. 导入 `node_modules` 中的模块：    你可以直接使用 `require` 语句导入 `node_modules` 中的模块，无需指定路径。Webpack会根据模块名来查找并加载相应的模块。例如：
   >
   > ```
   > javascript
   > 
   > 
   > 
   >    const axios = require('axios');
   > ```
   >
   > 在上述示例中，我们导入了 `axios` 模块，它是一个常用的HTTP请求库。Webpack会自动查找并加载 `axios` 模块。   2. 导入自己编写的模块：    对于自己编写的模块，你需要指定模块的相对路径或绝对路径来导入。相对路径是相对于当前模块文件的路径。例如：
   >
   > ```
   > javascript
   > 
   > 
   > 
   >    const myModule = require('./myModule');
   > ```
   >
   > 在上述示例中，我们导入了一个名为 `myModule` 的自定义模块，它位于当前模块文件的相对路径 `./myModule` 下。     注意：在导入自己编写的模块时，确保路径的准确性和正确性，以便Webpack能够正确地找到并加载模块。   总结起来，导入 `node_modules` 中的模块时，只需指定模块名即可；而导入自己编写的模块时，需要指定模块的路径。这是因为Webpack对 `node_modules` 中的模块有默认的查找规则，而对自己编写的模块需要明确指定路径。

10. 什么是 source-map？为什么一般使用打包工具都需要 source-map?

    > source-map（源映射）是一种文件，它存储了原始源代码与压缩、转换后的代码之间的映射关系。它提供了一种将压缩后的代码映射回原始源代码的方式，以便在调试过程中定位问题。   在开发过程中，我们通常会对代码进行压缩、合并、转换等操作，以减小文件大小并提升性能。然而，这样的操作会使代码变得难以阅读和调试。当出现错误或异常时，我们需要能够准确地定位到原始源代码中的问题，而不是在压缩后的代码中寻找。   这就是为什么大多数打包工具都需要使用source-map的原因。通过生成和使用source-map，我们可以在浏览器的开发者工具中准确地查看和调试原始源代码。source-map将压缩后的代码映射回原始源代码，使我们能够在调试过程中准确地定位错误，并进行逐步调试、查看变量值等操作。   使用source-map可以提高开发效率和调试体验，特别是在处理复杂的代码和大型项目时。它允许我们快速定位和解决问题，提高代码质量和可维护性。因此，一般来说，打包工具都需要生成和使用source-map来支持更好的调试功能。

11. 【选做】如何实现 Webpack 打包多页面应用？hint:多入口，多出口，多个注入 plugin

    > 首先，需要在Webpack配置中定义多个入口点。每个入口点对应一个页面。以下是一个示例配置：
    >
    > ```
    > javascriptmodule.exports = {
    >   entry: {
    >     page1: './src/page1.js',
    >     page2: './src/page2.js',
    >     // 添加更多入口点...
    >   },
    >   output: {
    >     path: path.resolve(__dirname, 'dist'),
    >     filename: '[name].bundle.js',
    >   },
    >   // 其他配置项...
    > };
    > ```
    >
    > 在上述示例中，我们定义了两个入口点： `page1` 和 `page2` ，分别对应两个页面的入口文件。通过使用占位符 `[name]` ，我们将生成的文件名与入口点的名称相对应。   接下来，需要配置多个出口点，以指定每个入口点生成的文件。以下是配置示例：
    >
    > ```
    > javascriptmodule.exports = {
    >   entry: {
    >     // 入口点...
    >   },
    >   output: {
    >     path: path.resolve(__dirname, 'dist'),
    >     filename: '[name].bundle.js',
    >   },
    >   plugins: [
    >     new HtmlWebpackPlugin({
    >       template: './src/page1.html',
    >       filename: 'page1.html',
    >       chunks: ['page1'],
    >     }),
    >     new HtmlWebpackPlugin({
    >       template: './src/page2.html',
    >       filename: 'page2.html',
    >       chunks: ['page2'],
    >     }),
    >     // 添加更多HtmlWebpackPlugin实例...
    >   ],
    >   // 其他配置项...
    > };
    > ```
    >
    > 在上述示例中，我们使用 `HtmlWebpackPlugin` 插件来生成每个页面的HTML文件，并将相应的入口点（chunks）注入到生成的HTML文件中。通过配置不同的 `template` 和 `filename` ，我们可以为每个页面生成独立的HTML文件。   通过这种方式，Webpack会根据配置生成多个入口点对应的文件，并将它们注入到相应的HTML文件中。这样，我们就实现了Webpack打包多页面应用的功能。   需要注意的是，以上示例中只展示了两个页面的配置。如果有更多页面，可以按照类似的方式继续添加入口点、出口配置和注入插件的配置。

## 代码题

1. 请手动配置一个`webpack.conf.js`文件，实现如下功能
   1. script 标签自动注入
   2. 可以 require .txt 和 .stylus 文件
   3. 文件修改后自动刷新页面
   4. 导入 axios 包，实现 ajax 请求
   
   我将为你提供一个基本的 `webpack.conf.js` 文件，但是实现自动刷新页面的功能需要额外的配置和插件。你可能需要进一步研究和调整以满足你的具体需求。
   
   ```js
   const path = require('path');
   const HtmlWebpackPlugin = require('html-webpack-plugin');
   const webpack = require('webpack');
   
   module.exports = {
     entry: './src/main.js',
     output: {
       path: path.resolve(__dirname, 'dist'),
       filename: 'bundle.js',
     },
     module: {
       rules: [
         {
           test: /\.txt$/,
           use: 'raw-loader',
         },
         {
           test: /\.stylus$/,
           use: [
             'style-loader',
             'css-loader',
             'stylus-loader',
           ],
         },
       ],
     },
     plugins: [
       new HtmlWebpackPlugin({
         template: './src/index.html',
       }),
       new webpack.HotModuleReplacementPlugin(),
     ],
     devServer: {
       contentBase: path.resolve(__dirname, 'dist'),
       hot: true,
     },
     resolve: {
       extensions: ['.js', '.txt', '.stylus'],
     },
   };
   ```
   
   上述配置文件实现了以下功能：   1. 使用 `HtmlWebpackPlugin` 插件自动生成HTML文件，并自动将打包后的脚本注入到HTML文件中。  2. 使用 `raw-loader` 加载器处理 `.txt` 文件，并将其转换为字符串。  3. 使用 `style-loader` 、 `css-loader` 和 `stylus-loader` 处理 `.stylus` 文件，将其转换为CSS并注入到页面中。  4. 使用 `webpack-dev-server` 提供开发服务器，并启用热模块替换（HMR）功能。  5. 使用 `webpack.HotModuleReplacementPlugin` 插件启用热模块替换。  6. 使用 `resolve.extensions` 配置指定可忽略文件扩展名的解析顺序。   请注意，上述配置文件中并未包含自动刷新页面的功能。要实现自动刷新页面，你可能需要进一步配置 `webpack-dev-server` 或使用其他插件，例如 `webpack-livereload-plugin` 或 `webpack-hot-middleware` 。同样，要使用 `axios` 进行AJAX请求，你需要在项目中安装并导入 `axios` 包，并在代码中使用它来发起请求。
   
   要实现文件修改后自动刷新页面，可以使用 `webpack-dev-server` 提供的热模块替换（Hot Module Replacement，HMR）功能。这个功能会在文件发生改变时，自动更新页面并保持应用状态。   首先，确保已经安装了 `webpack-dev-server` 。可以使用以下命令进行安装：
   
   ```
   npm install webpack-dev-server --save-dev
   ```
   
   然后，在Webpack的配置文件中添加 `devServer` 配置项，启用热模块替换功能。以下是一个示例：
   
   ```
   javascriptmodule.exports = {
     // 其他配置项...
     devServer: {
       contentBase: path.resolve(__dirname, 'dist'),
       hot: true,
     },
   };
   ```
   
   在上述示例中，我们将 `contentBase` 设置为输出目录的绝对路径，指定了 `devServer` 的 `hot` 选项为 `true` ，启用了热模块替换功能。   接下来，在你的入口文件（通常是 `main.js` ）中，添加热模块替换的逻辑。例如：
   
   ```
   javascriptif (module.hot) {
     module.hot.accept();
   }
   ```
   
   这样，当你在开发过程中修改文件时， `webpack-dev-server` 会检测到文件的变化并自动刷新页面。同时，它会尽量保持应用的状态，以避免重新加载整个页面。   最后，运行 `webpack-dev-server` 命令启动开发服务器：
   
   ```
   npx webpack-dev-server
   ```
   
   现在，当你修改文件并保存时， `webpack-dev-server` 会自动刷新页面，以显示最新的更改。
   
   要导入并使用Axios库进行AJAX请求，你可以按照以下步骤进行操作：   1. 使用npm或yarn安装Axios作为依赖项：
   
   ```
   shell
   npm install axios
   ```
   
   2. 在你的JavaScript文件中导入Axios模块：
   
   ```
   javascript
   
   
   
   const axios = require('axios');
   ```
   
   3. 使用Axios进行AJAX请求。你可以使用Axios提供的方法，例如 `get` 、 `post` 、 `put` 等来发送HTTP请求，并处理响应数据。以下是一个简单的示例：
   
   ```
   javascriptaxios.get('https://api.example.com/data')
     .then(response => {
       console.log(response.data);
     })
     .catch(error => {
       console.error(error);
     });
   ```
   
   在上述示例中，我们使用Axios的 `get` 方法发送一个GET请求到指定的URL，并在请求成功后打印出响应数据。如果请求失败，将会打印出错误信息。   Axios提供了丰富的配置选项和拦截器，可以满足各种AJAX请求的需求。你可以参考Axios的官方文档来了解更多关于使用Axios进行AJAX请求的详细信息。

## 算法题

1. [[12\]Integer to Roman](https://leetcode.com/problems/integer-to-roman)

   **整数转罗马数字**

   给你一个整数，请将它转化为罗马数字

   输入在1-3999之间

   > **hint:** 罗马数字表示规则可以参看[这里](http://baike.baidu.com/link?url=WTPwS9kT9lkd_vaoSbpxNKNjR2pDypI4Py828pXOHISpD302RBf1OZ7Pb_wnerLyibmamAtaifq1CjkGrfgHgZaDgNYOGUSYWn-FwtSl5qdjcn1PDkORsmywNozypYTH)

2. [[13\]Roman to Integer](https://leetcode.com/problems/roman-to-integer)

   **罗马数字转整数**

   给你一个罗马数字，请将它转化为整数

   输入在1-3999之间

   > **hint:** 罗马数字表示规则可以参看[这里](http://baike.baidu.com/link?url=WTPwS9kT9lkd_vaoSbpxNKNjR2pDypI4Py828pXOHISpD302RBf1OZ7Pb_wnerLyibmamAtaifq1CjkGrfgHgZaDgNYOGUSYWn-FwtSl5qdjcn1PDkORsmywNozypYTH)