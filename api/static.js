// eslint-disable-next-line @typescript-eslint/no-var-requires
const serve = require('serve-handler')

export default function handler(request, response) {
  return serve(request, response, {
    public: './api/static',
  })
}
