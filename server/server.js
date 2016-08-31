var express = require('express');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var browserify = require('browserify-middleware');

var app = express();
exports.app = app;

var port = process.env.PORT || 4500;
var rootFolder = path.join(__dirname, '..');

// middleware to enable CORS, serve up static assests and parse JSON
app.use(cors())
   .use(express.static(rootFolder))
   .use(bodyParser.json());

// serve javascript assets compiled by browserify and transpiled by babel
app.get('/bind/script.js',
 browserify('./bind/bind.js', {
    transform: [ [ require('babelify'), { presets: ['es2015'] } ] ]
  })
);

// load up target file containing form
app.get('/*', function(req, res){
  res.sendFile( rootFolder );
});

// on a POST request to /hijackForm, respond with JSON
app.post('/hijackForm', function(req, res){
  console.log(req.body);
  res.send(JSON.stringify({ result: "ok" }));
});

// load up mocha/chai testing file
app.get('/test', function(req, res){
  res.sendFile( rootFolder + '/test');
});

// start server
app.listen(port);
console.log('Listening on localhost:' + port);
