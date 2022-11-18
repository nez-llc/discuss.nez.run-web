
const { API_ENDPOINT } = process.env

class ApiClient {
  constructor () {

  }

  async get(url, params) {
    const qs = new URLSearchParams()

    const response = await fetch(`${API_ENDPOINT}${url}`, {
      method: 'GET',
    })
  }

  async post (url, params) {
    const response = await fetch(`${API_ENDPOINT}${url}`, {
      method: 'POST',
      body: JSON.stringify(params),
    })

    const data = await response.json()

    return {
      code: response.status,
      data,
    }
  }
}

const client = new ApiClient()

export {
  ApiClient,
  client,
}
