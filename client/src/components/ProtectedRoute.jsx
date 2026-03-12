import { Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { isValidClerkPublishableKey } from "../utils/clerk";

const hasClerk = isValidClerkPublishableKey(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

function ClerkProtectedRoute({ children, allowedRole }) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <p className="p-6 text-center text-slate-600">Loading...</p>;
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRole) {
    return children;
  }

  const role = localStorage.getItem("reservation-role");
  if (role !== allowedRole) {
    return <Navigate to={role === "doctor" ? "/doctor" : "/doctors"} replace />;
  }

  return children;
}

function LocalProtectedRoute({ children, allowedRole }) {
  const isSignedIn = localStorage.getItem("reservation-auth") === "1";

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRole) {
    return children;
  }

  const role = localStorage.getItem("reservation-role");
  if (role !== allowedRole) {
    return <Navigate to={role === "doctor" ? "/doctor" : "/doctors"} replace />;
  }

  return children;
}

function ProtectedRoute(props) {
  return hasClerk ? <ClerkProtectedRoute {...props} /> : <LocalProtectedRoute {...props} />;
}

export default ProtectedRoute;
