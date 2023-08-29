// 锚点链接跳转方法
function goAnchor(selector) {
  document.querySelector(selector).scrollIntoView({
    behavior: 'smooth',
  })
}

export { goAnchor }
