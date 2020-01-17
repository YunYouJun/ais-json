import num2char from './num2char.json'
import { __ } from 'i18n'

// 二进制转经纬度 (字母)
function bit2coordinate (bitLongitude, bitLatitude) {
  let longitude = bit2degree(bitLongitude.slice(1), 'coordinate')
  let latitude = bit2degree(bitLatitude.slice(1), 'coordinate')
  if (bitLongitude.slice(0, 1) === '0') {
    longitude = 'E ' + longitude
  } else if (bitLongitude.slice(0, 1) === '1') {
    longitude = 'W ' + longitude
  }
  if (bitLatitude.slice(0, 1) === '0') {
    latitude = 'N ' + latitude
  } else if (bitLatitude.slice(0, 1) === '1') {
    latitude = 'S ' + latitude
  }
  let coordinate = {
    longitude,
    latitude
  }
  return coordinate
}

// 二进制转经纬度 (地图解析用数据)
function bit2MapCoordinate (bitLongitude, bitLatitude) {
  let longitude = parseInt(bitLongitude, 2)
  let latitude = parseInt(bitLatitude, 2)
  if (bitLongitude.slice(0, 1) === '0') {
    longitude = longitude / 10000 / 60
  } else if (bitLongitude.slice(0, 1) === '1') {
    longitude = -longitude / 10000 / 60
  }
  if (bitLatitude.slice(0, 1) === '0') {
    latitude = +latitude / 10000 / 60
  } else if (bitLatitude.slice(0, 1) === '1') {
    latitude = -latitude / 10000 / 60
  }
  let coordinate = [longitude, latitude]
  return coordinate
}

// 二进制转度数
function bit2degree (bit, type) {
  let origin = parseInt(bit, 2)
  let result = ''
  if (type === 'coordinate') { // 如果为经纬度坐标
    origin = origin / 10000
    let degree = parseInt(origin / 60)
    let minute = (origin % 60).toFixed(4)
    result = degree + '°' + minute + '′'
  } else if (type === 'cog') { // 如果为航向
    result = origin / 10 + '°'
  } else if (type === 'heading') { // 如果为实际船头方向
    result = origin + '°'
  }
  return result
}

// 消息ID 报文分类
function classifyID (id, bitMessage) {
  let type = ''
  switch (id) {
    case 1:
    case 2:
    case 3:
      type = positionReport(bitMessage)
      break
    case 4:
      type = __('Base Station Report')
      break
    case 5:
      type = __('Static, Navigation-related Data')
      break
    case 10:
      type = __('UTC/Date Response')
      break
    case 11:
      type = __('Apply for safety related information')
      break
    case 12:
      type = safeConfirm(bitMessage)
      break
    case 13:
      type = __('Broadcast information')
      break
    default:
      type = __('No such information')
  }
  return type
}

// 转发指示符
function classifyIndicator (indicator) {
  let type = ''
  if (indicator === 0) {
    type = __('Default')
  } else if (indicator === 3) {
    type = __('No Longer Transmit')
  } else {
    type = __('Transmit Times') + ': ' + indicator
  }
  return type
}

// 导航状态分类
function classifyNaviStatus (naviStatus) {
  let type = ''
  switch (naviStatus) {
    case 0:
      type = __('Engine In Use')
      break
    case 1:
      type = __('At Anchor')
      break
    case 2:
      type = __('Not manipulated')
      break
    case 3:
      type = __('Limited airworthiness')
      break
    case 4:
      type = __('Limited by ship draft')
      break
    case 5:
      type = __('Moored')
      break
    case 6:
      type = __('Stranded')
      break
    case 7:
      type = __('Engage In Fishing')
      break
    case 8:
      type = __('During Voyage')
      break
    case 9:
      type = __('Reserved for future correction of navigation status for ships carrying dangerous goods (DG), hazardous substances (HS) or marine pollutants (MP), or carrying IMO Class C dangerous goods or pollutants, high-speed ships (HSC)')
      break
    case 10:
      type = __('Reserved for future amendment of navigational status for ships carrying dangerous goods (DG), harmful substances (HS) or marine pollutants (MP), or IMO hazard or pollutant category A, wing in ground (WIG)')
      break
    case 11:
    case 12:
    case 13:
      type = __('Reserved for future use')
      break
    case 14:
      type = __('AIS-SART (Search and Rescue Radar Transponder)')
      break
    case 15:
      type = __('Default')
      break
    default:
      type = __('No Info')
  }
  return type
}

