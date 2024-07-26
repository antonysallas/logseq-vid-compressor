const path = require("path");
const webpack = require("webpack");

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
		],
	},
	resolve: {
		fallback: {
			fs: require.resolve("browserify-fs"),
			child_process: false,
			stream: require.resolve("stream-browserify"),
			os: require.resolve("os-browserify/browser"),
			buffer: require.resolve("buffer"),
		},
	},
	plugins: [
		new webpack.ProvidePlugin({
			process: "process/browser",
			Buffer: ["buffer", "Buffer"],
		}),
		new webpack.IgnorePlugin({
			resourceRegExp: /^\.\/locale$/,
			contextRegExp: /moment$/,
		}),
	],
	performance: {
		hints: "warning", // Only show performance hints
		maxAssetSize: 500000, // 500 KB
		maxEntrypointSize: 500000, // 500 KB
	},
	ignoreWarnings: [
		{
			module: /@ffmpeg-installer/,
			message: /Critical dependency: the request of a dependency is an expression/,
		},
		{
			module: /fluent-ffmpeg/,
			message: /Critical dependency: the request of a dependency is an expression/,
		},
	],
	mode: "production",
};
