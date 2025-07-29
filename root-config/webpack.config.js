// const { merge } = require("webpack-merge");
// const singleSpaDefaults = require("webpack-config-single-spa-ts");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = (webpackConfigEnv, argv) => {
//   const orgName = "wk";
//   const defaultConfig = singleSpaDefaults({
//     orgName,
//     projectName: "root-config",
//     webpackConfigEnv,
//     argv,
//     disableHtmlGeneration: true,
//   });

//   return merge(defaultConfig, {
//     // modify the webpack config however you'd like to by adding to this object
//     plugins: [
//       new HtmlWebpackPlugin({
//         inject: false,
//         template: "src/index.ejs",
//         templateParameters: {
//           isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
//           orgName,
//         },
//       }),
//     ],
//   });
// };


const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src", "root-config.ts"),
  output: {
    filename: "root-config.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    libraryTarget: "system",
    scriptType: 'text/javascript'
  },
  devServer: {
    port: 9000,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      { test: /\.ts$/, use: "ts-loader", exclude: /node_modules/ },
      { test: /\.html$/, use: "raw-loader" },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "src/index.ejs", templateParameters: {
      isLocal: true
    } })
  ],
  externals: ["single-spa"],
};
