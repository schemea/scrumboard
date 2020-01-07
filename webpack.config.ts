import { Configuration } from "webpack";
import { TsConfigPathsPlugin } from "awesome-typescript-loader";

let mode: Configuration["mode"];

switch (process.env.NODE_ENV as Configuration["mode"]) {
    case "production":
    case "development":
        mode = process.env.NODE_ENV as Configuration["mode"];
        break;
    case "none":
    default:
        mode = "production";
        break;
}

export const webpackConfig: Configuration = {
    mode,
    devtool: mode === "development" ? "source-map" : undefined,
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
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: mode === "development",
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        plugins: [ new TsConfigPathsPlugin() ],
        extensions: [
            ".ts",
            ".tsx",
            ".js",
            ".jsx",
        ]
    },
};
