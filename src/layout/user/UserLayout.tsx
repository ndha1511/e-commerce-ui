import { ReactNode, useEffect, useState } from "react";
import Header from "./header/Header";
import MenuFixed from "../../components/menu/MenuFixed";

type Props = {
    children: ReactNode;
}

const UserLayout = ({ children }: Props) => {
    const [scrollPosition, setScrollPosition] = useState<number>(0);
    const [fixedSearch, setFixedSearch] = useState<boolean>(false);

    const handleScroll = () => {
        const position = window.scrollY;
        if (position <= 100)
            setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (scrollPosition >= 35) {
            setFixedSearch(true);
        } else {
            setFixedSearch(false);
        }
    }, [scrollPosition]);

    return <>
        <MenuFixed fixedSearch={fixedSearch}/>
        <Header fixedSearch={fixedSearch} />
        <div style={{
            marginTop: fixedSearch ? '100px' : 0,
        }}>{children}</div>
        <div className="d-flex" style={{
            height: '100px'
        }}></div>
    </>

}

export default UserLayout;