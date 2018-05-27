require('dotenv').config();

const request = require('request-promise-native');
const { ITEMS } = require('./endpoints');
const { ATTRIBUTION } = require('./CommentBuilder');

function getItem(search, type) {
  const options = {
    uri: ITEMS,
    qs: {
      search,
    },
    headers: {
      [process.env.SHOPHEADER]: process.env.SHOPAPIKEY,
    },
  };
  if (type) options.qs.type = type;
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
    image: item.images.png,
  };
}

async function buildComment(search, itemType) {
  const response = await getItem(search, itemType);
  const item = buildItem(response);
  if (!item) return null;
  const { name, price, rarity, type, image } = item;
  const imageURL = image || 'N/A';
  const useVBucks = !Number.isNaN(parseInt(price.charAt(0), 10));
  return `
**${type}** [**${name}**](${imageURL}) is **${rarity}** and ${
    useVBucks ? 'costs' : 'requires'
  } **${price}**${useVBucks ? ' vbucks.' : '.'}

${ATTRIBUTION}
`;
}

module.exports = { buildComment };
