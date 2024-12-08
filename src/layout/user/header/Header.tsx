import { KeyboardEvent, useEffect, useRef, useState } from "react";
import "./header.scss";
import useDebounce from "../../../hooks/useDebounce";
import { useCheckLoginQuery } from "../../../services/auth.service";
import PopoverSearch from "./PopoverSearch";
import useRedirect from "../../../hooks/useRedirect";
import { useGetCartByUserIdQuery } from "../../../services/cart.service";
import { pageQueryHanlder } from "../../../utils/query-handler";
import { useGetNotificationsQuery } from "../../../services/notification.service";
import NotificationItems from "../../../pages/user/notification/NotificationItems";
import Account from "../account/Account";
import { isMobile } from "../../../utils/responsive";


type Props = {
    fixedSearch: boolean;
}

const Header = ({ fixedSearch }: Props) => {
    const mobile = isMobile();
    const redirect = useRedirect();
    const [isOpenPopover, setIsOpenPopover] = useState(false);
    const [textSearch, setTextSearch] = useState("");
    const debouncedSearch = useDebounce(textSearch, 500);
    const { data: userData, isSuccess: loginSuccess } = useCheckLoginQuery();
    const { data } = useGetCartByUserIdQuery(userData?.data?.id || "", {
        skip: !loginSuccess || !userData?.data?.id,
    });
    
    const paramNotification = pageQueryHanlder(1, 40);
    const { data: dataNotification, refetch } = useGetNotificationsQuery({
        id: userData?.data?.id || '',
        param: paramNotification,
    }, { skip: !userData?.data });
    const unseenCount = dataNotification?.data.items?.filter(item => item.seen === false).length || 0;
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const popoverRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const notificationHeaderRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setIsOpenPopover(false);
            }
        };

        if (isOpenPopover) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Cleanup event listener on unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpenPopover]);

    const handleSearch = ()=>{
        redirect("/products?keyword=" + textSearch);
    }
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            handleSearch();
            setIsOpenPopover(false);
            (event.target as HTMLInputElement).blur();
        
        }
    };
    return <>
        {/* <SideBar /> */}

        <div className={fixedSearch ? `search fixed-search` : `search`}>
            <div className="search-arround">
                <span className="cursor-pointer " onClick={() => redirect("/")}>OSON</span >
            </div>
            <div className="search-center">
                <label htmlFor="search-input" className="search-wrapper">
                    <input
                        ref={inputRef}
                        value={textSearch}
                        onFocus={() => setIsOpenPopover(true)}
                        onChange={(e) => setTextSearch(e.target.value)}
                        onKeyDown={handleKeyDown} 
                        id="search-input"
                        className="search-input col-8"
                        placeholder="Tìm kiếm sản phẩm"
                    />
                    <button
                        onClick={handleSearch}
                        className="search-button background-primary col-2 col-md-1 button-hover" data-toggle="tooltip" title="Tìm kiếm">
                        <i className="bi bi-search"></i>
                    </button>
                </label>

                {isOpenPopover && (
                    <div ref={popoverRef} style={{
                        position: 'absolute',
                        width: "100%",
                        minHeight: "100px",
                        background: '#fff',
                        boxShadow: "-2px 0 30px 2px rgba(97, 105, 119, 0.18)",
                        top: "100%",
                        borderRadius: '5px',
                        zIndex: 999,
                        marginTop: "2px"
                    }}>
                        <PopoverSearch user={userData?.data} content={debouncedSearch} />
                    </div>
                )}


            </div>
            <div className="search-arround1">

                <div className="menu-header" id="cart-motion-id" onClick={() => redirect('/cart')}>
                    <i className="bi bi-cart" style={{ color: 'white', fontSize: mobile ? 16 : 20 }}></i>
                    {data && data?.data.length > 0 &&
                        <span className="badge-item-header background-primary text-small text-white">{data?.data.length}</span>}
                </div>
                <div className="menu-header" ref={notificationHeaderRef} onClick={() => setShowNotification(!showNotification)} style={{ position: 'relative' }}>

                    <i className="bi bi-bell" style={{ color: 'white', fontSize: mobile ? 16 : 20 }}></i>
                    {unseenCount !== 0 && <span className="badge-item-header background-primary text-small">{unseenCount}</span>}
                    {showNotification && (
                        <NotificationItems
                            notifications={dataNotification?.data.items || []}
                            isVisible={showNotification}
                            setIsVisible={setShowNotification}
                            refetch={refetch}
                            notificationHeaderRef={notificationHeaderRef}
                        />
                    )}
                </div>
                <div className="">

                    {userData?.data ? <Account username={userData.data.email} /> : <>
                        {mobile ? <i className="bi bi-person-circle" style={{ color: 'white', fontSize: mobile ? 15 : 20 }}
                            onClick={() => redirect('/auth/login')}></i> :
                            <span className='text-white text-meidum cursor-pointer' onClick={() => redirect('/auth/login')}>Đăng nhập</span>
                        }

                        {/* <span className='side-bar-item' onClick={() => redirect('/auth/register')}>Đăng ký</span> */}
                    </>}
                </div>

            </div>

        </div>
    </>
}

export default Header;