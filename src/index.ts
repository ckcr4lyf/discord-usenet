import 'dotenv/config';

import { AttachmentBuilder, Client, Events, GatewayIntentBits } from 'discord.js'
import crypto from 'crypto';
import { getChunks } from './fileCut.js';
import { performance } from 'perf_hooks';

const token = `MTA2MzY1NTYzMzExMjU1MTU1NQ.Gn58BL.ijNIOnuo-x6KaiUpSDRp6BW3U3ZOK3iRsGzUlA`;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on('messageCreate', async (msg) => {

    if (msg.author.id === '1063655633112551555'){
        console.log(`bot msg, will ignore`);
        return;
    }
    console.log(`got msg ${msg.content}`);
    console.log(msg);

    // msg.channel.send("XD");

    const attachments = [];
    const chunks = getChunks();

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
    }

    const end = performance.now();

    const timeTaken = end-start;

    console.log(`Took ${timeTaken.toFixed(2)}ms`);
});

client.login(token);
