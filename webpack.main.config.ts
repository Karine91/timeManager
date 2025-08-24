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
    rules: [
      ...rules,
      // Add support for native node modules
      {
        // We're specifying native_modules in the test because the asset relocator loader generates a
        // "fake" .node file which is really a cjs file.
        test: /native_modules[/\\].+\.node$/,
        use: "node-loader",
      },
      {
        test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
        parser: { amd: false },
        exclude: /\.prisma/,
        use: {
          loader: "@vercel/webpack-asset-relocator-loader",
          options: {
            outputAssetBase: "native_modules",
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
    alias: {
      "@": srcPaths("src"),
      "@renderer": srcPaths("src/renderer"),
      "@main": srcPaths("src/main"),
    },
  },
  externals: {
    "@prisma/client": "commonjs @prisma/client",
  },
};
