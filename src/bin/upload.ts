import { downloadDorrent } from "../downloadDorrent.js";
import { getLogger } from "../logger.js";
import fs from 'fs';
import { Dorrent } from "../makeDorrent.js";
import { webhookUpload } from "../webhookUpload.js";


const WEBHOOK = `https://discord.com/api/webhooks/EXTRA/STUFF`;
const logger = getLogger();

const filePath = process.argv[2];

logger.info(`Going to upload ${filePath}`);

await webhookUpload(filePath, WEBHOOK);
logger.info(`Done`);