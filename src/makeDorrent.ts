import crypto from 'crypto';
import fs from 'fs';
import { getLogger } from './logger.js';

export type Dorrent = {
    filename: string,
    pieces: pieceData[],
};

export type pieceData = {
    name: string;
    url: string;
}

export const saveDorrent = (filename: string, pieces: pieceData[]) => {
    const logger = getLogger();
    const dorrent: Dorrent = {
        filename: filename,
        pieces: pieces,
    }

    const hash = crypto.createHash('sha3-256');
    hash.update(JSON.stringify(dorrent));
    const infohash = hash.digest('hex');

    fs.writeFileSync(`${infohash}.dorrent`, JSON.stringify(dorrent));
    logger.info(`Wrote ${infohash}.dorrent`);
}