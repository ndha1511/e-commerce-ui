import React, { useState } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import '../cart/cart-item.scss';
import { convertPrice } from '../../../utils/convert-price';
import { ProductOrder } from '../../../models/product-order';
import { isMobile } from '../../../utils/responsive';
interface CartItemProps {
    item: ProductOrder;


}

const PurchaseItem: React.FC<CartItemProps> = ({ item }) => {
    const mobile = isMobile();
    return (
        <div>
            <div className="cart-item border-bottom p-3 pl-3 pt-5 pr-3 pb-5 bg-white">
                <Row className="align-items-end">
                    <Col xs={12} md={11} className="d-flex align-items-center mb-3 mb-md-0">
                        <div className="d-flex align-items-center">
                            <Image src={item.image} fluid className="cart-item-image me-3" />
                            <div className="w-100">
                                <p>
                                    {item.productName}
                                </p>
                                <div className="variant-selector" >
                                    <div className="selected-variant text-muted">
                                        <span >Phân Loại Hàng: </span>
                                        <span className='text-muted ' >{item.attributes?.[0]} {item.attributes?.[1]}</span> <br />
                                        <span >x{item.quantity}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={1}  >
                        <div className={`d-flex gap-2 ${mobile ? 'justify-content-end':''}`}>
                            <p className="primary fw-bold mb-1">{convertPrice(item.amount)}</p>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default PurchaseItem;
