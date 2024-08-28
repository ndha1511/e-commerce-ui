import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Test = () => {
    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    };

    return (
        <div className="container mt-5">
            <h5 className="mb-3">Nhập mô tả sản phẩm</h5>
            <textarea
                className="form-control"
                rows="10"
                value={text}
                onChange={handleChange}
                placeholder="Nhập văn bản ở đây..."
            ></textarea>
            <div className="card mt-4">
                <div className="card-body">
                    <h6 className="card-title">Xem trước:</h6>
                    <pre>{`Quần shorts thể thao nam dạng sọt sport đùi

Chất liệu : thun lạnh thể thao 4 chiều 

Đặt biệt quần nằm ờ các khóa kéo túi dọc 2 bên thân quần tạo nét cá tính cho sản phẩm. 

Chữ Sports được thêu sắc sảo tạo điểm nhấn cho chiếc quần thể thao nhé 

Quần sọt nam được may từ vải thun lạnh nên mặt  cực kỳ thoải mái 

Sàn phẩm quần đùi được kết hợp áo thun đen, trắng sát nách hay áo phông đi dạo phố  tập gym mặc nhà 

Quần là Thương hiệu đã đăng ký độc quyền`}</pre>
                </div>
            </div>
        </div>
    );
};

export default Test;
