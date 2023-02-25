import { webhookUpload } from "./webhookUpload.js";

const webhook = `https://discord.com/api/webhooks/1078880510438289438/Bm1_gXlnv2C8DHXJifMkIieVU5YkVxqm5bUnCONUxrj6Ln2uFQG4615JeIs-Pqzv9uE5`;
// const webhook = `http://localhost:4444`;
const filename = `README.md`;

await webhookUpload(filename, webhook);