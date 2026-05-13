import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../api/axiosClient'

function RegisterPage() {

  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  function handleSubmit(event) {

    event.preventDefault()

    setErrorMessage('')
    setSuccessMessage('')

    const registerRequest = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    }

    axiosClient.post('/auth/register', registerRequest)

      .then(function () {

        setSuccessMessage('Account created successfully. You can now login.')

        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')

        setTimeout(function () {
          navigate('/login')
        }, 1000)
      })

      .catch(function (error) {

        console.log(error)

        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
        }

        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrorMessage(error.response.data.message)
        } else {
          setErrorMessage('Registration failed.')
        }
      })
  }

  return (

    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-6 col-lg-5">

          <div className="card shadow-sm">

            <div className="card-body">

              <h2 className="card-title text-center mb-4">
                Register
              </h2>

              {errorMessage && (
                <div className="alert alert-danger">
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="alert alert-success">
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">
                    First Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={firstName}
                    onChange={function (event) {
                      setFirstName(event.target.value)
                    }}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Last Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={lastName}
                    onChange={function (event) {
                      setLastName(event.target.value)
                    }}
                    required
                  />
                </div>

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
                  className="btn btn-primary w-100"
                >
                  Create account
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default RegisterPage