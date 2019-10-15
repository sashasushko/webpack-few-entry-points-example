const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {
    entry: {
        // entry может быть не просто строкой, а объектом.
        // Где каждый ключ - имя точки входа. Таким образом
        // можно сделать по одной точке входа на кажую страницу
        index: './src/index.js',
        about: './src/about.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        // строка в filename поддерживает шаблоны, задаются в квадратных скобках,
        // вместо которых подставляется какое-то значение.
        // Подробнее можно на сайте Вебпака почитать - https://webpack.js.org/configuration/output/
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use:  [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins: [
        new WebpackMd5Hash(),
        new MiniCssExtractPlugin({
            // здесь тоже поддерживаются шаблоны в строке
            filename: '[name].bundle.css'
        }),
        // а здесь шаблоны не поддерживаются, поэтому придется создавать несколько экземпляров,
        // но проявите смекалку, как можно это оптимизировать.
        // Подсказка: это массив с плагинами ;-)
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            chunks: ['index'],
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/about.html',
            chunks: ['about'],
            filename: 'about.html'
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        open: true,
    }
};
