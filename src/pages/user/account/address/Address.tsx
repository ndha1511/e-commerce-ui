import { useEffect, useState } from "react";
import ModalAddress, { Action } from "../../../../components/address/ModalAddress";
import { useGetAddressByUserIdQuery} from "../../../../services/address.service";
import { useCheckLoginQuery } from "../../../../services/auth.service";
import './address.scss';
import SimpleBar from "simplebar-react";
import { UserAddressDto } from "../../../../dtos/request/address/user-address-dto";



const Address = () => {
    const { data: user, isSuccess: loginSuccess } = useCheckLoginQuery();
    const { data: address, refetch: addressRefetch, isSuccess } = useGetAddressByUserIdQuery(user?.data?.id || "", {
        skip: !loginSuccess || !user?.data?.id,
    });
    const [addressId, setAddressId] = useState<string| null>('');
    const [modalAdd, setModalAdd] = useState(false);
    const [addressArr, setAddressArr] = useState<UserAddressDto[]>([]);
    const [action,setAction] = useState<Action>('null');
    useEffect(() => {
        if (isSuccess && address?.data) {
            // Sắp xếp địa chỉ để đưa những địa chỉ mặc định lên đầu
            const sortedAddresses = [...address.data].sort((a, b) => {
                return (b.addressDefault ? 1 : 0) - (a.addressDefault ? 1 : 0);
            });
            setAddressArr(sortedAddresses);
        }
    }, [isSuccess, address]);
    return (
        <div className="profile-container">
            <div className="d-flex justify-content-between align-items-center border-bottom pb-4">
                <span className="text-medium">Địa chỉ của tôi</span>
                <button className="button-flex button-hover background-primary text-medium d-flex gap-2 p-2 pe-3"
                    onClick={() => {setModalAdd(true);setAction("save")}}
                >
                    <i className="bi bi-plus-lg"></i>
                    Thêm địa chỉ mới
                </button>
            </div>
            <SimpleBar style={{ height: 430 }}>
                {addressArr?.map((address,index) => (
                    <div key={index} className="mt-3 d-flex align-items-center justify-content-between border-bottom">
                        <div className="d-flex flex-column p-3 ">
                            <span className="mb-1">
                                {address.receiverName}
                                <span className="border-start border-2 ps-2 p-1 ms-1 text-light-cs">{address.phoneNumber}</span>
                            </span>
                            <span className="mb-1 text-light-cs">{address.addressDetail}</span>
                            <span className="mb-1 text-light-cs">{address.ward}, {address.district}, {address.province}</span>
                            {address.addressDefault && <div className="mt-1">
                                <button className="btn-default">Mặc định</button>
                            </div>}
                        </div>
                        <div className="mb-2 d-flex flex-column gap-2">
                            <div>
                                <button className="btn-address me-3" onClick={() => {setModalAdd(true);setAction("update");setAddressId(address.id || '')}}>Cập nhật</button>
                                <button className="btn-address">Xóa</button>
                            </div>
                            {!address.addressDefault && <div className="mt-2">
                                <button
                                    className="btn-setting"
                                >
                                    Thiết lập mặc định
                                </button>
                            </div>}
                        </div>
                    </div>
                ))}
            </SimpleBar>
            {modalAdd && <ModalAddress addressId={addressId || ''} action={action} show={modalAdd} handleClose={() => setModalAdd(false)} refetch={addressRefetch} />}
        </div>
    );
}

export default Address;
