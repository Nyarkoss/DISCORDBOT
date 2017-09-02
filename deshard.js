const bot = require('discord.js')

const shard = new bot.ShardingManager('./discordemoji.js', {
    token: "MzM2MDU4ODUzNDAzNzg3Mjc1.DIiUCg.AY46GIKy2ixaTFSlxAiQQYTjlfc" 
})

shard.spawn(2);

shard.on('launch', shard => {
    console.log(`Shard ${shard.id} is alive`)
})

/*
Credit to Melmsie and August
*/
