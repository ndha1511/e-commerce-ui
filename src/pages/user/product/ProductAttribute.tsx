import { Attribute } from "../../../models/attriubte";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useGetVariantsByProductIAndAttVl1Query, useGetVariantsByProductIdQuery } from "../../../services/variant.service";

const ProductAttribute = ({ productId, attribute, onSelect, index }: {
    productId: string,
    attribute: Attribute,
    onSelect: (value: string, url: string, index: number) => void,
    index: number
}) => {
    const [selected, setSelected] = useState<string>('');
    const handleClick = (value: any, url: string) => {
        setSelected(value);
        onSelect(value, url, index);
    };
    return (
        <div>
            <strong>{attribute.attributeName}</strong>
            <div>
                {attribute.attributeValues.map((value, index) => {
                    return (
                        <div key={index} className="btn-check-sc">
                            <button
                                className={`w-100 btn-sc border-radius-small bg-white p-1 d-flex align-items-center justify-content-center ${selected === value.value ? 'selected' : ''} `}
                                onClick={() => {
                                    handleClick(value.value, value.image || "");
                                    if (selected !== value.value) setSelected(value.value); // Cập nhật selected
                                }}
                            // disabled={isDisabled} // Vô hiệu hóa nút nếu là disabled
                            // style={{ opacity: isDisabled ? 0.5 : 1 }} // Thay đổi độ mờ
                            >
                                <div className="bg-light">
                                    {value.image && (
                                        <span className="pe-1">
                                            <img src={value.image} style={{ width: 40, height: 40, marginBottom: 0 }} />
                                        </span>
                                    )}
                                    <span>{value.value}</span>
                                </div>
                            </button>
                            <div className={`check-sc ${selected === value.value ? 'show-icon' : ''}`}>
                                <FontAwesomeIcon color="white" icon={faCheck} className="pe-2 ps-1 icon-check-size" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ProductAttribute;
