require('dotenv').config();

const {
  ignoreBots,
  ignoreDMs,
  ignoredUsers,
  ignoredChannels,
  ignoredList,
  watchedChannels,
  watchedCommands,
  separateTextChannelStats
} = require('../../config.json');

module.exports = {
  token: process.env.token,
  ignoreBots,
  ignoreDMs,
  ignoredUsers,
  ignoredChannels,
  ignoredList,
  watchedChannels,
  watchedCommands,
  separateTextChannelStats
}