// 位置精确度
function classifyAccuracy (accuracy) {
  let type = ''
  if (accuracy === '0') {
    type = __('Low(>10m)')
  } else {
    type = __('High(<10m)')
  }
  return type
}

// 时戳分类
function classifySecond (second) {
  let type = ''
  if (second < 60) {
    type = second + ' seconds past the minute'
  } else if (second === 60) {
    type = __('Unavailable')
  } else if (second === 61) {
    type = __('Positioning system in manual input mode')
  } else if (second === 62) {
    type = __('Electronic positioning system works in estimation (track estimation) mode')
  } else if (second === 63) {
    type = __('Positioning system does not work"')
  }
  return type
}

// 特定操纵指示符
function classifyRegionalApplication (regionalApplication) {
  let type = ''
  if (regionalApplication === 0) {
    type = __('Unavailable')
  } else if (regionalApplication === 1) {
    type = __('No specific manipulation')
  } else if (regionalApplication === 2) {
    type = __('Specific manipulation')
  }
  return type
}

// 备用
function classifySpare (spare) {
  let type = ''
  if (spare === 0) {
    type = __('Unused')
  }
  return type
}

// RAIM 标志
function classifyRAIM (RAIM) {
  let type = ''
  if (RAIM === 0) {
    type = __('Unused')
  } else if (RAIM === 1) {
    type = __('In Use')
  }
  return type
}

// 通信状态
function classifyCommunicationState (id, cState) {
  let type = ''
  let cTimeType = ''
  let cTimeInfo = ''
  if (id === 1) {
    type = 'SOTDMA'
  } else if (id === 2) {
    type = 'SOTDMA'
  } else if (id === 3) {
    type = 'ITDMA'
  }
  if (cState.slice(0, 2) === '00') {
    cTimeType = 'UTC'
    let cTime = new Date()
    cTime.setHours(parseInt(cState.slice(5, 10), 2))
    cTime.setMinutes(parseInt(cState.slice(10, 17), 2))
    cTimeInfo = cTime.getHours() + ':' + cTime.getMinutes()
  }
  if (cState.slice(2, 5) === '000') {
    // means that this was the last transmission in the slot
  }
  type = type + ' ' + cTimeInfo + ' ' + cTimeType
  return type
}

// 解码封装信息：船位报告
function positionReport (bitMessage) {
  let info = {}
  let id = parseInt(bitMessage.slice(0, 6), 2) // Identifier for this message

  let indicator = parseInt(bitMessage.slice(6, 8), 2) // Repeat Indicator, 0 = default
  let indicatorType = classifyIndicator(indicator)

  let MMSI = parseInt(bitMessage.slice(8, 38), 2) // MMSI

  let naviStatus = parseInt(bitMessage.slice(38, 42), 2) // Navigational staus,0000=underway using engine
  let naviStatusType = classifyNaviStatus(naviStatus)

  let rate = 4.733 * Math.sqrt(parseInt(bitMessage.slice(42, 50), 2)) + '°/min'// Rate of turn，00000000=0

  let sog = parseInt(bitMessage.slice(50, 60), 2) / 10 + __('Knot') // Speed over ground，0000000000 = 0

  let accuracy = parseInt(bitMessage.slice(60, 61), 2) // Position accuracy, 0=LOW
  let accuracyType = classifyAccuracy(accuracy)

  let coordinate = bit2coordinate(bitMessage.slice(61, 89), bitMessage.slice(89, 116)) // Longitude & Latitude in 1/10000 minutes
  let coordinateData = bit2MapCoordinate(bitMessage.slice(61, 89), bitMessage.slice(89, 116))
  let coordinateInfo = coordinate.longitude + ' , ' + coordinate.latitude

  let cog = bit2degree(bitMessage.slice(116, 128), 'cog') // Course over ground 对地航向
  let heading = bit2degree(bitMessage.slice(128, 137), 'heading') // True Heading 实际航向

  let second = parseInt(bitMessage.slice(137, 143), 2) // UTC second when report, 010010 = 18 seconds past the minute;
  let secondType = classifySecond(second)

  let regionalApplication = parseInt(bitMessage.slice(143, 145), 2) // Regional Application, 0000 = no regional application
  let regionalApplicationType = classifyRegionalApplication(regionalApplication)

  let spare = parseInt(bitMessage.slice(145, 148), 2) // Spare
  let spareType = classifySpare(spare)

  let RAIM = parseInt(bitMessage.slice(148, 149), 2) // RAIM Flag, 0 = RAIM not in use
  let RAIMType = classifyRAIM(RAIM)

  let cState = bitMessage.slice(149, 168) // communications State, 0 = RAIM not in use, bits 167-168 not used for UTC Sub-message
  let cStateType = classifyCommunicationState(id, cState)

  info = {
    'MessageID': {
      data: id,
      info: __('Ship Position Report')
    },
    'DataIndicator': {
      data: indicator,
      info: indicatorType
    },
    'UserID': {
      data: MMSI,
      info: MMSI
    },
    'NaviStatus': {
      data: naviStatus,
      info: naviStatusType
    },
    'ROT': {
      data: rate,
      info: rate
    },
    'SOG': {
      data: sog,
      info: sog
    },
    'Accuracy': {
      data: accuracy,
      info: accuracyType
    },
    'Location': {
      data: coordinateData,
      info: coordinateInfo
    },
    'COG': {
      data: cog,
      info: cog
    },
    'Heading': {
      data: heading,
      info: heading
    },
    'Second': {
      data: second,
      info: secondType
    },
    'RegionalApplication': {
      data: regionalApplication,
      info: regionalApplicationType
    },
    'Spare': {
      data: spare,
      info: spareType
    },
    'RAIM': {
      data: RAIM,
      info: RAIMType
    },
    'CommunicationState': {
      data: cState,
      info: cStateType
    }
  }
  return info
}

