import { createBrowserRouter, Navigate } from "react-router-dom";
import UserLayout from "../layout/user/UserLayout";
import Home from "../pages/user/home/Home";
import Cart from "../pages/user/cart/Cart";
import Payment from "../pages/user/payment/Payment";
import Login from "../pages/user/auth/login/Login";
import ProductDetail from "../pages/user/product/ProductDetail";
import Account from "../pages/user/account/Account";
import Profile from "../pages/user/account/profile/Profile";
import Address from "../pages/user/account/address/Address";
import Password from "../pages/user/account/password/Password";
import Purchase from "../pages/user/account/purchase/Purchase";
import Notification from "../pages/user/account/notification/Notification";
import Voucher from "../pages/user/account/voucher/Voucher";
import AuthLayout from "../layout/user/auth/AuthLayout";
import Register from "../pages/user/auth/register/Register";
import VerifyEmail from "../pages/user/auth/register/VerifyEmail";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout><Home/></UserLayout>
    },
    {
        path: "/cart",
        element: <UserLayout><Cart/></UserLayout>
    },
    {

        path: "/payment",
        element: <UserLayout><Payment/></UserLayout>
    }, 
    {
        path: "/login",
        element: <AuthLayout><Login/></AuthLayout>
    },
    {
        path: "/register",
        element: <AuthLayout><Register/></AuthLayout>
    },
    {
        path: "/verify-email",
        element: <AuthLayout><VerifyEmail/></AuthLayout>
    },
    {
        path: "/user",
        element: <Navigate to={"account"}/>
    },
    {
        path: "/user/account",
        element: <Navigate to={"profile"}/>
    },
    {
        path: "/user/account/profile",
        element: <UserLayout><Account><Profile/></Account></UserLayout>
    },
    {
        path: "/user/account/address",
        element: <UserLayout><Account><Address/></Account></UserLayout>
    },
    {
        path: "/user/account/password",
        element: <UserLayout><Account><Password/></Account></UserLayout>
    },
    {
        path: "/user/purchase",
        element: <UserLayout><Account><Purchase/></Account></UserLayout>
    },
    {
        path: "/user/notifications",
        element: <UserLayout><Account><Notification/></Account></UserLayout>
    },
    {
        path: "/user/vouchers",
        element: <UserLayout><Account><Voucher/></Account></UserLayout>
    }
    , {
        path: "/product/:key",
        element: <UserLayout><ProductDetail/></UserLayout>
    },

]);