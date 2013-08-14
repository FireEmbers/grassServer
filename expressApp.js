var grassClient = require('./src/grassClient');

var express = require('express');
var app = express();

app.configure(function(){
  app.use(express.bodyParser());
});

app.post('/grassdata', function(req, res){

  var N = req.body.north;
  var S = req.body.south;
  var E = req.body.east;
  var W = req.body.west;
  var rows = req.body.r;
  var cols = req.body.c;

  grassClient(N, S, E, W, rows, cols, cb);

  function cb(aspect, slope){
    res.send({'aspect': aspect, 'slope': slope});
  }

});

app.listen(8080);
