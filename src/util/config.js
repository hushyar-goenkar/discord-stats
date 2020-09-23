require('dotenv').config();

const config = require('../../config.json');

module.exports = {
  token: process.env.token,
  guildConfigs: config
}