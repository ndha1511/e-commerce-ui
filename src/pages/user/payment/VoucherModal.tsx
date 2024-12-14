import { Button, Modal } from "react-bootstrap";
import { useCheckLoginQuery } from "../../../services/auth.service";
import { useGetVouchersByUserIdQuery } from "../../../services/voucher.service";
import VoucherItem from "../../../components/voucher/VoucherItem";
import { Voucher } from "../../../models/voucher";
import { convertPrice } from "../../../utils/convert-price";

export interface VoucherModalProps {
  show: boolean;
  handleClose: () => void;
  handleSelect: (voucher: Voucher) => void;
  voucherSelected: Voucher | null;
  amount: number;
}

const VoucherModal: React.FC<VoucherModalProps> = (props) => {
  const { show, handleClose, handleSelect, voucherSelected,amount } = props;
  const { data: userQuery } = useCheckLoginQuery();
  const { data: voucherQuery } = useGetVouchersByUserIdQuery(
    {
      userId: userQuery?.data?.id || "",
    },
    {
      skip: !userQuery?.data?.id,
    }
  );
  const discount = Math.min(amount * (voucherSelected?.discountValue || 0), voucherSelected?.maxPrice || 0);
  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h5>Mã giảm giá của tôi</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {voucherQuery &&
          voucherQuery.data.items.map((voucher, index) => (
            <VoucherItem
              voucherSelected={voucherSelected}
              key={index}
              voucher={voucher}
              handleSelect={handleSelect}
              amount={amount}
            />
          ))}
      </Modal.Body>
      <Modal.Footer>
       <div className=" w-100 primary">Bạn đã giảm được {convertPrice(discount)}</div>
        <Button variant="secondary" onClick={handleClose}>
          Thoát
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            if (voucherSelected) {
              handleSelect(voucherSelected);
              handleClose();
            }
          }}
        >
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VoucherModal;
