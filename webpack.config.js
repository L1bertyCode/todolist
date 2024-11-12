const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  const mode = env.mode || "development";

  const paths = {
    entry: path.resolve(__dirname, "index.js"),
    build: path.resolve(__dirname, "dist"),
    html: path.resolve(__dirname, "public", "index.html")
  };

  return {
    mode,
    entry: paths.entry,
    output: {
      path: paths.build,
      filename: "[name].[contenthash].js", clean: true
    },
    plugins: [new HtmlWebpackPlugin({ template: paths.html })],
  };
};