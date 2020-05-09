/**
 * 学历转换
 */

const educationChange = (edu) => {
  switch(edu) {
    case 1:
      return '专科'
    case 2:
      return '本科'
    case 3:
      return '硕士'
    case 4:
      return '博士'
  }
}

export default{
  educationChange,
}