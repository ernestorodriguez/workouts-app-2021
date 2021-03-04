const CopyWebpackPlugin = require("copy-webpack-plugin");
const config = require("config");

module.exports = {
  entry: {
    spa: "./app/client/entryPoints/spa/index.tsx",
    notFound: "./app/client/entryPoints/notFound/index.tsx",
  },
  output: {
    path: `${__dirname}/${config.get("app.staticsFolder")}`,
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name(file) {
                const bundleName = file.match(/\/(\w+)\/\w+\.\w+$/)[1];
                return `${bundleName}.css`;
              },
            },
          },
          "extract-loader",
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true },
          },
          { loader: "css-modules-typescript-loader" },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "./app/assets/images", to: "images" }],
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css", ".scss"],
  },
};
