
<p align="center">
  <a href="https://ais.yunyoujun.cn" target="_blank" rel="noopener noreferrer"><img width="100" src="https://raw.githubusercontent.com/YunYouJun/ais.js/master/src/assets/anchor.png" alt="AIS Logo"></a>
  <h1 align="center">ais-json</h1>
</p>

<p align="center">
  <a href="https://npmcharts.com/compare/ais-json?minimal=true"><img src="https://img.shields.io/npm/dt/ais-json.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/ais-json"><img src="https://img.shields.io/npm/v/ais-json.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/ais-json"><img src="https://img.shields.io/npm/l/ais-json.svg" alt="License"></a>
  <a href="http://img.badgesize.io/https://unpkg.com/ais-json?compression=gzip&label=gzip%20size:%20CSS">
    <img src="http://img.badgesize.io/https://unpkg.com/ais-json?compression=gzip&label=gzip%20size:%20CSS">
  </a>
</p>

# ais-json

A npm package about AIS (Automatic Identification System) text decoding.

Decode AIS text, then return JSON object.

npm address: <https://www.npmjs.com/package/ais-json>
Online test: <https://ais.js.org>

## Structure

Name | Description
---|---
index.js | main function (call decode.js and include verify ais text)
encode.js | generate `ascii6bit.json` and `num2char.json`
decode.js | decode ais text and return json (base on `ascii6bit.json` and `num2char.json`)
ascii6bit.json | connect ascii to 6 bit code
num2char.json | connect number to char

# Install

```sh
npm install ais-json
```

# Usage

## In Terminal

```sh
npx ais-json '!AIVDM,1,1,,A,15Cgah00008LOnt>1Cf`s6NT00SU,0*3D'
```

Then, you will get:

```json
{
  "MessageID": {
    "data": 1,
    "info": "Ship Position Report"
  },
  "DataIndicator": {
    "data": 0,
    "info": "Default"
  },
  "UserID": {
    "data": 356248000,
    "info": 356248000
  },
  "NaviStatus": {
    "data": 0,
    "info": "Engine In Use"
  },
  "ROT": {
    "data": "0°/min",
    "info": "0°/min"
  },
  "SOG": {
    "data": "0Knot",
    "info": "0Knot"
  },
  "Accuracy": {
    "data": 0,
    "info": "High(<10m)"
  },
  "Location": {
    "data": [118.07354333333333, 24.502496666666666],
    "info": "E 118°4.4126′ , N 24°30.1498′"
  },
  "COG": {
    "data": "228.4°",
    "info": "228.4°"
  },
  "Heading": {
    "data": "207°",
    "info": "207°"
  },
  "Second": {
    "data": 18,
    "info": "18 seconds past the minute"
  },
  "RegionalApplication": {
    "data": 0,
    "info": "Unavailable"
  },
  "Spare": {
    "data": 0,
    "info": "Unused"
  },
  "RAIM": {
    "data": 0,
    "info": "Unused"
  },
  "CommunicationState": {
    "data": "0000000100011100101",
    "info": "SOTDMA 4:57 UTC"
  },
  "text": "!AIVDM,1,1,,A,15Cgah00008LOnt>1Cf`s6NT00SU,0*3D"
}
```

## In Project

### Import

```js
// const ais = require('ais-json')
import ais from 'ais-json'
```

### Set Language

```js
// default is en
// locales: [en, cn]
ais.setLocale('cn')
```

### Decode AIS Text

```js
let aisinfo = ais.parse('!AIVDM,1,1,,A,15Cgah00008LOnt>1Cf`s6NT00SU,0*3D')
```

### Open SerialPort

If you need it.

[node-serialport](https://github.com/node-serialport/node-serialport)

```sh
cd ais-json
node serialport
```

#### Default

Port: COM3  
BaudRate: 38400

### Encode Table

```sh
cd ais-json
node encode
```

Generate `ascii6bit.json` and `num2char.json`.

## Intend

- [ ] Release 0.2.0
