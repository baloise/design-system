const http = require('http')
const fs = require('fs')
const path = require('path')

const port = 4000
const root = path.resolve(__dirname)

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.json': 'application/json; charset=utf-8',
}

const server = http.createServer((req, res) => {
  const urlPath = req.url === '/' ? '/index.html' : req.url
  const filePath = path.join(root, decodeURIComponent(urlPath))

  if (!filePath.startsWith(root)) {
    res.writeHead(400)
    res.end('Bad request')
    return
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404)
      res.end('Not found')
      return
    }

    const ext = path.extname(filePath).toLowerCase()
    const mimeType = mimeTypes[ext] || 'application/octet-stream'
    res.writeHead(200, { 'Content-Type': mimeType })
    fs.createReadStream(filePath).pipe(res)
  })
})

server.listen(port, '127.0.0.1', () => {
  console.log(`Server running at http://localhost:${port}/`)
})
