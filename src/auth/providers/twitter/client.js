import { startOAuth } from 'auth/providers/oauth1'
import { buildUrl } from 'utils/url'
import { callback } from './_common'

export const getAuthorizeUrl = async () => {
  const params = await startOAuth({
    callback,
    provider: 'twitter',
  })
  return buildUrl('https://api.twitter.com/oauth/authorize', params)
}
