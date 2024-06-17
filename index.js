const { results } = require("@permaweb/aoconnect");
const WebSocket = require("ws");

const PROCESS_ID = 'DS4jFzjZ1wCvAGTLMNEg0Z5w8PHFS5Ipwd-Ur-Xg0GQ';

let cursor = '';
let transSelf = false;

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
        if (typeof odata === 'string' && odata.includes('[0m@\x1B[34mGetting-Started\x1B[0m]>')) {
            if (odata.includes('Received confirmation of your broadcast')) {
                sendMessageToWebSocket(odata.split('\n')[1].replace(/\u001B\[[0-9;]*m/g, ''));
            }else {
                sendMessageToWebSocket(odata.replace(/\u001B\[[0-9;]*m/g, ''));
                console.log('output',result.node.Output);
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
