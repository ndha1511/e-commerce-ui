import { ReactNode } from "react";
import Header from "./header/Header";

type Props = {
    children: ReactNode;
}

const UserLayout = ({children} : Props) => {
    return <>
        <Header/>
        {children}
    </>

}

export default UserLayout;