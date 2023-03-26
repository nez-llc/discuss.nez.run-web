import { buildUrl } from 'utils/url'
import { callback } from './_common'

const FB_CLIENT_ID = process.env.FB_CLIENT_ID

export const getAuthorizeUrl = async () => (
  buildUrl('https://www.facebook.com/dialog/oauth', {
    client_id: FB_CLIENT_ID,
    redirect_uri: callback,
    scope: 'email',
  })
)
