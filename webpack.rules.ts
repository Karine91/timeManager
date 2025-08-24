import type { ModuleOptions } from "webpack";

export const rules: Required<ModuleOptions>["rules"] = [
  
  {
    test: /\.prisma/,
    type: "asset/resource",
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: "ts-loader",
      options: {
        transpileOnly: true,
      },
    },
  },
  {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  },
  // SVG
  {
    test: /\.svg$/i,
    type: "asset/inline",
    resourceQuery: /url/, // *.svg?url
  },
  {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
    use: ["@svgr/webpack"],
  },
];
