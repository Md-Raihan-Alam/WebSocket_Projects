import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

// 0 :connecting
// 1 :open, the only state where you can safely .send()
// 2 :closing
// 3 :closed

//connection event
wss.on("connection", (socket, request) => {
  const ip = request.socket.remoteAddress;
  socket.on("message", (rawData) => {
    const message = rawData.toString();
    console.log({ rawData });
    wss.clients.forEach((client) => {
      //   if (client.readyState === 1) client.send(`Server Broadcast: ${message}`);

      if (client.readyState === WebSocket.OPEN)
        client.send(`Server Broadcast: ${message}`);
    });
  });

  socket.on("error", (err) => {
    console.log(`Error: ${err.message}: ${ip}`);
  });

  socket.on("close", () => {
    console.log(`Connection closed: ${ip}`);
  });
});

console.log("Websocketserver isliveon ws://localhost:8080");

/*
const socket=new WebSocket("ws://localhost:8080");

socket.onmessage=(event)=>{
    console.log("Message from server:",event.data);
}

socket.onopen=()=>{
    socket.send("Hello from chrome browser");
}

do it in browser console

https://github.com/websockets/wscat
another way to test is using wscat cli tool
*/
