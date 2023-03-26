import { accessToken, requestToken } from 'auth/providers/oauth1'
import { callback } from './_common'

const { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET } = process.env

export const getOAuthToken = async () => (
  requestToken('https://api.twitter.com/oauth/request_token', {
    oauth_consumer_key: TWITTER_CONSUMER_KEY,
    oauth_consumer_secret: TWITTER_CONSUMER_SECRET,
    oauth_callback: callback,
  })
)

export const getAccessToken = async ({ oauth_token, oauth_verifier }) => (
  accessToken('https://api.twitter.com/oauth/access_token', {
    oauth_token,
    oauth_verifier,
  })
)
