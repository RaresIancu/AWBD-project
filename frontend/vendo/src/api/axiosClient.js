import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use(function (config) {
  const savedUser = localStorage.getItem('authUser')

  if (savedUser) {
    const authUser = JSON.parse(savedUser)

    config.headers.Authorization = authUser.authHeader
  }

  return config
})

export default axiosClient