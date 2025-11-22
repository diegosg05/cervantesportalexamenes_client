import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import type { RootState } from "../app/store";

export const ProtectedExamStartRoutes = () => {
    const examState = useSelector((state: RootState) => state.exam);
    return examState.value ? <Outlet /> : <Navigate to="/platform-exam" replace />
}