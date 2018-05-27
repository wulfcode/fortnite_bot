const ShopHandler = require('./ShopHandler');
const PlayerHandler = require('./PlayerHandler');
const ItemHandler = require('./ItemHandler');

const Actions = {
  /**
   * @param {Object} options
   * @param {string} options.username
   * @param {string} options.platform
   */
  findUser({ username, platform }) {
    return PlayerHandler.buildComment(username, platform);
  },
  /**
   * @return {Promise<string>}
   */
  async getItemShop() {
    return ShopHandler.buildComment();
  },
  /**
   * @todo Implement getting specific cosmetic
   */
  getItem({ search, type }) {
    return ItemHandler.buildComment(search, type);
  },
};

/**
 * @param {Object} options
 * @param {string} options.action
 * @param {Object} options.options
 * @return {Promise<string>}
 */
async function dispatch({ action, ...options }) {
  return Actions[action](options);
}

module.exports = dispatch;
