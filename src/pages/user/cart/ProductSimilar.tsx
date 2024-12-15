import { useEffect, useRef } from "react";
import ListProduct from "../../../components/products/ListProduct";
import { Product } from "../../../models/product";
import { isMobile } from "../../../utils/responsive";
import "./cart-item.scss";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  products: Product[];
  ProductSimilarCompRef: React.RefObject<HTMLDivElement>;
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

const ProductSimilar = ({
  products,
  ProductSimilarCompRef,
  isVisible,
  setIsVisible,
}: Props) => {
  const ProductSimilarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      ProductSimilarRef.current &&
      ProductSimilarCompRef.current &&
      !ProductSimilarRef.current.contains(event.target as Node) &&
      !ProductSimilarCompRef.current.contains(event.target as Node)
    ) {
      setIsVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const mobile = isMobile();
  return (
    <>
      {isVisible && (
        <div className="" ref={ProductSimilarRef}>
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0, x: 0, y: 0 }} // Bắt đầu từ góc trái trên (thu nhỏ)
              animate={{ scale: 1 }} // Chỉ mở rộng, không dịch chuyển
              exit={{ scale: 0 }} // Khi thoát, thu nhỏ về 0
              transition={{ duration: 0.3 }} // Thời gian hiệu ứng
              className="variant-options1"
            >
              <div className={`${mobile ? "" : "p-3"}`}>
                <ListProduct products={products} loading={false} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default ProductSimilar;
