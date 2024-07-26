import "@logseq/libs";
import { compressVideo } from "./compress.js";
import { settingsLoad } from "./plugin/settings.ts";

const supportedVideoExtensions = [".mov", ".mp4", ".avi", ".mkv", ".flv", ".wmv", ".m4v"];

const main = async () => {
	console.log("logseq-video-compressor plugin loaded");

	settingsLoad();

	logseq.App.onFileAdded(async ({ path }) => {
		console.log(`File added event received: ${path}`);
		const fileExtension = path.slice(path.lastIndexOf(".")).toLowerCase();
		console.log(`File extension detected: ${fileExtension}`);
		if (supportedVideoExtensions.includes(fileExtension)) {
			try {
				console.log(`Starting compression for file: ${path}`);
				const compressedUrl = await compressVideo(path);
				console.log(`Video compressed and available at: ${compressedUrl}`);

				// Optionally, you can update Logseq with the new file URL
				const pageName = "Video Compressor Test"; // Change this to the actual page name where you want to add the compressed video
				const videoMarkdown = `![Compressed Video](${compressedUrl})`;
				await logseq.Editor.appendBlockInPage(pageName, videoMarkdown);
			} catch (error) {
				console.error("Video compression failed", error);
			}
		} else {
			console.log(`Unsupported file type: ${fileExtension}`);
		}
	});
};

logseq.ready(main).catch(console.error);
