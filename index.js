require('dotenv').config(); // Import env variables
const { Client } = require('discord.js');
const fs = require('fs');
const statsFields = require('./src/constants/statsFields');

const client = new Client();
let stats; // Current
if (!fs.existsSync('stats.json')) fs.writeFileSync('stats.json', JSON.stringify(statsFields));

try {
  stats = JSON.parse(fs.readFileSync('stats.json'));
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
})

client.login(process.env.token);
