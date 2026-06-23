import { createContext, useContext, useState } from 'react'
import axiosClient from '../api/axiosClient'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(function () {
    const savedUser = localStorage.getItem('authUser')
    return savedUser ? JSON.parse(savedUser) : null
  })

  function login(email, password) {
    const authHeader = 'Basic ' + btoa(email + ':' + password)

    return axiosClient.get('/auth/me', {
      headers: {
        Authorization: authHeader,
      },
    })
      .then(function (response) {
        const user = {
          email: response.data.email,
          password: password,
          authHeader: authHeader,
          roles: response.data.roles,
        }

        localStorage.setItem('authUser', JSON.stringify(user))
        setAuthUser(user)

        return user
      })
  }

  function logout() {
    localStorage.removeItem('authUser')
    setAuthUser(null)
  }

  function isAdmin() {
    return authUser &&
      authUser.roles &&
      authUser.roles.includes('ROLE_ADMIN')
  }

  return (
    <AuthContext.Provider value={{ authUser, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}