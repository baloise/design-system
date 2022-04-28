const express = require('express')
const path = require('path')
const serveIndex = require('serve-index')

const app = express()

app.set('port', 3333)

app.use(express.static(path.join(__dirname, 'www')))
app.use(serveIndex(path.join(__dirname, 'www')))

const server = app.listen(app.get('port'), () => {
  console.log('The server is running on http://localhost:' + app.get('port'))
})

process.on('SIGINT', () => {
  server.close(() => {
    process.exit(0)
  })
})
