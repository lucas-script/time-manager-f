const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = {
    entry: './src/index.jsx',
    output: {
        path: __dirname + '/public',
        filename: './app.js'
    },
    devServer: {
        port: 3001,
        contentBase: './public'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new ExtractTextPlugin('app.css')
    ],
    module: {
        loaders: [
            {
                test: /.js[x]?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-object-rest-spread']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
            },
            {
                test: /\.woff|.woff2|.ttf|.eot|.svg*.*$/,
                loader: 'file-loader'
            }
        ]
    }
}

module.exports = config