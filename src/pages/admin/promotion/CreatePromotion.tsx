import { useState } from "react";
import useValidText from "../../../hooks/useValidText";
import { DiscountType, PromotionType } from "../../../models/promotion";
import { valueOf } from "../../../utils/enum-handler";

const CreatePromotion = () => {

    const {value: promotionName, setValue: setPromotionName, err: errPromotionName} = useValidText();
    const [promotionType, setPromotionType] = useState<PromotionType>(PromotionType.DIRECT_DISCOUNT);
    const [discountType, setDiscountType] = useState<DiscountType | undefined>(DiscountType.PERCENT);
    
    return <div className="d-flex flex-column">
    <div className="d-flex align-items-center justify-content-between loading-container">
        <h5>Tạo chương trình khuyến mãi</h5>
    </div>
    <div className="d-flex flex-column">
        <h6>Thông tin chương trình khuyến mãi</h6>
        <div className="form-group">
            <label htmlFor="promotion-name">Tên chương trình khuyến mãi</label>
            <input id="promotion-name" name="promotion-name" value={promotionName || ''} onChange={(e) => setPromotionName(e.target.value)}></input>
            <span className="primary">{errPromotionName}</span>
        </div>
        <div className="form-group">
            <span>Loại chương trình khuyến mãi: </span>
            <label htmlFor="promotion-type-1">Giảm giá trực tiếp</label>
            <input type="radio" name="promotion-type" id="promotion-type-1" 
                checked={promotionType === PromotionType.DIRECT_DISCOUNT} 
                onChange={() => setPromotionType(PromotionType.DIRECT_DISCOUNT)}/>
            <label htmlFor="promotion-type-2">Giảm giá theo điều kiện</label>
            <input type="radio" name="promotion-type" id="promotion-type-2" 
                checked={promotionType === PromotionType.CONDITION_DISCOUNT}
                onChange={() => setPromotionType(PromotionType.CONDITION_DISCOUNT)}/>
        </div>
        <div className="form-group">
            <label htmlFor="discount-type">Loại giảm giá</label>
            <select id="discount-type" value={discountType} onChange={(e) => setDiscountType(valueOf(DiscountType, e.target.value))}>
                <option value={DiscountType.PERCENT}>Phần trăm</option>
                <option value={DiscountType.AMOUNT}>Giá cố định</option>
            </select>
        </div>
        <div className="form-group">
            <label htmlFor="discount-value">Số tiền giảm</label>
            <input id="discount-value" name="discount-value"></input>
        </div>
        <div className="form-group">
            <label htmlFor="start-date">Ngày bắt đầu</label>
            <input id="start-date" name="start-date" type="datetime-local"></input>
        </div>
        <div className="form-group">
            <label htmlFor="end-date">Ngày kết thúc</label>
            <input id="end-date" name="end-date" type="datetime-local"></input>
        </div>
        <div className="form-group">
            <label htmlFor="loop-state">Lặp lại</label>
            <select id="loop-state">
                <option>Không lặp lại</option>
                <option>Hàng ngày</option>
                <option>Hàng tuần</option>
                <option>Hàng tháng</option>
                <option>Hàng năm</option>
            </select>
        </div>
    </div>
    <div className="d-flex flex-column">
        <h6>Điều kiện khuyến mãi</h6>
        <div className="form-group">
            <span>Loại điều kiện khuyến mãi: </span>
            <label htmlFor="condition-type-1">Giá tối thiểu</label>
            <input type="radio" name="condition-type" id="condition-type-1"/>
            <label htmlFor="condition-type-2">Số lượng mua tối thiểu</label>
            <input type="radio" name="condition-type" id="condition-type-2"/>
        </div>
        <div className="form-group">
            <label htmlFor="min-price">Giá tối thiểu</label>
            <input id="min-price" name="min-price"></input>
        </div>
        <div className="form-group">
            <label htmlFor="min-quantity">Số lượng mua tối thiểu</label>
            <input id="min-quantity" name="min-quantity"></input>
        </div>
    </div>
    <div className="d-flex flex-column">
        <h6>Phạm vi áp dụng</h6>
        <div className="form-group">
            <label htmlFor="apply-type">Phạm vi áp dụng</label>
            <select id="apply-type">
                <option>Toàn cửa hàng</option>
                <option>Theo danh mục</option>
                <option>Theo thương hiệu</option>
                <option>Theo sản phẩm</option>
            </select>
        </div>
    </div>

   
</div>
}

export default CreatePromotion;