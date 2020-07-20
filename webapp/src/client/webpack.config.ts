import { Configuration } from "webpack";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import { TsConfigPathsPlugin } from "awesome-typescript-loader";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

let mode: Configuration["mode"];

switch (process.env.NODE_ENV) {
    case "development":
    case "production":
        mode = process.env.NODE_ENV;
        break;
    case "none":
    default:
        mode = "production";
        break;
}

console.log(`MODE: ${ mode }`);

const config: Configuration = {
    entry: path.join(__dirname, "main.ts"),
    target: "web",
    mode,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /node_modules/,
                    chunks: "all",
                    reuseExistingChunk: true
                },
            },
        },
    },
    resolve: {
        extensions: [ ".js", ".ts", ".jsx", ".tsx" ],
        plugins: [
            new TsConfigPathsPlugin(),
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin(),
        new CopyWebpackPlugin([ {
            from: path.join(__dirname, "public"),
            to: path.join(__dirname, "dist/public"),
        } ]),
    ],
};

if (mode === "development") {
    config.devtool = "source-map";
}

export default config;
