const CleanWebpackPlugin = require("clean-webpack-plugin");

const fs = require('fs');

const html_files = fs.readdirSync('../../../templates')
    .reduce((acc, v) => (
        { ...acc, [v.split(".")[0]]: `../html/${v}` }
    ), {});

console.log(html_files)