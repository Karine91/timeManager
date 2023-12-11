import type { Configuration } from "webpack";
import path from "path";

import { rules } from "./webpack.rules";

function srcPaths(src: string) {
  return path.join(__dirname, src);
}

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: "./src/main/index.ts",
  // Put your normal webpack config below here
  module: {
    rules,
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
    alias: {
      "@": srcPaths("src"),
      "@renderer": srcPaths("src/renderer"),
      "@main": srcPaths("src/main"),
    },
  },
};
