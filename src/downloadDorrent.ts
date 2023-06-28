import fs from 'fs';
import { Dorrent } from './makeDorrent.js';
import axios from 'axios';

/**
 * Sends requests to download the different pieces of a dorrent 
 * and writes them to a file, with a timestamp prefix.
 * 
 * @param dorrent The dorrent
 */
export const downloadDorrent = async (dorrent: Dorrent) => {

    console.log(`gonna download ${dorrent.filename}`);

    const chunks: Buffer[] = [];

    for (let piece of dorrent.pieces){
        console.log(`grabbing ${piece.name}`);
        const pieceData = await axios.get(piece.url, {
            responseType: 'arraybuffer'
        });
        chunks.push(pieceData.data);
        console.log(`got piece ${piece.name}`);
    }

    console.log(`Got all, will save`);
    const fileData = Buffer.concat(chunks);

    fs.writeFileSync(`${Date.now()}_${dorrent.filename}`, fileData);
}
