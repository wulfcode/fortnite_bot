const ATTRIBUTION = `----

^^^Created ^^^by ^^^\\/u/sheeann. ^^^[Contribute.](https://github.com/wulfcode/fortnite_bot) ^^^Report ^^^[issues](https://github.com/wulfcode/fortnite_bot/issues). ^^^Powered ^^^by ^^^[FortniteTracker](https://fortnitetracker.com/) ^^^and ^^^[fnbr.co](https://fnbr.co/).`;

const buildRow = cells => cells.join(' | ');

const buildDivider = size => buildRow(Array(size).fill('----'));

module.exports = {
  ATTRIBUTION,
  buildRow,
  buildDivider,
};
