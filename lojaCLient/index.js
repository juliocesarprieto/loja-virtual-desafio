var express = require('express');
var app = express();
var fs = require('fs');

var argument = process.argv[2];


fs.writeFile('./public/config.js', `var config = { mode: 'development ', route: '${argument}' }`,
    function(err) {
        if (err) throw err;
    });

app.use(express.static('public'));

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});