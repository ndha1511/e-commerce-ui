import { Container, Row, Col, Form } from "react-bootstrap";
import Address from "../../../components/address/Address";
import "./payment.scss";
import { BsCheckSquareFill } from "react-icons/bs";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import useGetParam from "../../../hooks/useGetParam";
import { useCheckLoginQuery } from "../../../services/auth.service";
import { useGetCartByUserIdQuery } from "../../../services/cart.service";
import PaymentItem from "./PaymentItem";
import {
  useGetAddressByUserIdQuery,
  useGetAddressQuery,
} from "../../../services/address.service";
import { useEffect, useState } from "react";
import {
  useCreateOrderMutation,
  useLazyGetFeeQuery,
  useLazyGetPaymentQuery,
} from "../../../services/payment.service";
import { calcPromotionNum, convertPrice } from "../../../utils/convert-price";
import {
  OrderItem,
  OrderRequest,
  PaymentMethod,
} from "../../../dtos/request/payment/order-request";
import ModalLoading from "../../../components/loading/ModalLoading";
import CreateAddressModal from "../../../components/address/CreateAddressModal";
import VoucherModal from "./VoucherModal";
import { Voucher } from "../../../models/voucher";
import useRedirect from "../../../hooks/useRedirect";
import { useDispatch } from "react-redux";
import { setOrderId } from "../../../rtk/slice/order-slice";
import { Collapse } from "react-bootstrap";
import { isMobile } from "../../../utils/responsive";

