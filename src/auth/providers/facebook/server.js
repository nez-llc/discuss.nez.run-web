import { get } from 'utils/http'
import { callback } from './_common'

const { FB_CLIENT_ID, FB_CLIENT_SECRET } = process.env
const FB_API_VERSION = 'v13.0'

export const getAccessToken = async ({ code }) => {
  const response = await get(`https://graph.facebook.com/${FB_API_VERSION}/oauth/access_token`, {
    client_id: FB_CLIENT_ID,
    client_secret: FB_CLIENT_SECRET,
    redirect_uri: callback,
    code,
  })

  return await response.json()
}
