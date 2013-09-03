var util = require('util');
var exec = require('child_process').exec;
var path = require('path');

var aspectData;
var slopeData;

var srcDir = path.join(__dirname);

module.exports = function(N, S, E, W, rows, cols, cb){

  var ID = Math.ceil(Math.random()*1000);

  execMaps(ID, N, S, E, W, rows, cols, cb);

};

function execMaps(ID, N, S, E, W, rows, cols, cb){

  console.log(process.cwd());

  var execString = 'cd '+ srcDir +'; ' + path.join(__dirname,'grass_script.sh')+ ' ' + N + ' ' + S + ' '+ E + ' ' + W + ' ' + rows + ' ' + cols + ' ' + ID;

  var child = exec(execString, onMapCreate);

  function onMapCreate(error, stderr, stdout){

    console.log('stdout:\n ' + stdout);

    if (error !== null) {
      console.log('exec error: ' + error);
      console.log('stderr: ' + stderr);
    }

    catAspect(ID, rows, cols, cb);

  }
}

var catOptions = { 
    encoding: 'utf8',
    maxBuffer: 3/*megas*/*1024*1024
};

function catAspect(ID, rows, cols, cb){

  var child;

  var execString = 'cd '+ srcDir +'; cat srtm'+ ID + '_aspect.grass';

  child = exec(execString, catOptions ,onCat);

  function onCat(error, stdout, stderr){

    aspectData = stdout;

    if (error !== null) {
      console.log('exec error: ' + error);
      console.log('stderr: ' + stderr);
    }

    else{

      catSlope(ID, rows, cols, cb);

    }

  }
}

function catSlope(ID, rows, cols, cb){

  var child;

  var execString = 'cd ' + srcDir + '; cat srtm'+ ID + '_slope.grass';

  child = exec(execString, catOptions, onCat);

  function onCat(error, stdout, stderr){

    slopeData = stdout;

    if (error !== null) {
      console.log('exec error: ' + error);
      console.log('stderr: ' + stderr);
    }

    else{

      cb(grassCatToArray(aspectData, rows, cols), grassCatToArray(slopeData, rows, cols));

      var rmString = 'cd ' + srcDir + '; \
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

function grassCatToArray(data, cols, rows) {

  /*
    receives grass file data in string format and returns a float array
  */


  //removes grass file header
  var dataString = data.replace(/(.+?\n){6}/, '').match(/[\d.]+/g);

  var array = Array(cols*rows);

  for (var cell = 0; cell < cols * rows; cell++)
    array[cell] = parseFloat(dataString[cell]);

  return array;
}