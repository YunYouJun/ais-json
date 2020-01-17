
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
    "info": "船位报告"
  },
  "DataIndicator": {
    "data": 0,
    "info": "默认"
  },
  "UserID": {
    "data": 356248000,
    "info": 356248000
  },
  "NaviStatus": {
    "data": 0,
    "info": "发动机使用中"
  },
  "ROT": {
    "data": "0°/min",
    "info": "0°/min"
  },
  "SOG": {
    "data": "0节",
    "info": "0节"
  },
  "Accuracy": {
    "data": 0,
    "info": "高(<10m)"
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
    "info": "不可用"
  },
  "Spare": {
    "data": 0,
    "info": "未使用"
  },
  "RAIM": {
    "data": 0,
    "info": "RAIM未使用"
  },
  "CommunicationState": {
    "data": "0000000100011100101",
    "info": "SOTDMA 4:57 UTC"
  },
  "text": "!AIVDM,1,1,,A,15Cgah00008LOnt>1Cf`s6NT00SU,0*3D"
}
```

## In Project

### Decode AIS Text

```sh
# const ais = require('ais-json')
import ais from 'ais-json'
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

- [ ] CLI
