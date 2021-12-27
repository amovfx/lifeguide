const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    mode: "production",
    bail: true,
    entry : {
        main: "./main.js",
        cookie_alert: "./cookie_alert.js"
    },
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "../dist/"),
        library: "[name]"
    },
    plugins: [new CleanWebpackPlugin.CleanWebpackPlugin()],
    optimization: {
        minimize: false
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            }

        ]

    },

}