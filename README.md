# aos-chat-q3

<h1>You can join discord and use it directly</h1>

[join discord channal](https://discord.gg/VBVmJfr5)

<h1> Used in discord </h1>

You can send messages directly, but this will use the default pid.

<h3> KeyWords(Messages starting with these keywords) </h3>

1. `[!send]` : It allows you to send messages only in Discord without sending them to the `Getting-Started` room.

2. `[bind]` : It allows you to bind your own pid so that the messages you send are forwarded using your own pid instead of the default one.

      Note: Your pid must have loaded the `chatroom.lua` of this project, and has joined `Getting-Started` room.

<h1> </h1>

<h1> </h1>

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

