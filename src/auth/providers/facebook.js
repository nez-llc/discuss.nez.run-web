import {getAuthorizeUrl as _getAuthorizeUrl, getCallbackUrl, requestGet} from 'auth/commons'

const { FB_CLIENT_ID } = process.env
const FB_API_VERSION = 'v13.0'

const callback = getCallbackUrl({
  provider: 'facebook',
})

const getAccessToken = async ({ code }) => {
  // TODO : 명시적으로 client에 expose안되게
  const { FB_CLIENT_SECRET } = process.env

  const response = await requestGet(`https://graph.facebook.com/${FB_API_VERSION}/oauth/access_token`, {
    client_id: FB_CLIENT_ID,
    client_secret: FB_CLIENT_SECRET,
    redirect_uri: callback,
    code,
  })

  return await response.json()
}

const getAuthorizeUrl = async () =>
  _getAuthorizeUrl('https://www.facebook.com/dialog/oauth', {
    client_id: FB_CLIENT_ID,
    redirect_uri: callback,
    scope: 'email'
  })

export default {
  getAuthorizeUrl,
  getAccessToken,
}
