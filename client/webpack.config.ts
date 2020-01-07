import lodash from "lodash";
import { webpackConfig } from "../webpack.config";
import { Configuration } from "webpack";
import * as path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { ROOT } from "../shared/config";


const config = lodash.merge({}, webpackConfig, {
    entry: path.join(__dirname, "index.ts"),
    output: {
        path: path.join(ROOT, "dist/www"),
    },
    target: "web",
    plugins: [
        new HtmlWebpackPlugin({ title: "A Simple Scrumboard" }),
    ],
} as Configuration);

export default config;
