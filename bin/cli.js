#!/usr/bin/env node

// !AIVDM,1,1,,A,15Cgah00008LOnt>1Cf`s6NT00SU,0*3D
const ais = require('..')
let aisText = process.argv.splice(2)[0]
if (aisText) {
  console.log(ais(aisText))
}
