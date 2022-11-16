const KEY = 'token'

const authorize = async (token) => {
  localStorage.setItem(KEY, token)
}

export {
  authorize,
}
