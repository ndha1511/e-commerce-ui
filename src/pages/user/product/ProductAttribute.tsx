import { Col, Row } from "react-bootstrap";
import { Attribute } from "../../../models/attriubte";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const ProductAttribute = ({attribute, onSelect, index}: { 
    attribute: Attribute, 
    onSelect: (value: string, url: string, index: number) => void,
    index: number
 }) => {
    const [selected, setSelected] = useState('');
    const handleClick = (value: any, url: string) => {
        setSelected(value);
        onSelect(value, url, index);
    };
    return (
        <div>
            <strong>{attribute.attributeName}</strong>
            <Row className="p-2">
                {attribute.attributeValues.map((value, index) => (
                    <Col key={index} xs={3} className="p-1">
                        <div className="btn-check-sc">
                            <button
                                className={`w-100 btn-sc border-radius-small bg-white p-1 d-flex align-items-center justify-content-center ${selected === value.value ? 'selected' : ''}`}
                                onClick={() => handleClick(value.value, value.image || "")}
                            >
                                <div className="bg-light w-100">
                                    {value.image && <span className="pe-1">
                                        <img src={value.image} style={{ width: 40, height: 40, marginBottom: 0 }} />
                                    </span>}
                                    <span>{value.value}</span>
                                </div>
                            </button>
                            <div className={`check-sc ${selected === value.value ? 'show-icon' : ''}`}>
                                <FontAwesomeIcon color="white" icon={faCheck} className="pe-2 ps-1 icon-check-size" />
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default ProductAttribute;