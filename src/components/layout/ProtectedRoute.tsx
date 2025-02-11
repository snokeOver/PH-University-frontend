import { ReactNode } from "react";
import { useAuthSelector } from "../../redux/hooks";

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useAuthSelector();
  if (!token) return <Navigate to={"/login"} replace={true} />;
  return children;
};

export default ProtectedRoute;
