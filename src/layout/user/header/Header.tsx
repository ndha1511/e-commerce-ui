import SideBar from "../side-bar/SideBar";
import "./header.scss";

type Props = {
    fixedSearch: boolean;
}

const Header = ({fixedSearch} : Props) => {
    

    return <>
        <SideBar />
        <div className={fixedSearch ? `search fixed-search` : `search`}>
            <div className="search-arround"></div>
            <div className="search-center">
                <label htmlFor="search-input" className="search-wrapper">
                    <input id="search-input" className="search-input col-8" autoFocus placeholder="Tìm kiếm sản phẩm" />
                    <button className="search-button background-primary col-2 col-md-1 button-hover" data-toggle="tooltip" title="Tìm kiếm">
                        <i className="bi bi-search"></i>
                    </button>
                </label>
            </div>
            <div className="search-arround">
            </div>
        </div>
    </>
}

export default Header;