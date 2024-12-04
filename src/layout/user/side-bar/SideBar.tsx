import Avatar from '../../../components/avatar/Avatar';
import Dropdown from '../../../components/dropdown/Dropdown';
import useRedirect from '../../../hooks/useRedirect';
import { useLazyLogoutQuery } from '../../../services/auth.service';
import './side-bar.scss';


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
                    console.log(error);
                }
            }
        }
    ]
    return <>
        <div  >
            <Dropdown dropDownItem={dropDownItems}>
                <div className='side-bar-item'>
                    <Avatar name={username} url={avatar} />
                </div>
            </Dropdown>
        </div>
    </>
}
export default Account;