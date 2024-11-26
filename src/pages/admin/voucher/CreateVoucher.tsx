import { Form, OverlayTrigger } from "react-bootstrap";
import PromotionRow from "../../../components/promotion/PromotionRow";
import useValidText from "../../../hooks/useValidText";
import { useEffect, useState } from "react";
import CustomTooltip from "../../../components/tooltip/CustomTooltipProps";
import Select from 'react-select';
import { isMobile } from "../../../utils/responsive";
import { DiscountType } from "../../../models/promotion";
import { OptionType } from "../promotion/CreatePromotion";
import { convertPrice } from "../../../utils/convert-price";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPlus } from "@fortawesome/free-solid-svg-icons";
import './create-voucher.scss'
import UserApplyModal from "./UserApplyModal";
import { useCreateVoucherMutation } from "../../../services/voucher.service";
import { convertDateToVietnamTime } from "../../../utils/convert-date";
import { useDispatch } from "react-redux";
import { setNotify } from "../../../rtk/slice/notify-slice";

function CreateVoucher() {
    const mobile = isMobile();
    const { value: voucherName, setValue: setVoucherName, err: errVoucherName } = useValidText();
    const { value: quantity, setValue: setQuantity, err: errQuantity } = useValidText();
    const { value: minOrder, setValue: setMinOrder, err: errMinOrder, } = useValidText();
    const { value: maxPrice, setValue: setMaxPrice, err: errMaxPrice, setErr: setErrMaxPrice } = useValidText();
    const [btnSubmit, setBtnSubmit] = useState<boolean>(false);
    const [discountType, setDiscountType] = useState<DiscountType>(DiscountType.PERCENT);
    const { value: discountValue, setValue: setDiscountValue, err: errDiscountValue, setErr: setErrDiscountValue } = useValidText();
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
    const [avt, setAvt] = useState<File | null>(null);
    const [url, setUrl] = useState<string>("");
    const [quantityType, setQuantityType] = useState<'specific' | 'unlimited'>('unlimited');
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const [selectedUsers, setSelectedUsers] = useState<{ id: string; email: string; }[]>([]);
    const [addVoucher] = useCreateVoucherMutation();
    const dispatch = useDispatch();
    const handleCheckboxChange = (id: string, email: string) => {
        setSelectedUsers((prevState) => {
            const isSelected = prevState.some(item => item.id === id);
            if (isSelected) {
                // Nếu sản phẩm đã được chọn, bỏ sản phẩm đó ra khỏi mảng
                return prevState.filter(item => item.id !== id);
            } else {
                // Nếu sản phẩm chưa được chọn, thêm sản phẩm vào mảng
                return [...prevState, { id, email }];
            }
        });
    };
    const [isUser, setIsUser] = useState<boolean>(true);
    const handleToggle = () => {
        setIsUser(prevState => !prevState);
    };

    const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setUrl(URL.createObjectURL(files[0]));
            setAvt(files[0]);
        }
    };
    const discountOptions = [
        { value: DiscountType.PERCENT, label: 'Phần trăm' },
        { value: DiscountType.AMOUNT, label: 'Giá cố định' },
    ];
    const handleDiscountChange = (selectedOption: OptionType | null) => {
        if (selectedOption) {
            setDiscountType(selectedOption.value);
        }
    };
    function generateVoucherCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let voucherCode = '';
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            voucherCode += characters[randomIndex];
        }
        return voucherCode;
    }
    const discountValueString = discountValue ?? '';
    const validateDiscountValue = (
        discountValueString: string,
        discountType: DiscountType,
        errDiscountValue: string,
        btnSubmit: boolean
    ) => {
        const discountValue = parseFloat(discountValueString);
        if (isNaN(discountValue) && discountValueString.trim() !== '') {
            return { showTooltip: true, message: 'Giảm giá phải là số' };
        }

        if (errDiscountValue.trim() !== '') {
            return { showTooltip: true, message: errDiscountValue };
        }

        if (discountValueString.trim() === '' && btnSubmit) {
            return { showTooltip: true, message: 'Vui lòng không để trống' };
        }

        if (discountType === DiscountType.PERCENT) {
            const discountPercent = parseFloat(discountValueString);
            if (discountPercent < 1 || discountPercent >= 100) {
                setErrDiscountValue('Giảm giá phần trăm phải từ 1 đến 99');
                return {
                    showTooltip: true,
                    message: 'Giảm giá phần trăm phải từ 1 đến 99'
                };
            }
        }
        if (discountType === DiscountType.AMOUNT && discountValueString && parseFloat(discountValueString) < 1000) {
            setErrDiscountValue(`Giảm giá phải lớn hơn (${convertPrice(1000)})`);
            return {
                showTooltip: true,
                message: `Giảm giá phải lớn hơn (${convertPrice(1000)})`
            };
        }

        return { showTooltip: false, message: '' };
    };
    const handleQuantityTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantityType(e.target.value as 'specific' | 'unlimited');
        if (e.target.value === 'unlimited') {
            setQuantity('9999999'); // Reset quantity khi chọn "Số lượng vô hạn"
        } else {
            setQuantity(null);

        }
    };
    const isValidMinOrder = (value: string, zero?: number): boolean | number => {
        if (value !== '') {
            const numValue = parseFloat(value);
            if (zero !== undefined) {
                // Nếu zero được truyền vào, cho phép giá trị bằng 0
                return !isNaN(numValue);
            } else {
                // Nếu zero không được truyền vào, yêu cầu giá trị phải lớn hơn 0
                return !isNaN(numValue) && numValue > 0;
            }
        } else {
            return true; // Nếu value trống, không có lỗi
        }
    };
    useEffect(() => {
        if (maxPrice !== '') {
            if (isValidMinOrder(maxPrice || '')) {
                setErrMaxPrice(''); // Xóa lỗi khi hợp lệ
            } else {
                setErrMaxPrice('Số tiền phải lớn hơn 0');
            }
        }
    }, [maxPrice]);

    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    };
    const selectedUser = selectedUsers
        .map(user => truncateText(user.email, 30))
        .join(", ");
    useEffect(() => {
        if (startDate && (!endDate || endDate <= startDate)) {
            setEndDate(new Date(startDate.getTime() + 24 * 60 * 60 * 1000));
        }
    }, [startDate]);
    useEffect(() => {
        if (quantityType === 'unlimited') {
            setQuantity('999999999');
        }
    }, [quantityType]);
    const handleCreate = async () => {
        setBtnSubmit(true);
        const userId = selectedUsers.map(user => user.id);
        if (voucherName === null || errDiscountValue !== '' || errMinOrder !== '') {
            return;
        }
        if (quantityType === 'specific' && errQuantity !== '' || quantity === null) return;
        if (discountType === DiscountType.PERCENT && errMaxPrice !== '') return;
        if (!isUser && userId.length === 0) return;
        const formData = new FormData();
        if (avt) {
            formData.append('image', avt);
        }
        formData.append('voucherName', voucherName);
        formData.append('code', generateVoucherCode());
        formData.append('discountType', discountType);
        if(discountType === DiscountType.PERCENT){
            formData.append('discountValue', (Number(discountValueString)/100).toString());
        }else{
            formData.append('discountValue', discountValueString);
        }
        formData.append('minOrder', minOrder?.toString() || '');
        formData.append('startDate', convertDateToVietnamTime(startDate));
        formData.append('endDate', convertDateToVietnamTime(endDate));
        formData.append('quantity', quantityType === 'unlimited' ? '999999999' : quantity?.toString() || '');
        if(discountType === DiscountType.PERCENT){
            formData.append('maxPrice', maxPrice?.toString() || '');
        }
        formData.append('applyAll', isUser ? 'true' : 'false');
        if (!isUser) {
            userId.forEach(id => {
                formData.append('applyFor', id);
            });
        }
      try {
        await addVoucher(formData);
        setBtnSubmit(false);
        dispatch(setNotify({
            type:'success',
            message: 'Thao tác thành công'
        }))
   
        handleClear();
      } catch (error) {
        dispatch(setNotify({
            type: 'error',
            message: 'Thao tác không thành công'
        }))
      }

    }
    const handleClear=()=>{
        setAvt(null);
        setVoucherName('');
        setDiscountValue('');
        setMinOrder('');
        setStartDate(null);
        setEndDate(null);
        setQuantity('');
        setMaxPrice('');
        setIsUser(true);
        setBtnSubmit(false);

    }
    console.log(btnSubmit)
    return (
        <div className="d-flex flex-column p-3 bg-light">
            <div className="bg-white p-3 border-radius-small mb-3 mt-3">
                <h6>Tạo voucher</h6>
                <div className="p-3">
                    <PromotionRow label="Hình ảnh:">
                        <div className="d-flex align-items-center gap-3">
                            <div>
                                {url ? (
                                    <img
                                        src={url}
                                        alt='User Avatar'
                                        className=''
                                        width={600}
                                        height={200}
                                    />
                                ) : null}
                            </div>
                            <input
                                type="file"
                                id="file=brand"
                                style={{ display: 'none' }}
                                onChange={handleChangeImage}
                                accept="image/*"
                            />
                            <label htmlFor='file=brand' className='primary' style={{ cursor: 'pointer' }}>
                                <div className="image-insert-product-seller p-2">
                                    <div className="icon-image-insert">
                                        <FontAwesomeIcon icon={faImage} fontSize={25} />
                                        <FontAwesomeIcon
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                fontSize: 12,
                                                position: 'absolute',
                                                height: 15,
                                                width: 15,
                                                backgroundColor: 'white',
                                                borderRadius: '50%',
                                                right: -6,
                                                bottom: 0,
                                            }}
                                            icon={faPlus}
                                        />
                                    </div>
                                    <span className="w-100 text-center primary">
                                        {url ? 'Thay đổi ' : 'Thêm hình ảnh'}
                                    </span>
                                </div>
                            </label>
                        </div>
                    </PromotionRow>
                    <PromotionRow label="Tên voucher:">
                        <OverlayTrigger
                            placement="bottom"
                            overlay={(errVoucherName.trim() !== '' || (voucherName === null && btnSubmit)) ? CustomTooltip(voucherName ? voucherName : 'Vui lòng không để trống') : <></>}
                            show={(errVoucherName.trim() !== '' && btnSubmit || voucherName === null)}
                        >
                            <input
                                className="input-basic-information-seller"
                                value={voucherName || ''}
                                onChange={(e) => setVoucherName(e.target.value)}
                                placeholder="Chào mừng bạn mới"
                                type="text"
                            />
                        </OverlayTrigger>
                    </PromotionRow>
                    <PromotionRow label="Mã voucher:">
                        <input
                            className="input-basic-information-seller"
                            readOnly
                            value={generateVoucherCode()}
                            type="text"
                        />
                    </PromotionRow>
                    <PromotionRow label="Chọn loại mã giảm giá">
                        <div className={`${mobile ? 'w-100' : 'w-25'}`}>
                            <Select
                                value={discountOptions.find(option => option.value === discountType)}
                                onChange={handleDiscountChange}
                                options={discountOptions}
                                placeholder="Chọn loại giảm giá"
                            />
                        </div>
                    </PromotionRow>
                    <PromotionRow label={`${discountType === DiscountType.AMOUNT ? 'Số tiền' : 'Phần trăm'} giảm:`}>
                        <OverlayTrigger
                            placement="bottom"
                            overlay={
                                validateDiscountValue(discountValueString, discountType, errDiscountValue, btnSubmit).showTooltip
                                    ? CustomTooltip(validateDiscountValue(discountValueString, discountType, errDiscountValue, btnSubmit).message)
                                    : <></>
                            }
                            show={validateDiscountValue(discountValueString, discountType, errDiscountValue, btnSubmit).showTooltip &&  btnSubmit}
                        >
                            <input
                                className="input-basic-information-seller"
                                value={discountValueString || ''}
                                onChange={(e) => setDiscountValue(e.target.value)}
                                placeholder={`${discountType === DiscountType.AMOUNT ? convertPrice(100000) : '1 - 100'}`}
                                type="text"
                            />
                        </OverlayTrigger>
                    </PromotionRow>
                    <PromotionRow label="Ngày bắt đầu:">
                        <DatePicker
                            selected={startDate}
                            onChange={(date: Date | null) => setStartDate(date)}
                            dateFormat="Pp"
                            showTimeSelect
                            className="date-promotion"
                            placeholderText="Chọn ngày"
                            minDate={new Date()}
                        />
                    </PromotionRow>
                    <PromotionRow label="Ngày kết thúc:">
                        <DatePicker
                            selected={endDate}
                            onChange={(date: Date | null) => setEndDate(date)}
                            dateFormat="Pp"
                            showTimeSelect
                            className="date-promotion"
                            placeholderText="Chọn ngày"
                            minDate={startDate ? new Date(startDate.getTime() + 24 * 60 * 60 * 1000) : new Date()} // Ít nhất 1 ngày sau ngày bắt đầu
                            maxDate={startDate ? new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000) : undefined} // Nhiều nhất 30 ngày
                        />
                    </PromotionRow>
                    <PromotionRow label="Số lượng voucher:">
                        <div className="d-flex  gap-3 custom-radio">
                            <Form.Check
                                type="radio"
                                label="Số lượng vô hạn"
                                name="quantityType"
                                value="unlimited"
                                checked={quantityType === 'unlimited'}
                                onChange={handleQuantityTypeChange}
                            />
                            <Form.Check
                                type="radio"
                                label="Nhập số lượng"
                                name="quantityType"
                                value="specific"
                                checked={quantityType === 'specific'}
                                onChange={handleQuantityTypeChange}
                            />
                        </div>
                        <OverlayTrigger
                            placement="bottom"
                            overlay={(errQuantity.trim() !== '' || (quantity === null && btnSubmit)) ? CustomTooltip(quantity ? quantity : 'Vui lòng không để trống') : <></>}
                            show={(errQuantity.trim() !== '' && btnSubmit || quantity === null)}
                        >
                            <input
                                className="input-basic-information-seller"
                                value={quantity ?? ''}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="Nhập số lượng voucher"
                                type="text"
                                disabled={quantityType === 'unlimited'} // Vô hiệu hóa ô input nếu chọn "Số lượng vô hạn"
                            />
                        </OverlayTrigger>
                    </PromotionRow>
                    <PromotionRow label="Giá đơn hàng tối thiểu:">
                        <OverlayTrigger
                            placement="bottom"
                            overlay={
                                (errMinOrder.trim() !== '' || (minOrder === null && btnSubmit) || !isValidMinOrder(minOrder || '', 0))
                                    ? CustomTooltip(
                                        isValidMinOrder(minOrder || '', 0)
                                            ? (minOrder ? minOrder : 'Vui lòng không để trống')
                                            : 'Số tiền phải là số'
                                    )
                                    : <></>
                            }
                            show={errMinOrder.trim() !== '' && btnSubmit || minOrder === null || !isValidMinOrder(minOrder, 0)}
                        >
                            <input
                                className="input-basic-information-seller"
                                value={minOrder || ''}
                                onChange={(e) => setMinOrder(e.target.value)}
                                placeholder={convertPrice(100000)}
                                type="text"
                            />
                        </OverlayTrigger>
                    </PromotionRow>

                    {discountType === DiscountType.PERCENT &&
                        <PromotionRow label="Giá giảm tối đa:">
                            <OverlayTrigger
                                placement="bottom"
                                overlay={
                                    (errMaxPrice.trim() !== '' || (maxPrice === null && btnSubmit) || !isValidMinOrder(maxPrice || ''))
                                        ? CustomTooltip(
                                            isValidMinOrder(maxPrice || '')
                                                ? (maxPrice ? maxPrice : 'Vui lòng không để trống')
                                                : 'Giá trị phải là số và lớn hơn 0'
                                        )
                                        : <></>
                                }
                                show={errMaxPrice.trim() !== '' && btnSubmit || maxPrice === null || !isValidMinOrder(maxPrice)}
                            >
                                <input
                                    className="input-basic-information-seller"
                                    value={maxPrice || ''}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    placeholder={convertPrice(100000)}
                                    type="text"
                                />
                            </OverlayTrigger>
                        </PromotionRow>

                    }
                    <PromotionRow label="Chọn User: ">
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            checked={isUser}
                            onChange={handleToggle}
                            label="Chọn tất cả user"
                            className="custom-toggle-switch"
                        />
                        {!isUser &&
                            <OverlayTrigger
                                placement="bottom"
                                overlay={(selectedUser.length === 0 && btnSubmit) ? CustomTooltip('Không được để trống') : <></>}
                                show={selectedUser.length === 0}
                            >
                                <input
                                    className="input-basic-information-seller applyFor"
                                    onClick={handleOpenModal}
                                    readOnly
                                    value={selectedUser}
                                    placeholder="Chọn user"
                                    type="text"
                                />
                            </OverlayTrigger>
                        }
                    </PromotionRow>
                </div>
            </div>
            <div className="p-2  d-flex justify-content-end">
                <button className="btn-save-all-category p-2" style={{ width: mobile ? '' : '12%' }} onClick={handleCreate} >Hoàn tất</button>
            </div>
            {showModal && <UserApplyModal show={showModal} handleClose={handleCloseModal}
                selectedUsers={selectedUsers}
                handleCheckboxChange={handleCheckboxChange}
            />}
        </div>
    );
}

export default CreateVoucher;