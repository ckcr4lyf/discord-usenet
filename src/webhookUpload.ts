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

type Task = {
    index: number,
    chunk: Buffer,
    webhook: string,
}

const handler = async (task: Task, cb: () => void) => {


    const { index, chunk, webhook } = task;
    
    const fileName = `p${index}.bin`;
    console.log(`Gonna do ${fileName}`);
    const form = new FormData();
    form.append(`file1`, chunk, fileName);
    // form.append(`file1`, Buffer.from("THIS IS A TEST XD"), fileName);

    try {
        const response = await axios({
            method: 'POST',
            url: webhook,
            data: form,
            headers: {
                ...form.getHeaders(),
            }
        });
        console.log(response.data.attachments[0].url);
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
    const start = performance.now();

    //Filename should be _in_ process.cwd() I guess...
    const chunks = getChunks(filename);

    const q = queue(handler, 2);

    for (let x = 0; x < chunks.length; x++){
        q.push({
            index: x,
            chunk: chunks[x],
            webhook: webhook
        });
    }

    await q.drain();
    
    const end = performance.now();
    const timeTaken = end-start;
    console.log(`Took ${timeTaken.toFixed(2)}ms`);
}

