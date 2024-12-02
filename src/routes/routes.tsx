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
import InsertProduct from "../pages/admin/product/InsertProduct";
import AuthLayout from "../layout/user/auth/AuthLayout";
import Register from "../pages/user/auth/register/Register";
import VerifyEmail from "../pages/user/auth/register/VerifyEmail";
import ForgotPassword from "../pages/user/auth/reset-password/ForgotPassword";
import ResetPassword from "../pages/user/auth/reset-password/ResetPassword";
import AdminLayout from "../layout/admin/AdminLayout";
import Product from "../pages/admin/product/Product";
import ProductAttribute from "../pages/admin/product/ProductAttribute";
import ProductStock from "../pages/admin/product/ProductStock";
import ProductImport from "../pages/admin/product/ProductImport";
import Category from "../pages/admin/category/Category";
import CategoryUser from "../pages/user/category/Category";
import PurchaseAdmin from "../pages/admin/purchase/PurchaseAdmin";
import Brand from "../pages/admin/brand/CreateBrand";
import Batch from "../pages/admin/product/Batch";
import BrandList from "../pages/admin/brand/BrandList";
import CreateEmployee from "../pages/admin/employee/CreateEmployee";
import EmployeeList from "../pages/admin/employee/EmployeeList";
import App from "../App";
import NotFound from "../pages/not-found/NotFound";
import Message from "../pages/admin/message/Message";
import PaymentSuccess from "../pages/user/payment/PaymentSuccess";
import PuchaseDetail from "../pages/user/payment/PurchaseDetail";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import CreateVoucher from "../pages/admin/voucher/CreateVoucher";
import CreatePromotion from "../pages/admin/promotion/CreatePromotion";
import ProtectedRouter from "./ProtectedRouter";
import { Role } from "../models/user";
import ProductKeyword from "../pages/user/product/ProductKeyword";


interface RouterRole {
    path: string;
    element: React.ReactNode;
    role?: Role[];
}

const authRouters = [
    {
        path: "/auth/login",
        element: <AuthLayout><Login/></AuthLayout>
    },
    {
        path: "/auth/register",
        element: <AuthLayout><Register/></AuthLayout>
    },
    {
        path: "/auth/verify-email",
        element: <AuthLayout><VerifyEmail/></AuthLayout>
    },
    {
        path: "/auth/forgot-password",
        element: <AuthLayout><ForgotPassword/></AuthLayout>
    },
    {
        path: "/auth/create-new-password",
        element: <AuthLayout><ResetPassword/></AuthLayout>
    },

]

const publicUserRouters: RouterRole[] = [
    {
        path: "*",
        element: <NotFound />
    },
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/product/:key",
        element: <ProductDetail/>
    },
    {
        path: "/:categoryPath",
        element: <CategoryUser/>
    },
    {
        path: "/products",
        element: <ProductKeyword/>
    }
   
]

const privateUserRouters: RouterRole[] = [
    {
        path: "/cart",
        element: <Cart/>
    },
    {

        path: "/payment",
        element: <Payment/>
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
        element: <Account><Profile/></Account>
    },
    {
        path: "/user/account/address",
        element: <Account><Address/></Account>
    },
    {
        path: "/user/account/password",
        element: <Account><Password/></Account>
    },
    {
        path: "/user/purchase",
        element: <Account><Purchase/></Account>
        
    },
    {
        path: "/user/notifications",
        element: <Account><Notification/></Account>
    },
    {
        path: "/user/vouchers",
        element: <Account><Voucher/></Account>
    },
    {
        path: "/user/payment/success",
        element: <PaymentSuccess/>
    },
    {
        path: "/user/purchase/:purchaseId",
        element: <PuchaseDetail/>
    }

]

const privateAdminRouters: RouterRole[] = [

    {
        path: "/admin",
        element: <Dashboard/>
    },
    {

        path: "/admin/create/promotion",
        element: <CreatePromotion/>
    },
    {

        path: "/admin/create/voucher",
        element: <CreateVoucher/>
    },
    {
        path: "/admin/product/create",
        element: <InsertProduct/>
    },
    {
        path: "/admin/products",
        element: <Product/>
    },
    {
        path: "/admin/products/attribute",
        element: <ProductAttribute/>
    },
    {
        path: "/admin/product/stock",
        element: <ProductStock/>
    },
    {
        path: "/admin/product/import",
        element: <ProductImport/>
    },
    {
        path: "/admin/product/batch",
        element: <Batch/>
    },
    {
        path: "/admin/categories",
        element: <Category/>
    },
    {
        path: "/admin/purchase",
        element: <PurchaseAdmin/>
    },
    {
        path: "/admin/brand",
        element: <Brand/>
    },
    {
        path: "/admin/brands",
        element: <BrandList/>
    },
    {
        path: "/admin/employee/create",
        element: <CreateEmployee/>,
        role: [Role.ROLE_ADMIN]
    },
    {
        path: "/admin/employees",
        element: <EmployeeList/>,
        role: [Role.ROLE_ADMIN]
    },
    {
        path: "/admin/messages",
        element: <Message/>
    },

];

export const getRouters = () => {

    const routerUsers = publicUserRouters.map((router) => {
        return {
            path: router.path,
            element: <App><UserLayout>{router.element}</UserLayout></App>
        }
    });

    const privateRouterUsers = privateUserRouters.map((router) => {
        return {
            path: router.path,
            element: <ProtectedRouter roles={[Role.ROLE_USER]}><UserLayout>{router.element}</UserLayout></ProtectedRouter>
        }
    });

    const routerAdmins = privateAdminRouters.map((router) => {
        return {
            path: router.path,
            element: <ProtectedRouter roles={[Role.ROLE_ADMIN]}><AdminLayout>{router.element}</AdminLayout></ProtectedRouter>
        }
    });

    const result = [...authRouters, ...routerUsers, ...privateRouterUsers, ...routerAdmins];

    return result;
};

export const router = createBrowserRouter(getRouters());