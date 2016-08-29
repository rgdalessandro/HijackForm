var express = require('express');
var browserify = require('browserify-middleware');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
exports.app = app;

var port = process.env.PORT || 4500;

var rootFolder = path.join(__dirname, '..');

// middleware to parse JSON
app.use(express.static(rootFolder))
   .use(bodyParser.json());

// serve javascript assets compiled by browserify and transpiled by babel
app.get('/bind/script.js',
 browserify('./bind/bind.js', {
    transform: [ [ require('babelify'), { presets: ['es2015'] } ] ]
  })
);

// load up target file containing form
app.get('/*', function(req, res){
  res.sendFile( rootFolder + '/target.html' );
})

// on a POST request to /hijackForm, respond with JSON
app.post('/hijackForm', function(req, res){
  console.log(req.body);
  res.send(JSON.stringify({ result: "ok" }));
})

// start server
app.listen(port);
console.log('Listening on localhost:' + port);
