import React, { ChangeEvent, useState } from "react";
import { Button, Modal, } from "react-bootstrap";
import { pageQueryHanlder } from "../../../utils/query-handler";
import SimpleBar from "simplebar-react";
import SkeltetonWrapper from "../../../components/query-wrapper/SkeletonWrapper";
import useDebounce from "../../../hooks/useDebounce";
import { useGetUsersQuery } from "../../../services/user.service";
import { User } from "../../../models/user";
interface ProductApplyProps {
    show: boolean;
    handleClose: () => void;
    selectedUsers: { id: string; email: string }[]; 
    handleCheckboxChange: (id: string, email:string) => void;
}
const UserApplyModal: React.FC<ProductApplyProps> = ({ show, handleClose, selectedUsers, handleCheckboxChange }) => {
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const debounce = useDebounce(searchKeyword, 300)
    const params: string = pageQueryHanlder(1, 40, [{ field: 'email', operator: ':', value: debounce }]);
    const { data, } = useGetUsersQuery(params);
    const handleSearchProduct = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value);
    }
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <div className="text-medium">Danh sách sản phẩm </div>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className="search-list-product p-2 pe-3 w-100" >
                        <input className="input-search-list-product"
                            value={searchKeyword} onChange={(e) => { handleSearchProduct(e) }}
                            placeholder="Nhập từ khóa tìm kiếm" type="text" />
                        <i className="bi bi-search"></i>
                    </div>
                    <SkeltetonWrapper queriesStatus={[data ? true : false]} skCount={4} skHeight={100}>
                        <SimpleBar style={{ height: 400, marginTop: 10 }}>
                            {(data?.data.items && data?.data.items.length <= 0) ?
                                <><div className="text-center mt-5 text-medium">Không tìm thấy!</div></> :
                                <>
                                    {data?.data.items.map((item: User) => (
                                        <div className="d-flex p-3 border-bottom gap-3 align-items-center cursor-pointer" key={item.id} 
                                         onClick={() => handleCheckboxChange(item.id, item.email)}>
                                            <input
                                                type="checkbox"
                                                className="form-check-input no-shadow"
                                                style={{ marginRight: "10px" }}
                                                checked={selectedUsers.some(user => user.id === item.id)} 
                                                readOnly
                                            />
                                            <img src={item.avatar} width={60} style={{borderRadius:'50%'}} height={60} alt="" />
                                            <div className="d-flex flex-column gap-1">
                                                <span>{item.email}</span>
                                                <span className="primary">{(item.phoneNumber)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </>}

                        </SimpleBar>
                    </SkeltetonWrapper>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserApplyModal;
