require('dotenv').config();

const SnooWrap = require('snoowrap');
const Streamer = require('./Streamer');

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
  subreddit: 'fortnitebr',
  results: 5,
  pollTime: 10000,
});

commentStream.on('comment', comment => {
  console.log(`New comment by ${comment.author.name}`);
});
