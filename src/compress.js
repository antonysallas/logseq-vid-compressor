import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

const ffmpeg = FFmpeg({ log: true });

const compressVideo = async (inputPath) => {
	try {
		if (!ffmpeg.isLoaded()) {
			await ffmpeg.load();
		}

		const inputFileName = inputPath.split("/").pop(); // Extract the filename from the path
		const outputFileName = inputFileName.replace(/(\.\w+)$/, "_compressed$1"); // Create a new filename for the output

		console.log(`Starting compression for video: ${inputPath}`);
		console.log(`Input file name: ${inputFileName}`);
		console.log(`Output file name: ${outputFileName}`);

		// Load the input file into ffmpeg's filesystem
		ffmpeg.FS("writeFile", inputFileName, await fetchFile(inputPath));

		const compressionLevel = logseq.settings.compressionLevel || "Medium";
		let crfValue;
		switch (compressionLevel) {
			case "High":
				crfValue = 23;
				break;
			case "Medium":
				crfValue = 28;
				break;
			case "Low":
				crfValue = 35;
				break;
			default:
				crfValue = 28;
		}

		// Run the ffmpeg command to compress the video
		await ffmpeg.run("-i", inputFileName, "-vcodec", "libx264", "-crf", crfValue.toString(), outputFileName);

		// Read the output file from ffmpeg's filesystem
		const data = ffmpeg.FS("readFile", outputFileName);

		console.log(`Compression completed for: ${inputPath}`);

		// Use Blob to handle the output file and return the URL
		const blob = new Blob([data.buffer], { type: "video/mp4" });
		const compressedUrl = URL.createObjectURL(blob);

		return compressedUrl;
	} catch (error) {
		console.error("Error during video compression", error);
		throw error;
	}
};

export { compressVideo };
