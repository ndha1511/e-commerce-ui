import { ReactNode,} from "react";
import { Col, Row } from "react-bootstrap";
import { isMobile } from "../../utils/responsive";


interface PromotionRowProps {
  label: string;
  children: ReactNode;
  className?: string;
  obligatory?: boolean;
}

const PromotionRow: React.FC<PromotionRowProps> = ({ label, children, className = '', obligatory = true }) => {
  const mobile = isMobile();

  return (
    <Row className={`d-flex align-items-center mb-3 mt-1 ${className}`}>
      <Col md={2} className={`${mobile ? 'text-start mb-2': 'text-end'}`}>
        <div>
          <span>
            <span className="primary" style={{ opacity: obligatory ? 1 : 0 }}>*</span>
            {label}
          </span>
        </div>
      </Col>
      <Col md={10}>{children}</Col>
    </Row>
  );
};

export default PromotionRow;
