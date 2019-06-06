const path = require('path');
const MODE = 'development';
const enabledSourceMap = (MODE === 'development');
const globule = require('globule');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const Dir = {
    public: path.join(__dirname, 'public'),
    src: path.join(__dirname, 'src')
}
const Ext = {
    html: 'html',
    pug: 'pug'
} 
const Root = '';

const htmlPluginConfig = globule.find([`**/*.${Ext.pug}`, `!**/_*.${Ext.pug}`], {cwd: Dir.src}).map(filename => {
    filename.replace(new RegExp(`.${Ext.pug}$`, 'i'), `.${Ext.html}`).split('/')
    return new HtmlWebpackPlugin({
        inject: false,
        minify: true,
        filename: Root+filename.replace(new RegExp(`.${Ext.pug}$`, 'i'), `.${Ext.html}`).replace(/(\.\/)?pug/, '.'),
        template: Dir.src+`/${filename}`
    })
})
const cssPluginConfig = () => {
    return new MiniCssExtractPlugin({
        inject: false,
        minify: true,
        filename: Root+'css/style.min.css',
        template: Dir.src+'/scss/app.scss'
    })
}

module.exports = {
    mode: MODE,
    devServer: {
        contentBase: Dir.public,
        port: 9999,
        open: true,                      
        inline: false
    },
    entry: Dir.src+'/app.js',
    output: {
        path: Dir.public,
        filename: Root+'js/script.bundle.js'
    },
    plugins: [
        ...htmlPluginConfig,
        cssPluginConfig()
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
  