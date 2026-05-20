import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children }) {
  const { authUser } = useAuth()

  if (!authUser) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute