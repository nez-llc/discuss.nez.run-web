import { appendQueryString } from 'utils/url'

const SITE_URL = process.env.SITE_URL || 'http://localhost:3000'
const BASE_CALLBACK = `${SITE_URL}/api/auth/callback`

const getCallbackUrl = params => appendQueryString(BASE_CALLBACK, params)

const parseToken = s => Object.fromEntries(
  s.split('&').map(part => part.split('='))
)

export {
  getCallbackUrl,
  parseToken,
}
