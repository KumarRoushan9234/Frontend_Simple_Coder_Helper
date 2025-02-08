import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const PrivateRoute = () => {
  const authUser = useAuthStore((state) => state.authUser);

  if (authUser === undefined) {
    // Optional: Display a loading screen instead of redirecting while checking auth state
    return <div>Loading...</div>;
  }

  return authUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
