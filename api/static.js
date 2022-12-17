/* eslint-disable @typescript-eslint/no-var-requires */

// const serve = require('serve-handler')

// export default function handler(request, response) {
//   return serve(request, response, {
//     public: './api/static',
//   })
// }

const handler = require('serve-handler')
const http = require('http')

const server = http.createServer((request, response) => {
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/zeit/serve-handler#options
  return handler(request, response)
})

server.listen(process.env.PORT || 5000, () => {
  console.log('Running at http://localhost:5000')
})
