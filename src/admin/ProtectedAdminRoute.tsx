import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { isAdminAuthenticated } from "./auth"

type ProtectedAdminRouteProps = {
  children: ReactNode
}

const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace />
  }

  return <>{children}</>
}

export default ProtectedAdminRoute
