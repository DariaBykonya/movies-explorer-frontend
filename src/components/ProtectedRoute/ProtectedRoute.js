import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, ...props  }) => {
  return (
    props.loggedIn ? children : <Navigate to="/" replace/>
)}

export default ProtectedRoute;