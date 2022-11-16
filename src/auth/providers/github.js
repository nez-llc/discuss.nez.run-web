import {
  parseToken,
  requestPost,
  getCallbackUrl,
  getAuthorizeUrl as _getAuthorizeUrl,
} from 'auth/commons'

const { GITHUB_CLIENT_ID } = process.env

const callback = getCallbackUrl({
  provider: 'github',
})

const getAccessToken = async ({ code }) => {
  // TODO : 명시적으로 client에 expose안되게
  const { GITHUB_CLIENT_SECRET } = process.env

  const response = await requestPost('https://github.com/login/oauth/access_token', {
    client_id: GITHUB_CLIENT_ID,
    client_secret: GITHUB_CLIENT_SECRET,
    redirect_uri: callback,
    code,
  })

  return parseToken(await response.text())
}

const getAuthorizeUrl = async () =>
  _getAuthorizeUrl('https://github.com/login/oauth/authorize', {
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: callback,
  })

export default {
  getAuthorizeUrl,
  getAccessToken,
}
