const { merge } = require('webpack-merge');
const path = require('path');
const commonConfig = require("./webpack.config.js");

module.exports = merge(commonConfig, {
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: process.env.DEV_PORT || 9000,
    }
})