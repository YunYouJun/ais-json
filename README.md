# ais-json

A npm package about AIS (Automatic Identification System) text decoding.

Decode AIS text, then return JSON object.

npm address: <https://www.npmjs.com/package/ais-json>

## Structure

Name | Description
---|---
index.js | main function (call decode.js and include verify ais text)
encode.js | generate `ascii6bit.json` and `num2char.json`
decode.js | decode ais text and return json (base on `ascii6bit.json` and `num2char.json`)
ascii6bit.json | connect ascii to 6 bit code
num2char.json | connect number to char



# Install

```
npm install ais-json
```

# Usage
## Decode AIS Text
```
const ais = require('ais-json')
let aisinfo = ais(text)
```

AIS Text Example : 
```
!AIVDM,1,1,,A,15Cgah00008LOnt>1Cf`s6NT00SU,0*3D
```

## Open SerialPort
```
cd ais-json
node serialport
```
### Default
Port: COM3
BaudRate: 38400

## Encode Table
```
cd ais-json
node encode
```
Generate `ascii6bit.json` and `num2char.json`.

# Dependency

[node-serialport](https://github.com/node-serialport/node-serialport)
