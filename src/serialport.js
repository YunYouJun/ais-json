const SerialPort = require('serialport')
const fs = require('fs')

const portName = 'COM3'
const baudRate = 38400

let data = []
let currentbuf
let lastbuf = Buffer.from('')
let buf = Buffer.from('')

const port = new SerialPort(portName, {
  baudRate: baudRate
},
  function (err) {
    if (err) {
      return console.log('Error:', err.message)
    }

    port.on('data', function (data) {
      currentbuf = Buffer.from(data, 'ascii')
      try {
        if (currentbuf.toString()[0] === '!' || currentbuf.toString()[0] === '$' || currentbuf.toString()[0] === '\r' || currentbuf.toString()[0] === '\n') {
          let text = lastbuf.toString()
          text = text.replace(/\n/, '')
          text = text.replace(/\r/, '')
          console.log('Data: ' + text)
          saveAisText(text)
          buf = currentbuf
        } else {
          buf = Buffer.concat([lastbuf, currentbuf])
        }
      } catch (e) {
        console.log('Buffer Error!')
      }
      lastbuf = buf
    })
  }
)

function saveAisText (aisText) {
  // let today = new Date()
  // today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  // let dataName = '../assets/AisMessage/' + today + '-AIS.json'
  let dataName = '../assets/AisMessage/' + 'AIS.json'
  let time = new Date().toLocaleString()
  let newData = {
    time: time,
    aisText: aisText
  }

  data.push(newData)

  fs.writeFile(dataName, JSON.stringify(data), function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log('Save AIS text success!')
    }
  })
}

// saveAisText('!AIVDM,1,1,,B,16:=hkP0018eSa:AaN;cb`Kh0@QE,0*61')
// saveAisText('!AIVDM,1,1,,A,15Cgah00008LOnt>1Cf`s6NT00SU,0*3D')
// saveAisText('!AIVDO,1,1,,,168rO000008;Mp:APith06RP0000,0*25')
// saveAisText('!AIVDM,1,1,,A,<68rO0IR>Wh0J8?EP@5>70,4*23')
