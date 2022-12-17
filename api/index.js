/* eslint-disable @typescript-eslint/no-var-requires */
const app = require('express')()
const handler = require('serve-handler')

app.get('/api*', (req, res) => {
  return handler(req, res, {
    unlisted: ['index.js', 'ping.js'],
  })
})

module.exports = app

// app.listen(3333, () => {
//   console.log('ready')
// })
