import { webhookUpload } from "./webhookUpload.js";

const webhook = `https://discord.com/api/webhooks/EXTRA/STUFF`;
// const webhook = `http://localhost:4444`;
const filename = `README.md`;

await webhookUpload(filename, webhook);