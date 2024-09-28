import { ReactNode } from "react";
import './admin-layout.scss';
import Header from "./header/Header";
import Navbar from "./navbar/Navbar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
    return <div className="admin-layout">
        <div className="navbar-admin">
            <Navbar></Navbar>
        </div>
        <div className="admin-layout-left">
            <div className="header-admin">
                <Header></Header>
            </div>
            <div className="content-navbar-admin">{children}</div>
        </div>
    </div>
}

export default AdminLayout;