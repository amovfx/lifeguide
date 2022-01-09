const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const fs = require('fs');
const process = require("process");

const css_files = fs.readdirSync('../css')
    .filter((v) => fs.statSync(`../css/${v}`).isFile())
    .reduce((acc, v) => (
        { ...acc, [v.split(".")[0]]: `../css/${v}` }
    ), {});

console.log(`DIGEST FOLDER: ${process.env.DIGEST_FOLDER_NAME}`);

const Cleaner = new CleanWebpackPlugin.CleanWebpackPlugin({
    cleanAfterEveryBuildPatterns: ['*.js'],
    protectWebpackAssets: false
})

module.exports = {
    mode: "production",
    bail: true,
    entry : css_files,
    output: {
        path: path.resolve(__dirname, `../css/${process.env.DIGEST_FOLDER_NAME}`),
    },
    plugins: [ Cleaner, new MiniCssExtractPlugin({filename: '[name].[contenthash].css'})],
    optimization: {
        minimize:true,
        minimizer: ['...',
            new CssMinimizerPlugin({ minify: CssMinimizerPlugin.cleanCssMinify})]
    },
    performance: {
        hints: "warning"
    },
    module: {
        rules: [
            {
                test: /\.css?$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
}