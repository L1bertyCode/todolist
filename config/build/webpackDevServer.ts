import { Configuration as DevServerConfiguration } from "webpack-dev-server";

export const webpackDevServer = (port: number): DevServerConfiguration => {
  return {
    port,
    historyApiFallback: true,
    hot: true,
    open: true
  };
};