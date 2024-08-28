import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layout/user/UserLayout";
import Home from "../pages/user/home/Home";
import Cart from "../pages/user/cart/Cart";
import Payment from "../pages/user/payment/Payment";
import Login from "../pages/user/auth/login/Login";
import ProductDetail from "../pages/user/product/ProductDetail";
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
    }, {
        path: "/login",
        element: <Login/>
    }
    , {
        path: "/product-detail",
        element: <UserLayout><ProductDetail/></UserLayout>
    },
]);