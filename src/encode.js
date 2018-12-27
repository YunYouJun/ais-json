const fs = require('fs')
// 生成 8bitASCII码转6bit 二进制表
// node encode 执行生成命令
let i, j
let chr = {}
let filename = 'ascii6bit.json'

// 补0 成为n位数
function addZero (digit, n) {
  let zero = ''
  for (let i = 0; i < n; i++) {
    zero += '0'
  }
  return (zero + digit).slice(-n)
}

// 8bit to 6bit 建立数组对应
for (i = 0; i < 40; i++) {
  chr[String.fromCharCode(48 + i)] = addZero(i.toString(2), 6)
}

for (j = 40; j < 64; j++) {
  chr[String.fromCharCode(56 + j)] = addZero(j.toString(2), 6)
}

fs.writeFile(filename, JSON.stringify(chr), function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('Generate table about 8bit-ascii-to-6bit success!')
  }
})

// 生成数字转字符表
let tablename = 'num2char.json'
let num = {}
for (i = 0; i < 32; i++) {
  num[i] = String.fromCharCode(64 + i)
}

for (i = 32; i < 64; i++) {
  num[i] = String.fromCharCode(i)
}

fs.writeFile(tablename, JSON.stringify(num), function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('Generate table about number-to-char success!')
  }
})