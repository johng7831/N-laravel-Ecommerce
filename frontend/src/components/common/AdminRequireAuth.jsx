import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AdminAuthContext } from '../../context/AdminAuth'

const AdminRequireAuth = ({ children }) => {
  const { user } = useContext(AdminAuthContext)

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default AdminRequireAuth

