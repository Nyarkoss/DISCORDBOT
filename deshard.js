const { ShardingManager } = require('discord.js');
const shard = new ShardingManager('./discordemoji.js', {
  token: 'nope',
  autoSpawn: true
});

shard.spawn(); // Spawns recommended shards!

shard.on('launch', shard => console.log(`[SHARD] Shard ${shard.id}/${shard.totalShards}`));

/*
Credit to Melmsie and August
*/
