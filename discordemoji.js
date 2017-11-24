const Discord = require("discord.js")
const chancejs = require("chance");
const chance = new chancejs();
const emojifyText = require("emojify-text")
const emojify = emojifyText({
  background: '⚪',
  foreground: '⚫',
  row: true
})
const snekfetch = require('snekfetch')
const bot = new Discord.Client()

bot.on("ready", () => {
    bot.shard.fetchClientValues('guilds.size').then(result => {
    const guildsizes = result.reduce((prev, val) => prev + val, 0)
    snekfetch.post(`https://discordbots.org/api/bots/336058853403787275/stats`)
        .set('Authorization', '')
        .send({ server_count: guildsizes, shard_count: 3 })
        .then(console.log('Updated discordbots.org status.'))
        .catch(e => console.log(e.body))
    })
bot.shard.fetchClientValues('guilds.size').then(result => {
   const guildsizes = result.reduce((prev, val) => prev + val, 0)
   snekfetch.post(`https://bots.discord.pw/api/bots/336058853403787275/stats`)
       .set('Authorization', '')
       .send({ server_count: guildsizes, shard_count: 3 })
       .then(console.log('Updated bots.discord.pw status.'))
       .catch(e => console.log(e.body))
})
    bot.user.setPresence({ game: { name: `Discord Emoji | de!hello`, type: 0 } })
    console.log('I am online and ready :D')
})

bot.on("guildMemberAdd", member => {
    if (member.guild.id != '336039472250748928') return;
    bot.channels.get("336059494591234068").send(`<@${member.user.id}> joined the server! Make sure to read #welcome and #emojis`)
})

bot.on("guildMemberRemove", member => {
    if (member.guild.id != '336039472250748928') return;
    bot.channels.get("336059494591234068").send(`<@${member.user.id}> left the server, hope you come back later!`)
})


bot.on("guildCreate", guild => {
    bot.shard.fetchClientValues('guilds.size').then(result => {
    const guildsizes = result.reduce((prev, val) => prev + val, 0)
    snekfetch.post(`https://discordbots.org/api/bots/336058853403787275/stats`)
        .set('Authorization', '')
        .send({ server_count: guildsizes, shard_count: 3})
        .then(console.log('Updated discordbots.org status.'))
        .catch(e => console.log(e.body))
    })
bot.shard.fetchClientValues('guilds.size').then(result => {
   const guildsizes = result.reduce((prev, val) => prev + val, 0)
   snekfetch.post(`https://bots.discord.pw/api/bots/336058853403787275/stats`)
       .set('Authorization', '')
       .send({ server_count: guildsizes, shard_count: 3  })
       .then(console.log('Updated bots.discord.pw status.'))
       .catch(e => console.log(e.body))
})
})

bot.on("guildDelete", guild => {
    bot.shard.fetchClientValues('guilds.size').then(result => {
    const guildsizes = result.reduce((prev, val) => prev + val, 0)
    snekfetch.post(`https://discordbots.org/api/bots/336058853403787275/stats`)
        .set('Authorization', '')
        .send({ server_count: guildsizes, shard_count: 3 })
        .then(console.log('Updated discordbots.org status.'))
        .catch(e => console.log(e.body))
    })
bot.shard.fetchClientValues('guilds.size').then(result => {
   const guildsizes = result.reduce((prev, val) => prev + val, 0)
   snekfetch.post(`https://bots.discord.pw/api/bots/336058853403787275/stats`)
       .set('Authorization', '')
       .send({ server_count: guildsizes, shard_count: 3  })
       .then(console.log('Updated bots.discord.pw status.'))
       .catch(e => console.log(e.body))
})

})

