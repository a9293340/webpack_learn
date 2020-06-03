// 1.建立webpack.config.js
// 2.建src資料夾
// 3.操作檔案丟入src
// 4.在webpack.config.js建立 基本配置
// 5.loader使用
// 5.1 把css 寫成style 放在 <head> </head>裡
// 5.1.1 npm install --save-dev css-loader style-loader
// 5.1.2 在webpack.config.js加入loader碼(在module內)
// ****************************************
// webpack -w 有修改就自動打包

//引入path的功能 
const path = require('path'); 

//基本配置
module.exports = {
    mode: 'development', //'production'|'development'|'none' 開發模式
    entry: './src/index.js', //輸入端
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: '[name]-[hash].js' //[name](預設main) [hash](給快取用的hash值)
        filename: '[name]-bundle.js'
    },
    module: {
        // 把css 寫成style 放在 <head> </head>裡
        rules: [{
            test: /\.css$/,
            use: [{
                    loader: 'style-loader' //(順序2)
                },
                {
                    loader: 'css-loader', //(順序1)
                    options: {
                        modules: true
                    }
                }]
        }]
    },
    plugins: []
    };