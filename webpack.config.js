const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    mode: 'development',   
    entry: {
        // - Bundle will also be the name of the output and you just have to name the filename on the output property: '[name].js'
        bundle: path.resolve(__dirname, './src/index.js')   // - Path for the entry point 
    },
    output: {   // - This will function to produce an output based on the change you made in the file from the entry point
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js',   // - Since the entry point is object and you name the property (.bundle), [name] will make an output named based on the certain property of the entry point (bundle.js)
        clean: true, // - to avoid generating multiple files with same codes or content and keep it clean
        assetModuleFilename: '[name][ext]'  // - [ext] means to keep the original name
    },
    devtool: 'source-map',  // - This is to help you debug the web by instead of showing you the minified or one line code, it will show you the error more specifically
    devServer: {    // - By runnning 'npm run webpack serve' it is going to ask you to install 'webpack dev server'
        static: {   // - This is going to ask you where to only serve
            directory: path.resolve(__dirname, 'dist')  // - Provide the directory to which to serve
        },
        port: 3000, // - The default port is 8080 but you can change to what you prefer but we'll be using 3000 for frontend dev
        open: true, // - This will open the server to browser automatically
        hot: true,  // - When hot reload is enable, the server won't reload entirely for some files that are changes such as css, sass, etc.
        compress: true, // - This is to compress the files in the server
        historyApiFallback: true    // - The index.html page will likely have to be served in place of any 404 responses

        // NOTE - if the dist folder doesn't exist and you run dev server, it will fallback to run on the memory instead
    },
    module: {
        rules: [
            {   // SASS
                test: /\.scss$/,    // - This tells us ton look the any files that end with .scss
                use: [
                    'style-loader', // - Third loader (this will inject the css rules from the css-loader to javascript and then apply to browser)
                    'css-loader',   // - Second loader
                    'sass-loader'   // - First loader
                ]
            },
            {   // BABEL
                test: /\.js$/,  // - This looks to any files that end with .js
                exclude: /node_modules/,    // - This is exclude and not to transpile any codes in this folders (node_modules)
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i, // - This looks to any file that ends with .png/svg/jpg/jpeg/gif. and 'i' means case insensitive to look without case sensitive restrictions
                type: 'asset/resource' 
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ // - To create an html files
            title: 'Webpack 5 Crash Course',   // - Title of the document
            filename: 'index.html',  // - Name of the html file to be create
            template: 'src/template.html'
        }),
        new BundleAnalyzerPlugin()  // - To show you what you web application is made of and shows you the size of it
    ]
}