const Actions = {
  /**
   * @param {{username: string, platform: string}} param0
   */
  findUser({ username, platform }) {
    console.log(`finduser ${username} ${platform}`);
  },
  /** @todo Implement getting item shop cosmetics
   */
  getItemShop() {},
  /**
   * @todo Implement getting specific cosmetic
   */
  getItem() {},
};

/**
 * @param {{action: string, options: Object}} param0
 */
function dispatch({ action, ...options }) {
  Actions[action](options);
}

module.exports = dispatch;
