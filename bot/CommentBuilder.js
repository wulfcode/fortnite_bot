const ATTRIBUTION = `^^^Created ^^^by ^^^/u/sheeann. ^^^[Contribute.]
  (https://github.com/wulfcode/fortnite_bot) ^^^Report ^^^[issues]
  (https://github.com/wulfcode/fortnite_bot/issues). ^^^Thanks ^^^to ^^^
  [FortniteTracker](https://fortnitetracker.com/).`;

const buildRow = cells => cells.join(' | ');

const buildDivider = size => buildRow(Array(size).fill('----'));

module.exports = {
  buildRow,
  buildDivider,
};
