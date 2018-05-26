const PLAYSTATION = ['ps4', 'ps', 'playstation', 'psn'];
const XBOX = ['xbox', 'xbox1', 'xboxone', 'xboxone', 'xbone', 'xbl'];

const SOLO = ['solo', 'solos'];
const DUO = ['duo', 'duos'];
const SQUAD = ['squad', 'squads'];

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

const validateMode = mode => {
  const normalised = mode.toLowerCase();
  if (SOLO.includes(normalised)) return 'solo';
  else if (DUO.includes(normalised)) return 'duo';
  else if (SQUAD.includes(normalised)) return 'squad';
  return null;
};

module.exports = {
  validatePlatform,
  validateMode,
};
