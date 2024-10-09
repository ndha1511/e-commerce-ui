import React, { ReactNode } from 'react';
import './navbar.scss';
import { Col, Collapse, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faChevronDown, faChevronUp, faReceipt, faShirt } from '@fortawesome/free-solid-svg-icons';

interface Menu {
    name: string;
    path?: string;
    icon?: ReactNode;
    children?: Menu[];
    fontSize?: number;
}

const menu: Menu[] = [
    {
        name: 'Dashboard',
        path: '/admin',
        icon: <i className="bi bi-house-door-fill"></i>
    },
    {
        name: 'QL sản phẩm',
        icon: <FontAwesomeIcon icon={faShirt} />,
        children: [
            {
                name: '● Danh sách sản phẩm',
                path: '/admin/products',
                fontSize:12
            },
            {
                name: '● Thêm sản phẩm',
                path: '/admin/products/add',
                fontSize:12
            },
        ]
    },
    {
        name: 'QL danh mục',
        path: '/admin',
        icon: <i className="bi bi-house-door-fill"></i>,
        children: [
            {
                name: '● Danh sách sản phẩm',
                path: '/admin/products',
                fontSize:12
            },
            {
                name: '● Thêm sản phẩm',
                path: '/admin/products/add',
                fontSize:12
            },
        ]
    },
    {
        name: 'QL thương hiệu',
        path: '/admin',
        icon: <i className="bi bi-house-door-fill"></i>
    },
    {
        name: 'QL đơn hàng',
        path: '/admin',
        icon: <FontAwesomeIcon icon={faReceipt} />
    },
    {
        name: 'QL khuyến mãi',
        path: '/admin',
        icon: <i className="bi bi-house-door-fill"></i>
    },
    {
        name: 'Thống kê',
        path: '/admin',
        icon: <FontAwesomeIcon icon={faChartLine} />
    },
]

const MenuItem = ({ name, path, icon, children,fontSize }: Menu) => {
    const [open, setOpen] = React.useState(false);

    const handleClickMenu = () => {
        setOpen(!open);
    }

    return (
        <div className='w-100 pt-1 pb-1 none-select' onClick={handleClickMenu}>
            <div className='w-100 ps-3 d-inline-flex align-items-center gap-2 menu-navbar'>
                <Row className='w-100 m-2 custom-row-menu'>
                    <Col className='d-flex justify-content-center' md={2}>
                        <span>{icon}</span>
                    </Col>
                    <Col md={10}>
                        <div className='d-flex justify-content-between w-100 pe-1'>
                            <span style={{fontSize:fontSize || 14}}>
                                {name}
                            </span>
                            <span>
                                {children ? open ? <FontAwesomeIcon fontSize={12} icon={faChevronUp} /> :
                                    <FontAwesomeIcon fontSize={12} icon={faChevronDown} /> : <></>}
                            </span>
                        </div>
                    </Col>
                </Row>
            </div>
            {children && (
                <Collapse in={open}>
                    <div className='menu-child'>
                        {children.map((item, index) => (
                            <div key={index} >
                                <MenuItem {...item} />
                            </div>
                        ))}
                    </div>
                </Collapse>
            )}
        </div>
    );
}

const Navbar = () => {
    return (
        <div className="w-100 d-flex justify-content-center flex-column gap-2">
            <div className='d-flex justify-content-center m-3'>
                <img
                    src="https://hoiyeumeo.vn/wp-content/uploads/2024/03/moi-thang-ban-can-bao-nhieu-tien-de-nuoi-meo-2.png"
                    alt=""
                    style={{ width: 80, height: 80 }}
                />
            </div>
            <div className='w-100'>
                {menu.map((item, index) => (
                    <MenuItem key={index} {...item} />
                ))}
            </div>
        </div>
    );
}

export default Navbar;
