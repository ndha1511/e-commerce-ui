import { Button, Col, Row } from "react-bootstrap";
import { useGetAttributeByProductIdQuery } from "../../../services/product.service";
import { useState } from "react";
import './cart-item.scss'
import { AnimatePresence, motion } from "framer-motion";

interface Props {
    productId: string;
    attributeValue1: string;
    attributeValue2?: string;
    updateAttribute: (attr1: string, attr2?: string) => void;
    close: () => void;
}

const ToggleAttribute = ({ productId, attributeValue1, attributeValue2, updateAttribute, close }: Props) => {
    const { data } = useGetAttributeByProductIdQuery(productId);
    const [stateAttrVal1, setStateAttrVal1] = useState(attributeValue1);
    const [stateAttrVal2, setStateAttrVal2] = useState(attributeValue2 || '');

    const changeOption = (newValue: string, index: number) => {
        if (index === 0) {
            setStateAttrVal1(newValue);
        } else {
            setStateAttrVal2(newValue);
        }
    }

    const handleUpdate = () => {
        if ((stateAttrVal1 !== attributeValue1) || (stateAttrVal2 !== attributeValue2)) {
            if (!attributeValue2) {
                updateAttribute(stateAttrVal1);
            } else {
                updateAttribute(stateAttrVal1, stateAttrVal2);
            }
        }
        close();
    }



    return (
        <div className="">
            <AnimatePresence>
                <motion.div
                    initial={{ scale: 0, x: 0, y: 0 }} // Bắt đầu từ góc trái trên (thu nhỏ)
                    animate={{ scale: 1 }} // Chỉ mở rộng, không dịch chuyển
                    exit={{ scale: 0 }} // Khi thoát, thu nhỏ về 0
                    transition={{ duration: 0.3 }} // Thời gian hiệu ứng
                    className="variant-options"
                >
                    <div className="options-container p-3  ">
                        {data?.data.map((attribute, index) => {
                            let selectColor = '';
                            if (index === 0) {
                                selectColor = stateAttrVal1;
                            } else {
                                selectColor = stateAttrVal2;
                            }
                            return <div key={index}>
                                <Row className="mb-2 ">
                                    <Col xs={4} md={2}><strong>{attribute.attributeName}: </strong></Col>
                                    <Col xs={8} md={10} className=" attr1-update">
                                        {attribute.attributeValues.map((val, index1) => (
                                            <div className=" btn-check-variant">
                                                <Button
                                                    key={index1}
                                                    variant={selectColor === val.value ? 'danger' : 'outline-secondary'}
                                                    className={`text-small variant-button ${selectColor === val.value ? 'selected' : ''}`}
                                                    onClick={() => changeOption(val.value, index)}
                                                >
                                                    {val.value}
                                                </Button>
                                            </div>
                                        ))}
                                    </Col>
                                </Row>

                            </div>
                        })}
                        <div className="d-flex justify-content-end gap-3 mt-2">
                            <Button variant="light text-small" onClick={close}>
                                TRỞ LẠI
                            </Button>
                            <Button variant="danger text-small" onClick={handleUpdate}>
                                XÁC NHẬN
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

        </div>
    )
}

export default ToggleAttribute;