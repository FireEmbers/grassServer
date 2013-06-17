#Grass Gis server

##Usage

<<<<<<< HEAD
    var grassServer = require('grassServer');
    
    var N = 2257553.502315194;
    var S = 2255553.502315194;
    var E = 2823740.2990220916;
    var W = 2821740.2990220916;
    
    var rows = 100;
    var cols = 100;`
    
    grassServer(N, E, S, W, rows, cols, getMaps );
    
    
    
    function getMaps(aspect, slope){
    
      console.log(aspect);
    
      console.log(slope);
    
    }
    

=======
`var grassServer = require('grassServer');`

var N = 2257553.502315194;
var S = 2255553.502315194;
var E = 2823740.2990220916;
var W = 2821740.2990220916;

`var rows = 100;`
`var cols = 100;`

`grassServer(N, E, S, W, rows, cols, getMaps );`



`function getMaps(aspect, slope){`

`  console.log(aspect);`

`  console.log(slope);`

`}`
>>>>>>> a7c9276fed27c6cceba0feba2fca017f85693c57
