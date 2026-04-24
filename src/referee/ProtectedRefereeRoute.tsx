import type { ReactNode } from "react"
import { Navigate } from "react-router"
import { isRefereeAuthenticated } from "./auth"

type ProtectedRefereeRouteProps = {
  children: ReactNode
}

const ProtectedRefereeRoute = ({ children }: ProtectedRefereeRouteProps) => {
  if (!isRefereeAuthenticated()) {
    return <Navigate to="/referee/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRefereeRoute