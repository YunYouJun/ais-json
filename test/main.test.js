import ais from '..'
import cn from '../src/locales/cn.json'
import result from './result.json'

test('i18n: cn', () => {
  ais.setLocale('cn')
  expect(ais.i18n.__('AIS')).toEqual(cn.AIS)
})

test('Decode ais text', () => {
  let aisinfo = ais.parse('!AIVDM,1,1,,A,15Cgah00008LOnt>1Cf`s6NT00SU,0*3D')
  console.log(aisinfo)
  expect(aisinfo).toEqual(result)
})
