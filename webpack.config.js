const path = require('path');
const MODE = 'development';
const enabledSourceMap = (MODE === 'development');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    mode: MODE,
    entry: {
        '/js/script.bundle.js' : './src/app.js'
    },
    output: {
        path: `${__dirname}/public`,
        filename: '[name]'
    },
    watch: true,
    watchOptions: {
        poll: true
    },
    devServer: {
        contentBase: path.join(__dirname, './public'),
        publicPath: '/',
        port: 9999,
        watchContentBase: true,
        open: true,
        inline: true,
        hot: true
    },
    plugins: [
        //html
        new HtmlWebpackPlugin({
            inject: false,
            filename: 'index.html',
            template: './src/pug/index.pug',
        }),
        new HtmlWebpackPlugin({
            inject: false,
            filename: 'collection.html',
            template: './src/pug/collection.pug'          
        }),
        new HtmlWebpackPlugin({
            inject: false,
            filename: 'works.html',
            template: './src/pug/works.pug'          
        }),
        new HtmlWebpackPlugin({
            inject: false,
            filename: 'about.html',
            template: './src/pug/about.pug'          
        }),
        new HtmlWebpackPlugin({
            inject: false,
            filename: 'shop.html',
            template: './src/pug/shop.pug'          
        }),
        new HtmlWebpackPlugin({
            inject: false,
            filename: 'contact.html',
            template: './src/pug/contact.pug'          
        }),
        //css
        new MiniCssExtractPlugin({
            filename: 'css/style.min.css',
            template: './src/scss/app.scss'
        })
    ],
    resolve: {
        extensions: ['*', '.pug', '.scss', '.js', '.json']
    },
    optimization: {
        minimizer: [new UglifyJsPlugin({uglifyOptions: {compress: {drop_console: true}}})]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['env', { 'modules': false }]
                    ]
                }
            },
            {
                test: /\.pug$/,
                use: ['html-loader?minimize=false', 'pug-html-loader?pretty=true']
            },
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            minimize: true,
                            sourceMap: enabledSourceMap,
                            importLoaders: 2
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: enabledSourceMap,
                            plugins: [
                                require('autoprefixer')({ grid: true })
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: enabledSourceMap,
                        }
                    }
                ]
            }
        ]
    },
  };
  