const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const chratis_cooldown_time = 10;
const chratis_talked_users = new Set();

const button_cooldown_time = 60;
const button_talked_users = new Set();

function ad(bot, message) {
   let adschannel = message.guild.channels.find(`name`, "ads");
   message.channel.createInvite()
    	.then(invite => {
	    bot.channels.filter(c => c.name === 'ads').forEach(channel => channel.send(`**${message.guild.name}** has been bumped.\n\nJOIN **---** 🔗 https://www.discord.gg/${invite.code} 🔗\n\nUser ID **---** ${message.author.id}\n\`\`\`AdBot: make a #adbot-updates channel for all the newest updates.\`\`\``));
        });
 setTimeout(() => ad(bot, message), 5*60000);
}  

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
	bot.channels.filter(c => c.name === 'adbot-status').forEach(channel => channel.send(`AdBot has just restarted.`)
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  if (message.author.id === '314560720308142082') {
	  return message.channel.send("You are banned from AdBot.")
  }
  if (cmd === 'tupdate') {
    if (!message.author.id === '346687165868015616') return message.channel.send("You cant use this command. It is owner only.");
    let adsupchannel = message.guild.channels.find(`name`, "adbot-updates");
    if(!adsupchannel) return message.channel.send("The bot is not properly set up! Please type `^test`.");
      if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Sorry, you don't have permissions to use this!");
      const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(`<@${message.author.id}>, I am servers message:\n\t${sayMessage}`);
    bot.channels.filter(c => c.name === 'adbot-updates').forEach(channel => channel.send(`**[------------------ UPDATE ------------------]**\n ${sayMessage}\n\n**[------------------ UPDATE ------------------]**\n`));
  } 
  if (message.content === 't^help') {
    message.channel.send("DMed you! Check it out for all the info!")
    return message.author.send("**My Commands:** *all commands start with `^` prefix.*\n\n\t`help` shows this message.\n\n\t`ad` bumps your ad to the top of the servers.\n\n\t`custom-ad` sends a custom link to all servers.\n\n\n`WARNING` any NSFW or spam advertising will result in ban from using the bot. The ban will include no access to all bot features to ensure no further rule breaking.")
  }
  if (message.content === 't^invite') {
    message.channel.send("I DMed you a link to add me to your server!")
    return message.author.send("**Invite me** to your discord:\n:link: https://discordapp.com/api/oauth2/authorize?client_id=421744026740457474&permissions=2146958583&scope=bot :link:")
  }
  if (message.content === 't^test') {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("No. Why would I test for you? I have a **Admin only** policy.");
    let adschannel = message.guild.channels.find(`name`, "ads");
    if(!adschannel) return message.channel.send("You don't have a **#ads** channel in the server! Please create one then type `^test`!");
    message.channel.send("```- Checkpoint 1: Basic AdBot command channel added.```")
		let adsupchannel = message.guild.channels.find(`name`, "adbot-updates");
    if(!adsupchannel) return message.channel.send("You don't have a **#adbot-updates** channel in the server! Please create one then type `^test`!");
    message.channel.send("```- Checkpoint 2: #adbot-updates channel has been added to keep you up to date.```")
    message.channel.send("**__ALL SYSTEMS OPERATIONAL!__** In other words you did everything right and AdBot can run properly!")
  }
  if (message.content === 't^ad') {
    let adschannel = message.guild.channels.find(`name`, "ads");
    if(!adschannel) return message.channel.send("The bot is not properly set up for this command! Please type `^test`.");
		if (message.author.id !== '346687165868015616') {
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("No. Why would I do this for you? I have a **Admin only** policy.");
		}
		if (message.author.id !== '346687165868015616') {
		  if (chratis_talked_users.has(message.author.id)) return message.reply("You have to wait before using this command again.\n*[10 min cooldown]*");
		}
		ad(bot, message)
    message.channel.send("Ads have been enabled!")
    chratis_talked_users.add(message.author.id);
    setTimeout(() => {
      chratis_talked_users.delete(message.author.id);
    }, chratis_cooldown_time * 60000);
  } 
  if (message.content === 't^info') {
    message.author.send(`**AdBot:**\n\n\tRunning on: ${bot.guilds.size} servers.\n\n\tWatching: ${bot.users.size} online users.`)
    return message.channel.send("I DMed you my info!")
  }
  if (message.content.toLowerCase().includes('@everyone')) {
    return
  }
  if (message.content.toLowerCase().includes('@here')) {
    return
  }
  if (cmd === 't^custom-ad') {
    let adschannel = message.guild.channels.find(`name`, "ads");
    if(!adschannel) return message.channel.send("The bot is not properly set up! Please type `^test`.");
		if (message.author.id !== '346687165868015616') {
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("No. Why would I do this for you? I have a **Admin only** policy.");
		}
		if (message.author.id !== '346687165868015616') {
			if (chratis_talked_users.has(message.author.id)) return message.reply("You have to wait before using this command again.\n*[10 minute cooldown]*");
		}
		if (!message.content.toLowerCase().includes('https')) {
      return message.channel.send("`fail to send` **---** a link including `https` must be in the custom message.")
    }
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.createInvite()
    	.then(invite => {
	    bot.channels.filter(c => c.name === 'ads').forEach(channel => channel.send(`**${message.author.username}** just custom bumped!\n\nLINK **---** ${sayMessage}\n\nSender ID: ${message.author.id}`));
        });
    message.channel.send(`<@${message.author.id}>, Auto Ads enabled with message:\n\`\`\`${sayMessage}\`\`\``);
    chratis_talked_users.add(message.author.id);
    setTimeout(() => {
      chratis_talked_users.delete(message.author.id);
    }, chratis_cooldown_time * 60000);
  }
});

//Ik5KSLzA6C
//test lol note thingh
//-----------------------------------------------------------
//    [do `^help` for help and join official server!]

bot.login(process.env.BOT_TOKEN);
