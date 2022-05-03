export const spinnerContent = new Map<string, string>()
const requests = new Map<string, Promise<any>>()

export const getSpinnerAnimationData = (url: string) => {
  // see if we already have a request for this url
  let req = requests.get(url)

  if (!req) {
    if (typeof fetch !== 'undefined' && typeof document !== 'undefined') {
      // we don't already have a request
      req = fetch(url).then(rsp => {
        if (rsp.ok) {
          return rsp.json().then(jsonContent => {
            spinnerContent.set(url, jsonContent || '')
          })
        }
        spinnerContent.set(url, '')
        return
      })

      // cache for the same requests
      requests.set(url, req)
    } else {
      // set to empty for ssr scenarios and resolve promise
      spinnerContent.set(url, '')
      return Promise.resolve()
    }
  }

  return req
}
