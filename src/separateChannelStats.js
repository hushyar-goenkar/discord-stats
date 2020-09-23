const { ignoreBots, ignoredUsers, ignoreDMs, separateTextChannelStats } = require('./util/config');
const channelStatsFields = require('./constants/channelStatsFields');

module.exports = function updateSeparateChannelStats(currentChannelStats, msg) {
  for (let channel of separateTextChannelStats) {
    if (!currentChannelStats[channel]) currentChannelStats[channel] = { ...channelStatsFields };

    if (
      msg.channel.id == channel &&
      msg.bot != ignoreBots &&
      (msg.channel.type == 'dm') != ignoreDMs &&
      !ignoredUsers.includes(msg.author.id)
    ) currentChannelStats[channel].numMsgs++;
  }

  return currentChannelStats;
}