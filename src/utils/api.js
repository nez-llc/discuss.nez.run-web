import { useMemo } from 'react'
import { useAuth } from 'auth/use-auth'

const { API_ENDPOINT } = process.env

class ApiClient {
  constructor() {
    this.headers = {
      'Content-Type': 'application/json',
    }
  }

  get token() {
    return this.headers.Authorization
  }

  setToken(token) {
    this.headers = {
      ...this.headers,
      Authorization: `Bearer ${token}`,
    }
  }

  async get(path, params) {
    const qs = new URLSearchParams(params)

    const response = await fetch(`${API_ENDPOINT}${path}?${qs.toString()}`, {
      method: 'GET',
      headers: this.headers,
    })

    const data = await response.json()

    return {
      code: response.status,
      data,
    }
  }

  async post(path, params) {
    const response = await fetch(`${API_ENDPOINT}${path}`, {
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

  async filePost(file) {
    const formData = new FormData()
    formData.append('file', file, file.name)
    const response = await fetch(`${API_ENDPOINT}/api/members/files`, {
      method: 'POST',
      body: formData,
      headers: {'Authorization': this.headers.Authorization},
    })

    const data = await response.json()

    return {
      code: response.status,
      data,
    }
  }

  async filePostUrl(path, file, params) {
    const formData = new FormData()
    formData.append('file', file, file.name)
    for (const [key, value] of Object.entries(params)) {
      formData.append(key, value)
    }
    const response = await fetch(`${API_ENDPOINT}${path}`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': this.headers.Authorization,
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
      },
    })

    const data = await response.json()

    return {
      code: response.status,
      data,
    }
  }

  async put(path, params) {
    const response = await fetch(`${API_ENDPOINT}${path}`, {
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

  async delete(url, params) {
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

    client.setToken(_token || token)

    return client
  }, [token, _token])

  return {
    client,
  }
}

export {
  ApiClient,
  client,
  useApi,
}
