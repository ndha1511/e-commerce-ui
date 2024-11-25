import { Voucher } from "../../models/voucher";

export interface VoucherItemProps {
    voucher: Voucher;
    handleSelect: (voucher: Voucher) => void;
    voucherSelected: Voucher | null;
}

const VoucherItem: React.FC<VoucherItemProps> = (props) => {
    const { voucher, handleSelect } = props;
    return (
        <div className="d-flex gap-2">
            <div>
                <img src={voucher.image} width={50} height={50} />
            </div>
            <div className="d-flex flex-column">
                <span>{voucher.voucherName}</span>
                <span>{voucher.discountValue}</span>  
            </div>
            <div>
                <span>{voucher.endDate.toString()}</span>
            </div>
        </div>
    );
}


export default VoucherItem;
