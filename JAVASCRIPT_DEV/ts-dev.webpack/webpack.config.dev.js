const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'index': './src/index.tsx',                         // 0. 导入tsx文件
        'propages': './src/pages/propages/propages.tsx',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname,'./dist'),
        publicPath: '',
    },
    mode: 'development',
    devServer: {
      contentBase: path.resolve( __dirname, '/dist' ),  // 设定根目录
      index: 'index.html', // 主页
      port: 8080, // 访问页面端口
      watchContentBase: true, // 监听目录下的文件是否变化以此刷新页面( 有时并不起作用 )
    },
    resolve: {                                              // 1. 使webpack识别ts/tsx/js/jsx文件
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader','css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader','css-loader','sass-loader'
                ]
            },
            {                                                // 2. Babel配置
                test: /\.(js|tsx|ts)$/,                      //     a) 注意: Babel7+版本已经支持ts编译，我们只需要安装对应的插件即可
                exclude: /node_modules/,                     //     b) 安装额外插件: 
                use: {                                       //         0. 必备: yarn add @babel/preset-react @babel/preset-typescript --dev
                    loader: 'babel-loader',                  //         1. 为兼容性: yarn add @babel/plugin-proposal-class-properties @babel/plugin-proposal-object-rest-spread --dev
                    options: {
                        presets: ['@babel/preset-env','@babel/preset-react',"@babel/preset-typescript"],
                        plugins: [
                            'transform-class-properties',               // 也是用于编译class的( 保险起见留着 )
                            "@babel/plugin-proposal-class-properties",  // 用于编译class
                            "@babel/plugin-proposal-object-rest-spread" // 可以编译“...”扩展符: 如: [...Array]
                        ]
                    }
                }
            },
            {
                test: /\.(ttf|woff|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'static/fonts'
                    }
                }
            }

        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                path.join( process.cwd(),'dist/**/*' ),
            ]
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname,'public/'),
                to: 'static',
            }
        ]),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            filename: 'propages.html',
            template: './src/pages/propages/propages.html',
            chunks: ['propages'],
        })
        
    ]
}