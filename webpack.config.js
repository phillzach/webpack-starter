const path = require('path');

const APP_DIR = path.resolve(__dirname, './src');
const BUILD_DIR = path.resolve(__dirname, './build');

const customConfig = {
    appDir: APP_DIR,
    buildDir: BUILD_DIR,
    entry: {
        vendor: './src/vendor.ts',
        main: './src/index.ts'
    },
    htmlWebpackTemplate: './src/index.html'
};

module.exports = (env, args) => {

    if (args.mode === 'production' || args.env === 'prod' || env === 'prod') {
        return require('./webpack.prod')(customConfig);
    }

    return require('./webpack.dev')(customConfig);
};