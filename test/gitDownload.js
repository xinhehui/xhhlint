const download = require('download-git-repo');

download('soldair/node-walkdir', 'test/tmp', function (err) {
    console.log(err ? 'Error' : 'Success');
});