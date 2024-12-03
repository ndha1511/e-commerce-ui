import { convertPrice } from "../../../../utils/convert-price";
import { TopUserProps } from "../types";

const TopUser: React.FC<TopUserProps> = (props) => {
    const { users } = props;
    return <>
        <span>Top khách hàng</span>
        <table>
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Ảnh đại diện</th>
                    <th>Email khách hàng</th>
                    <th>Doanh thu</th>
                </tr>
            </thead>
            <tbody>
                {users.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td><img src={item.user.avatar} width={50} height={50} /></td>
                        <td>{item.user.email}</td>
                        <td>{convertPrice(item.amount)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
}

export default TopUser;