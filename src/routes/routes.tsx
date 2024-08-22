import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layout/user/UserLayout";
import Home from "../pages/user/home/Home";
import Cart from "../pages/user/cart/Cart";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout><Home/></UserLayout>
    },
    {
        path: "/cart",
        element: <UserLayout><Cart/></UserLayout>
    }
]);