import { downloadDorrent } from "../downloadDorrent.js";
import { getLogger } from "../logger.js";
import fs from 'fs';
import { Dorrent } from "../makeDorrent.js";

const logger = getLogger();

console.log(process.argv);
const dorrentPath = process.argv[2];

logger.info(`Gonna download ${dorrentPath}`);

const dorrentFile = fs.readFileSync(dorrentPath);
const dorrent: Dorrent = JSON.parse(dorrentFile.toString());

await downloadDorrent(dorrent);
logger.info(`Done`);