#!/usr/bin/env node

const fs = require('fs');
const path = require( 'path' );
const process = require( "process" );
const app_root = require('app-root-path').path;
const ExifImage = require('exif').ExifImage;
const args = process.argv.filter((itm)=> { return !/\/bin\/gps2json/g.test(itm) && !/\/bin\/node/g.test(itm) ? itm : undefined});

const options = {
  name: 'metadata',
  folder: app_root,
  output: app_root
}

for(option of Object.keys(options)){
  const full_regex = new RegExp(`--${option}`, 'gi');
  const shorthand_regex = new RegExp(`-${option.substring(0,1)}`, 'gi');
  if(full_regex.test(args.join('')) || shorthand_regex.test(args.join(''))){
    options[option] = args.filter((arg)=> { return full_regex.test(arg) || shorthand_regex.test(arg) ? arg : undefined})[0].split('=')[1];
    options[option] = options[option].indexOf('./') > -1 ? path.join(path.dirname(require.main.filename).dir, options[option]) : options[option];
  }
}

let meta_as_json = [];
new Promise((resolve, reject)=> {
  const files = fs.readdirSync(options.folder);
  for(var i = 0; i < files.length; i++){
    const file = files[i];
    const img = path.join(options.folder, file);
    if(fs.statSync(img).isFile()){
      new ExifImage({ image : img }, function (error, exifData) {
        if (error)
          return reject('Error: '+error.message);
        else
          meta_as_json.push({name: img, gps: exifData.gps});
          if(meta_as_json.length === files.length){
            return resolve(meta_as_json);
          }
      });
    }
  }
}).then((img_arr)=> {
  const json_obj = JSON.stringify(img_arr);
  fs.writeFile(path.join(options.output, `${options.name}.json`), json_obj, (err)=> {
    console.error(err);
  });
});