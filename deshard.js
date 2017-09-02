const bot = require('discord.js')

const shard = new bot.ShardingManager('./discordemoji.js', {
    token: "Nope" 
})

shard.spawn(2);

shard.on('launch', shard => {
    console.log(`Shard ${shard.id} is alive`)
})

/*
Credit to Melmsie and August
*/
