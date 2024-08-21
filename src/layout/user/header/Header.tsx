import { useEffect, useState } from "react";
import SideBar from "../side-bar/SideBar";
import "./header.scss";

const Header = () => {
    const [scrollPosition, setScrollPosition] = useState<number>(0);
    const [fixedSearch, setFixedSearch] = useState<boolean>(false);

    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if(scrollPosition >= 100) {
            setFixedSearch(true);
        } else {
            setFixedSearch(false);
        }
    }, [scrollPosition]);

    return <>
        <SideBar />
        <div className={fixedSearch ? `search fixed-search` : `search`}>
            <div className="search-arround"></div>
            <div className="search-center">
                <label htmlFor="search-input" className="search-wrapper">
                    <input id="search-input" className="search-input col-8" placeholder="Tìm kiếm sản phẩm" />
                    <button className="search-button background-primary col-2 col-md-1" data-toggle="tooltip" title="Tìm kiếm">
                        <i className="bi bi-search"></i>
                    </button>
                </label>
            </div>
            <div className="search-arround"></div>
        </div>
    </>
}

export default Header;