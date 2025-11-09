import type { PropsWithChildren } from "react";
import { useAuth } from "@/api";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
    const { isLoading, isError } = useAuth();

    if (isLoading) {
        return <div>Loading user</div>
    }

    if (isError) {
        return <Navigate to="/auth/signin" replace />
    }

    return children;
}