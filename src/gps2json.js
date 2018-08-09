#!/usr/bin/env node

const fs = require('fs');
const path = require( 'path' );
const process = require( "process" );
const ExifImage = require('exif').ExifImage;
const exifGeojson = require('exif-geojson');
const args = process.argv.filter((itm)=> { return !/\/bin\/gps2json/g.test(itm) && !/\/bin\/node/g.test(itm) ? itm : undefined});

const options = {
  name: 'metadata',
  input: process.env.PWD,
  output: process.env.PWD,
  format: 'json'
}

for(option of Object.keys(options)){
  const full_opt = `--${option}`
  const short_opt = `-${option.substring(0,1)}`;
  if(args.join('').includes(full_opt) || args.join('').includes(short_opt)){
    options[option] = args.filter((arg)=> {
      if(arg.includes(short_opt) || arg.includes(full_opt)){
        return arg;
      }
    })[0].split('=')[1];
    options[option] = options[option].indexOf('./') > -1 ? path.join(process.env.PWD, options[option]) : options[option];
  }
}

let meta_as_json = [];
new Promise((resolve, reject)=> {
  const files = fs.readdirSync(options.input);
  for(var i = 0; i < files.length; i++){
    const file = files[i];
    const img = path.join(options.input, file);
    if(fs.statSync(img).isFile()){
      new ExifImage({ image : img }, function (error, exifData) {
        if (error)
          return reject('Error: '+error.message);
        else
          if (options.format === 'geojson'){
            meta_as_json.push({
              "type": "Feature", 
              "properties": { 
                "name": img, 
                "marker-color": "#0000ff",
                "marker-symbol": "rail-metro",
                "line": "blue" 
              }, 
              "geometry": exifGeojson(exifData)
            });
          } else {
            meta_as_json.push({name: img, gps: exifData.gps});
          }
          if(meta_as_json.length === files.length){
            return resolve(meta_as_json);
          }
      });
    }
  }
}).then((img_arr)=> {
  if (!fs.existsSync(options.output)){
    fs.mkdirSync(options.output);
  }
  if (options.format === 'geojson'){
    fs.writeFileSync(path.join(options.output, `${options.name}.geojson`), JSON.stringify(img_arr));
  } else {
    img_arr = { "type": "FeatureCollection", "features": img_arr }
    fs.writeFileSync(path.join(options.output, `${options.name}.json`), JSON.stringify(img_arr));
  }
});