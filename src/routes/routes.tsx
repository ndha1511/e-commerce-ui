import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layout/user/UserLayout";
import Home from "../pages/user/home/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout><Home/></UserLayout>
    }
]);