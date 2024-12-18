import { ReactElement } from "react";
import "./menu.scss";
import { Link } from "react-router-dom";
import { isAbsoluteLocation } from "../../../../utils/location";
import { useCheckLoginQuery } from "../../../../services/auth.service";
import Avatar from "../../../../components/avatar/Avatar";

type MenuItem = {
  icon?: ReactElement;
  text: string;
  path?: string;
  children?: MenuItem[];
};

const menu: MenuItem[] = [
  {
    icon: <i className="bi bi-person me-2"></i>,
    text: "Tài khoản của tôi",
    children: [
      {
        text: "Hồ sơ",
        path: "/user/account/profile",
      },
      {
        text: "Địa chỉ",
        path: "/user/account/address",
      },
      {
        text: "Đổi mật khẩu",
        path: "/user/account/password",
      },
    ],
  },
  {
    icon: <i className="bi bi-cart"></i>,
    text: "Đơn mua",
    path: "/user/purchase",
  },
  {
    icon: <i className="bi bi-bell"></i>,
    text: "Thông báo",
    path: "/user/notifications",
  },
  {
    icon: <i className="bi bi-gift"></i>,
    text: "Kho voucher",
    path: "/user/vouchers",
  },
];

const Menu = () => {
  const { data: user } = useCheckLoginQuery();
  return (
    <div className="d-flex flex-column align-items-center gap-3 pt-2">
      <div className="d-flex flex-column align-items-center">
        <div>
        <Avatar
 
          url={user?.data?.avatar}
          width={80}
          height={80}
        />
        </div>
    
        <span className="text-medium text-break text-center p-2">
          {user?.data?.email}
        </span>
      </div>
      <div>
        {menu.map((menuItem, index) => {
          return (
            <ul key={index} className="disable-dot">
              <li className="text-medium d-flex gap-2 item-hover">
                <Link
                  to={menuItem.path ? menuItem.path : "#"}
                  className="a-disable-default d-flex gap-2"
                >
                  <span>{menuItem.icon ? menuItem.icon : menuItem.icon}</span>
                  <span
                    className={`color-item ${
                      isAbsoluteLocation(menuItem.path) && "item-active"
                    }`}
                  >
                    {menuItem.text}
                  </span>
                </Link>
              </li>
              {menuItem.children && (
                <ul className="disable-dot" style={{ paddingLeft: "32px" }}>
                  {menuItem.children.map((child, index) => {
                    return (
                      <li key={index} className="text-medium item-hover">
                        <Link
                          to={child.path ? child.path : "#"}
                          className={`link-all d-flex gap-2${
                            isAbsoluteLocation(child.path) && "item-active"
                          }`}
                        >
                          {child.text}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
