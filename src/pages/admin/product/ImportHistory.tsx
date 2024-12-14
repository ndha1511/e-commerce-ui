import { Table } from "react-bootstrap";
import useSearchCondition from "../../../hooks/useSearchCondition";
import { useGetPurchaseOrderQuery } from "../../../services/purchase.service";
import "./insert-product.scss";
import PaginationComponent from "../../../components/pagination/PaginationComponent";
import { useState } from "react";
import PurchaseItemModal from "./PurchaseItemModal";

function ImportHistory() {
  const { page, setPage, query } = useSearchCondition(10);
    const [show, setShow]= useState<boolean>(false);
    const [purchaseOrderId, setPurchaseOrderId]= useState<string>('');
  const { data } = useGetPurchaseOrderQuery(query);
  const onHide = () => setShow(false);
  const handlePurchaseItem = (id: string) => {
    setShow(true);
    setPurchaseOrderId(id);
  }
  return (
    <div className="bg-light p-3">
      <div className="bg-white p-3">
        <span className="text-large">Danh sách các đơn hàng</span>
        <Table className="table-bordered table-responsive  custom-table-history mt-3">
          <thead>
            <tr className="text-center">
              <th>Mã đơn hàng</th>
              <th>Ngày nhập</th>
              <th>Số lượng nhập</th>
              <th>Tổng tiền nhập</th>
              <th>Nhân viên nhập</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.items.map((item) => (
              <tr key={item.id} onClick={()=> handlePurchaseItem(item.id)}>
                <td>{item.id}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
                <td>{item.totalQuantity}</td>
                <td>{item.totalPrice}</td>
                <td>{item.importStaffName}</td>
              </tr>
            ))}
          </tbody>


        </Table>
        <PaginationComponent
          currentPage={page}
          totalPages={data?.data.totalPage || 0}
          handlePageChange={(num) => setPage(num)}
        />
      </div>
      {show && <PurchaseItemModal id={purchaseOrderId} show={show} onHide={onHide}/>}
    </div>
  );
}

export default ImportHistory;
