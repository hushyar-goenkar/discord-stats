const { Client } = require('discord.js');
const fs = require('fs');
const statsFields = require('./src/constants/statsFields');
const updateCommandStats = require('./src/commandCounter');
const updateSeparateChannelStats = require('./src/separateChannelStats');

const { token, guildConfigs } = require('./src/util/config');

const client = new Client();
let stats; // Current
if (!fs.existsSync('stats.json')) {
  const initialStats = {};

  for (let guildId in guildConfigs) {
    initialStats[guildId] = { ...statsFields };
  }

  fs.writeFileSync('stats.json', JSON.stringify(initialStats));
}

try {
  stats = JSON.parse(fs.readFileSync('stats.json'));
}
catch (e) {
  console.log(`JSON parse error, ${e}, resetting stats`);

  const initialStats = {};

  for (let guildId in guildConfigs) {
    initialStats[guildId] = { ...statsFields };
  }

  fs.writeFileSync('stats.json', JSON.stringify(initialStats));
}

for (let guildId in stats) {
  for (let param in statsFields) {
    if (!stats[guildId][param]) {
      stats[guildId][param] = statsFields[param];
  
      if (param == 'runningSince') stats[guildId][param] = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
    }
  }
}

fs.writeFileSync('stats.json', JSON.stringify(stats));

setInterval(() => {
  fs.writeFileSync('stats.json', JSON.stringify(stats));
}, 5*1000*60) // every 5 min

client.on('message', msg => {
  stats[msg.guild.id].numMessages++;
  stats[msg.guild.id].commands = updateCommandStats(stats[msg.guild.id].commands, msg);
  stats[msg.guild.id].separateChannelStats = updateSeparateChannelStats(stats[msg.guild.id].separateChannelStats, msg);
})

client.login(token);
