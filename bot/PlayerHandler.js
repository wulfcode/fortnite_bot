require('dotenv').config();

const request = require('request-promise-native');
const ENDPOINTS = require('./endpoints');

const PLAYSTATION = ['ps4', 'ps', 'playstation', 'psn'];
const XBOX = ['xbox', 'xbox1', 'xboxone', 'xboxone', 'xbone', 'xbl'];

const validatePlatform = platform => {
  const normalised = platform.toLowerCase();
  if (platform === 'pc') {
    return 'pc';
  } else if (PLAYSTATION.includes(normalised)) {
    return 'psn';
  } else if (XBOX.includes(normalised)) {
    return 'xbl';
  }
  return null;
};

function buildStats(response) {
  return {
    username: response.epicUserHandle,
    stats: {
      current: {
        solo: response.stats.curr_p2,
        duo: response.stats.curr_p10,
        squad: response.stats.curr_p9,
      },
      lifetime: {
        solo: response.stats.p2,
        duo: response.stats.p10,
        squad: response.stats.p9,
      },
    },
  };
}

const PlayerHandler = {
  async getPlayer(username, platform) {
    const validatedPlatform = validatePlatform(platform);
    if (!validatedPlatform) {
      return Promise.reject(new Error('Invalid platform.'));
    }
    const options = {
      uri: `${ENDPOINTS.TRACKER}/${validatedPlatform}/${username}`,
      headers: {
        [process.env.FTHEADER]: process.env.FTAPIKEY,
      },
    };
    return request(options);
  },
  buildPlayerInfo(rawResponse) {
    const response = JSON.parse(rawResponse);
    const stats = buildStats(response);
    return stats;
  },
};

PlayerHandler.getPlayer('BasedWulf', 'ps4').then(response => {
  console.log(JSON.stringify(PlayerHandler.buildPlayerInfo(response)));
});

module.exports = PlayerHandler;
