/**
 * Takes in filename, webhook URL
 * 
 * Reads file (into memory for now...)
 * 
 * Chunks file into 8MiB pieces
 * 
 * Upload each chunk as pX.bin
 * 
 * Save piece data (name, url)
 * 
 * Write dorrent
 */

import axios, { isAxiosError } from 'axios';
import FormData from 'form-data';
import { queue }from 'async';
import { getChunks } from "./fileCut.js"
import { getLogger } from './logger.js';
import { pieceData, saveDorrent } from './makeDorrent.js';

type Task = {
    index: number,
    chunk: Buffer,
    webhook: string,
    pieces: pieceData[],
}

const handler = async (task: Task) => {

    const logger = getLogger();

    const { index, chunk, webhook } = task;
    
    const fileName = `p${index}.bin`;
    const form = new FormData();
    form.append(`file1`, chunk, fileName);

    
    
    // form.append(`file1`, Buffer.from("THIS IS A TEST XD"), fileName);

    try {
        logger.info(`Going to upload ${fileName} Length=${chunk.length}`);
        const response = await axios({
            method: 'POST',
            url: webhook,
            data: form,
            headers: {
                ...form.getHeaders(),
            }
        });
        task.pieces.push({
            name: fileName,
            url: response.data.attachments[0].url,
        });
        // break;
    } catch (e){
        if (axios.isAxiosError(e)){
            console.log(e.request)
            console.log(e.response?.status, e.response?.headers, e.response?.data);
            throw e;
        }
    }

}

export const webhookUpload = async (filename: string, webhook: string): Promise<void> => {
    const logger = getLogger()
    const start = performance.now();

    //Filename should be _in_ process.cwd() I guess...
    const chunks = getChunks(filename);

    const q = queue(handler, 4);
    const pieces: pieceData[] = [];

    for (let x = 0; x < chunks.length; x++){
        q.push({
            index: x,
            chunk: chunks[x],
            webhook: webhook,
            pieces: pieces,
        });
    }

    await q.drain();

    pieces.sort((p1, p2) => {
        if (p1.name > p2.name){
            return 1;
        }

        return -1
    });

    // console.log(pieces);
    saveDorrent(filename, pieces);
    
    const end = performance.now();
    const timeTaken = end-start;
    logger.info(`Took ${timeTaken.toFixed(2)}ms`);
}

