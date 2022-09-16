import * as fs from "fs";
import * as zlib from "zlib";
import * as path from "path";

export async function unzip(inputPath: string, outputPath?: string) {
	const basePath = path.dirname(inputPath);
	const fileName = path.basename(inputPath).replace(".zip", "");

	const unzip = zlib.createDeflate();
	const input = fs.createReadStream(inputPath);
	const res1 = input.pipe(unzip);
	console.log(res1);

	const res = fs.readFileSync(inputPath);
	console.log(res);

	// const output = fs.createWriteStream(outputPath ?? path.join(basePath, fileName));
	// const res = await input.pipe(unzip).pipe(output)
}
