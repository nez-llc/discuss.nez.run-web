import { appendQueryString } from 'utils/url'

const SITE_URL = process.env.SITE_URL || 'http://localhost:3000'
const BASE_CALLBACK = `${SITE_URL}/api/auth/callback`

const getCallbackUrl = params => appendQueryString(BASE_CALLBACK, params)

const getAuthorizeUrl = (url, params) => {
  const qs = new URLSearchParams(params).toString()
  return `${url}?${qs}`
}

const parseToken = s => Object.fromEntries(
  s.split('&').map(part => part.split('='))
)

const requestGet = async (url, params) => {
  const qs = new URLSearchParams(params).toString()
  return await fetch(`${url}?${qs}`)
}

const requestPost = async (url, params) => {
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  })
}

export {
  getCallbackUrl,
  getAuthorizeUrl,
  requestGet,
  requestPost,
  parseToken,
}
