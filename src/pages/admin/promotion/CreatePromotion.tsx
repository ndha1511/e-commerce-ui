import { useEffect, useState } from "react";
import useValidText from "../../../hooks/useValidText";
import { DiscountType } from "../../../models/promotion";
import './create-promotion.scss'
import { Form, OverlayTrigger } from "react-bootstrap";
import CustomTooltip from "../../../components/tooltip/CustomTooltipProps";
import Select from 'react-select';
import { convertPrice } from "../../../utils/convert-price";
import PromotionRow from "../../../components/promotion/PromotionRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPlus } from "@fortawesome/free-solid-svg-icons";
import ProductApply from "./ProductApply";
import { isMobile } from "../../../utils/responsive";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCreatePromotionMutation } from "../../../services/promotion.service";
import { useDispatch } from "react-redux";
import { setNotify } from "../../../rtk/slice/notify-slice";
import { convertDateToVietnamTime } from "../../../utils/convert-date";


export interface OptionType {
    value: DiscountType;
    label: string;
}
const CreatePromotion = () => {

    const mobile = isMobile();
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const [selectedProducts, setSelectedProducts] = useState<{ id: string; productName: string; price: number }[]>([]);
    const { value: promotionName, setValue: setPromotionName, err: errPromotionName } = useValidText();
    const { value: discountValue, setValue: setDiscountValue, err: errDiscountValue, setErr: setErrDiscountValue } = useValidText();
    const [discountType, setDiscountType] = useState<DiscountType>(DiscountType.PERCENT);
    const [avt, setAvt] = useState<File |null>();
    const [url, setUrl] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [btnSubmit, setBtnSubmit] = useState<boolean>(false);
    const [isBannerActive, setIsBannerActive] = useState<boolean>(false);
    const [minPrice, setMinPrice] = useState<number>(0);
    const [addPromotion] = useCreatePromotionMutation();
    const dispatch = useDispatch();
    const handleChageDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    }

    const discountOptions = [
        { value: DiscountType.PERCENT, label: 'Phần trăm' },
        { value: DiscountType.AMOUNT, label: 'Giá cố định' },
    ];

    const handleDiscountChange = (selectedOption: OptionType | null) => {
        if (selectedOption) {
            setDiscountType(selectedOption.value);
        }
    };
    const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setUrl(URL.createObjectURL(files[0]));
            setAvt(files[0]);
        }
    };
    const handleCheckboxChange = (id: string, productName: string, price: number) => {
        setSelectedProducts((prevState) => {
            const isSelected = prevState.some(item => item.id === id);
            if (isSelected) {
                // Nếu sản phẩm đã được chọn, bỏ sản phẩm đó ra khỏi mảng
                return prevState.filter(item => item.id !== id);
            } else {
                // Nếu sản phẩm chưa được chọn, thêm sản phẩm vào mảng
                return [...prevState, { id, productName, price }];
            }
        });
    };
    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    };
    const selectedProductNames = selectedProducts
        .map(product => truncateText(product.productName, 10))
        .join(", ");
    const handleToggle = () => {
        setIsBannerActive(prevState => !prevState);
    };
 
    const handleCreate = async () => {
        setBtnSubmit(true);
        const productIds = selectedProducts.map(product => product.id);
        if (promotionName === null || productIds.length === 0 || errDiscountValue !== '') {
            return;
        }
        try {
            const formData = new FormData();
            if (avt) {
                formData.append('image', avt);
            }
            formData.append('promotionName', promotionName);
            formData.append('discountType', discountType);
            if (discountType === DiscountType.PERCENT) {
                formData.append('discountValue', (Number(discountValueString) / 100).toString());
            } else {
                formData.append('discountValue', discountValueString);

            }

            productIds.forEach(productId => {
                formData.append('applyFor', productId);
            });
            formData.append('view', isBannerActive.toString());
            formData.append('startDate', convertDateToVietnamTime(startDate));
            formData.append('endDate', convertDateToVietnamTime(endDate));
            formData.append('description', description);

            await addPromotion(formData);
            handleClear();
            dispatch(setNotify({
                type: 'success', message: 'Thao tác thành công'
            }))
        } catch (error) {
            console.log(error);
            dispatch(setNotify({
                type: 'error', message: 'Thao tác không thành công'
            }))
        }

    }
    const findMinPrice = () => {
        if (selectedProducts.length === 0) return 0;
        return Math.min(...selectedProducts.map(product => product.price));
    };

    useEffect(() => {

        const min = findMinPrice();
        setMinPrice(min);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProducts]);
    const discountValueString = discountValue ?? '';
    const validateDiscountValue = (
        discountValueString: string,
        discountType: DiscountType,
        errDiscountValue: string,
        minPrice: number,
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

        if (discountValueString && parseFloat(discountValueString) >= minPrice) {
            return {
                showTooltip: true,
                message: `Giảm giá phải nhỏ hơn giá sản phẩm tối thiểu (${convertPrice(minPrice)})`
            };
        }
        if (discountType === DiscountType.AMOUNT && discountValueString && parseFloat(discountValueString) < 1000) {
            return {
                showTooltip: true,
                message: `Giảm giá phải lớn hơn (${convertPrice(1000)})`
            };
        }

        return { showTooltip: false, message: '' };
    };
    useEffect(() => {
        if (startDate && (!endDate || endDate <= startDate)) {
            setEndDate(new Date(startDate.getTime() + 24 * 60 * 60 * 1000));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate]);
    const handleClear = ()=>{
        setSelectedProducts([]);
        setPromotionName('');
        setDiscountType(DiscountType.PERCENT);
        setDiscountValue('');
        setDescription('');
        setUrl('');
        setAvt(null);
        setStartDate(null);
        setEndDate(null);
        setMinPrice(0);
        setIsBannerActive(false);
        setBtnSubmit(false);
    }
    return <div className="d-flex flex-column p-3 bg-light">
        <div className="bg-white p-3 border-radius-small mb-3 mt-3">
            <h6>Tạo chương trình khuyến mãi</h6>
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
                {url &&
                    <PromotionRow obligatory={false} label="Chọn làm banner:">
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            checked={isBannerActive}
                            onChange={handleToggle}
                            className="custom-toggle-switch"
                        />
                    </PromotionRow>
                }
                <PromotionRow label="Tên chương trình khuyến mãi:">
                    <OverlayTrigger
                        placement="bottom"
                        overlay={(errPromotionName.trim() !== '' || (promotionName === null && btnSubmit)) ? CustomTooltip(errPromotionName ? errPromotionName : 'Vui lòng không để trống') : <></>}
                        show={(errPromotionName.trim() !== '' && btnSubmit || promotionName === null)}
                    >
                        <input
                            className="input-basic-information-seller"
                            value={promotionName || ''}
                            onChange={(e) => setPromotionName(e.target.value)}
                            placeholder="Tên khuyến mãi"
                            type="text"
                        />
                    </OverlayTrigger>
                </PromotionRow>
                <PromotionRow label="Chọn các sản phẩm: ">
                    <div className="" >
                        <OverlayTrigger
                            placement="bottom"
                            overlay={(selectedProductNames.length === 0 && btnSubmit) ? CustomTooltip('Không được để trống') : <></>}
                            show={selectedProductNames.length === 0 && btnSubmit}
                        >
                            <input
                                className="input-basic-information-seller applyFor"
                                onClick={handleOpenModal}
                                readOnly
                                value={selectedProductNames}
                                placeholder="Chọn sản phẩm khuyến mãi"
                                type="text"
                            />
                        </OverlayTrigger>

                    </div>

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
                            validateDiscountValue(discountValueString, discountType, errDiscountValue, minPrice, btnSubmit).showTooltip
                                ? CustomTooltip(validateDiscountValue(discountValueString, discountType, errDiscountValue, minPrice, btnSubmit).message)
                                : <></>
                        }
                        show={validateDiscountValue(discountValueString, discountType, errDiscountValue, minPrice, btnSubmit).showTooltip && btnSubmit}
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

                <PromotionRow label="Mô tả: " obligatory={false}>
                    <textarea rows={5} className="des-promotion" onChange={(e) => handleChageDescription(e)} ></textarea>
                </PromotionRow>
            </div>
        </div>
        <div className="p-2  d-flex justify-content-end">
            <button className="btn-save-all-category p-2" style={{ width: mobile ? '' : '12%' }} onClick={handleCreate} >Hoàn tất</button>
        </div>
        {showModal && <ProductApply show={showModal} handleClose={handleCloseModal}
            selectedProducts={selectedProducts}
            handleCheckboxChange={handleCheckboxChange}
        />}
    </div>
}

export default CreatePromotion;