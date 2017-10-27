const webpack = require('webpack')
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, './public/'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader!sass-loader",
            }),
        }]
    },
    plugins: [
        new ExtractTextPlugin("/css/styles.css"),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        })
    ]
}

module.exports = config;
