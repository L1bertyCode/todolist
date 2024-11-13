import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration } from 'webpack';
import { webpackDevServer } from './config/build/webpackDevServer';
import { BuildEnv } from './config/types/config';

module.exports = (env: BuildEnv): Configuration => {
  const mode = env.mode || "development";
  const PORT = env.port || 3000;

  const paths = {
    entry: path.resolve(__dirname, "index.ts"),
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
    devtool: 'inline-source-map',
    devServer: webpackDevServer(PORT)
  };
};