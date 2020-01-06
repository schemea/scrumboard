import { webpackConfig } from "../webpack.config";
import lodash from "lodash";
import { Configuration } from "webpack";
import * as path from "path";


const config = lodash.merge(webpackConfig, {
    entry: { server: path.join(__dirname, "index.ts") },
    target: "node",
    externals: [
        /node_modules/
    ]
} as Configuration);

export default config;
