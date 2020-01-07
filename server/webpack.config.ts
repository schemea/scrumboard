import { webpackConfig } from "../webpack.config";
import lodash from "lodash";
import { Configuration } from "webpack";
import * as path from "path";
import nodeExternals from "webpack-node-externals";


const config = lodash.merge({}, webpackConfig, {
    entry: { server: path.join(__dirname, "index.ts") },
    target: "node",
    externals: [
        nodeExternals(),
    ]
} as Configuration);

export default config;
