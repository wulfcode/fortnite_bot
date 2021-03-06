/**
 * Capture syntax {}
 */
const PATTERN = /\{([^}]+)\}/;

const actions = {
  findUser: ['findme', 'finduser', 'findplayer'],
  getItemShop: ['itemshop', 'shop'],
  getItem: ['item', 'getitem', 'finditem'],
};

/**
 * @param {string} input containing the user command string
 */
const getBotCommand = input => {
  const matched = input.match(PATTERN);
  return (matched && matched[1].trim()) || null;
};

class CommandResolver {
  constructor(body) {
    this.command = getBotCommand(body);
  }
  /**
   * @return {?Object}
   */
  getActionOptions() {
    if (!this.command) return null;
    const tokens = this.command.split(' ');
    const action = tokens[0].toLowerCase();
    if (actions.findUser.includes(action)) {
      return {
        action: 'findUser',
        username: tokens[1],
        platform: tokens[2],
      };
    } else if (actions.getItemShop.includes(action)) {
      return {
        action: 'getItemShop',
      };
    } else if (actions.getItem.includes(action)) {
      return {
        action: 'getItem',
        search: tokens.slice(1).join(' '),
      };
    }
    return null;
  }
}

module.exports = CommandResolver;