var silenced = {}
var prefix = "de!";
const prefixes = {}
bot.on("message", msg => {
    if (!msg.guild) { return }
    if (silenced[msg.author.id] && silenced[msg.author.id].type == "user" && silenced[msg.author.id].active) { return; }
    if (silenced[msg.guild.id] && silenced[msg.guild.id].type == "guild" && silenced[msg.guild.id].active) { return; }
    if (!msg.content.startsWith(prefix)) { return; }
    if (msg.author.bot) { return; }
    let cmd = msg.content.split(" ")[0]
    cmd = cmd.slice(prefix.length)
    let args = msg.content.split(" ").slice(1)
    if (cmd == "ping") {
        msg.channel.send(`Pong! The ping **${(bot.ping).toFixed(0)}**ms! :ping_pong:`)
    }

    if (cmd == "hello") {
        msg.channel.send(`Hello there! I am a bot that will help you get some cool emojis and play emoji games! Also, I do stuff. :smile:`)
    }
    
    if (cmd == "emojify") {
        let message = args.slice(0).join(" ")
        if (!args[0]) { return msg.channel.send(":x: You can't convert nothing :^)") }
        msg.channel.send(emojify(message))

    }

    if (cmd == "getstarted") {
        msg.channel.send(`Ready to get started? Awesome!\n*Quick note: You need Discord Nitro to get the best experience out of this bot/server*\nTo get started, follow these steps:\n:one: - Join the Discord Emoji server: https://discord.gg/HJmmmTB\n:two: - Read the #emojis channel for all of usable emojis\n:three: - Have fun! :smile:`)
    }

    if (cmd == "help") {
        msg.author.sendEmbed(
            new Discord.RichEmbed()
            .setTitle("Help")
            .setColor("#16a085")
            .setAuthor("Discord Emoji Commands")
            .setDescription("__**General**__\n**de!hello** - Hello there!\n**de!stats** - Find out the stats!\n**de!invite** - Invite the bot to your server!\n__**Emoji Stuff**__\n**de!emojilist** - Tells you alll the emoji's that are in the server!\n**de!emojiurl-emoji** - Get the URL for emojis! (Replace the emoji at the end with the name of the emoji you want the url for)\n__**Discord Emoji Server Stuff**__\n**de!getstarted** - Get started with Discord Emojis!\n**de!server** - Get a link to the server!\n__**Games and Stuff**__\n**de!emojiflip** - Flip an emoji!\n**de!emojify (message)** - Turns your message into emojis!")
        )

        msg.channel.send("Check your DMs. :mailbox_with_mail:")
    }

    if (cmd == "stats") {
        bot.shard.fetchClientValues('guilds.size').then(result => {
        const guildsizes = result.reduce((prev, val) => prev + val, 0)
        msg.channel.send(`There are **` + guildsizes + `** servers using **Discord Emoji**! :tada:`)
        })
    }

    if (cmd == "server") {
        msg.channel.send('Join now! https://discord.gg/HJmmmTB :tada:')
    }

    if (cmd == "invite") {
        msg.channel.send(`Invite link coming to your DMs. :mailbox_with_mail:`)
        msg.author.send('Invite the bot here! https://discordapp.com/oauth2/authorize?client_id=336058853403787275&scope=bot&permissions=19456')
    }

    if (cmd == "eval" && msg.author.id === "252001272146821120" || cmd == "eval" && msg.author.id === "145557815287611393") {
        let result
        try {
            result = eval(args.join(" "))
        } catch (err) {
            return msg.channel.send(":x: Looks like there was an error: " + console.log(err))
        }
        msg.channel.send(":white_check_mark: Eval results: " + result)
    }

    if (cmd == "emojiflip") {
        msg.channel.send(":thinking:")
        msg.channel.send("I choose " + chance.pickone(['Heads :arrow_up_small:', 'Tails :arrow_down_small: ']))
    }
	
   if (cmd == "emojilist") {
      const emojiList = msg.guild.emojis.map(e=>e.toString()).join(" ");
      msg.channel.send(emojiList);
    }
    
    if (cmd.startsWith('emojiurl-')) {
         try {
            msg.channel.send(`https://cdn.discordapp.com/emojis/${bot.emojis.find('name', cmd.replace('emojiurl-', '')).id}.png`)
        } catch (e) {
            msg.channel.send(`The emoji \`${cmd.replace('emojiurl-', '')}\` was not found!`)
        }
    }
});

bot.login('')
