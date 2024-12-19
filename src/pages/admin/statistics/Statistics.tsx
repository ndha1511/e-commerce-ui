import React, { LegacyRef, ReactNode, useState } from "react";
import StatisticsContent from "./content/StatisticsContent";
import StatisticsToolbar from "./toolbar/StatisticsToolbar";
import { Mode, SatisticsSearch } from "./types";
import {
  formatDate,
  formatDate2,
  getDateStringToday,
} from "../../../utils/datetime";
import { AnimatePresence, motion } from "framer-motion";
import SimpleBar from "simplebar-react";
import { Col, Dropdown, Row, Table } from "react-bootstrap";
import {
  useGetBottomProductSellingQuery,
  useGetTopProductSellingQuery,
} from "../../../services/statistics.service";
import useRedirect from "../../../hooks/useRedirect";
import SkeltetonWrapper from "../../../components/query-wrapper/SkeletonWrapper";

const Statistics: React.FC = () => {
  const { data, isSuccess } = useGetTopProductSellingQuery();
  const redirect = useRedirect();
  const { data: data1 } = useGetBottomProductSellingQuery();
  const { startDate, endDate } = getDateStringToday();
  const [search, setSearch] = useState<SatisticsSearch>({
    startDate: startDate,
    endDate: endDate,
    monthYear: formatDate2(formatDate(new Date()), "yyyy-MM"),
    year: new Date().getFullYear(),
  });
  const [mode, setMode] = useState<Mode["mode"]>("daily");

  return (
    <div className="d-flex flex-column p-3 bg-light">
      <div className="bg-white p-3 border-radius-small mb-3 mt-3">
        <h6>Thống kê</h6>
        <div className="p-3">
          <StatisticsToolbar
            search={search}
            setSearch={setSearch}
            mode={mode}
            setMode={setMode}
          />
          <StatisticsContent
            search={search}
            setSearch={setSearch}
            mode={mode}
            setMode={setMode}
          />
          <div className="mt-3">
            <AnimatePresence>
              <motion.div
                initial={{ y: 100, opacity: 0 }} // Bắt đầu từ phía dưới và ẩn
                animate={{ y: 0, opacity: 1 }} // Di chuyển lên vị trí gốc và hiện lên
                exit={{ y: 100, opacity: 0 }} // Quay trở lại phía dưới và ẩn khi thoát
                transition={{ duration: 0.5 }} // Thời gian chuyển động
                style={{ width: "100%", height: "auto" }}
              >
            <Row>
              <Col xs={12} md={6}>
              <SkeltetonWrapper
            queriesStatus={[
              isSuccess,
            ]}
            skHeight={200}

          >
              <div>
                  <h6>
                    Đề xuất sản phẩm cần nhập{" "}
              
                  </h6>
                  <SimpleBar style={{ overflowY: "auto", maxHeight: 500 }}>
                    <Table className="mb-0 mt-2 table-bordered table-responsive custom-table-dashboard">
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th>Hình ảnh</th>
                          <th>Tên sản phẩm</th>
                          <th>Số lượng nhập</th>
                          <th>Số lượng bán</th>
                          <th>Tồn kho</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.data.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <img
                                src={item.product.thumbnail}
                                width={50}
                                height={50}
                              />
                            </td>
                            <td>{item.product.productName}</td>
                            <td>{item.importQuantity}</td>
                            <td>{item.quantity}</td>
                            <td>
                              {(item.importQuantity || 0) -
                                (item.quantity || 0)}
                            </td>
                            <td>
                              <Dropdown>
                                <Dropdown.Toggle as={CustomToggle}>
                                  <i className="bi bi-three-dots"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    onClick={() =>
                                      redirect(
                                        "/admin/product/import?" +
                                          "productId=" +
                                          item.product.id
                                      )
                                    }
                                  >
                                    Nhập hàng
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </SimpleBar>
                </div>
                </SkeltetonWrapper>
              </Col>
              <Col xs={12} md={6}>
              <SkeltetonWrapper
            queriesStatus={[
              isSuccess,
            ]}
            skHeight={200}
            
          >
              <div>
                  <h6>
                    Sản phẩm bán chậm{" "}
               
                  </h6>
                  <SimpleBar style={{ overflowY: "auto", maxHeight: 500 }}>
                    <Table className="mb-0 mt-2 table-bordered table-responsive custom-table-dashboard">
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th>Hình ảnh</th>
                          <th>Tên sản phẩm</th>
                          <th>Số lượng nhập</th>
                          <th>Số lượng bán</th>
                          <th>Tồn kho</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {data1?.data.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <img
                                src={item.product.thumbnail}
                                width={50}
                                height={50}
                              />
                            </td>
                            <td>{item.product.productName}</td>
                            <td>{item.importQuantity}</td>
                            <td>{item.quantity}</td>
                            <td>
                              {(item.importQuantity || 0) -
                                (item.quantity || 0)}
                            </td>
                            <td>
                              <Dropdown>
                                <Dropdown.Toggle as={CustomToggle}>
                                  <i className="bi bi-three-dots"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    onClick={() =>
                                      redirect(
                                        "/admin/create/promotion" 
                                        
                                      )
                                    }
                                  >
                                    Đề xuất khuyến mãi
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </SimpleBar>
                </div>
                </SkeltetonWrapper>
                </Col>
            </Row>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
const CustomToggle = React.forwardRef(
  (
    {
      children,
      onClick,
    }: {
      children: ReactNode;
      onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    },
    ref: LegacyRef<HTMLAnchorElement>
  ) => (
    <a
      href="/"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="avatar-dropdown" // Thêm class cho avatar dropdown
    >
      {children}
    </a>
  )
);
export default Statistics;
