require('dotenv').config();

const Snoowrap = require('snoowrap');

const r = new Snoowrap({
  userAgent: process.env.USERAGENT,
  clientId: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
});

r
  .getSubreddit('fortnitebr')
  .getNewComments({ limit: 30 })
  .then(console.log);
