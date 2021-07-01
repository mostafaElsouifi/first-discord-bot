require('dotenv').config();

const Discord = require('discord.js');
const Client = Discord.Client;
const client = new Client({
    partials: ["MESSAGE", "REACTION"]
});

const PREFIX = '$';

client.on('ready', ()=>{
    console.log(`the bot is logged in`);
})
/*  add commands kick and ban  */
client.on('message', async(message)=>{
    if(message.author.bot) return;
    if(message.content.startsWith(PREFIX)){
        const [ CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
        if(CMD_NAME === 'kick') {
            if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply('you dont have permissions to use that command ');
            if(args.length === 0) return message.reply('please provide an id');
            const member = message.guild.members.cache.get(args[0]);
            if(member) { 
                member.kick()
                .then((member)=> message.channel.send(`${member} was kicked.`))
                .catch(err => message.channel.send('I can not kick that memebr (:'));
            }else{
                message.channel.send('that member was not found');
            }
        }
        else if(CMD_NAME === 'ban'){
            if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply('sorry you do not have permission to do that');
            if(args.length === 0) return message.reply('please provide an id');
            try{
                const user = await message.guild.members.ban(args[0]);
                message.channel.send('user banned successfully');
            }catch(error){
                message.channel.send('an error occured either i don not have permission or the user not found');
            }
        }
    }
});
client.on('messageReactionAdd', (messageReaction, user)=>{
    const { name } = messageReaction.emoji;
    const member = messageReaction.message.guild.members.cache.get(user.id);
    if(messageReaction.message.id == '860243538633949225'){
        switch(name){
            case '🍌':
                member.roles.add('860227890477006848')
                break;
            case '🍇':
                member.roles.add('860228080248684564');
        }
    }

})
client.on('messageReactionRemove', (messageReaction, user)=>{
    const { name } = messageReaction.emoji;
    const member = messageReaction.message.guild.members.cache.get(user.id);
    if(messageReaction.message.id = '860243538633949225'){
        switch(name){
            case '🍌':
                member.roles.remove('860227890477006848')
                break;
            case '🍇':
                member.roles.remove('860228080248684564');
        }
    }
})
client.login(process.env.DISCORDJS_BOT_TOKEN);