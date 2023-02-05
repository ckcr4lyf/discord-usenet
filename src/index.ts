import 'dotenv/config';

import { AttachmentBuilder, Client, Events, GatewayIntentBits } from 'discord.js'
import crypto from 'crypto';
import { getChunks } from './fileCut.js';
import { performance } from 'perf_hooks';
import { pieceData, saveDorrent } from './makeDorrent.js';

const token = `MTA2MzY1NTYzMzExMjU1MTU1NQ.Gn58BL.ijNIOnuo-x6KaiUpSDRp6BW3U3ZOK3iRsGzUlA`;
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });


client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on('messageCreate', async (msg) => {
    const pieces: pieceData[] = [];

    if (msg.author.id === '1063655633112551555'){
        console.log(`bot msg, will ignore`);
        return;
    }
    // console.log(`got msg ${msg.content}`);
    // console.log(msg);

    // msg.channel.send("XD");

    const attachments = [];
    const filename = msg.content;

    let chunks: Buffer[];
    try {
        chunks = getChunks(filename);    
    } catch (e){
        console.log(`Fail to get chunks`, e);
        msg.reply('Fail to get chunks');
        return;
    }
    

    const start = performance.now();

    for (let i = 0; i < chunks.length; i++){
        const fileName = `piece_${i}.bin`;
        console.log(`processing ${fileName}`);

        const attachment = new AttachmentBuilder(chunks[i], {
            name: fileName,
        });

        const result = await msg.channel.send({
            files: [attachment],
        });

        const urls = result.attachments.map(el => el.url);

        console.log(`Sent. Available at ${urls[0]}`);
        pieces.push({
            name: fileName,
            url: urls[0],
        });
    }

    const end = performance.now();

    const timeTaken = end-start;

    console.log(`Took ${timeTaken.toFixed(2)}ms`);
    saveDorrent(filename, pieces)
});

client.login(token);
