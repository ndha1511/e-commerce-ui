import { Button, Collapse, Modal, Table } from "react-bootstrap";
import { useGetPurchaseOrderIdQuery } from "../../../services/purchase.service";
import { convertPrice } from "../../../utils/convert-price";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import icon chevron

interface ModalPurchaseItem {
  id: string;
  show: boolean;
  onHide: () => void;
}

const PurchaseItemModal = ({ id, show, onHide }: ModalPurchaseItem) => {
  const { data } = useGetPurchaseOrderIdQuery(id);

  // Tạo trạng thái mở/đóng cho từng item
  const [openStates, setOpenStates] = useState<{ [key: number]: boolean }>({});

  const toggleCollapse = (index: number) => {
    setOpenStates((prevStates) => ({
      ...prevStates,
      [index]: !prevStates[index], // Đảo ngược trạng thái của item tại index
    }));
  };

  return (
    <Modal show={show} onHide={onHide} centered size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết đơn nhập hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="d-flex gap-5 flex-wrap ">
            <span>
              Mã đơn hàng: <span>{data?.data.purchaseOrder.id}</span>
            </span>
            <span>
              Ngày nhập:{" "}
              {new Date(
                data?.data.purchaseOrder.createdAt || ""
              ).toLocaleString() || ""}
            </span>

            <span>Số lượng nhập: {data?.data.purchaseOrder.totalQuantity}</span>
            <span>
              Tổng tiền nhập:{" "}
              {convertPrice(data?.data.purchaseOrder.totalPrice)}
            </span>
            <span>
              Nhân viên nhập: {data?.data.purchaseOrder.importStaffName}
            </span>
            <span>Danh sách sản phẩm</span>
          </div>
          <Table className="table-bordered table-responsive custom-table-history mt-3">
            <thead>
              <tr className="text-center">
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Giá nhập</th>
                <th>Số lượng</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.purchaseItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={item.variant.product.thumbnail}
                      width={70}
                      height={70}
                      alt=""
                    />
                  </td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <div>
                        {item.variant.product.productName.slice(0, 50)}
                        {item.variant.product.productName.length > 50 && "..."}
                        <Collapse in={openStates[index]}>
                          <div>
                            {item.variant.product.productName.slice(50)}
                          </div>
                        </Collapse>
                      </div>
                      {item.variant.product.productName.length > 50 && (
                        <div onClick={() => toggleCollapse(index)}>
                          {openStates[index] ? (
                            <FaChevronUp /> // Mũi tên lên khi mở
                          ) : (
                            <FaChevronDown /> // Mũi tên xuống khi đóng
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>{convertPrice(item.importPrice)}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Đóng
        </Button>
        <Button variant="primary" onClick={onHide}>
          Lưu thay đổi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PurchaseItemModal;
