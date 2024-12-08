import path from "path"
import HtmlWebpackPlugin from "html-webpack-plugin"
import { Configuration } from "webpack"
import { webpackDevServer } from "./config/build/webpackDevServer"
import { BuildEnv } from "./config/types/config"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
const Dotenv = require("dotenv-webpack")

const config = (env: BuildEnv): Configuration => {
  const mode = env.mode || "development"
  const isDev = mode === "development"
  const PORT = env.port || 3000

  const paths = {
    entry: path.resolve(__dirname, "index.tsx"),
    build: path.resolve(__dirname, "dist"),
    html: path.resolve(__dirname, "public", "index.html"),
    src: path.resolve(__dirname, "src"),
  }
  const tsLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  }
  const cssLoader = {
    test: /\.css$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            auto: /\.module\.\w+$/i,
            namedExport: false,
            exportLocalsConvention: "as-is",
            localIdentName: isDev ? "[path][name]__[local]--[hash:base64:5]" : "[hash:base64:8]",
          },
        },
      },
    ],
  }
  const babelLoader = {
    test: /\.m?js$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
      },
    },
  }

  return {
    mode,
    entry: paths.entry,
    output: {
      path: paths.build,
      filename: "[name].[contenthash].js",
      clean: true,
    },
    module: {
      rules: [tsLoader, cssLoader, babelLoader],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: paths.html }),
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
      }),
      new Dotenv(),
    ],
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      alias: {
        "@": paths.src,
      },
    },
    devtool: isDev ? "inline-source-map" : undefined,
    devServer: isDev ? webpackDevServer(PORT) : undefined,
  }
}

export default config
