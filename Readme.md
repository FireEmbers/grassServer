#Grass Gis server

This modules uses a bash script to access Grass Gis srtm maps for the Embers project. We have an express app using the grass client (see Usage> grass express app), receiving arguments in the request body and sending the aspect and slope arrays in with the response.send method. See
[expressApp.js](https://github.com/FireEmbers/grassserver/blob/master/expressApp.js)

##Install

```
npm install git://github.com:FireEmbers/grassserver.git
```

##Usage

###grass server

Launch the service with

`node expressApp`


### grass client

This is the client which the grass server requires to reply to the grass client (not to be 
confused with the first grass client, which although is a client, it's not the same client as the second client).

var getClient = require('grassClient');

var N = 2257553.502315194;
var S = 2255553.502315194;
var E = 2823740.2990220916;
var W = 2821740.2990220916;

var rows = 100;
var cols = 100;`

grassServer(N, S, E, W, rows, cols, getMaps );

function getMaps(aspect, slope){

  console.log(aspect);

  console.log(slope);

}

