const fs = require('fs')
const Router = require('koa-router')
const router = new Router({ prefix: '/uploads' })

router.post('/file', async (ctx, next) => {
  const file = ctx.request.files.file
  console.log(`filename`, file.path.split('\\')[file.path.split('\\').length - 1])

  ctx.response.status = 200
  ctx.body = {
    code: 200,
    data: {
      // 服务器需改为：
      url: file.path.split('/')[file.path.split('/').length - 1],
      // 本地运行
      // url: file.path.split('\\')[file.path.split('\\').length - 1],
    },
  }
})

module.exports = router
