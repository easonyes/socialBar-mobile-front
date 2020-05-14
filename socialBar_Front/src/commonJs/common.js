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

/**
 * 登录后的信息存储
 */
const localStore = (result) => {
  localStorage.setItem('currentSite', result.defaultSite)
  let siteList = eval(result.siteList).map(item => {
    item['text'] = item.siteName
    item['value'] = item.id
    console.log(item)
    return item
  })
  localStorage.setItem('siteList', JSON.stringify(siteList))
  localStorage.setItem('status', result.status)
  localStorage.setItem('userinfo', JSON.stringify(result))
  localStorage.setItem('avatar', result.avatar)
  localStorage.setItem('name', result.nickname)
  localStorage.setItem('email', result.email)
}

export default{
  educationChange,
  localStore,
}