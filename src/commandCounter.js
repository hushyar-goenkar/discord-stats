const {
  ignoreDMs,
  ignoredChannels,
  ignoredUsers,
  ignoredList,
  watchedChannels,
  watchedCommands,
  ignoreBots
} = require('./util/config');

const commandStatsFields = require('./constants/commandStatsFields');

module.exports = function updateCommandStats(currentStats, msg) {
  for (let commandList of watchedCommands) {
    if (!currentStats[commandList.prefix]) currentStats[commandList.prefix] = {}; // Make sure that this exists in the stats

    for (let command of commandList.commands) {
      if (!currentStats[commandList.prefix][command]) currentStats[commandList.prefix][command] = {
        ...commandStatsFields
      } // Make sure that command stats exists

      if (
        msg.content.trim().toLowerCase().startsWith(`${commandList.prefix}${command}`.toLowerCase()) && // Check if this is the same command
        msg.bot != ignoreBots &&
        !ignoredUsers.includes(msg.author.id) &&
        (msg.channel.type == 'dm') != ignoreDMs
      ) {
        let isChannelWatched = true;
        if (ignoredList) {
          if (ignoredChannels.includes(msg.channel.id)) isChannelWatched = false;
        }
        else if (!watchedChannels.includes(msg.channel.id)) isChannelWatched = false;

        if (isChannelWatched) currentStats[commandList.prefix][command].numUses++;
      }
    }
  }

  return currentStats;
}