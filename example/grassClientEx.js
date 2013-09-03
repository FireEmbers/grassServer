var grassClient = require('./../src/grassClient');
var write2D = require('embersutils').write2D;
var path = require('path');

var N = 2257553.502315194;
var S = 2255553.502315194;
var E = 2823740.2990220916;
var W = 2821740.2990220916;

var rows = 100;
var cols = 100;

grassClient(N, S, E, W, rows, cols, function(aspect, slope){
  write2D(aspect, rows, cols, path.join(__dirname,'aspect.map'));
  write2D(slope, rows, cols, path.join(__dirname,'slope.map'));
});