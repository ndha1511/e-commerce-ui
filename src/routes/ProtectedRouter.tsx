import React from "react";
import { Role } from "../models/user";
import { useCheckLoginQuery } from "../services/auth.service";
import { Navigate } from "react-router-dom";
import App from "../App";

interface ProtectedRouterProps {
    children: React.ReactNode;
    roles: Role[];
}

const ProtectedRouter: React.FC<ProtectedRouterProps> = (props) => {
    const { children } = props;
    const queryUserMe = useCheckLoginQuery();

    if (queryUserMe.isLoading || queryUserMe.isFetching) {
        return <div>Loading...</div>;
    }

    if(queryUserMe.data === null) {
        return <Navigate to="/auth/login" />
    }
    
    const userRoles = queryUserMe.data?.data?.roles || [];
    const hasPermission = props.roles.some((role) => userRoles.includes(role));
    
    if (!hasPermission) {
        return <Navigate to="/auth/login" />;
    }

    return <App>{children}</App>;

}

export default ProtectedRouter;