import { Modal } from "react-bootstrap";
import { useCheckLoginQuery } from "../../../services/auth.service";
import { useGetVouchersByUserIdQuery } from "../../../services/voucher.service";
import VoucherItem from "../../../components/voucher/VoucherItem";
import { Voucher } from "../../../models/voucher";

export interface VoucherModalProps {
    show: boolean;
    handleClose: () => void;
    handleSelect: (voucher: Voucher) => void;
    voucherSelected: Voucher | null;
}

const VoucherModal: React.FC<VoucherModalProps> = (props) => {
    const { show, handleClose, handleSelect, voucherSelected } = props;
    const {data: userQuery} = useCheckLoginQuery();
    const {data: voucherQuery} = useGetVouchersByUserIdQuery({
        userId: userQuery?.data?.id || "",
    }, {
        skip:!userQuery?.data?.id,
    });

    console.log(voucherQuery?.data)
    return <Modal
        centered
        show={show}
        onHide={handleClose}
    >
        <Modal.Header closeButton>
            <Modal.Title>
                <h5>Mã giảm giá của tôi</h5>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {voucherQuery && voucherQuery.data.items.map((voucher, index) => (
                <VoucherItem voucherSelected={voucherSelected} key={index} voucher={voucher} handleSelect={handleSelect}/>
            )) }
        </Modal.Body>
    </Modal>
}

export default VoucherModal;