const Payment = () => {
  const mobile = isMobile();
  const redirect = useRedirect();
  const selectVariant = useGetParam("select-variant");
  const variantIds = selectVariant?.split(";") || [];
  const { data: user, isSuccess: loginSuccess } = useCheckLoginQuery();
  const { data: cart } = useGetCartByUserIdQuery(user?.data?.id || "", {
    skip: !loginSuccess || !user?.data?.id,
  });
  const {
    data: address,
    refetch: addressRefetch,
    isSuccess,
  } = useGetAddressByUserIdQuery(user?.data?.id || "", {
    skip: !loginSuccess || !user?.data?.id,
  });

  const { data: shopAddress } = useGetAddressQuery();

  const itemViews =
    cart?.data.filter((item) => variantIds.includes(item.variantResponse.id)) ||
    [];
  const [modalAdd, setModalAdd] = useState(false);
  const [getFee] = useLazyGetFeeQuery();
  const [fee, setFee] = useState(0);
  const [amount, setAmount] = useState(0);
  const [selectAddress, setSelectAddress] = useState(0);
  const orderFrom = useGetParam("from");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.COD
  );
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [getUrlPayment] = useLazyGetPaymentQuery();

  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [voucher, setVoucher] = useState<Voucher | null>(null);

  const handleSelectVoucher = (voucher: Voucher) => {
    setVoucher(voucher);
    // setShowVoucherModal(false);
  };
  const [openMs, setOpenMs] = useState<boolean>(false);
  const [openShip, setOpenShip] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getPrice = async () => {
      if (address?.data && shopAddress?.data && itemViews.length > 0) {
        const totalPrice = itemViews.reduce((acc, item) => {
          return (
            acc +
            calcPromotionNum(
              item.variantResponse.price * item.quantity,
              item.promotion
            )
          );
        }, 0);
        const weight = itemViews.reduce((acc, item) => {
          return acc + item.variantResponse.product.weight * item.quantity;
        }, 0);
        try {
          const fee = await getFee({
            pickDistrict: shopAddress.data.district,
            pickProvince: shopAddress.data.province,
            district: address.data[selectAddress].district,
            province: address.data[selectAddress].province,
            weight: weight,
            value: totalPrice,
          }).unwrap();
          setFee(fee.data.fee);
        } catch (error) {
          console.log(error);
        }

        setAmount(totalPrice);
      }
    };
    getPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, shopAddress, cart]);

  const handlerOrder = async () => {
    const orderItem: OrderItem[] = itemViews.map((i) => {
      return {
        variantId: i.variantResponse.id,
        quantity: i.quantity,
      };
    });
    if (address && address.data?.[selectAddress]) {
      const orderRequest: OrderRequest = {
        userId: user?.data?.id || "",
        userAddress: address?.data[selectAddress],
        orderItems: orderItem,
        paymentMethod: paymentMethod,
        note: "",
        orderFrom: orderFrom || "",
        deliveryFee: fee,
        voucherCode: voucher?.id || '',
      };
      try {
        const response = await createOrder(orderRequest).unwrap();
        const newOrder = response.data;

        if (newOrder.paymentMethod === PaymentMethod.ATM) {
          const responsePayment = await getUrlPayment({
            orderId: newOrder.id,
            amount: newOrder.finalAmount,
          }).unwrap();
          location.href = responsePayment.data;
        } else {
          dispatch(setOrderId(newOrder.id));
          redirect("/payment/result?success=true", newOrder);
        }
      } catch (error) {
        console.log(error);
        redirect("/payment/result?success=false");
      }
    }
  };
  useEffect(() => {
    if (isSuccess && address?.data) {
      const index = address?.data.findIndex((addr) => addr.addressDefault);
      if (index !== -1) {
        setSelectAddress(index);
      }
    }
  }, [isSuccess, address]);
  const discount = Math.min(
    amount * (voucher?.discountValue || 0),
    voucher?.maxPrice || 0
  );
  return (
    <Container className="p-2 bg-light  rounded ">
      <Row className="">
        <Col md={8} className="">
          {address?.data && address?.data.length > 0 ? (
            <Address info={address.data[selectAddress]} />
          ) : (
            <div className="p-3 bg-white  shadow-all">
              <button
                onClick={() => setModalAdd(true)}
                className="button-flex button-hover background-primary"
              >
                Thêm địa chỉ nhận hàng
              </button>
            </div>
          )}
          <div className=" p-3 ">
            <Row className="bg-white  border-radius-small ">
              {/* Lời nhắn */}
              <Col md={6} className=" p-2 border-end">
                <div className="align-items-center">
                  <div className=" w-100 ">
                    <div
                      onClick={() => setOpenMs(!openMs)}
                      className={`d-flex justify-content-between pe-1 ${
                        openMs ? "mb-3" : ""
                      }`}
                    >
                      <span className="fw-bold">Lời nhắn:</span>
                      {mobile &&
                        (openMs ? (
                          <i className="bi bi-chevron-down"></i>
                        ) : (
                          <i className="bi bi-chevron-right"></i>
                        ))}
                    </div>
                  </div>
                  {mobile && (
                    <Collapse in={openMs}>
                      <div>
                        <Form.Control
                          as="textarea"
                          placeholder="Lưu ý cho Người bán..."
                          rows={1}
                          style={{ fontSize: 12 }}
                        />
                      </div>
                    </Collapse>
                  )}
                  {!mobile && (
                    <div className="mt-3">
                      <Form.Control
                        as="textarea"
                        placeholder="Lưu ý cho Người bán..."
                        rows={3}
                        style={{ fontSize: 12 }}
                      />
                    </div>
                  )}
                </div>
              </Col>
              <Col md={6} className=" p-2">
                <div
                  onClick={() => setOpenShip(!openShip)}
                  className={`d-flex justify-content-between ${
                    openShip && mobile ? "mb-3" : ""
                  }  pe-1`}
                >
                  <span className="fw-bold ">Thông tin vận chuyển:</span>
                  {mobile &&
                    (openShip ? (
                      <i className="bi bi-chevron-down"></i>
                    ) : (
                      <i className="bi bi-chevron-right"></i>
                    ))}
                </div>
                {mobile && (
                  <Collapse in={openShip}>
                    <div>
                      <div className="d-flex flex-column gap-2">
                        <span>
                          Gửi từ:{" "}
                          {`${shopAddress?.data.addressDetail}, 
                                ${shopAddress?.data.ward}, ${shopAddress?.data.district}, ${shopAddress?.data.province}`}
                        </span>
                        <span>Đơn vị vận chuyển: Giao hàng tiết kiệm</span>
                        <span>
                          Phí vận chuyển: {convertPrice(fee)} (bao gồm cả phí
                          bảo hiểm đơn hàng)
                        </span>
                      </div>
                    </div>
                  </Collapse>
                )}
                {!mobile && (
                  <div className="d-flex flex-column gap-2 mt-3">
                    <span>
                      Gửi từ:{" "}
                      {`${shopAddress?.data.addressDetail}, 
                        ${shopAddress?.data.ward}, ${shopAddress?.data.district}, ${shopAddress?.data.province}`}
                    </span>
                    <span>Đơn vị vận chuyển: Giao hàng tiết kiệm</span>
                    <span>
                      Phí vận chuyển: {convertPrice(fee)} (bao gồm cả phí bảo
                      hiểm đơn hàng)
                    </span>
                  </div>
                )}
              </Col>
            </Row>
          </div>
          <div className=" p-3 bg-white  border-radius-small mb-3">
            <div>
              <span>Phương thức thanh toán: </span>
              <div className="d-flex mt-3 mb-3">
                <button
                  className={`payment-button ${
                    paymentMethod === PaymentMethod.COD ? "active" : ""
                  }  me-3`}
                  onClick={() => setPaymentMethod(PaymentMethod.COD)}
                >
                  Thanh toán khi nhận hàng
                </button>
                <button
                  className={`payment-button ${
                    paymentMethod === PaymentMethod.ATM ? "active" : ""
                  }  me-3`}
                  onClick={() => setPaymentMethod(PaymentMethod.ATM)}
                >
                  Chuyển khoản ngân hàng
                </button>
              </div>
            </div>
          </div>
        </Col>
        <Col md={4} className="">
          <div className="p-3 bg-white shadow-all border-radius-small ">
            <div className="d-flex align-items-center mb-2 pb-3 border-bottom">
              <BsCheckSquareFill className="text-danger  me-2" />
              <h6 className="mb-0">Thông tin đơn hàng</h6>
            </div>
            <SimpleBar className="order-payment">
              <div>
                {itemViews.map((item, index) => (
                  <PaymentItem key={index} item={item} />
                ))}
              </div>
            </SimpleBar>
            <div className="mb-2">
              <span className="text-muted">Voucher ưu đãi: </span>
              <button
                onClick={() => setShowVoucherModal(true)}
                className="button-hover primary"
                style={{
                  background: "none",
                  border: "none",
                }}
              >
                Chọn voucher
              </button>
            </div>
            <div className="p-3 bg-white border rounded">
              <Row className="mb-2">
                <Col xs={6} className="text-muted">
                  Tổng tiền hàng
                </Col>
                <Col xs={6} className="text-end">
                  {convertPrice(amount)}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col xs={6} className="text-muted">
                  Phí vận chuyển
                </Col>
                <Col xs={6} className="text-end">
                  {convertPrice(fee)}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col xs={6} className="text-muted">
                  Voucher giảm giá:
                </Col>
                <Col xs={6} className="text-end">
                  {discount}
                </Col>
              </Row>
              <hr />
              <Row className="mb-3">
                <Col xs={6} className="fw-bold">
                  Tổng thanh toán
                </Col>
                <Col
                  xs={6}
                  className="text-end primary"
                  style={{ fontSize: "1.5rem" }}
                >
                  {convertPrice(amount + fee - discount)}
                </Col>
              </Row>
              <button
                disabled={
                  address?.data && address?.data.length > 0 ? false : true
                }
                onClick={handlerOrder}
                className="w-100 button-flex button-hover background-primary text-large"
                style={{
                  border: "none",
                  opacity: address?.data && address?.data.length > 0 ? 1 : 0.5,
                }}
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </Col>
      </Row>
      {modalAdd && (
        <CreateAddressModal
          show={modalAdd}
          handleClose={() => setModalAdd(false)}
          refetch={addressRefetch}
        />
      )}
      {isLoading && <ModalLoading loading={isLoading} />}
      {showVoucherModal && (
        <VoucherModal
          voucherSelected={voucher}
          handleSelect={handleSelectVoucher}
          show={showVoucherModal}
          handleClose={() => {
            setShowVoucherModal(false);
          }}
          amount={amount}
        />
      )}
    </Container>
  );
};

export default Payment;
