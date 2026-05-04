import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { isMentorAuthenticated } from "./auth"

type ProtectedMentorRouteProps = {
  children: ReactNode
}

const ProtectedMentorRoute = ({ children }: ProtectedMentorRouteProps) => {
  if (!isMentorAuthenticated()) {
    return <Navigate to="/user/auth" replace />
  }

  return <>{children}</>
}

export default ProtectedMentorRoute
