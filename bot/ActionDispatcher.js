const ShopHandler = require('./ShopHandler');

const Actions = {
  /**
   * @param {Object} options
   * @param {string} options.username
   * @param {string} options.platform
   * @param {string} options.mode
   */
  findUser({ username, platform, mode }) {
    console.log(`finduser ${username} ${platform} ${mode}`);
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
  getItem() {},
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
