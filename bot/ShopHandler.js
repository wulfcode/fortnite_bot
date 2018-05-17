require('dotenv').config();

const request = require('request-promise-native');
const ENDPOINTS = require('./endpoints');
const Builder = require('./CommentBuilder');

function getShop() {
  const options = {
    uri: ENDPOINTS.SHOP,
    headers: {
      [process.env.SHOPHEADER]: process.env.SHOPAPIKEY,
    },
  };
  return request(options);
}

function buildShop(response) {
  const shopObject = JSON.parse(response);
  const { featured, daily } = shopObject.data;
  const featuredItems = featured.map(item => ({
    name: item.name,
    price: item.price,
    rarity: item.rarity,
    type: item.readableType,
    image: item.images.png,
  }));
  const dailyItems = daily.map(item => ({
    name: item.name,
    price: item.price,
    rarity: item.rarity,
    type: item.readableType,
    image: item.images.png,
  }));
  return {
    featured: featuredItems,
    daily: dailyItems,
  };
}

async function buildComment() {
  const response = await getShop();
  const shop = buildShop(response);
  const header = Builder.buildRow(['Name', 'Price', 'Rarity', 'Type', 'Image']);
  const featured = shop.featured.reduce((prev, curr) => {
    const row = Builder.buildRow([
      curr.name,
      curr.price,
      curr.rarity,
      curr.type,
      `[Image](${curr.image})`,
    ]);
    return `${prev}${row}
`;
  }, '');
  const daily = shop.featured.reduce((prev, curr) => {
    const row = Builder.buildRow([
      curr.name,
      curr.price,
      curr.rarity,
      curr.type,
      `[Image](${curr.image})`,
    ]);
    return `${prev}${row}
`;
  }, '');

  return `
Item shop as of ${new Date().toUTCString()}:

Featured:

${header}
${Builder.buildDivider(5)}
${featured}

Daily:

${header}
${Builder.buildDivider(5)}
${daily}
`;
}

module.exports = { buildComment };
