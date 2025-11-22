import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import type { RootState } from "../app/store";

export const ProtectedRoleRoutes = () => {
    const authState = useSelector((state: RootState) => state.auth);
    return authState.value?.role.id === 1 ? <Outlet /> : <Navigate to="/platform-exam" replace />
}