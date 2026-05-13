import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axiosClient from '../api/axiosClient'
import { useAuth } from '../context/AuthContext'

function LoginPage() {

  const navigate = useNavigate()

  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState('')

  function handleSubmit(event) {

    event.preventDefault()

    setErrorMessage('')

    const authHeader =
      'Basic ' + btoa(email + ':' + password)

    axiosClient.get('/products', {
      headers: {
        Authorization: authHeader
      }
    })

      .then(function () {

        login(email, password)

        navigate('/')
      })

    .catch(function (error) {
    console.log(error)

    if (error.response) {
        console.log(error.response.status)
        console.log(error.response.data)
    }

    setErrorMessage('Invalid email or password')
    })
  }

  return (

    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-6 col-lg-5">

          <div className="card shadow-sm">

            <div className="card-body">

              <h2 className="card-title text-center mb-4">
                Login
              </h2>

              {errorMessage && (
                <div className="alert alert-danger">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={function (event) {
                      setEmail(event.target.value)
                    }}
                    required
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={function (event) {
                      setPassword(event.target.value)
                    }}
                    required
                  />

                </div>

                <button
                  type="submit"
                  className="btn btn-dark w-100"
                >
                  Login
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default LoginPage