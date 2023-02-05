import crypto from 'crypto';
import fs from 'fs';

export type Dorrent = {
    filename: string,
    pieces: pieceData[],
};

export type pieceData = {
    name: string;
    url: string;
}

export const saveDorrent = (filename: string, pieces: pieceData[]) => {
    const dorrent: Dorrent = {
        filename: filename,
        pieces: pieces,
    }

    const hash = crypto.createHash('sha3-256');
    hash.update(JSON.stringify(dorrent));
    const infohash = hash.digest('hex');

    fs.writeFileSync(`${infohash}.dorrent`, JSON.stringify(dorrent));
    console.log(`Wrote ${infohash}.dorrent`);
}