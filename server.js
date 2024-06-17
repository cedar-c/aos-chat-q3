const { readFileSync } = require("node:fs")
const { message, createDataItemSigner } = require("@permaweb/aoconnect");
const { Client, GatewayIntentBits } = require('discord.js');
const WebSocket = require('ws');
const express = require('express');

const DISCORD_CHANNEL_ID = 1245267320646012974;
const token = YOUR_TOKEN;
const PROCESS_ID = 'DS4jFzjZ1wCvAGTLMNEg0Z5w8PHFS5Ipwd-Ur-Xg0GQ';

const app = express();

const port = 3541;
const sp = '：';
const botName = 'AOS-Bot';
let user = '';

const wss = new WebSocket.Server({ noServer: true });
const discordClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

discordClient.once('ready', () => {
    console.log('Discord client ready!');
});

discordClient.login(token);

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        message = message.toString();
        const channel = discordClient.channels.cache.get(DISCORD_CHANNEL_ID);
        if (channel) {
            console.log('send to Discord', message);
            channel.send(message);
        }
    });

    discordClient.on('messageCreate', (message) => {
        let name = message.author.username;
        let content = message.content;
        console.log('receive from discord, user:%s, content:%s', name, content);
        //send by other aos user
        if (name !== botName) {
            sendMsg(content);
        }
    });
});

const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});

async function sendMsg(msg) {

    const wallet = JSON.parse(
        readFileSync('/root/.aos.json').toString(),
    );

// The only 2 mandatory parameters here are process and signer
    await message({
        /*
          The arweave TXID of the process, this will become the 'target'.
          This is the process the message is ultimately sent to.
        */
        process: PROCESS_ID,
        // Tags that the process will use as input.
        tags: [
            {name: 'Action', value: 'ReceiveDiscord'},
            {name: 'Data', value: msg},
        ],
        // A signer function used to build the message 'signature'
        signer: createDataItemSigner(wallet),
        /*
          The 'data' portion of the message
          If not specified a random string will be generated
        */
        data: msg,
    })
        // .then(console.log)
        .catch(console.error);
}
