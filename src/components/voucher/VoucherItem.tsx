import { Voucher } from "../../models/voucher";
import "./voucherItem.scss";

export interface VoucherItemProps {
  voucher: Voucher;
  handleSelect: (voucher: Voucher) => void;
  voucherSelected: Voucher | null;
  amount: number;
}

const VoucherItem: React.FC<VoucherItemProps> = (props) => {
  const { voucher, handleSelect, voucherSelected, amount } = props;

  // Kiểm tra nếu amount nhỏ hơn minOrder
  const isDisabled = amount < voucher.minOrder;

  return (
    <div
      className={`d-flex gap-2 align-items-center cursor-pointer mt-2 ${
        isDisabled ? "disabled" : ""
      }`}
      style={{ opacity: isDisabled ? 0.5 : 1 }}
    >
      <div>
        <input
          type="radio"
          id={`voucher-${voucher.id}`}
          name="voucher"
          className="form-check-input"
          value={voucher.id}
          checked={voucherSelected?.id === voucher.id}
          onChange={() => handleSelect(voucher)}
          disabled={isDisabled} // Vô hiệu hóa nếu amount < minOrder
        />
      </div>
      <div>
        <img src={voucher.image} width={50} height={50}  />
      </div>
      <div className="d-flex gap-3">
        <div className="d-flex flex-column">
          <span>{voucher.voucherName}</span>
          <span>{voucher.discountValue}</span>
        </div>
        <div>
          <span>{voucher.endDate.toString()}</span>
        </div>
      </div>
    </div>
  );
};

export default VoucherItem;
