import { ReactNode, useState } from "react";
import Menu from "./menu/Menu";
import "./account.scss";
import OffcanvasRight from "../../../components/offcanvas/OffcanvasRight";
import { isMobile } from "../../../utils/responsive";

type Props = {
    children: ReactNode;
}

const Account = ({ children }: Props) => {
    const mobile = isMobile();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const offcanvasContent = (
        <Menu />
    );
    return <div className="background-muted pt-4 pb-4">
        <div className="container d-flex">
            <div className="account-left col-md-2 col-3">
                <Menu />
            </div>
            <div className="d-flex" style={{
                flex: 1,
                position:'relative',
                marginTop: mobile ?20:0,
            }}>
                {mobile &&
                    <i
                        style={{
                            fontSize: 30, color: 'red', position: 'absolute', left: 0,top:-40,
                            transform: 'rotateY(180deg)', transition: 'transform 0.5s ease',
                        }}
                        className="bi bi-list-ul"
                        onClick={(e) => {

                            { handleShow(); e.stopPropagation(); };
                        }}
                    ></i>}
                {children}</div>
        </div>
        <OffcanvasRight
                show={show}
                onHide={handleClose}
                content={offcanvasContent}
                user='profile'
            />
    </div>
}

export default Account;