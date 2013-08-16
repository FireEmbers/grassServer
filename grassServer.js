#!/usr/bin/env node

var grassClient = require('./src/grassClient');

var express = require('express');
var app = express();

app.configure(function(){
  app.use(express.bodyParser());
});

app.post('/grassdata', function(req, res){

  var N =    parseFloat(req.body.north);
  var S =    parseFloat(req.body.south);
  var E =    parseFloat(req.body.east);
  var W =    parseFloat(req.body.west);
  var rows = parseFloat(req.body.r);
  var cols = parseFloat(req.body.c);

  grassClient(N, S, E, W, rows, cols, cb);

  function cb(aspect, slope){
    res.send({'aspect': aspect, 'slope': slope});
  }

});

app.listen(8081);
