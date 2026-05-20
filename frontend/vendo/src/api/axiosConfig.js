import axios from 'axios'
import axiosClient from '../api/axiosClient'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
})

export default axiosInstance