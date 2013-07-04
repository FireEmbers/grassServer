var grassServer = require('./grassServer');
var write2D = require('../utils/write2D')

var N = 2257553.502315194;
var S = 2255553.502315194;
var E = 2823740.2990220916;
var W = 2821740.2990220916;

var rows = 500;
var cols = 500;

grassServer(N, S, E, W, rows, cols, function(aspect, slope){
  write2D(aspect, rows, cols, 'aspect.map');
  write2D(slope, rows, cols, 'slope.map');
});