# aos-chat-q3

<h1> Install </h1>

This program need ws、fs、express、discord.js、@permaweb/aoconnect

`npm install ws fs express discord.js @permaweb/aoconnect`

<h1> Use </h1>

replace yours `channel_id` `token` `process_id` in `index.js` and `server.js`

run `node server.js` first

then run `node index.js`

last Enter the aos terminal and `.load myroom.lua`

Send a message with the `Target = 'Discord'` and have `Data` ,This is required. 
You can send like `Send({Target = 'Discord', Data = 'hello, Im aos'})`

You also can send with customize name by User tag, This is not required. 
You can send like this `Send({Target = 'Discord', User = 'aos', Data = 'hello, Im aos'})`

