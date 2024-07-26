import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

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
		outDir: "dist",
		sourcemap: true,
		target: "esnext",
		minify: "esbuild",
		rollupOptions: {
			input: "src/index.js", // Assuming you're using TypeScript
			output: {
				format: "es",
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
	plugins: [
		viteStaticCopy({
			targets: [
				{ src: "package.json", dest: "." },
				{ src: "icon.png", dest: "." },
			],
		}),
	],
});
