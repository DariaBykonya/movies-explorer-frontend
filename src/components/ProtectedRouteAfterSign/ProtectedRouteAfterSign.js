import { Navigate } from "react-router-dom";

const ProtectedRouteAfterSign = ({ children, ...props  }) => {
  return (
    !props.loggedIn ? children : <Navigate to="/" replace/>
)}

export default ProtectedRouteAfterSign;