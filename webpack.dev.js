//Import webpack & plugin packages
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Module export Webpack config for Development environment
module.exports = (customConfig) => {
    return {
        // Sets the build mode type
        // https://webpack.js.org/configuration/mode/
        mode: 'development',

        // Source maps generation method
        // https://webpack.js.org/configuration/devtool/
        devtool: 'eval-cheap-module-source-map',

        // Entry file paths. This option values must be set in webpack.config.js
        // https://webpack.js.org/concepts/entry-points/#multi-page-application
        entry: customConfig.entry,

        // Configures the dev build server
        // https://webpack.js.org/configuration/dev-server/
        devServer: {
            port: 9000,
            compress: true,
            writeToDisk: false // https://webpack.js.org/configuration/dev-server/#devserverwritetodisk-
        },

        // Set Output file paths and file names. Output path must be set in webpack.config.js
        // https://webpack.js.org/configuration/output/
        output: {
            path: customConfig.buildDir,
            filename: '[name].bundle.js'
        },

        // Sets module resolve for JavaScript and TypeScript
        // https://webpack.js.org/configuration/resolve/
        resolve: {
            extensions: ['.js', '.ts']
        },

        // Configures loaders
        // https://webpack.js.org/concepts/loaders/
        module: {
            rules: [
                // Configures babel loader for transpiling Javascript/Typescript using Babel and Webpack
                // https://webpack.js.org/loaders/babel-loader/
                {
                    test: [/.js$|.ts$/],
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/typescript'
                            ]
                        }
                    }
                },
                // Configures style loader to inject css & transcompiled sass into DOM
                // https://webpack.js.org/loaders/style-loader/
                // 
                // Configures css loader to interpret & resolve import, url, require for css files
                // https://webpack.js.org/loaders/css-loader/
                // 
                // Configures sass loader to interpret & resolve import, url, require for sass/scss files
                // https://webpack.js.org/loaders/sass-loader/
                {
                    test: [/.css$|.s[ac]ss$/],
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                },
                // Configures url loader to transform files into base64 URIs
                // https://webpack.js.org/loaders/url-loader/
                {
                    test: /\.(png|jpe?g|gif|svg)$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            // On development we want to see where the file is coming from, hence we preserve the [path]
                            name: '[path][name].[ext]?hash=[hash:20]',
                            esModule: false,
                            // Loads all images as base64 encoding if they are smaller than 8192 bytes
                            limit: 8192
                        }
                    }]
                }
            ]
        },
        plugins: [
            // Display build progress
            // https://webpack.js.org/plugins/progress-plugin/
            new webpack.ProgressPlugin(),
            // Delete output folder if exists before build
            // https://www.npmjs.com/package/clean-webpack-plugin
            new CleanWebpackPlugin(),
            // Inject generated js/css files into HTML. Template must be set in webpack.config.js
            // https://webpack.js.org/plugins/html-webpack-plugin/
            new HtmlWebpackPlugin({
                template: customConfig.htmlWebpackTemplate,
                inject: true
            }),
            // Copy asset directory to build directory
            // https://webpack.js.org/plugins/copy-webpack-plugin/
            new CopyWebpackPlugin([{
                from: './src/assets',
                to: 'assets'
            }])
        ]
    };
};