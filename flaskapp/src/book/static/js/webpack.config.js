const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    mode: "production",
    entry : "./main.js",
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "../dist/"),
        library: "booklib"
    },
    plugins: [new CleanWebpackPlugin.CleanWebpackPlugin()],
    optimization: {
        minimize: false
    },
}