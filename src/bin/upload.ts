import { downloadDorrent } from "../downloadDorrent.js";
import { getLogger } from "../logger.js";
import fs from 'fs';
import { Dorrent } from "../makeDorrent.js";
import { webhookUpload } from "../webhookUpload.js";


const WEBHOOK = `https://discord.com/api/webhooks/1078880510438289438/Bm1_gXlnv2C8DHXJifMkIieVU5YkVxqm5bUnCONUxrj6Ln2uFQG4615JeIs-Pqzv9uE5`;
const logger = getLogger();

const filePath = process.argv[2];

logger.info(`Going to upload ${filePath}`);

await webhookUpload(filePath, WEBHOOK);
logger.info(`Done`);