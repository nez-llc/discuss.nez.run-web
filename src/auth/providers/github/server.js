import { post } from 'utils/http'
import { parseToken } from 'auth/utils'
import { callback } from './_common'

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env

export const getAccessToken = async ({ code }) => {
  const response = await post('https://github.com/login/oauth/access_token', {
    client_id: GITHUB_CLIENT_ID,
    client_secret: GITHUB_CLIENT_SECRET,
    redirect_uri: callback,
    code,
  })

  return parseToken(await response.text())
}
