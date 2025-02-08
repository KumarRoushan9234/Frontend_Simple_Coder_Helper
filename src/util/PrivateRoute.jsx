import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

// PrivateRoute component ensures only authenticated users can access certain routes.
const PrivateRoute = () => {
  const authUser = useAuthStore((state) => state.authUser);

  return authUser ? <Outlet /> : <Navigate to="/login" />;
  // Redirect to login if not authenticated
};

export default PrivateRoute;
