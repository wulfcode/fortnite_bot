require('dotenv').config();

const request = require('request-promise-native');
const { TRACKER } = require('./endpoints');
const { validatePlatform } = require('./validators');
const { ATTRIBUTION, buildDivider, buildRow } = require('./CommentBuilder');

function getPlayer(username, platform) {
  const validatedPlatform = validatePlatform(platform);
  if (!validatedPlatform) {
    return Promise.reject(new Error('Invalid platform.'));
  }
  const options = {
    uri: `${TRACKER}/${validatedPlatform}/${username}`,
    headers: {
      [process.env.FTHEADER]: process.env.FTAPIKEY,
    },
  };
  return request(options);
}

function getStats(response) {
  const player = JSON.parse(response);
  if (player.error) return null;
  const soloStats = player.stats.curr_p2;
  const duoStats = player.stats.curr_p10;
  const squadStats = player.stats.curr_p9;
  return {
    username: player.epicUserHandle,
    stats: {
      current: [
        {
          mode: 'solo',
          wins: soloStats.top1.value,
          top3: soloStats.top3.value,
          top5: soloStats.top5.value,
          played: soloStats.matches.value,
          winRatio: soloStats.winRatio.value,
          kills: soloStats.kills.value,
          kd: soloStats.kd.value,
          kpg: soloStats.kpg.value,
        },
        {
          mode: 'duo',
          wins: duoStats.top1.value,
          top3: duoStats.top3.value,
          top5: duoStats.top5.value,
          played: duoStats.matches.value,
          winRatio: duoStats.winRatio.value,
          kills: duoStats.kills.value,
          kd: duoStats.kd.value,
          kpg: duoStats.kpg.value,
        },
        {
          mode: 'squad',
          wins: squadStats.top1.value,
          top3: squadStats.top3.value,
          top5: squadStats.top5.value,
          played: squadStats.matches.value,
          winRatio: squadStats.winRatio.value,
          kills: squadStats.kills.value,
          kd: squadStats.kd.value,
          kpg: squadStats.kpg.value,
        },
      ],
    },
  };
}

async function buildComment(username, platform) {
  const response = await getPlayer(username, platform);
  const stats = getStats(response);
  if (!stats) return Promise.reject(new Error('Player not found.'));
  const header = buildRow([
    'Mode',
    'Wins',
    'Top 3',
    'Top 5',
    'Played',
    'Win ratio',
    'Kills',
    'K/D',
    'KPG',
  ]);
  const table = stats.stats.current.reduce((prev, curr) => {
    const row = buildRow([
      `**${curr.mode}**`,
      curr.wins,
      curr.top3,
      curr.top5,
      curr.played,
      curr.winRatio,
      curr.kills,
      curr.kd,
      curr.kpg,
    ]);
    return `${prev}${row}
`;
  }, '');
  return `
Stats for ${stats.username}:

${header}
${buildDivider(9)}
${table}

${ATTRIBUTION}
`;
}

module.exports = { buildComment };
