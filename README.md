# gps2json
CLI to pull photo gps data into a JSON file

**Images MUST be JPEG format**

## Flags / Options

The following parameters are customizable:

- *Name* `-n` or `--name`: This is the name of the file created
  Example:
  ```js
  gps2json -n=image_data

  gps2json --name=new_image_data
  ```
- *Base Folder* `-f` or `--folder`: This is the folder where the images live
  Example:
  ```js
  gps -f=./src/assets/imgs

  gps --folder=../imgs/icons
  ```

- *Output Folder* `-o` or `--output`: This is where the JSON file will live
  Example:
  ```js
    gps -f=./src/assets/JSON

    gps --folder=../static
  ```
