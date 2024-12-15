import Avatar from '../../../components/avatar/Avatar';
import { Dropdown } from 'react-bootstrap';  // Thay đổi ở đây
import useRedirect from '../../../hooks/useRedirect';
import { useLazyLogoutQuery } from '../../../services/auth.service';


const Account = ({ username, avatar }: { username: string, avatar?: string }) => {
    const redirect = useRedirect();
    const [logoutHandler] = useLazyLogoutQuery();

    const dropDownItems = [
        {
            item: <span className='side-bar-item'>Thông tin tài khoản</span>,
            event: () => redirect('/user/account/profile')
        },
        {
            item: <span className='side-bar-item'>Đơn hàng đã mua</span>,
            event: () => redirect('/user/purchase')
        },
        {
            item: <span className='side-bar-item'>Đăng xuất</span>,
            event: async () => {
                try {
                    await logoutHandler().unwrap();
                    window.location.reload();
                } catch (error) {
                    console.error(error);
                }
            }
        }
    ];

    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <Avatar name={username} url={avatar} width={25} height={25} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {dropDownItems.map((item, index) => (
                        <Dropdown.Item key={index} onClick={item.event}>
                            {item.item}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default Account;
