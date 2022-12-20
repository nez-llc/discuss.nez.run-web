import {useAuth} from 'auth/use-auth'
import {useMemo} from 'react'

const { API_ENDPOINT } = process.env

class ApiClient {
  constructor () {
    this.headers = {
      'Content-Type': 'application/json',
    }
  }

  setToken (token) {
    this.headers = {
      ...this.headers,
      Authorization: `Bearer ${token}`,
    }
  }

  async get(url, params) {
    const qs = new URLSearchParams()

    const response = await fetch(`${API_ENDPOINT}${url}`, {
      method: 'GET',
      headers: this.headers,
    })

    const data = await response.json()

    return {
      code: response.status,
      data,
    }
  }

  async post (url, params) {
    const response = await fetch(`${API_ENDPOINT}${url}`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: this.headers,
    })

    const data = await response.json()

    return {
      code: response.status,
      data,
    }
  }

  async put (url, params) {
    const response = await fetch(`${API_ENDPOINT}${url}`, {
      method: 'PUT',
      body: JSON.stringify(params),
      headers: this.headers,
    })

    const data = await response.json()

    return {
      code: response.status,
      data,
    }
  }

  async delete (url, params) {
    const response = await fetch(`${API_ENDPOINT}${url}`, {
      method: 'DELETE',
      headers: this.headers,
    })

    const data = await response.json()

    return {
      code: response.status,
      data,
    }
  }
}

const client = new ApiClient()

const useApi = (_token) => {
  const { token } = useAuth()

  const client = useMemo(() => {
    const client = new ApiClient()

    if (token) {
      client.setToken(token)
    } else if (_token) {
      client.setToken(_token)
    }

    return client
  }, [token])

  return {
    client,
  }
}

export {
  ApiClient,
  client,
  useApi,
}
