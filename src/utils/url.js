
export const buildUrl = (base, params) => {
  const url = new URL(base)
  url.search = new URLSearchParams(params).toString()
  return url.toString()
}

export const appendQueryString = (url, appends) => {
  const urlObject = new URL(url)
  const params = new URLSearchParams(urlObject.search)
  Object.entries(appends).forEach(([key, value]) => {
    params.set(key, value)
  })
  urlObject.search = params.toString()
  return urlObject.toString()
}
