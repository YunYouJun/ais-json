import i18n from './i18n'
import ascii6bit from './ascii6bit.json'
import { decodeMessage } from './decode.js'
import pkg from '../package.json'

// 信息转为二进制编码 （使用 6 bit ASCII 码表）
function message2bit (message) {
  let bitMessage = ''
  for (let i = 0; i < message.length; i++) {
    bitMessage += ascii6bit[message[i]]
  }
  return bitMessage
}

// 分割AIS信息帧
function divideAIS (text) {
  let frame = text.toString().split(',')
  let infoFrame = {
    'type': frame[0],
    'total': frame[1], // 发送这一信息需要的句子总数 (1一9)
    'order': frame[2], // 本句的句子序数 (1一9)
    'series': frame[3], // 连续信息的识别 (0-9)
    'channel': frame[4], // AIS信道号
    'message': frame[5], // 封装信息
    'fill': frame[6] // x表示填充的BIT数 (0一5) ; hh表示校验字节
  }
  return infoFrame
}

let ais = {}
ais.version = pkg.version
ais.i18n = i18n

// set language
ais.setLocale = function setLocale(lang) {
  i18n.setLocale(lang)
}

// verify ais
ais.verify = function verify(text) {
  let frame = text.toString().split(',')
  if (frame.length < 7) {
    return false
  }
  return true
}

// parse ais text
ais.parse = function parse(text) {
  if (!ais.verify(text)) {
    return false
  }
  let frame = divideAIS(text)
  let bitMessage = message2bit(frame['message'])
  if (frame['type'] === '!AIVDM') {
    // !AIVDM,a,b,c,d,e-e,f，hh(CR)(LF)
    // (AIS VHF data-link Message) 含有船舶动态和船舶静态信息、航行相关信息
  } else if (frame['type'] === '!AIVDO') {
    // (AIS VHF data-link Own-vessel report) 含有本船动态信息
  }
  let info = decodeMessage(bitMessage)
  info.text = text
  return info
}

// main
// export instance
export default ais
