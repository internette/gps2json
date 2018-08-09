# gps2json
CLI to pull photo gps data into a JSON file

**Images MUST be JPEG format**

## Flags / Options

The following parameters are customizable:

- **Name** 
  <br/>`-n` or `--name`: This is the name of the file created. The default is `metadata`.
  <br/><br/>Example:
  ```js
  gps2json -n=image_data

  gps2json --name=new_image_data
  ```
- **Input Folder** 
  <br/>`-i` or `--input`: This is the input folder where the images live. The default is the folder of where the command was ran.
  <br/><br/>Example:
  ```js
  gps2json -i=./src/assets/imgs

  gps2json --input=../imgs/icons
  ```

- **Output Folder** 
  <br/>`-o` or `--output`: This is where the JSON file will live. The default is the folder of where the command was ran.
  <br/><br/>Example:
  ```js
    gps2json -f=./src/assets/JSON

    gps2json --folder=../static
  ```

  **Format**
  <br/>`-f` or `--format`: This is the output file format. The options are `json` and `geojson`. The default is `json`.
  <br/><br/>Example:
  ```js
    gps2json -f=json

    gps2json --format=geojson
  ```