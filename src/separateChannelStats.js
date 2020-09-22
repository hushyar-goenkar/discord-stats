const { ignoreBots, ignoredUsers, ignoreDMs, separateTextChannelStats } = require('./util/config');
const channelStatsFields = require('./constants/channelStatsFields');

module.exports = function updateSeparateChannelStats(currentChannelStats, msg) {
  for (let channel of separateTextChannelStats) {
    if (!currentChannelStats[channel]) currentChannelStats[channel] = channelStatsFields;

    if (separateTextChannelStats.includes(msg.channel.id)) currentChannelStats[channel].numMsgs++;
  }

  return currentChannelStats;
}