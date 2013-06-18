var grassServer = require('./grassServer');

var N = 2257553.502315194;
var S = 2255553.502315194;
var E = 2823740.2990220916;
var W = 2821740.2990220916;

var rows = 5;
var cols = 5;

grassServer(N, S, E, W, rows, cols, function(aspect, slope){
  console.log('aspect:\n ',aspect);
  console.log('slope: \n ',slope);
});