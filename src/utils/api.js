import { useEffect, useMemo, useRef } from 'react'
import { useAuth } from 'auth/use-auth'

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
}

const client = new ApiClient()

const useApi = () => {
  const { token } = useAuth()

  const client = useMemo(() => {
    const client = new ApiClient()

    if (token) {
      client.setToken(token)
    }
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
