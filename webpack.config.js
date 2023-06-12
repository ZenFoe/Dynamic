import path, { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import TerserPlugin from "terser-webpack-plugin";
import WebpackBundleAnalyzer from 'webpack-bundle-analyzer';
import webpack from 'webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
    
export default {
  mode: 'development',
  entry: {
    worker: {
      import: './'+join('lib', 'worker', 'index.ts'),
    },
    client: {
      import: './'+join('lib', 'client', 'index.ts'),
    },
    handler: {
      import: './'+join('lib', 'handler', 'index.ts'),
    },
    mutation: {
      import: './'+join('lib', 'mutation', 'index.ts'),
    }
  },
  resolve: {
    extensions: ['.ts', '.js'],
    preferRelative: false,
  },
  module: {
    rules: [
      {
        test: /\.ts?/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  output: {
    filename: 'dynamic.[name].js',
    path: join(__dirname, 'static', 'dynamic'),
  },
  optimization: {
    minimize: true,
    usedExports: true,
    sideEffects: true,
    removeAvailableModules: true,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.uglifyJsMinify,
        parallel: true,
        extractComments: false,
        terserOptions: {
          warnings: false,
          parse: {},
          compress: {},
          mangle: true,
          toplevel: true,
          ie8: true,
          output: {
            ascii_only: true,
            comments: false,
          },
        },
      }),
    ]
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  plugins: [
    new WebpackBundleAnalyzer.BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      'self.ORIGINS': JSON.stringify([
        'http://localhost'
      ]),
    })
  ]
};
