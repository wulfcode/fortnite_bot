require('dotenv').config();

const request = require('request-promise-native');
const { ITEMS } = require('./endpoints');
const { ATTRIBUTION } = require('./CommentBuilder');

function getItem(search) {
  const options = {
    uri: ITEMS,
    qs: {
      search,
    },
    headers: {
      [process.env.SHOPHEADER]: process.env.SHOPAPIKEY,
    },
  };
  return request(options);
}

function buildItem(response) {
  const itemObject = JSON.parse(response);
  if (itemObject.data.length === 0) return null;
  const item = itemObject.data[0];
  return {
    name: item.name,
    price: item.price,
    rarity: item.rarity,
    type: item.readableType,
    image: item.images.png || item.images.icon,
  };
}

async function buildComment(search) {
  const response = await getItem(search);
  const item = buildItem(response);
  if (!item) return null;
  const { name, price, rarity, type, image } = item;
  const useVBucks = !Number.isNaN(parseInt(price.charAt(0), 10));
  const itemName = !image
    ? `**${name}** (no image yet)`
    : `[**${name}**](${image})`;
  return `
**${type}** ${itemName} is **${rarity}** and ${
    useVBucks ? 'costs' : 'requires'
  } **${price}**${useVBucks ? ' vbucks.' : '.'}

${ATTRIBUTION}
`;
}

module.exports = { buildComment };
