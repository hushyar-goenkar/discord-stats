const { guildConfigs } = require('./util/config');
const channelStatsFields = require('./constants/channelStatsFields');
const updateCommandStats = require('./commandCounter');

module.exports = function updateSeparateChannelStats(currentChannelStats, msg) {
  const { ignoreBots, ignoredUsers, ignoreDMs, separateTextChannelStats } = guildConfigs[msg.guild.id];

  for (let channel of separateTextChannelStats) {
    if (!currentChannelStats[channel]) currentChannelStats[channel] = { ...channelStatsFields };

    if (
      msg.channel.id == channel &&
      msg.bot != ignoreBots &&
      (msg.channel.type == 'dm') != ignoreDMs &&
      !ignoredUsers.includes(msg.author.id)
    ) {
      currentChannelStats[channel].numMsgs++;
      currentChannelStats[channel].commands = updateCommandStats(currentChannelStats[channel].commands, msg);
    }
  }

  return currentChannelStats;
}