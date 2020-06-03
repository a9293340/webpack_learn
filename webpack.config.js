// 1.建立webpack.config.js
// 2.建src資料夾
// 3.操作檔案丟入src
// 4.在webpack.config.js建立 基本配置

// 5.loader使用

// 5.1 把css 寫成style 放在 <head> </head>裡
// 5.1.1 npm install --save-dev css-loader style-loader
// 5.1.2 在webpack.config.js加入loader碼(在module內)

// 5.2 把 css  獨立出來
// 5.2.1 npm install --save-dev mini-css-extract-plugin
// 5.2.2 引入const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 5.3 SCSS
// 5.3.1 npm install sass-loader node-sass --save-dev
// ****************************************
// webpack -w 有修改就自動打包

// 6 Plugin 使用
// 6.1 HTML 文件建立
// 6.1.1 npm install --save-dev html-webpack-plugin
// 6.1.2 引入 const HtmlWebpackPlugin = require('html-webpack-plugin');
// 6.1.3 <%= htmlWebpackPlugin.options.變數 %> 傳遞變數

// 6.2 clean-webpack-plugin 清理舊的檔案
// 6.2.1 npm install --save-dev clean-webpack-plugin
// 6.2.2 引入 const webpack = require('webpack');
// 6.2.3 引入 const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 6.2.4 plugin 加入 new CleanWebpackPlugin()

// 7.同步瀏覽器 Webpack Dev Server
// 指令 webpack-dev-server --open (可以再package.json設定)
// npm i --save-dev webpack-cli 
// npm install -g webpack-dev-server
// npm install --save-dev webpack-dev-server



//引入path的功能 
const webpack = require('webpack');
const path = require('path'); 
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//基本配置
module.exports = {
    mode: 'development', //'production'|'development'|'none' 開發模式
    entry: './src/index.js', //輸入端
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: '[name]-[hash].js' //[name](預設main) [hash](給快取用的hash值)
        filename: '[name]-bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3300
    },
    module: {
        rules: [{
            test:  /\.(sass|scss|css)$/, //修改成scss 可以讀的檔案
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // you can specify a publicPath here
                        // by default it use publicPath in webpackOptions.output
                        publicPath: './dist'
                    }
                },
                {
                    loader: 'css-loader', //(順序2)
                    options: {
                        modules: true
                    }
                },
                {
                    loader: 'sass-loader' //(順序1)
                }
            ]
        }]
    },
    plugins: [
        //這個套件是載入 css 檔案
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "./css/[name].css"
        }),
        new HtmlWebpackPlugin({
            title: '首頁',
            cool: '我好酷',
            //來源檔
            template: './src/index.html',
            //產生的檔案
            filename: 'index.html',
            
            //是否要壓縮 要看 mode 模式
            // minify: false,
            
            //調整配置 true || 'head' || 'body' || false
            // inject: 'head',
        }),
        // new CleanWebpackPlugin()
    ]
    };