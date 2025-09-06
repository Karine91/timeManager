import path from "path";

import type { Configuration } from "webpack";

import { plugins } from "./webpack.plugins";
import { rules } from "./webpack.rules";

function srcPaths(src: string) {
  return path.join(__dirname, src);
}

rules.push({
  test: /\.css$/,
  use: [{ loader: "style-loader" }, { loader: "css-loader" }],
});

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
    alias: {
      "@": srcPaths("src"),
      "@renderer": srcPaths("src/renderer"),
      "@main": srcPaths("src/main"),
    },
  },
};
