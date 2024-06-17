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
const botName = 'AOS-Bot';

const filePath = './process.json'

let processMap = null;
loadMapFromFile()
  .then((map) => {
    processMap = map; 
    console.log('processMap loaded successfully.');
  })
  .catch((err) => {
    console.error('Error loading map:', err);
});

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
        console.log('send to Discord：', message);
        if (channel) {
            channel.send(message);
        }
    });

    discordClient.on('messageCreate', (message) => {
        let name = message.author.username;
        let content = message.content;
        console.log('receive from discord, user:%s, content:%s', name, content);
        if(content.startsWith('[bind]')) {
            processMap.set(name,content.split(']')[1]);
            saveMapToFile(processMap,filePath);
        }else if(name !== botName && !content.startsWith('[!send]')) {
            sendMsg({name:name, content:content});
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

    const user = msg.name;
    const content = msg.content;
    
    const wallet = JSON.parse(
        readFileSync('/root/.aos.json').toString(),
    );

// The only 2 mandatory parameters here are process and signer
    await message({
        /*
          The arweave TXID of the process, this will become the 'target'.
          This is the process the message is ultimately sent to.
        */
        process: processMap.has(user) ? processMap.get(user) : PROCESS_ID,
        // Tags that the process will use as input.
        tags: [
            {name: 'Action', value: 'ReceiveDiscord'},
            {name: 'Data', value: content},
            {name: 'User', value: user},
        ],
        // A signer function used to build the message 'signature'
        signer: createDataItemSigner(wallet),
        /*
          The 'data' portion of the message
          If not specified a random string will be generated
        */
        data: content,
    })
        // .then(console.log)
        .catch(console.error);
}

function saveMapToFile(map, filePath) {
    const serializedMap = JSON.stringify(Array.from(map));
    fs.writeFile(filePath, serializedMap, (err) => {
      if (err) throw err;
      console.log('Map saved to file.');
    });
  }

function loadMapFromFile() {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          if (err.code === 'ENOENT') {
            resolve(new Map());
          } else {
            reject(err);
          }
          return;
        }
        if (data.trim() === '') {
            resolve(new Map());
        }else {
            try {
            const mapData = JSON.parse(data);
            const map = new Map(mapData);
            resolve(map);
            } catch (err) {
            reject(err);
            }
        }
      });
    });
}
