//默认配置文件
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // 用于访问内置插件
const TerserPlugin = require('terser-webpack-plugin');//将js代码进行压缩的插件


module.exports = {
    //entry: './src/main.js',//入口，也可以写成对象声明多个入口(多个页面应用程序)
    entry:{
        main:'./src/main.js',
        vendors:'./src/vendors.js'
    },

    output:{
        path:path.resolve(__dirname,"build"),
        // filename:"bundle.js",//一个入口写法
        filename:'[name].[hash:6].js',
        // publicPath:'http://www.baidu.com/',//假设要在其他服务器打开，需要一个域名
    },//出口

    module:{
        rules:[
            { test:/\.css$/, use:[ 
                { loader:"style-loader"}, 'css-loader'
                // { loader:"style-loader"}, {loader:'css-loader'}//另一种等价写法，这种写法是从后往前处理，先处理css-loader再是style-loader
            ]},//css-loader链式写法处理css文件
            { test:/\.txt$/, use:'raw-loader'},
            // { test:/\.png$/, use:'file-loader'}//图片文件loader方法
        ]
    },//loader资源加载器

    plugins: [
        // new webpack.ProgressPlugin(),//将js代码进行压缩.在Webpack4及更高版本中UglifyJsPlugin已不再是webpack内置插件，而是需要单独安装和引入。使用terser-webpack-plugin替代方案。
        new HtmlWebpackPlugin({ template: './src/index.html' }),//实现自动将打包后的出口文件注入html文件夹中
        
    ],//插件

    // optimization: {
    //     minimize: true,//Webpack会使用指定的压缩插件对输出的代码进行压缩。在上述代码中使用了TerserPlugin作为压缩插件。 
    //     minimizer: [new TerserPlugin()],//用于指定要使用的压缩插件。将TerserPlugin实例添加到了minimizer数组中。
    // },//optimization 对象用于配置优化相关的选项

    devtool: 'source-map',// devtool 选项用于指定生成源映射的方式和详细程度。将devtool设置为source-map这样Webpack会生成一个单独的源映射文件（例如bundle.js.map）源映射文件可以用于将压缩后的代码映射回原始的源代码，有助于在调试时定位问题。

    mode: 'development',
}//export导出