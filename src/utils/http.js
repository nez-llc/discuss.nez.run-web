import { buildUrl } from 'utils/url'

export const get = async (url, params) => (
  fetch(buildUrl(url, params))
)

export const post = async (url, params) => (
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  })
)
