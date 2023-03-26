import { getCallbackUrl } from 'auth/utils'

export const callback = getCallbackUrl({
  provider: 'facebook',
})
