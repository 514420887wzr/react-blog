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
      url: 'http://127.0.0.1:6060/' + file.path.split('\\')[file.path.split('\\').length - 1],
    },
  }
})

module.exports = router
