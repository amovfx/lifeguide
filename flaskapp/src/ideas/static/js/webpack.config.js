const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const Cleaner = new CleanWebpackPlugin.CleanWebpackPlugin()
const process = require("process");

module.exports = {
    mode: "production",
    bail: true,
    entry : {
        main: "./main.js",
        cookie_alert: "./cookie_alert.js"
    },
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, `../js/${process.env.DIGEST_FOLDER_NAME}`),
        library: "[name]"
    },
    plugins: [Cleaner],
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