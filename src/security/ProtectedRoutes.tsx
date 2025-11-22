import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import type { RootState } from "../app/store";

export const ProtectedRoutes = () => {
    const authState = useSelector((state: RootState) => state.auth);
    return authState.value ? <Outlet /> : <Navigate to="/login" replace />
}