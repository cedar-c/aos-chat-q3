# aos-chat-q3

<h1> Install </h1>

This program need ws、fs、express、discord.js、@permaweb/aoconnect

`npm install ws fs express discord.js @permaweb/aoconnect`

<h1> Use </h1>

1. replace yours `channel_id` `token` `process_id` `botName` in `index.js` and `server.js`


2. first run `node server.js` 


3. then run `node index.js`


4. last Enter the aos terminal and `.load myroom.lua`


5. Send a message with the `Target = 'Discord'` and have `Data` ,This is required. 
You can send like `Send({Target = 'Discord', Data = 'hello, Im aos'})`


6. You also can send with customize name by User tag, This is not required. 
You can send like this `Send({Target = 'Discord', User = 'aos', Data = 'hello, Im aos'})`

<h1> Notice </h1>
If you do not send with User tag, your User will be displayed in Discord and other user terminals using your pid.

You will not receive your own messages forwarded from Discord， if you want to receive， change the judgment condition in server.js.
```
        if (name == botName) {
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
        if (name == botName) {
            var split = content.split(sp);
            name = split[0];
            content = split[1];
        }
        sendMsg({name:name, content:content});
```
<h1> Img </h1>
The print content has now been updated to show the name or pid you defined when you sent it instead of your bot name。

aos1 terminal:

![aos1.png](img%2Faos1.png)

aos2 terminal:

![aos2.png](img%2Faos2.png)

discord:

![discord.png](img%2Fdiscord.png)
