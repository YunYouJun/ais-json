import num2char from './num2char.json'

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
      type = '基站报告'
      break
    case 5:
      type = '静态、航行相关数据'
      break
    case 10:
      type = 'UTC/日期响应'
      break
    case 11:
      type = '申请安全相关信息'
      break
    case 12:
      type = safeConfirm(bitMessage)
      break
    case 13:
      type = '安全广播信息'
      break
    default:
      type = '无该分类信息'
  }
  return type
}

// 转发指示符
function classifyIndicator (indicator) {
  let type = ''
  if (indicator === 0) {
    type = '默认'
  } else if (indicator === 3) {
    type = '不再转发'
  } else {
    type = '转发了' + indicator + '次'
  }
  return type
}

// 导航状态分类
function classifyNaviStatus (naviStatus) {
  let type = ''
  switch (naviStatus) {
    case 0:
      type = '发动机使用中'
      break
    case 1:
      type = '锚泊'
      break
    case 2:
      type = '未操纵'
      break
    case 3:
      type = '有限适航性'
      break
    case 4:
      type = '受船舶吃水限制'
      break
    case 5:
      type = '系泊'
      break
    case 6:
      type = '搁浅'
      break
    case 7:
      type = '从事捕捞'
      break
    case 8:
      type = '航行中'
      break
    case 9:
      type = '留做将来修正导航状态，用于载运危险品（DG）、有害物质（HS）或海洋污染物（MP）的船舶，或载运 IMO 的C类危险品或污染物、高速船（HSC）'
      break
    case 10:
      type = '留做将来修正导航状态，用于载运DG、HS或MP，或载运IMO的A类危险品或污染物的船舶，WIG'
      break
    case 11:
    case 12:
    case 13:
      type = '留做将来用'
      break
    case 14:
      type = 'AIS-SART（Search and Rescue Radar Transponder）（现行的）'
      break
    case 15:
      type = '未规定/默认值'
      break
    default:
      type = '无该分类信息'
  }
  return type
}

// 位置精确度
function classifyAccuracy (accuracy) {
  let type = ''
  if (accuracy === '0') {
    type = '低(>10m)'
  } else {
    type = '高(<10m)'
  }
  return type
}

// 时戳分类
function classifySecond (second) {
  let type = ''
  if (second < 60) {
    type = second + ' seconds past the minute'
  } else if (second === 60) {
    type = '不可用'
  } else if (second === 61) {
    type = '定位系统在人工输入模式下'
  } else if (second === 62) {
    type = '电子定位系统工作在估计（航迹推算）模式下'
  } else if (second === 63) {
    type = '定位系统不起作用'
  }
  return type
}

// 特定操纵指示符
function classifyRegionalApplication (regionalApplication) {
  let type = ''
  if (regionalApplication === 0) {
    type = '不可用'
  } else if (regionalApplication === 1) {
    type = '未进行特定操纵'
  } else if (regionalApplication === 2) {
    type = '进行特定操纵'
  }
  return type
}

// 备用
function classifySpare (spare) {
  let type = ''
  if (spare === 0) {
    type = '未使用'
  }
  return type
}

// RAIM 标志
function classifyRAIM (RAIM) {
  let type = ''
  if (RAIM === 0) {
    type = 'RAIM未使用'
  } else if (RAIM === 1) {
    type = 'RAIM正在使用'
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

  let sog = parseInt(bitMessage.slice(50, 60), 2) / 10 + '节' // Speed over ground，0000000000 = 0

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
      name: '消息ID',
      data: id,
      info: '船位报告'
    },
    'DataIndicator': {
      name: '转发指示符',
      data: indicator,
      info: indicatorType
    },
    'UserID': {
      name: '用户ID(MMSI)',
      data: MMSI,
      info: MMSI
    },
    'NaviStatus': {
      name: '导航状态',
      data: naviStatus,
      info: naviStatusType
    },
    'ROT': {
      name: '旋转速率',
      data: rate,
      info: rate
    },
    'SOG': {
      name: '地面航速',
      data: sog,
      info: sog
    },
    'Accuracy': {
      name: '地面航速',
      data: accuracy,
      info: accuracyType
    },
    'Location': {
      name: '坐标',
      data: coordinateData,
      info: coordinateInfo
    },
    'COG': {
      name: '地面航线',
      data: cog,
      info: cog
    },
    'Heading': {
      name: '实际航向',
      data: heading,
      info: heading
    },
    'Second': {
      name: '时戳',
      data: second,
      info: secondType
    },
    'RegionalApplication': {
      name: '特定操纵指示符',
      data: regionalApplication,
      info: regionalApplicationType
    },
    'Spare': {
      name: '备用',
      data: spare,
      info: spareType
    },
    'RAIM': {
      name: 'RAIM',
      data: RAIM,
      info: RAIMType
    },
    'CommunicationState': {
      name: '通信状态',
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
    type = '无重复发送'
  } else if (RepeatFlag === 1) {
    type = '重发'
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
      name: '消息ID',
      data: id,
      info: '安全相关确认'
    },
    'DataIndicator': {
      name: '转发指示符',
      data: indicator,
      info: indicatorType
    },
    'SourceID': {
      name: '信源ID',
      data: SourceID,
      info: SourceID
    },
    'SerialID': {
      name: '序列编号',
      data: SerialNo,
      info: SerialNo
    },
    'DestinationID': {
      name: '目的地ID',
      data: DestID,
      info: DestID
    },
    'RepeatFlag': {
      name: '重发标志',
      data: RepeatFlag,
      info: RepeatFlagType
    },
    'Spare': {
      name: '备用',
      data: spare,
      info: spareType
    },
    'SecureText': {
      name: '安全相关文本',
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
