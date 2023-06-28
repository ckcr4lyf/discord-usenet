import { Buffer } from 'node:buffer';
import fs from 'fs';
import { getLogger } from './logger.js';

// const MAX_SIZE = (2 ** 20) * 8; // 8MiB
const MAX_SIZE = (1000 * 1000) * 8; // 8MB (8MiB is too big for webhook)

// TODO: Buffering?!
export const getChunks = (filename: string): Buffer[] => {
    const logger = getLogger();
    const chunks = [];
    // fs.openSync()
    // fs.read()
    const vid = fs.readFileSync(filename, {
        
    });

    logger.info(`File length is ${vid.length}`);

    let remaining = vid.length;
    let pos = 0;

    while (pos < vid.length){
        const sub = vid.subarray(pos, pos + MAX_SIZE);
        chunks.push(sub);
        pos += sub.length;
    }

    logger.info(`done, we have ${chunks.length} chunks`);
    return chunks;   
}