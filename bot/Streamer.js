// Ripped from github.com/MayorMonty/Snoostorm
const EventEmitter = require('events');

/**
 *  Remove duplicates in listings.
 * @param {Array} original
 * @param {Array} listing
 * @param {Date} start
 */
function removeDuplicates(original, listing, start) {
  console.log(original, '>>>', listing, '>>>', start);
  // prettier-ignore
  return listing.filter(post => original.every(a => a.id !== post.id) &&
  post.created_utc >= start / 1000);
}

class Streamer {
  /**
   * @param {SnooWrap} client
   */
  constructor(client) {
    this.client = client;
  }
  /**
   * @param {Object} options
   */
  CommentStream(options) {
    let lastBatch = [];
    const event = new EventEmitter();
    const start = Date.now();

    const id = setInterval(() => {
      this.client
        .getNewComments(options.subreddit, {
          limit: options.results,
        })
        .then(listing => {
          removeDuplicates(lastBatch, listing, start).forEach(post => {
            event.emit('comment', post);
          });
          lastBatch = listing;
        });
    }, options.pollTime);

    event.on('stop', () => clearInterval(id));

    return event;
  }
}

module.exports = Streamer;
