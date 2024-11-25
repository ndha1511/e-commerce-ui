import { Row, Col } from 'react-bootstrap';
import { BsGeoAltFill } from 'react-icons/bs';
import { UserAddress } from '../../models/user-address';
import ModalAddress from '../../pages/user/account/address/ModalAddress';
import { useState } from 'react';
import { isMobile } from '../../utils/responsive';

const Address = ({ info }: { info: UserAddress }) => {
    const mobile = isMobile();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="p-3 bg-white ">
            <Row className="align-items-center">
                <Col xs={9} md={10}>
                    <div className="d-flex align-items-center mb-2">
                        <BsGeoAltFill color="red" className="me-2" />
                        <h6 className="mb-0 text-danger">Địa Chỉ Nhận Hàng</h6>
                    </div>
                    <div className='ps-3 mt-1'>
                        <div>
                            <strong>{info.receiverName}</strong> {info.phoneNumber}
                        </div>
                        <div className="mt-2">
                            {`${info.addressDetail}, ${info.ward}, ${info.district}, ${info.province}`}
                        </div>
                    </div>

                </Col>
                <Col xs={3} md={2}> <button className='btn-address' onClick={() => handleShow()}>Thay đổi</button></Col>
            </Row>
            {show && <ModalAddress show={show} handleClose={handleClose} />}
        </div>
    );
};

export default Address;
