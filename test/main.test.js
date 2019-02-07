const ais = require('..')
const result = require('./result.json')

test('decode ais text: example 1', () => {
  let aisinfo = ais('!AIVDM,1,1,,A,15Cgah00008LOnt>1Cf`s6NT00SU,0*3D')
  expect(aisinfo).toEqual(result);
})
