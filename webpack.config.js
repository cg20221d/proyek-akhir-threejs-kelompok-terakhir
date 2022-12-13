const path = require("path"),
    HtmlWebpackPlugin = require("html-webpack-plugin");


const pages = ["main", "mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune"];
module.exports = {
    entry: pages.reduce((config, page) => {
        config[page] = `./src/${page}.js`;
        return config;
    }, {}),
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    plugins: [].concat(
        pages.map(
            (page) =>
                new HtmlWebpackPlugin({
                    inject: true,
                    template: `./${page}.html`,
                    filename: `${page}.html`,
                    chunks: [page],
                })
        )
    ),
    // devtool: 'eval-source-map',
    // devServer: {
    //     contentBase: './dist'
    // },
    module: {
        rules: [
            {
                test: /\.(gif|png|jpe?g|jpg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/texture/'
                        }
                    }
                ]
            },
        ]
    },

}