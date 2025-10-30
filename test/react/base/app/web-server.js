import compression from 'compression'
import express from 'express'
import path from 'path'
import serveIndex from 'serve-index'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.set('port', 4200)

app.use(compression())
app.use(express.static(path.join(__dirname, 'dist')))
app.use(serveIndex(path.join(__dirname, 'dist')))

const server = app.listen(app.get('port'), () => {
  console.log('The server is running on http://localhost:' + app.get('port'))
})

process.on('SIGINT', () => {
  server.close(() => {
    process.exit(0)
  })
})
