import React, { Suspense } from "react";
import { Role } from "../models/user";
import { useCheckLoginQuery } from "../services/auth.service";
import { Navigate } from "react-router-dom";

interface ProtectedRouterProps {
    children: React.ReactNode;
    roles: Role[];
}

const ProtectedRouter: React.FC<ProtectedRouterProps> = (props) => {
    const { children } = props;
    const queryUserMe = useCheckLoginQuery();

    if (queryUserMe.isLoading || queryUserMe.isFetching) {
        return <Suspense></Suspense>;
    }

    if(queryUserMe.data === null) {
        return <Navigate to="/auth/login" />
    }
    
    const userRoles = queryUserMe.data?.data?.roles || [];
    const hasPermission = props.roles.some((role) => userRoles.includes(role));
    
    if (!hasPermission) {
        return <Navigate to="/auth/login" />;
    }

    return children;

}

export default ProtectedRouter;