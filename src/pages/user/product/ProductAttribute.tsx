import { Col, Row } from "react-bootstrap";
import { Attribute } from "../../../models/attriubte";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const ProductAttribute = ({attribute}: { attribute: Attribute }) => {
    const [selected, setSelected] = useState('');
    const handleClick = (value: any) => {
        setSelected(value);
    };
    return (
        <div>
            <strong>{attribute.attributeName}</strong>
            <div className="">
                {attribute.attributeValues.map((value, index) => (
                        <div key={index} className="btn-check-sc">
                            <button
                                className={`w-100 btn-sc border-radius-small bg-white p-1 d-flex align-items-center justify-content-center ${selected === value.value ? 'selected' : ''}`}
                                onClick={() => handleClick(value.value)}
                            >
                                <div className="bg-light ">
                                    {value.image && <span className="pe-1">
                                        <img src={value.image} style={{ width: 40, height: 40, marginBottom: 0 }} />
                                    </span>}
                                    <span>{value.value} </span>
                                </div>
                            </button>
                            <div className={`check-sc ${selected === value.value ? 'show-icon' : ''}`}>
                                <FontAwesomeIcon color="white" icon={faCheck} className="pe-2 ps-1 icon-check-size" />
                            </div>
                        </div>
                ))}
            </div>
        </div>
    )
}

export default ProductAttribute;