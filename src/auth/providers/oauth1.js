import { createHmac, randomBytes } from 'crypto'
import { parseToken } from 'auth/utils'
import { post } from 'utils/http'

const percent = s => encodeURIComponent(s)

const timestamp = () => Math.floor(new Date().getTime() / 1000)

const genNonce = (l = 32) => randomBytes(l).toString('base64')

const sign = (key, value) => createHmac('sha1', key)
  .update(value)
  .digest('base64')

const serialize = (method, url, params) => {
  const s = Object.entries(params)
    .sort((a, b) => (
      a > b ? 1 : -1
    ))
    .map(([key, value]) => (
      `${percent(key)}=${percent(value)}`
    ))
    .join('&')

  return `${method}&${percent(url)}&${percent(s)}`
}

const oAuthHeader = params => {
  const s = Object.entries(params)
    .map(([key, value]) => (
      `${percent(key)}="${percent(value)}"`
    ))
    .join(',')

  return `OAuth ${s}`
}

const oAuthParams = additional => ({
  oauth_version: '1.0',
  oauth_signature_method: 'HMAC-SHA1',
  oauth_timestamp: timestamp(),
  oauth_nonce: genNonce(),
  ...additional,
})

const signParams = (method, url, params, key) => {
  const string = serialize(method, url, params)
  params['oauth_signature'] = sign(key, string)
}

const authorizedRequest = async (method, url, params = {}) => {
  const keys = [
    params.oauth_consumer_secret || '',
    params.oauth_token_secret || '',
  ]

  if (params.oauth_consumer_secret) {
    delete params.oauth_consumer_secret
  }

  if (params.oauth_token_secret) {
    delete params.oauth_token_secret
  }

  const key = keys.map(percent).join('&')

  const oauthParams = oAuthParams({
    ...params,
  })

  signParams(method, url, oauthParams, key)

  return await fetch(url, {
    method,
    headers: {
      'Authorization': oAuthHeader(oauthParams),
    },
  })
}

const startOAuth = async ({ provider }) => {
  const response = await post('/api/auth/start', {
    provider,
  })
  return await response.json()
}

const requestToken = async (url, params) => {
  const response = await authorizedRequest('POST', url, params)
  const text = await response.text()
  return parseToken(text)
}

const accessToken = async (url, params) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(params),
  })
  const text = await response.text()
  return parseToken(text)
}

export {
  authorizedRequest,
  startOAuth,
  requestToken,
  accessToken,
}
