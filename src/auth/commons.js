import {appendQueryString} from 'utils/url'

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

const getToken = (context) => {
  const readCookie = () => {
    const cookies = context.req ? context.req.headers.cookie
        .split(';')
        .map(cookie => cookie.split('='))
        .reduce((acc, [key, value]) => {
          acc[key.trim()] = decodeURIComponent(value)
          return acc
        }, {}) : {}

    return cookies
  }

  const cookies = readCookie()
  return cookies['auth'];
}

export {
  getCallbackUrl,
  getAuthorizeUrl,
  requestGet,
  requestPost,
  parseToken,
  getToken,
}
