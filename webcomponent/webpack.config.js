const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const PnpPlugin = require("pnp-webpack-plugin");

const isProductionBuild = process.env.ENV !== "development";

module.exports = {
  target: "web",
  mode: !isProductionBuild ? 'development' : 'production',
  entry: './src/components/index.tsx', // Where your app entrypoint is, all modules import chains start here.
  output: {
    filename: 'bundle.[contenthash].js', // filename to output bundled JS to.
    path: path.resolve(__dirname, 'dist'), // the path to output the file to.
    publicPath: 'auto' // What path should be exposed as public
  },
  // Respect our source maps, so we can debug from in TS files in the browser, rather than bundle.
  devtool: 'inline-source-map',
  module: {
    rules: [
      // Bundle TS files.
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.module\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
        exclude: /\.module\.css$/,
      },
    ]
  },
  resolve: {
    // What file extensions should be bundled?
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    // Tell Webpack how to resolve Yarn 2 dependencies, as they aren't
    // located in `node_modules`.
    plugins: [PnpPlugin],
  },
  // Tell Webpack how to resolve loaders for Yarn 2 as well.
  resolveLoader: {
    plugins: [PnpPlugin.moduleLoader(module)],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "components", "index.html"),
    })
  ],
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
}