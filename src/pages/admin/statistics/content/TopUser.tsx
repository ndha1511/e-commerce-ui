import { Table } from "react-bootstrap";
import { convertPrice } from "../../../../utils/convert-price";
import { TopUserProps } from "../types";
import SimpleBar from "simplebar-react";

const TopUser: React.FC<TopUserProps> = (props) => {
  const { users } = props;
  return (
    <>
      <h6>
        Top khách hàng <span style={{ fontSize: 12 }}>({users.length})</span>
      </h6>
      <SimpleBar style={{ overflowY:'auto', maxHeight: 300 }}>
        <Table className="mb-0 mt-2 table-bordered table-responsive custom-table-dashboard">
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
                <td>
                  <img src={item.user.avatar} width={50} height={50} />
                </td>
                <td>
                  {" "}
                  <span
                    style={{
                      wordBreak: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    {item.user.email}
                  </span>
                </td>
                <td>{convertPrice(item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </SimpleBar>
    </>
  );
};

export default TopUser;
