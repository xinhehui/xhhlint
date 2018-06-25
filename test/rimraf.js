let rimraf = require('rimraf');

rimraf(`${__dirname  }/t`, () => console.log('yes'));

console.log('sync');