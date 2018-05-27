require('dotenv').config();

const SnooWrap = require('snoowrap');
const Streamer = require('./Streamer');
const Resolver = require('./CommandResolver');
const dispatch = require('./ActionDispatcher');

console.log('Fortnite bot is ready.');

const snooWrap = new SnooWrap({
  userAgent: process.env.USERAGENT,
  clientId: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
});

const streamer = new Streamer(snooWrap);

const commentStream = streamer.CommentStream({
  subreddit: 'fortnite_bot',
  results: 10,
  pollTime: 5000,
});

/** @todo implement queue if api limit is reached */
const processQueue = []; // eslint-disable-line

/**
 * The "main loop". Scans comments and handles any that use the syntax.
 */
commentStream.on('comment', comment => {
  const resolver = new Resolver(comment.body);
  const options = resolver.getActionOptions();
  if (options) {
    dispatch(options)
      .then(body => {
        if (body) snooWrap.getComment(comment.id).reply(body);
      })
      .catch(error => console.log(error));
  }
});
