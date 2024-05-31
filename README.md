# aos-chat-q3

<h1> Install </h1>

This program need ws、fs、express、discord.js、@permaweb/aoconnect

`npm install ws fs express discord.js @permaweb/aoconnect`

<h1> Use </h1>

replace yours `channel_id` `token` `process_id` in `index.js` and `server.js`

first run `node server.js` 

then run `node index.js`

last Enter the aos terminal and `.load myroom.lua`

Send a message with the `Target = 'Discord'` and have `Data` ,This is required. 
You can send like `Send({Target = 'Discord', Data = 'hello, Im aos'})`

You also can send with customize name by User tag, This is not required. 
You can send like this `Send({Target = 'Discord', User = 'aos', Data = 'hello, Im aos'})`

If you do not send with User tag, your User will be displayed in Discord and other user terminals using your pid.

You will not receive your own messages forwarded from Discord， if you want to receive， change the judgment condition in server.js.
```
        if (content.includes(sp)) {
            var split = content.split(sp);
            if (split[0] !== user) {
                name = split[0];
                content = split[1];
                sendMsg({name:name, content:content});
            }
        }else {
            sendMsg({name:name, content:content});
        }
```
changed as
```
        if (content.includes(sp)) {
            var split = content.split(sp);
            name = split[0];
            content = split[1];
            sendMsg({name:name, content:content});
        }else {
            sendMsg({name:name, content:content});
        }
```
