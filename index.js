require('dotenv').config(); // Import env variables
const { Client } = require('discord.js');
const fs = require('fs');
const statsFields = require('./src/constants/statsFields');
const updateCommandStats = require('./src/commandCounter');
const updateSeparateChannelStats = require('./src/separateChannelStats');

const client = new Client();
let stats; // Current
if (!fs.existsSync('stats.json')) fs.writeFileSync('stats.json', JSON.stringify(statsFields));

try {
  stats = JSON.parse(fs.readFileSync('stats.json'));

  for (let param in statsFields) {
    if (!stats[param]) stats[param] = statsFields[param];
  }

  fs.writeFileSync('stats.json', JSON.stringify(stats));

  setInterval(() => {
    fs.writeFileSync('stats.json', JSON.stringify(stats));
  }, 5*1000*60) // every 5 min
}
catch (e) {
  console.log(`JSON parse error, ${e}, resetting stats`);
  fs.writeFileSync('stats.json', JSON.stringify({}));
}

client.on('message', msg => {
  stats.numMessages++;
  stats.commands = updateCommandStats(stats.commands, msg);
  stats.separateChannelStats = updateSeparateChannelStats(stats.separateChannelStats, msg);
})

client.login(process.env.token);
