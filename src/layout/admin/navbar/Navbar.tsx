import React, { ReactNode } from 'react';
import './navbar.scss';
import { Collapse } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faChevronDown, faChevronUp, faReceipt, faShirt } from '@fortawesome/free-solid-svg-icons';

interface Menu {
    name: string;
    path?: string;
    icon?: ReactNode;
    children?: Menu[];
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
                name: 'Danh sách sản phẩm',
                path: '/admin/products'
            },
            {
                name: 'Thêm sản phẩm',
                path: '/admin/products/add'
            },
        ]
    },
    {
        name: 'QL danh mục',
        path: '/admin',
        icon: <i className="bi bi-house-door-fill"></i>
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

const MenuItem = ({ name, path, icon, children }: Menu) => {
    const [open, setOpen] = React.useState(false);

    const handleClickMenu = () => {
        setOpen(!open);
    }

    return <div className='w-100 text-medium pt-1 pb-1' onClick={handleClickMenu}>
        <div className='w-100 ps-3 d-inline-flex align-items-center gap-2 menu-navbar'>
            {icon}
            <span>{name}</span>
            {children ? open ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} /> : <></>}
        </div>
        {children && <Collapse in={open}>
            <div className='ps-4 menu-child'>
                {children?.map((item, index) => (
                    <MenuItem key={index} {...item} />
                ))}
            </div>
        </Collapse>}
    </div>
}

const Navbar = () => {
    return <div className="w-100 d-flex justify-content-center">
        <div>

        </div>
        <div className='w-100'>
            {menu.map((item, index) => (
                <MenuItem key={index} {...item} />
            ))}
        </div>
    </div>
}

export default Navbar;