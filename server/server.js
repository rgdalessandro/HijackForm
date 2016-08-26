var express = require('express');
var browserify = require('browserify-middleware');
var bodyParser = require('body-parser');

var app = express();
exports.app = app;

var port = process.env.PORT || 4500;

// middleware to parse JSON
app.use(bodyParser.json())

// serve javascript assets compiled by browserify and transpiled by babel
app.get('/script.js',
 browserify('./bind/bind.js', {
    transform: [ [ require('babelify'), { presets: ['es2015'] } ] ]
  })
);

// on a POST request to /hijackForm, respond with JSON
app.post('/hijackForm', function(req, res){
  res.send(JSON.stringify({ result: "ok" }));
})

// start server
app.listen(port);
console.log('Listening on localhost:' + port);
