import { defineConfig } from "vite";

export default defineConfig({
	resolve: {
		alias: {
			fs: "browserify-fs",
			stream: "stream-browserify",
			os: "os-browserify/browser",
			buffer: "buffer",
		},
	},
	build: {
		sourcemap: true,
		target: "esnext",
		minify: "esbuild",
		rollupOptions: {
			output: {
				entryFileNames: "assets/[name].[hash].js",
				chunkFileNames: "assets/chunks/[name].[hash].js",
				assetFileNames: "assets/[name].[hash].[ext]",
			},
		},
	},
	define: {
		"process.env": {},
		"process.browser": true,
		"process.version": JSON.stringify("v14.15.4"), // Mocking the Node.js version
	},
	optimizeDeps: {
		include: ["@ffmpeg/ffmpeg"],
	},
});
