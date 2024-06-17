const { results } = require("@permaweb/aoconnect");
const WebSocket = require("ws");

const PROCESS_ID = 'DS4jFzjZ1wCvAGTLMNEg0Z5w8PHFS5Ipwd-Ur-Xg0GQ';

let cursor = '';
let transSelf = true;

async function receiveMsg() {
    // fetching the first page of results

    if (cursor === '') {
        const resultsOut = await results({
            process: PROCESS_ID,
            sort: 'DESC',
            limit: 1,
        });
        cursor = resultsOut.edges[0].cursor;
        console.log('cursor:', resultsOut);
    }

    console.log('waiting msg......');
    const resultsOut2 = await results({
        process: PROCESS_ID,
        from: cursor,
        sort: 'ASC',
        limit: 25,
    });

    for (const result of resultsOut2.edges.reverse()) {
        cursor = result.cursor;
        console.log('result: ', result.node);
        const odata = result.node.Output.data;
        if (typeof odata === 'string' && odata.includes('[0m@\x1B[34mGetting-Started\x1B[0m]>') && !odata.includes('Received confirmation of your broadcast')) {
            sendMessageToWebSocket(odata.replace(/\u001B\[[0-9;]*m/g, ''));
            // console.log('output',result.node.Output);
        }
        var messages = result.node.Messages;
        const sendDiscordMsgs = messages.filter(m => m.Target === '6I1JBBc9SOMtqFxlX7OoYgsMh7QeZk2fFwUCHTUqshg');
        for (const message of sendDiscordMsgs) {
            // console.log('message:',message)
            let send = message.Tags.find(t => t.name === 'Send');
            if (transSelf && send && send.value === 'discord') {
                const user = message.Tags.find(t => t.name === 'NickName').value;
                console.log(user + ':' + message.Data);
                sendMessageToWebSocket('Send from Discord<' + user + '>：' + message.Data);
            }else {
                sendMessageToWebSocket('Send from aos terminal：' + message.Data);
            }
        }
    }
}

let discortSocket = new WebSocket('ws://localhost:3541');

discortSocket.on('open', () => {
    console.log('Connected to WebSocket server');
});

discortSocket.on('message', (data) => {
    console.log('Message from WebSocket server:', data);
});

function sendMessageToWebSocket(message) {
    if (discortSocket.readyState === WebSocket.OPEN) {
        discortSocket.send(message);
    } else {
        console.log('WebSocket is not open, please restart index.js');
    }
}

setInterval(() => {
    receiveMsg();
}, 5000);
