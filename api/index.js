/* eslint-disable @typescript-eslint/no-var-requires */
const app = require('express')()
const handler = require('serve-handler')
const morgan = require('morgan')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const path = require('path')

app.use(cors())
app.use(compression())
app.use(helmet())
app.use(morgan('tiny'))

app.get('/api*', (req, res) => {
  console.log('__dirname', __dirname)
  return handler(req, res, {
    unlisted: ['index.js', 'ping.js'],
    public: path.join(__dirname, '..'),
  })
})

module.exports = app

// app.listen(3333, () => {
//   console.log('ready')
// })
