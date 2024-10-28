import { useState, useRef, forwardRef } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  const handleAdd = () => {
    setIsVisible(true);
    if (targetRef.current) {
      // Lấy biểu tượng giỏ hàng cụ thể
      const iconRect = targetRef.current.getBoundingClientRect(); // Lấy tọa độ của phần tử chứa giỏ hàng
console.log(iconRect.top)
      // Tính toán tọa độ để căn giữa box với biểu tượng giỏ hàng
      setX(iconRect.left + window.scrollX + iconRect.width / 2 - 50); // 50 là nửa chiều rộng của box
      setY(iconRect.top + window.scrollY - 140); // Điều chỉnh để box không bị lệch xuống
      setRotate(10);
    }
  };

  return (
    <div className="example border p-5 border d-flex justify-content-between">
      <div>
        {isVisible && (
          <motion.div
            className="box border"
            animate={{
              x,
              y,
              rotate,
              scale: [1, 0.5], // Hiệu ứng thu nhỏ
              opacity: [1, 0] // Hiệu ứng mờ dần
            }}
            transition={{ type: "spring", stiffness: 100, damping: 40, duration: 3 }}
            style={{ opacity: '50%' }} // Thêm màu nền cho box
            onAnimationComplete={() => setIsVisible(false)} // Ẩn box sau khi hoạt ảnh hoàn tất
          >
           <img src="https://dongphuchaianh.vn/wp-content/uploads/2022/02/ao-polo-nam-quan-7-routine.jpg" width={50} height={50}></img>
          </motion.div>
        )}
      </div>
      <button onClick={handleAdd}>Thêm</button>
      <div style={{ position: "relative", marginLeft: "20px" }}>
        <Cartss ref={targetRef} /> {/* Truyền ref vào Cartss */}
      </div>
    </div>
  );
}

// Sử dụng forwardRef để cho phép truyền ref vào Cartss
const Cartss = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="border" style={{ padding: '10px',height:60,top:10, display: 'inline-block' }}>
      <i className="bi bi-cart" style={{ fontSize: 24, color: 'black' }}></i> {/* Tùy chỉnh kích thước, màu sắc */}
    </div>
  );
});
