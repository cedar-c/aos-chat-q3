const { results } = require("@permaweb/aoconnect");
const WebSocket = require("ws");

const PROCESS_ID = YOUR_PROCESS;

let cursor = "";

async function receiveMsg() {
  // fetching the first page of results
  
  if (cursor == "") {
    const resultsOut = await results({
      process: PROCESS_ID,
      sort: "DESC",
      limit: 1,
    });
    cursor = resultsOut.edges[0].cursor;
    console.log("cursor:", resultsOut);
  }

  console.log("waiting msg......");
  const resultsOut2 = await results({
    process: PROCESS_ID,
    from: cursor,
    sort: "ASC",
    limit: 50,
  });

  for (const result of resultsOut2.edges.reverse()) {
    cursor = result.cursor;
    console.log("result", result);
    var messages = result.node.Messages;
    if (messages.length === 0) {
      continue;
    }
    const sendDiscordMsgs = messages.filter(e => e.Target == 'Discord');
    for (const message of sendDiscordMsgs) {
      console.log("message", message);
      if (message.Data) {
        sendMessageToWebSocket(message.Data);
      }
    }
  }
}

const discortSocket = new WebSocket("ws://localhost:3541");

discortSocket.on("open", () => {
  console.log("Connected to WebSocket server");
});

discortSocket.on("message", (data) => {
  console.log("Message from WebSocket server:", data);
});

function sendMessageToWebSocket(message) {
  if (discortSocket.readyState === WebSocket.OPEN) {
    discortSocket.send(message);
  } else {
    console.log("WebSocket is not open");
  }
}
setInterval(() => {
  receiveMsg();
}, 5000);
