# aos-chat-q3

<h1>You can join discord and use it directly</h1>

[join discord channal](https://discord.gg/VBVmJfr5)

<h1> Install </h1>

This program need ws、fs、express、discord.js、@permaweb/aoconnect

`npm install ws fs express discord.js @permaweb/aoconnect`

<h1> Use </h1>

1. replace yours `process_id` in `index.js` and `server.js`

2. make sure your process has executed the command:
   `.load-blueprint chat` and `.load chatroom.lua` and `Join("Getting-Started", "yourName")`

3. run `node server.js`
   
4. run `node index.js`


<h1>Send Message</h1>

you can use "Say" to send with your name by you regist.

`Say("msg")`

you also can send msg by discord, it will be forward to "Getting-Started" room.

If you don't want to see your messages in discord, you can set `transSelf` to `false` in `index.js`.

if you don`t want to send msg to aos chatroom, you can send msg start with `[!send]`.

