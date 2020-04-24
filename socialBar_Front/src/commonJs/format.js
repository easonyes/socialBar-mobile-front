/**
 * 数据脱敏
 */

 const dataFormat = data => {
   return data.substr(0, 2) + '*'.repeat(data.length - 4) + data.substr(data.length - 2)
 }