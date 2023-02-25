import fs from 'fs';
import { Dorrent } from './makeDorrent.js';
import axios from 'axios';

export const downloadDorrent = async (dorrentFilename: string) => {
    const dorrentFile = fs.readFileSync(dorrentFilename);
    const dorrentData: Dorrent = JSON.parse(dorrentFile.toString());

    console.log(`gonna download ${dorrentData.filename}`);

    const chunks: Buffer[] = [];

    for (let piece of dorrentData.pieces){
        console.log(`grabbing ${piece.name}`);
        const pieceData = await axios.get(piece.url, {
            responseType: 'arraybuffer'
        });
        chunks.push(pieceData.data);
        console.log(`got piece ${piece.name}`);
    }

    console.log(`Got all, will save`);
    const fileData = Buffer.concat(chunks);

    fs.writeFileSync(`${Date.now()}_${dorrentData.filename}`, fileData);
}
