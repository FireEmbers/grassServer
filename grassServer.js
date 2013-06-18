var util = require('util');
var exec = require('child_process').exec;

var aspectData;
var slopeData;


module.exports = function(N, S, E, W, rows, cols, cb){

  var ID = Math.ceil(Math.random()*1000);

  execMaps(ID, N, S, E, W, rows, cols, cb);

};

function execMaps(ID, N, S, E, W, rows, cols, cb){


  var execString = 'cd /home/fsousa/src/crp/embers/grassServer; \
  ./grass_script.sh ' + N + ' ' + S + ' '+ E + ' ' + W + ' ' + rows + ' ' + cols + ' ' + ID;

  var child = exec(execString, onMapCreate);

  function onMapCreate(error, stderr, stdout){

    console.log('stdout:\n ' + stdout);

    if (error !== null) {
      console.log('exec error: ' + error);
      console.log('stderr: ' + stderr);
    }

    catAspect(ID, cb);

  }

}

function catAspect(ID, cb){

  var child;

  var execString = 'cd /home/fsousa/src/crp/embers/grassServer; cat srtm'+ ID + '_aspect.grass';

  child = exec(execString, onCat);

  function onCat(error, stdout, stderr){

    aspectData = stdout;

    if (error !== null) {
      console.log('exec error: ' + error);
      console.log('stderr: ' + stderr);
    }

    else{

      catSlope(ID, cb);

    }

  }
}

function catSlope(ID, cb){

  var child;

  var execString = 'cd /home/fsousa/src/crp/embers/grassServer; cat srtm'+ ID + '_slope.grass';

  child = exec(execString, onCat);

  function onCat(error, stdout, stderr){

    slopeData = stdout;

    if (error !== null) {
      console.log('exec error: ' + error);
      console.log('stderr: ' + stderr);
    }

    else{

      cb(aspectData, slopeData);

      var rmString = 'cd /home/fsousa/src/crp/embers/grassServer; \
      rm srtm'+ ID + '_slope.grass; \
      rm srtm'+ ID + '_aspect.grass; \
      rm srtm'+ ID + '_height.grass';

      var rmFile = exec(rmString, onRm);

      function onRm(error, stdout, stderr){

        slopeData = stdout;

          if (error !== null) {
            console.log('exec error: ' + error);
            console.log('stderr: ' + stderr);
          }
      }
    }

  }
}