// 重发标志
function classifyRepeatFlag (RepeatFlag) {
  let type = ''
  if (RepeatFlag === 0) {
    type = __('NoDuplicateSending')
  } else if (RepeatFlag === 1) {
    type = __('Resend')
  }
  return type
}

// 安全相关文本 （使用 6 bit ASCII 码）
function classifySecureText (SecureText) {
  let text = ''
  for (let i = 0; i < SecureText.length; i = i + 6) {
    text = text + num2char[parseInt(SecureText.substr(i, 6), 2)]
  }
  return text
}

// 解码封装信息：安全相关确认信息
function safeConfirm (bitMessage) {
  let info = {}
  let id = parseInt(bitMessage.slice(0, 6), 2) // Identifier for this message

  let indicator = parseInt(bitMessage.slice(6, 8), 2) // Repeat Indicator, 0 = default
  let indicatorType = classifyIndicator(indicator)

  let SourceID = parseInt(bitMessage.slice(8, 38), 2) // MMSI

  let SerialNo = parseInt(bitMessage.slice(38, 40), 2) // 序列编号

  let DestID = parseInt(bitMessage.slice(40, 70), 2) // MMSI

  let RepeatFlag = parseInt(bitMessage.slice(70, 71), 2) // 重发标志
  let RepeatFlagType = classifyRepeatFlag(RepeatFlag)

  let spare = parseInt(bitMessage.slice(71, 72), 2) // 备用
  let spareType = classifySpare(spare)

  let SecureText = bitMessage.slice(72) // 安全相关文本
  let SecureTextInfo = classifySecureText(SecureText)

  info = {
    'MessageID': {
      data: id,
      info: '安全相关确认'
    },
    'DataIndicator': {
      data: indicator,
      info: indicatorType
    },
    'SourceID': {
      data: SourceID,
      info: SourceID
    },
    'SerialID': {
      data: SerialNo,
      info: SerialNo
    },
    'DestinationID': {
      data: DestID,
      info: DestID
    },
    'RepeatFlag': {
      data: RepeatFlag,
      info: RepeatFlagType
    },
    'Spare': {
      data: spare,
      info: spareType
    },
    'SecureText': {
      data: SecureText,
      info: SecureTextInfo
    }
  }
  return info
}

// 解码封装信息
export function decodeMessage (bitMessage) {
  let info = {}
  let id = parseInt(bitMessage.slice(0, 6), 2) // Identifier for this message
  info = classifyID(id, bitMessage) // 分类消息 进行不同处理
  return info
}
