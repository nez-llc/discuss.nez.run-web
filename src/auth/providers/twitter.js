import { getCallbackUrl } from 'auth/commons'
import { requestToken, accessToken, startOAuth } from 'auth/oauth1'

const { TWITTER_CONSUMER_KEY } = process.env

const callback = getCallbackUrl({
  provider: 'twitter',
})

const getOAuthToken = async () => {
  // TODO : 명시적으로 client에 expose안되게
  const { TWITTER_CONSUMER_SECRET } = process.env

  return await requestToken('https://api.twitter.com/oauth/request_token', {
    oauth_consumer_key: TWITTER_CONSUMER_KEY,
    oauth_consumer_secret: TWITTER_CONSUMER_SECRET,
    oauth_callback: callback,
  })
}

const getAccessToken = async ({ oauth_token, oauth_verifier }) => {
  // TODO : 명시적으로 client에 expose안되게
  return await accessToken('https://api.twitter.com/oauth/access_token', {
    oauth_token,
    oauth_verifier,
  })
}

const getAuthorizeUrl = async () => {
  const params = await startOAuth({
    callback,
    provider: 'twitter',
  })
  const qs = new URLSearchParams(params).toString()
  return `https://api.twitter.com/oauth/authorize?${qs}`
}

export default {
  getOAuthToken,
  getAccessToken,
  getAuthorizeUrl,
}
