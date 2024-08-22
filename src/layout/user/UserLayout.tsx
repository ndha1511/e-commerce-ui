import { ReactNode } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";

type Props = {
    children: ReactNode;
}

const UserLayout = ({children} : Props) => {
    return <>
        <Header/>
        <div>{children}</div>
        <Footer/>
    </>

}

export default UserLayout;