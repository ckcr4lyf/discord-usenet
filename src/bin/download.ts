import { downloadDorrent } from "../downloadDorrent.js";
import { getLogger } from "../logger.js";

const logger = getLogger();

console.log(process.argv);
const dorrentPath = process.argv[2];

logger.info(`Gonna download ${dorrentPath}`);
await downloadDorrent(dorrentPath);
logger.info(`Done`);