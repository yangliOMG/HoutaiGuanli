const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//会将所有的入口 chunk(entry chunks)中引用的 *.css，移动到独立分离的 CSS 文件。因此，你的样式将不再内嵌到 JS bundle 中

let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

module.exports = {
    entry: './src/app.jsx',    //入口
    output: {                 //出口
        path: path.resolve(__dirname, 'dist'),
        publicPath: WEBPACK_ENV === 'dev' 
            ? '/dist/' : '//jinpingou.natappvip.cc/dist/',   //webpack-dev-server
        filename: 'js/app.js'
    },
    resolve:{ //import路径配置
        alias:{
            page: path.resolve(__dirname, 'src/page'),
            component: path.resolve(__dirname, 'src/component'),
            util: path.resolve(__dirname, 'src/util'),
            service: path.resolve(__dirname, 'src/service')
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env','react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader','sass-loader']
                })
            },
            {
                test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2|otf)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192,
                      name: 'resource/[name].[ext]'
                    }
                  }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({             //处理html文件
            template:'./src/index.html',
            favicon:'./favicon.ico'
        }),
        new ExtractTextPlugin("css/[name].css"),  //独立css文件
        new webpack.optimize.CommonsChunkPlugin({    //提出公共模块
            name:'common',
            filename:'js/base.js'
        })
    ],
    devServer: {        //webpack-dev-server为你提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)
        port:8086,
        historyApiFallback:{
            index:'/dist/index.html'
        },
        proxy:{
            '/manage':{
                target:'http://admintest.happymmall.com',
                changeOrigin:true
            },
            '/user/logout.do':{
                target:'http://admintest.happymmall.com',
                changeOrigin:true
            }
        }
    }
};