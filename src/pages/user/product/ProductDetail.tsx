import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { BsChatDots } from "react-icons/bs";
import ImageDetails from "../../../components/image-details/ImageDetails";
import Rating from "../../../components/rating/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import './product-detail.scss'
import Address from "../../../components/address/Address";
import Comment from "./Comment";
import { useParams } from "react-router-dom";
import { useGetProductByUrlQuery } from "../../../services/product.service";
import ModalLoading from "../../../components/loading/ModalLoading";
import { convertPrice } from "../../../utils/convert-price";
import RenderVideo from "../../../components/image-details/RenderVideo";
import ProductAttribute from "./ProductAttribute";
import { useLazyGetVariantsQuery } from "../../../services/variant.service";
import { VariantResponse } from "../../../dtos/response/variant/variant-response";
import { useCheckLoginQuery } from "../../../services/auth.service";
import { useAddToCartMutation } from "../../../services/cart.service";
import { useGetAddressByUserIdQuery } from "../../../services/address.service";
import RenderImage from "../../../components/image-details/RenderImage";


function ProductDetail() {
    const [quantity, setQuantity] = useState(1);
    const { key } = useParams();
    const { data: resProduct, isLoading, isError, isSuccess } = useGetProductByUrlQuery(key || "");
    const product = resProduct?.data;
    const [images, setIamges] = useState<any[]>([]);
    const [startIndex, setStartIndex] = useState(0);
    const [selectValue1, setSelectValue1] = useState('');
    const [selectValue2, setSelectValue2] = useState('');
    const [getVariant] = useLazyGetVariantsQuery();
    const [variant, setVariant] = useState<VariantResponse>();
    const [productPrice, setProductPrice] = useState(0);
    const [disabledBtn, setDisabledBtn] = useState(true);
    const {data: user, isSuccess: loginSuccess} = useCheckLoginQuery();
    const [addToCart] = useAddToCartMutation();
    const {data: address, refetch: addressRefetch} = useGetAddressByUserIdQuery(user?.data?.id || "", {
        skip: !loginSuccess || !user?.data?.id,
    })

    const onSelect = (value: string, url: string, index: number) => {
        const currentUrl = images.indexOf(images.find((img) => img.original === url));
        if (currentUrl !== -1) {
            setStartIndex(currentUrl);
        }
        if (index === 0) {
            setSelectValue1(value);
        }
        if (index === 1) {
            setSelectValue2(value);
        }
    }

    useEffect(() => {
        if(variant) {
            setProductPrice(variant.price);
            if(variant.quantity > 0) {
                setDisabledBtn(false);
            } else {
                setDisabledBtn(true);
            }
        } else {
            setProductPrice(product?.regularPrice || 0);
            setDisabledBtn(true);
        }
    }, [variant])

    useEffect(() => {
        const getVariantByAttrValue = async () => {
            try {
                if (selectValue1 !== '' && selectValue2 != '') {
                    const data = await getVariant({
                        productId: product?.id || "",
                        attr1: selectValue1, attr2: selectValue2
                    }).unwrap();
                    setVariant(data.data);
                } else if (selectValue1 !== '' && selectValue2 === '') {
                    if (product?.attributes?.length === 1) {
                        const data = await getVariant({
                            productId: product?.id || "",
                            attr1: selectValue1
                        }).unwrap();
                        setVariant(data.data);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        getVariantByAttrValue();
    }, [selectValue1, selectValue2])

    useEffect(() => {
        if (isSuccess) {
            const imgs = [];

            const newImages = product?.images.map((image) => ({
                original: image,
                thumbnail: image,
                renderItem: RenderImage

            }));
            if (newImages) {
                imgs.push(...newImages);
            }
            const attrValues = product?.attributes?.[0]?.attributeValues;
            if (attrValues) {
                const imgAttr = [];
                for (let i = 0; i < attrValues.length; i++) {
                    if (attrValues[i].image) {
                        imgAttr.push({
                            original: attrValues[i].image,
                            thumbnail: attrValues[i].image,
                            renderItem: RenderImage
                        });
                    }
                }
                imgs.push(...imgAttr);
            }
            if (product && product.video) {
                imgs.push({
                    original: product.video,
                    thumbnail: 'https://clipart-library.com/images/kT8kAaRyc.png',
                    embedUrl: product.video,
                    renderItem: RenderVideo
                });
            }
            setIamges(imgs);
            setProductPrice(product?.regularPrice || 0);
        }
    }, [isSuccess]);



    const increaseQuantity = () => {if(variant && variant.quantity > quantity) setQuantity(quantity + 1)};
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };
    
    const handleAddToCart = async () => {
        if(!user?.data) {
            window.location.href = '/auth/login?redirect-url=' + encodeURIComponent('product/' + key);
        } else {
            try {
                await addToCart({
                    userId: user.data.id,
                    productCart: {
                        variantId: variant?.id || "",
                        quantity: quantity
                    }
                }).unwrap();
                alert('Thêm vào giỏ hàng thành công!');
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <Container className="mt-4 bg-light  border-radius-small">
            {isLoading && <ModalLoading loading={isLoading} />}
            {isSuccess && <>
                <div className="p-1 text-meidum d-flex gap-2 text-muted">
                    <span className="me-2">Trang chủ <FontAwesomeIcon icon={faChevronRight} /></span>
                    <span>Thời trang nam <FontAwesomeIcon icon={faChevronRight} /></span>
                </div>
                <Row className="align-center ">
                    <Col md={4} className="">
                        <div className="border-radius-medium bg-white p-3" >
                            <div>  <ImageDetails startIndex={startIndex} images={images} /></div>
                        </div>

                    </Col>
                    <Col md={5} className=" ">
                        <div>
                            <div className="bg-white border-radius-medium p-3">
                                <div className="d-flex align-items-center mb-2">
                                    {product?.brandId && <span className="text-muted">Thương hiệu: LADOS</span>}
                                </div>
                                <h5 className="mb-1">{product?.productName}</h5>

                                {product?.rating ? <div className="d-flex gap-2 pt-2 pb-2 w-100 align-items-center">
                                    <span className="text-medium">4.2</span>
                                    <Rating size="text-medium" variant="secondary" star={product.rating} />
                                    <span className=" text-muted">(16)</span>
                                    <span></span>
                                    <span className=" text-muted">Đã bán: {product?.buyQuantity}</span>
                                </div> : <div className="d-flex gap-2 pt-2 pb-2 align-items-center">
                                    <span className="text-muted">Chưa có đánh giá</span>
                                    <span className=" text-muted">Đã bán: {product?.buyQuantity}</span>
                                </div>}
                                <div className="d-flex align-items-center mb-2">
                                    <h4 className=" text-large mb-0">{convertPrice(productPrice)}</h4>
                                    {/* <small className=" ms-2 bg-light p-1 ps-2 pe-2 border-radius-medium">-4%</small> */}
                                </div>
                                <div className="mb-2">
                                    {product?.promotion && <div className="p-2 border border-radius-small">
                                        <span className="text-medium">Giá sau khi giảm:</span> <br />
                                        <span className="text-large primary">225.000₫</span> <br />
                                        <FontAwesomeIcon color="blue" icon={faCheck} className="pe-2 ps-1 " />
                                        <span>Giảm 10.000₫ </span>
                                    </div>}
                                </div>
                                <div className="mt-4">
                                    {product?.attributes?.map((attribute, index) => (
                                        <ProductAttribute index={index} attribute={attribute} key={attribute.id} onSelect={onSelect} />
                                    ))}
                                </div>
                            </div>

                        </div>
                    </Col>
                    <Col md={3} >

                        <div className="d-flex justify-content-center border-radius-medium ">
                            <Card style={{ width: '100%', padding: '1rem', border: 'none' }}>
                                <Row>
                                    <Col className="d-flex justify-content-between">
                                        <div className="d-flex align-items-center w-100 pb-2 border-bottom">
                                            <div className="d-flex align-items-center w-100 ">
                                                <img
                                                    src="https://vcdn.tikicdn.com/cache/w100/ts/seller/4b/54/1a/f385a79a716cb3505f152e7af8c769aa.png.webp"
                                                    alt="Product"
                                                    className="img-fluid img-ft"
                                                />
                                                <div className="pe-4">
                                                    <span className="fw bold">SOMINAM</span> <br />
                                                    4.4  <i className="bi bi-star-fill primary"></i>  <small>(720 đánh giá)</small>
                                                </div>
                                            </div>
                                            <div >
                                                <div className="border p-2 border-radius-small">
                                                    <BsChatDots style={{ fontSize: 20 }} color="#f05d23" />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                {variant && <Row className="mt-3">
                                    <Col>
                                        <div className="d-flex  ">
                                            <img
                                                src={variant.image || product?.thumbnail}
                                                alt="variant"
                                                className="img-fluid img-ft"
                                            />
                                            <div className="ps-1">
                                                <span>{variant.attributeValue1}</span> <br />
                                                <span>{variant.attributeValue2}</span>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="ps-1">
                                            <span>Kho hàng: {variant.quantity}</span> <br />

                                        </div>
                                    </Col>
                                </Row>}
                                {variant ? variant.quantity > 0 ?
                                    <>
                                        <Row className="mt-3">
                                            <Col className="d-flex justify-content-between align-items-center">
                                                <span>Số Lượng</span>
                                                <div>
                                                    <Button variant="outline-secondary" onClick={decreaseQuantity}>-</Button>
                                                    <Form.Control
                                                        type="text"
                                                        value={quantity}
                                                        readOnly
                                                        className="text-center"
                                                        style={{ width: '3rem', display: 'inline-block', margin: '0 0.5rem' }}
                                                    />
                                                    <Button variant="outline-secondary" onClick={increaseQuantity}>+</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col className="d-flex justify-content-between">
                                                <span>Tạm tính</span>
                                                <span className="text-large">{convertPrice(quantity * variant.price)}</span>
                                            </Col>
                                        </Row>
                                    </> : <>
                                        <span className="text-muted">Hết hàng</span>
                                    </>

                                    : <></>}
                                {variant && <>
                                    <Row className="mt-3">
                                        <Col>
                                            <Button disabled={disabledBtn} variant="danger" className="w-100">Mua ngay</Button>
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col>
                                            <Button onClick={handleAddToCart} disabled={disabledBtn} variant="outline-primary" className="w-100">Thêm vào giỏ hàng</Button>
                                        </Col>
                                    </Row>
                                </>}
                            </Card>
                        </div>
                        
                        {(address?.data && address?.data.length > 0) ?
                        <div className="bg-white mt-3 border-radius-medium p-1"> <Address info={address.data[0]} />  </div> :<></> }
                       

                    </Col>
                </Row>

                <Row>
                    <Col md={9}>
                        <Comment />
                    </Col>
                    <Col md={3}>

                    </Col>
                </Row>
                <Row>
                    <Col md={9}>
                        <div className="mt-3 border-radius-medium ">
                            <div style={{ border: 'none' }} className="card border-radius-medium ">
                                <div className="card-body border-radius-medium ">
                                    <h5 className="card-title">Thông tin chi tiết</h5>
                                    <table className="table text-muted ">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Thương hiệu</th>
                                                <td>OEM</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Xuất xứ thương hiệu</th>
                                                <td>Việt Nam</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Chất liệu</th>
                                                <td>Cotton</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Xuất xứ (Made in)</th>
                                                <td>Việt Nam</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Sản phẩm có được bảo hành không?</th>
                                                <td>Không</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={9}>
                        <div className=" mt-3 border-radius-medium ">
                            <div style={{ border: 'none' }} className="card border-radius-medium ">
                                <div className="card-body border-radius-medium ">
                                    <h5 className="card-title">Mô tả sản phẩm</h5>
                                    <pre className="text-align-start">
                                        {` 
                                    1. Size: S, M, L, XL
                                    2. Kiểu dáng: Thun đen
                                    3. Phong cách: Nhập khẩu
                                    4. Màu sắc: Đen
                                    5. Công nghệ: Cotton
                                    6. Chất liệu: 100% cotton
                                    7. Kích thước: 80cm x 100cm x 25cm
                                    8. Trọng lượng: 150g
                                    9. Sản phẩm có thể khuyển mãi tại cửa hàng của chúng tôi
                                    10. Sản phẩm có thể đặt hàng tại cửa hàng của chúng tôi để nhận hàng tại`}
                                    </pre>
                                    <img
                                        style={{ display: 'flex', flex: 1 }}
                                        src="https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp"
                                        alt="Product"
                                        className="img-fluid"
                                    />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

            </>}
        </Container>
    );
}

export default ProductDetail;