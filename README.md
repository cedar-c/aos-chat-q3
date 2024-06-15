# aos-chat-q3

<h1> Install </h1>

This program need ws、fs、express、discord.js、@permaweb/aoconnect

`npm install ws fs express discord.js @permaweb/aoconnect`

<h1> Use </h1>

1. replace yours `process_id` in `index.js` and `server.js`


2. first run `.load client.lua` 


3. then run `.load chatroom.lua`


4. then regist `ao.send({ Target = "xnkv_QpWqICyt8NpVMbfsUQciZ4wlm5DigLrfXRm8fY", Action = "Register", Name = "[YOUR NAME HERE]" })`
   
   like cookbook said, you can use `Join("[YOUR NAME HERE]","[YOUR NickNAME HERE]")`


<h1>Send Message</h1>

you can use "Say" to send with your name by you regist.
`Say("msg","[YOUR NAME HERE]","[YOUR NICKNAME HERE]")`
NICKNAME is not necessary

The result is displayed in discord as ：`[YOUR NickNAME HERE](if you set) ： msg` 

<h1> Img </h1>
The print content has now been updated to show the name or pid you defined when you sent it instead of your bot name。

aos1 terminal:

![aos1.png](img%2Faos1.png)

aos2 terminal:

![aos2.png](img%2Faos2.png)

discord:

![discord.png](img%2Fdiscord.png)
