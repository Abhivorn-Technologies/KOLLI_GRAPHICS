import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { handleSendMail } from './server/mailHandler.js'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 3000
const DIST_DIR = path.resolve(__dirname, 'dist')

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

const server = http.createServer(async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept')

  if (req.method === 'OPTIONS') {
    res.statusCode = 200
    res.end()
    return
  }

  // API Route: /api/send-mail
  if (req.url === '/api/send-mail' && req.method === 'POST') {
    return handleSendMail(req, res)
  }

  // Serve Static Files from dist/
  let filePath = path.join(DIST_DIR, req.url === '/' ? 'index.html' : req.url)
  const extname = String(path.extname(filePath)).toLowerCase()

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // SPA Fallback to index.html
      const indexPath = path.join(DIST_DIR, 'index.html')
      fs.readFile(indexPath, (readErr, content) => {
        if (readErr) {
          res.statusCode = 404
          res.end('Not Found')
          return
        }
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(content, 'utf-8')
      })
      return
    }

    const contentType = MIME_TYPES[extname] || 'application/octet-stream'
    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.statusCode = 500
        res.end('Server Error')
        return
      }
      res.writeHead(200, { 'Content-Type': contentType })
      res.end(content, 'utf-8')
    })
  })
})

server.listen(PORT, () => {
  console.log(`Kolli Graphics Server running on port ${PORT}`)
})
